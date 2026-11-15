# AEGIS — OPEN POLICY AGENT (OPA) POLICY DESIGN

**Project:** AEGIS  
**Full Name:** Task-Aware Runtime Security Gateway for Autonomous AI Agents  
**Document:** OPA Policy Design Specification  
**Version:** 1.0  
**Status:** Approved Technical Specification  
**Component:** Policy Decision Point (PDP)  
**Policy Engine:** Open Policy Agent (OPA)  
**Policy Language:** Rego  
**Last Updated:** 15 November 2026

---

# 1. Purpose

This document defines the Open Policy Agent (OPA) policy architecture, Rego package structure, input/output data schemas, decision hierarchy, evaluation logic, and testing rules for AEGIS.

In the AEGIS architecture:
- **AEGIS Gateway** is the **Policy Enforcement Point (PEP)**.
- **Open Policy Agent (OPA)** is the **Policy Decision Point (PDP)**.

OPA evaluates structured, trusted facts constructed by the backend gateway and returns an authoritative authorization decision: `ALLOW`, `BLOCK`, or `REVIEW`.

---

# 2. Core Policy Principles

## 2.1 Default Deny
All policies follow default-deny semantics. If no explicit rule permits an action, or if required fields are missing, the policy evaluates to `BLOCK`.

## 2.2 Decision Priority
Decisions are evaluated under strict priority:
```text
BLOCK > REVIEW > ALLOW
```
- **BLOCK:** Any mandatory restriction violation, expired contract, unpermitted tool/operation, or invalid identity produces an immediate BLOCK. No advisory signal or human approval can override a hard BLOCK.
- **REVIEW:** If no hard violation exists, but the operation is flagged as requiring human approval (e.g., bulk export, sensitive financial manipulation, or Gemini contextual ambiguity), the policy produces REVIEW unless valid, unexpired, revalidated human approval is attached.
- **ALLOW:** Produced if and only if all identity, contract, resource, and operation requirements are satisfied and no review condition remains outstanding.

## 2.3 Trusted Backend Input
Agents and frontend clients **never** communicate with OPA directly. The backend gateway authenticates the agent, retrieves the authoritative Task Contract from SQLite/PostgreSQL, performs deterministic checks, sanitizes parameters, optionally attaches validated Gemini advisory signals, and submits trusted input to OPA.

## 2.4 Fail-Closed Enforcement
If OPA is unreachable, times out, or returns a malformed response, the gateway enforces a strict fail-closed state: **zero tool execution calls are made**.

---

# 3. Policy Architecture and Package Structure

Policy files are organized under the `opa/` directory:

```text
opa/
├── policies/
│   ├── aegis_authz.rego       # Root policy evaluating final decision
│   ├── agent_access.rego      # Agent identity, lifecycle, and credential status
│   ├── task_scope.rego        # Task contract scope, allowed tools, operations, resources
│   └── operation_rules.rego   # Sensitive operations, review triggers, approval checks
└── tests/
    └── aegis_authz_test.rego  # Rego unit test suite covering all decision paths
```

### Rego Packages
1. `package aegis.authz`: Root package exposing the final `decision`, `reason_code`, and `reason`.
2. `package aegis.agent_access`: Validates agent status and identity validity.
3. `package aegis.task_scope`: Validates requested tool, operation, and resource against active Task Contract.
4. `package aegis.operation_rules`: Evaluates operation-specific approval requirements and human approval revalidation.

---

# 4. Policy Input Schema

The backend gateway constructs a JSON payload conforming to the following structure before querying OPA at `/v1/data/aegis/authz`:

```json
{
  "input": {
    "agent": {
      "id": "admin_01",
      "name": "Admin Agent",
      "status": "ACTIVE",
      "agent_type": "ADMIN"
    },
    "contract": {
      "contract_id": "TC-001",
      "version": 1,
      "status": "ACTIVE",
      "expires_at": "2026-11-15T18:00:00Z",
      "task_description": "Read-only audit of test records",
      "allowed_tools": ["test_database"],
      "allowed_operations": ["read"],
      "allowed_resources": ["test_records"],
      "restricted_operations": ["delete", "bulk_export"],
      "approval_requirements": {
        "operations": ["bulk_export"],
        "resources": ["finance_reports"]
      }
    },
    "request": {
      "request_id": "REQ-1001",
      "tool": "test_database",
      "operation": "delete",
      "resource": "test_records",
      "parameters": {
        "record_id": "TEST-001"
      },
      "request_timestamp": "2026-11-15T16:00:00Z"
    },
    "context": {
      "deterministic_violations": [],
      "gemini_advisory": {
        "evaluated": false,
        "task_alignment": "NOT_REQUIRED",
        "risk_signals": [],
        "reason": null
      }
    },
    "approval": {
      "approval_id": null,
      "status": "NONE",
      "is_revalidated": false,
      "fingerprint_matches": false,
      "expires_at": null,
      "reviewer_id": null
    }
  }
}
```

---

# 5. Policy Output Schema

OPA returns a structured evaluation result:

```json
{
  "result": {
    "decision": "BLOCK",
    "reason_code": "OPERATION_NOT_PERMITTED",
    "reason": "Operation 'delete' is explicitly restricted or outside permitted operations in active Task Contract",
    "policy_version": "1.0.0"
  }
}
```

### Supported Reason Codes
| Code | Decision | Meaning |
|---|---|---|
| `AUTHORIZED` | ALLOW | Request passed all security checks |
| `AGENT_INACTIVE` | BLOCK | Agent is disabled, revoked, or unknown |
| `CONTRACT_INACTIVE` | BLOCK | Task Contract is inactive or not found |
| `CONTRACT_EXPIRED` | BLOCK | Task Contract expiration timestamp has passed |
| `TOOL_NOT_PERMITTED` | BLOCK | Requested tool is outside contract allowed_tools |
| `OPERATION_NOT_PERMITTED`| BLOCK | Requested operation is not in allowed_operations or in restricted_operations |
| `RESOURCE_OUT_OF_SCOPE` | BLOCK | Target resource is not permitted for this contract |
| `HARD_RESTRICTION_VIOLATED` | BLOCK | Deterministic pre-check found a mandatory violation |
| `APPROVAL_REQUIRED` | REVIEW | Operation or resource requires human approval |
| `APPROVAL_EXPIRED` | REVIEW | Previously granted approval has expired |
| `APPROVAL_FINGERPRINT_MISMATCH` | BLOCK | Request parameters altered after approval |
| `GEMINI_MISMATCH_REVIEW` | REVIEW | Gemini advisory analysis flagged a task-action mismatch |
| `DEFAULT_DENY` | BLOCK | Fallback denial when no allow conditions are satisfied |

---

# 6. Rego Policy Specifications

## 6.1 Root Authorization (`opa/policies/aegis_authz.rego`)

```rego
package aegis.authz

import data.aegis.agent_access
import data.aegis.task_scope
import data.aegis.operation_rules

default decision = "BLOCK"
default reason_code = "DEFAULT_DENY"
default reason = "Request denied by default security policy"
default policy_version = "1.0.0"

# Priority 1: BLOCK
decision = "BLOCK" if {
    count(block_reasons) > 0
}

reason_code = block_reasons[0].code if {
    count(block_reasons) > 0
}

reason = block_reasons[0].message if {
    count(block_reasons) > 0
}

# Priority 2: REVIEW (Only if no BLOCK)
decision = "REVIEW" if {
    count(block_reasons) == 0
    count(review_reasons) > 0
}

reason_code = review_reasons[0].code if {
    count(block_reasons) == 0
    count(review_reasons) > 0
}

reason = review_reasons[0].message if {
    count(block_reasons) == 0
    count(review_reasons) > 0
}

# Priority 3: ALLOW (Only if no BLOCK and no REVIEW)
decision = "ALLOW" if {
    count(block_reasons) == 0
    count(review_reasons) == 0
    allow_conditions_met
}

reason_code = "AUTHORIZED" if {
    count(block_reasons) == 0
    count(review_reasons) == 0
    allow_conditions_met
}

reason = "Request permitted under active Task Contract and security policies" if {
    count(block_reasons) == 0
    count(review_reasons) == 0
    allow_conditions_met
}

# Aggregate all BLOCK reasons
block_reasons := array.concat(
    agent_access.blocks,
    array.concat(task_scope.blocks, operation_rules.blocks)
)

# Aggregate all REVIEW reasons
review_reasons := operation_rules.reviews

# Conditions required for ALLOW
allow_conditions_met if {
    agent_access.is_active
    task_scope.tool_allowed
    task_scope.operation_allowed
    task_scope.resource_allowed
    task_scope.contract_valid
}
```

## 6.2 Agent Access Rules (`opa/policies/agent_access.rego`)

```rego
package aegis.agent_access

import rego.v1

is_active if {
    input.agent.status == "ACTIVE"
}

blocks contains {"code": "AGENT_INACTIVE", "message": "Requesting agent is not in ACTIVE status"} if {
    not is_active
}

blocks contains {"code": "AGENT_MISSING", "message": "Agent identification missing"} if {
    not input.agent.id
}
```

## 6.3 Task Scope Rules (`opa/policies/task_scope.rego`)

```rego
package aegis.task_scope

import rego.v1

# Contract validity checks
contract_valid if {
    input.contract.status == "ACTIVE"
    not contract_expired
}

contract_expired if {
    time.parse_rfc3339_ns(input.contract.expires_at) <= time.parse_rfc3339_ns(input.request.request_timestamp)
}

blocks contains {"code": "CONTRACT_INACTIVE", "message": "Task Contract is not in ACTIVE status"} if {
    input.contract.status != "ACTIVE"
}

blocks contains {"code": "CONTRACT_EXPIRED", "message": "Task Contract has expired"} if {
    contract_expired
}

# Tool checks
tool_allowed if {
    some tool in input.contract.allowed_tools
    tool == input.request.tool
}

blocks contains {"code": "TOOL_NOT_PERMITTED", "message": sprintf("Tool '%v' is not permitted by active Task Contract", [input.request.tool])} if {
    not tool_allowed
}

# Operation checks
operation_allowed if {
    some op in input.contract.allowed_operations
    op == input.request.operation
    not operation_restricted
}

operation_restricted if {
    some restricted in input.contract.restricted_operations
    restricted == input.request.operation
}

blocks contains {"code": "OPERATION_NOT_PERMITTED", "message": sprintf("Operation '%v' is restricted or not permitted by Task Contract", [input.request.operation])} if {
    not operation_allowed
}

# Resource checks
resource_allowed if {
    some res in input.contract.allowed_resources
    res == input.request.resource
}

blocks contains {"code": "RESOURCE_OUT_OF_SCOPE", "message": sprintf("Resource '%v' is outside permitted scope of Task Contract", [input.request.resource])} if {
    not resource_allowed
}
```

## 6.4 Operation & Approval Rules (`opa/policies/operation_rules.rego`)

```rego
package aegis.operation_rules

import rego.v1

# Check if operation or resource explicitly requires approval
requires_approval if {
    some op in input.contract.approval_requirements.operations
    op == input.request.operation
}

requires_approval if {
    some res in input.contract.approval_requirements.resources
    res == input.request.resource
}

requires_approval if {
    input.context.gemini_advisory.evaluated == true
    input.context.gemini_advisory.task_alignment == "UNCLEAR"
}

requires_approval if {
    input.context.gemini_advisory.evaluated == true
    input.context.gemini_advisory.task_alignment == "MISMATCH"
}

# Check if valid approval exists
has_valid_approval if {
    input.approval.status == "APPROVED"
    input.approval.is_revalidated == true
    input.approval.fingerprint_matches == true
    not approval_expired
}

approval_expired if {
    input.approval.expires_at != null
    time.parse_rfc3339_ns(input.approval.expires_at) <= time.parse_rfc3339_ns(input.request.request_timestamp)
}

# BLOCK on altered request after approval
blocks contains {"code": "APPROVAL_FINGERPRINT_MISMATCH", "message": "Request payload does not match approved request fingerprint"} if {
    input.approval.status == "APPROVED"
    input.approval.fingerprint_matches == false
}

# REVIEW when approval required and not validly approved
reviews contains {"code": "APPROVAL_REQUIRED", "message": "Requested operation or resource requires human approval"} if {
    requires_approval
    not has_valid_approval
}

reviews contains {"code": "APPROVAL_EXPIRED", "message": "Human approval has expired; re-approval required"} if {
    requires_approval
    input.approval.status == "APPROVED"
    approval_expired
}
```

---

# 7. Rego Policy Testing Specification

Policy unit testing is executed using OPA's native test runner:
```bash
opa test ./opa -v --fail-on-empty
```

### Mandatory Test Scenarios (`opa/tests/aegis_authz_test.rego`)
1. **test_allow_valid_public_search:** Permitted tool, operation, and resource for active agent -> `ALLOW`.
2. **test_block_inactive_agent:** Inactive or disabled agent -> `BLOCK` (`AGENT_INACTIVE`).
3. **test_block_expired_contract:** Contract with timestamp in past -> `BLOCK` (`CONTRACT_EXPIRED`).
4. **test_block_unauthorized_tool:** Requesting database tool when only search allowed -> `BLOCK` (`TOOL_NOT_PERMITTED`).
5. **test_block_restricted_delete:** Admin agent with read-only contract requesting delete -> `BLOCK` (`OPERATION_NOT_PERMITTED`).
6. **test_block_resource_scope:** Requesting finance record on public contract -> `BLOCK` (`RESOURCE_OUT_OF_SCOPE`).
7. **test_review_sensitive_export:** Export operation listed in `approval_requirements` -> `REVIEW` (`APPROVAL_REQUIRED`).
8. **test_allow_approved_export:** Export operation with valid, revalidated, matching approval -> `ALLOW` (`AUTHORIZED`).
9. **test_block_fingerprint_tamper:** Approval marked approved but fingerprint does not match request -> `BLOCK` (`APPROVAL_FINGERPRINT_MISMATCH`).
10. **test_gemini_cannot_override_block:** Gemini says `MATCH`, but operation is delete on read-only contract -> `BLOCK` (`OPERATION_NOT_PERMITTED`).

---

# 8. Backend Gateway Integration

The backend interacts with OPA using an asynchronous HTTP client:
1. Endpoint: `POST http://127.0.0.1:8181/v1/data/aegis/authz`
2. Timeout: 2.0 seconds.
3. Fail-closed: If HTTP status != 200, or payload missing `result.decision`, raise `PolicyServiceUnavailableException` and abort execution.

---

**END OF OPA_POLICY_DESIGN.md**
