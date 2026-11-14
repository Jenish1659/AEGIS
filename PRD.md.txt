# AEGIS — PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Project Name:** AEGIS  
**Full Name:** Task-Aware Runtime Security Gateway for Autonomous AI Agents  
**Tagline:** Verify Every Action. Enforce Least Privilege.  
**Document:** Product Requirements Document  
**Version:** 1.0  
**Status:** Initial Development Specification  
**Project Stage:** Idea and Planning  
**Priority:** MVP Development  
**Last Updated:** 14 November 2026

---

# 1. Document Purpose

This document defines what AEGIS must do, why it is being developed, who will use it, which features it must contain and how the completed features will be tested.

It acts as the main product requirements document and the source of truth for development.

Every developer and AI coding agent must follow the requirements in this document.

No feature should be marked as completed until it has been implemented, tested and verified against its acceptance criteria.

# 2. Product Overview

## 2.1 What Is AEGIS?

AEGIS is an application-layer runtime security gateway designed to protect autonomous AI agents from unauthorized or out-of-scope tool actions.

AI agents can interact with APIs, databases, websites and external tools to complete tasks. However, an agent may request an action that is outside its assigned task, even when it has access to the connected tool.

AEGIS introduces an independent security layer between AI agents and protected tools.

Before a protected tool request is executed, AEGIS checks:

- The identity of the requesting agent.
- The agent's assigned task.
- Its active Task Contract.
- The requested tool and operation.
- The target resource.
- Relevant security policies.
- Additional contextual risk signals when needed.

AEGIS then produces one of three decisions:

- **ALLOW:** The request is permitted and can be executed.
- **BLOCK:** The request violates a security restriction.
- **REVIEW:** The request requires human approval.

The AEGIS Gateway enforces the final decision and controls access to protected tools.

## 2.2 Main Product Vision

To provide a task-aware security layer that helps organizations control what autonomous AI agents are permitted to do, not merely which tools they can access.

## 2.3 Core Innovation

**Intent-to-Action Security Verification**

AEGIS checks whether the requested action matches the agent's current task, permissions and resource scope.

For example, an Admin Agent may have access to a database, but if its current task allows only read operations, a request to delete records must be blocked.

This goes beyond checking only whether an agent has general access to a tool.

## 2.4 Product Positioning

AEGIS is designed as an application-layer runtime security gateway.

It is not:

- A traditional network firewall.
- A replacement for an AI model.
- A general-purpose antivirus product.
- A standalone prompt-injection detector.
- A system that guarantees detection of every malicious instruction.

Its primary responsibility is to control protected tool execution through identity verification, task-aware checks and independent security policies.

# 3. Problem Statement

Autonomous AI agents can perform multi-step tasks using connected tools, APIs and databases.

This creates security risks when agents:

1. Follow malicious instructions inside untrusted content.
2. Request actions unrelated to their assigned tasks.
3. Have access to more resources than they actually require.
4. Perform operations beyond their permitted action scope.
5. Receive direct tool credentials that allow them to bypass external checks.
6. Execute requests without an independent security decision before the tool is called.

Traditional role or tool-level permission checks alone may not establish whether a particular operation is permitted for an agent's current task.

AEGIS addresses this gap by evaluating protected tool requests before execution.

# 4. Product Goals

The main goals of AEGIS are:

1. Build a central security gateway for protected AI agent tool requests.
2. Establish a unique and authenticated identity for every registered agent.
3. Introduce server-managed Task Contracts.
4. Verify requested tools, operations, resources and task restrictions.
5. Integrate Open Policy Agent (OPA) for independent security policy decisions.
6. Integrate Gemini for advisory contextual task-action analysis.
7. Implement ALLOW, BLOCK and REVIEW decisions.
8. Prevent agents from directly accessing protected tools.
9. Add human approval for selected sensitive operations.
10. Maintain useful security audit records.
11. Provide a dashboard for monitoring agents and security activity.
12. Create a measurable and testable prototype using simulated agents and mock tools.

# 5. Target Users

## 5.1 AI Agent Developers

**Purpose:** Developers who create and connect AI agents to external tools.

They need to:

- Register agents.
- Configure their identities.
- Assign Task Contracts.
- Define permitted tools and operations.
- Monitor tool requests.
- Understand security rejection reasons.

## 5.2 Security Administrators

**Purpose:** Users responsible for managing AEGIS security settings.

They need to:

- View registered agents.
- Manage agent permissions.
- Create and update Task Contracts.
- Configure security policies.
- Review blocked requests.
- Monitor security events.
- Manage approval requirements.

## 5.3 Human Reviewers

**Purpose:** Authorized people responsible for approving selected requests.

They need to:

- See pending requests.
- Understand why a request was flagged.
- Review the requested tool and operation.
- Approve or reject a specific request.
- View the final result.

## 5.4 Security Auditors

**Purpose:** People who need to review security activities.

They need to:

- View historical decisions.
- Check request details.
- Identify repeated violations.
- Review approval history.
- Understand why actions were allowed or blocked.

## 5.5 AI Agents

AI agents are the entities whose protected tool requests are controlled by AEGIS.

They interact with AEGIS through authenticated API requests.

An agent must not have permission to create or modify its own authoritative Task Contract or approve its own restricted request.

# 6. Product Scope

## 6.1 Version 1 — Core MVP

The first version must contain the following modules.

### A. Agent Management

- Register agents.
- Generate unique agent identifiers.
- Authenticate agents.
- Enable and disable agents.
- View agent information.
- Track agent activity.
- Assign a Task Contract to each agent.

Initial simulated agents:

1. Research Agent.
2. Finance Agent.
3. Admin Agent.

### B. Task Contract Management

Every agent must have a server-managed Task Contract.

The contract must support:

- Unique contract ID.
- Agent ID.
- Task description.
- Allowed tools.
- Allowed resources.
- Allowed operations.
- Resource and operation restrictions.
- Contract version.
- Active or inactive status.
- Expiry time.
- Human approval requirements where applicable.

Agents must not be able to freely modify their own contracts.

### C. Runtime Security Gateway

The gateway must:

- Receive protected tool requests.
- Authenticate the requesting agent.
- Validate request structure.
- Normalize request information.
- Generate a unique request ID.
- Retrieve the current Task Contract.
- Submit policy evaluation requests.
- Coordinate Gemini analysis when needed.
- Enforce the final decision.
- Forward only approved requests.
- Record execution outcomes.

### D. Intent-to-Action Verification

The verification system must compare:

- Agent identity.
- Assigned task.
- Requested tool.
- Requested operation.
- Target resource.
- Contract restrictions.

It must distinguish between general tool access and permission to perform a specific operation during a particular task.

### E. Open Policy Agent Integration

OPA must:

- Evaluate structured security inputs.
- Check agent and task restrictions.
- Enforce permitted tools.
- Enforce permitted operations.
- Enforce resource scope.
- Check contract validity.
- Apply approval requirements.
- Return structured security decisions.

OPA is the policy decision engine. The AEGIS Gateway is responsible for enforcing the decision.

### F. Gemini AI Analysis

Gemini must provide advisory context analysis for requests that require additional semantic evaluation.

Its responsibilities include:

- Understanding the assigned task context.
- Analysing the requested action.
- Identifying possible task-action mismatches.
- Producing structured advisory results.
- Providing a short explanation for its assessment.

Gemini must never grant access independently or override explicit security restrictions.

### G. Decision and Enforcement System

AEGIS must support three decisions.

**ALLOW**
- All required checks pass.
- The gateway forwards the request to the approved tool.
- The tool execution result is recorded.

**BLOCK**
- A required security restriction is violated.
- The gateway rejects the request.
- The protected tool must not be called.
- The rejection reason is recorded.

**REVIEW**
- A request requires additional human approval.
- The request remains paused.
- An authorized reviewer can approve or reject it.
- The specific request must be revalidated before execution.

### H. Human Approval

- Display pending requests.
- Show agent identity and assigned task.
- Show the requested tool, operation and resource.
- Display the review reason.
- Allow authorized reviewers to approve or reject.
- Record reviewer identity and time.
- Bind approval to the exact request.
- Recheck the relevant security conditions before execution.

### I. Audit and Logging

Record:

- Request ID.
- Agent identity.
- Task Contract ID and version.
- Tool name.
- Requested operation.
- Target resource.
- Security decision.
- Decision reason.
- Approval information.
- Execution result.
- Request timestamps.
- Processing duration.

Do not store API keys, passwords or unnecessary private information in audit logs.

### J. Security Dashboard

The dashboard must include:

- Main security overview.
- Agent management.
- Task Contract management.
- Tool request history.
- ALLOW, BLOCK and REVIEW statistics.
- Pending human approvals.
- Security alerts.
- Audit event details.
- Individual agent activity.

Dashboard information must come from the backend, not fixed or fabricated frontend values.

### K. Simulated Agents and Protected Mock Tools

The initial version must use controlled test agents and fictional data.

Required agents:

- Research Agent.
- Finance Agent.
- Admin Agent.

Required mock tools:

- Public Search.
- Public Document Reader.
- Finance Mock Database.
- Admin Mock Tools.

All protected tool execution must pass through the AEGIS Gateway.

# 7. Functional Requirements

The following requirements are mandatory for the MVP.

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Register and manage agents | Must |
| FR-02 | Authenticate agent requests | Must |
| FR-03 | Create and manage Task Contracts | Must |
| FR-04 | Receive protected tool requests through the gateway | Must |
| FR-05 | Validate and normalize requests | Must |
| FR-06 | Verify tools, operations and resources against contracts | Must |
| FR-07 | Integrate OPA policy evaluation | Must |
| FR-08 | Integrate Gemini contextual analysis | Must |
| FR-09 | Produce ALLOW, BLOCK and REVIEW decisions | Must |
| FR-10 | Prevent execution of blocked requests | Must |
| FR-11 | Execute allowed requests using gateway-held credentials | Must |
| FR-12 | Implement request-specific human approval | Must |
| FR-13 | Store audit events | Must |
| FR-14 | Display actual security data in the dashboard | Must |
| FR-15 | Support three simulated agents | Must |
| FR-16 | Support protected mock tools | Must |
| FR-17 | Provide automated security tests | Must |
| FR-18 | Support real enterprise agent integrations | Later |
| FR-19 | Add advanced anomaly detection | Later |
| FR-20 | Add advanced DLP features | Later |

# 8. Main User Flows

## 8.1 Authorized Request

1. A registered agent sends a tool request.
2. The gateway authenticates the agent.
3. The gateway retrieves the active Task Contract.
4. Request validation is completed.
5. OPA evaluates the applicable security policies.
6. Gemini is used only when additional contextual analysis is required.
7. OPA produces the final policy decision.
8. The gateway receives ALLOW.
9. The gateway executes the approved tool request.
10. The result and audit event are recorded.

## 8.2 Unauthorized Request

1. An agent sends a tool request.
2. AEGIS authenticates the requesting agent.
3. The active Task Contract is retrieved.
4. The requested operation violates the task or security policy.
5. OPA returns a denial decision.
6. The gateway blocks the request.
7. The protected tool is not called.
8. An audit event records the violation.

## 8.3 Request Requiring Approval

1. An agent sends a sensitive request.
2. AEGIS performs the initial checks.
3. OPA determines that approval is required.
4. The gateway places the request in REVIEW.
5. The request appears in the approval dashboard.
6. An authorized reviewer approves or rejects the specific request.
7. If approved, AEGIS revalidates its identity, contract, expiry and policy conditions.
8. Only then may the gateway execute it.
9. The complete approval and execution history is recorded.

# 9. Non-Functional Requirements

## 9.1 Security

- Apply least-privilege principles.
- Authenticate every agent.
- Keep credentials on the server.
- Reject unknown tools and operations.
- Use strict input validation.
- Prevent direct access to protected resources.
- Apply default-deny policies.
- Validate Gemini results.
- Fail safely when security services are unavailable.

## 9.2 Reliability

- One failed component must not silently authorize a protected action.
- OPA errors must not result in automatic approval.
- Missing or expired contracts must be rejected.
- Gemini failures must not bypass explicit restrictions.
- Failed tool execution must be recorded.

## 9.3 Performance

- Minimize unnecessary Gemini API calls.
- Execute deterministic checks before contextual AI analysis.
- Record gateway and model processing times.
- Evaluate latency under repeatable test conditions.
- Do not promise a fixed response time before measurement.

## 9.4 Privacy

- Use fictional data during MVP development.
- Do not expose secrets to agents or the frontend.
- Send only the minimum necessary context to Gemini.
- Avoid storing unnecessary sensitive request content.
- Restrict dashboard and audit access.

## 9.5 Maintainability

- Use separate modules for each responsibility.
- Avoid duplicate security logic.
- Keep policies separate from application code.
- Write automated tests.
- Maintain API and architecture documentation.
- Keep configuration and secrets outside source code.

## 9.6 Usability

- Provide clear decision reasons.
- Use a consistent dashboard.
- Show meaningful request history.
- Make human approvals easy to understand.
- Display service errors without exposing internal secrets.

# 10. Security Rules and Important Behaviour

The following behaviours are mandatory.

1. An agent cannot define its own identity through an untrusted request field.
2. An agent cannot create or alter its own authoritative Task Contract.
3. Agents cannot receive direct credentials for protected tools.
4. Unknown tools must be rejected.
5. Unknown operations must be rejected.
6. Missing, invalid or expired contracts must be rejected.
7. A blocked request must never execute.
8. A REVIEW request must not execute before approval.
9. Approval must apply only to the specific reviewed request.
10. Gemini cannot override OPA policy restrictions.
11. Invalid or unavailable OPA decisions must not result in automatic permission.
12. Gemini output must be treated as untrusted until validated.
13. Arbitrary shell commands, arbitrary SQL and unrestricted tool execution are outside the MVP.
14. Every important security decision must create an audit event.

# 11. MVP Acceptance Criteria

The MVP will be considered functionally complete only when these conditions are verified.

| ID | Acceptance condition |
|---|---|
| AC-01 | Three simulated agents can make authenticated requests. |
| AC-02 | Every agent has a separate active Task Contract. |
| AC-03 | Valid requests can reach approved mock tools. |
| AC-04 | Requests outside the permitted tool or resource scope are blocked. |
| AC-05 | An allowed tool with a forbidden operation is blocked. |
| AC-06 | Expired or invalid contracts cannot authorize requests. |
| AC-07 | OPA decisions are enforced by the gateway. |
| AC-08 | Gemini produces validated advisory outputs when required. |
| AC-09 | Gemini failure cannot automatically authorize an uncertain sensitive request. |
| AC-10 | REVIEW requests remain unexecuted until approved. |
| AC-11 | An approval is limited to its specific request and is revalidated. |
| AC-12 | Blocked requests produce zero calls to the protected mock tool. |
| AC-13 | Direct agent access to protected mock tools is rejected. |
| AC-14 | Audit records show the request and decision reason. |
| AC-15 | Dashboard information matches backend records. |
| AC-16 | Automated tests cover normal, invalid and failure scenarios. |

# 12. Evaluation Metrics

AEGIS must be evaluated using measured results.

Metrics include:

**Unauthorized Request Block Rate**

Percentage of tested unauthorized requests that were blocked.

**Valid Request Approval Rate**

Percentage of valid requests correctly permitted.

**False-Allow Rate**

Percentage of unauthorized requests incorrectly allowed.

**False-Block Rate**

Percentage of valid requests incorrectly blocked.

**Decision Latency**

Time taken to produce a security decision.

Measure both model-assisted and non-model-assisted requests.

**Gateway Bypass Rejection**

Number of direct agent access attempts rejected by the protected tool boundary.

No target accuracy, latency or security percentage should be claimed until it is measured.

# 13. MVP Limitations and Out-of-Scope Features

The initial version will not include:

- Production access to real company databases.
- Access to real customer or financial records.
- Arbitrary shell or code execution.
- Custom machine-learning model training.
- Advanced behavioural anomaly detection.
- Large-scale enterprise integrations.
- Kubernetes deployment.
- Enterprise identity-provider integration.
- Multi-tenant enterprise policy management.
- Guaranteed detection of every prompt injection.

These can be considered for later versions.

# 14. Assumptions and Constraints

- Development begins with a free-first local setup.
- Initial agents will be simulated Python clients.
- Protected tools will be mock services with fictional data.
- The first database can be SQLite.
- OPA will run locally during development.
- Gemini usage will be optional and configurable.
- API keys will be stored in environment variables.
- AI coding agents will assist development, but all generated code must be tested and reviewed.
- Paid hosting and enterprise integrations are not required for the local MVP.

# 15. Future Product Scope

After Version 1 is working reliably, possible enhancements include:

- Agent behaviour monitoring.
- Anomaly detection.
- Data Loss Prevention.
- Model Context Protocol tool integrations.
- Multi-agent communication security.
- Advanced policy management.
- Enterprise identity integration.
- Detailed security reports.
- Scalable hosted deployment.

# 16. Definition of Done

A feature is considered complete only when:

1. Its requirements are understood.
2. Its implementation is complete.
3. Its expected behaviour is documented.
4. Its automated tests pass.
5. Its security conditions are tested.
6. Its error cases are handled.
7. Its integration with other modules is verified.
8. Its documentation is updated.

Generated files or placeholder functions alone do not count as completed features.

# 17. Project Terminology

| Term | Meaning |
|---|---|
| Agent | An AI application that requests tool actions |
| Task Contract | Server-managed record defining an agent's task and permitted scope |
| Gateway | The entry point that controls protected tool requests |
| Intent Verification | Evaluation of task and requested-action alignment |
| OPA | Open Policy Agent, the policy decision engine |
| Gemini | The AI model used for advisory contextual analysis |
| PEP | Policy Enforcement Point |
| PDP | Policy Decision Point |
| ALLOW | Request permitted |
| BLOCK | Request rejected |
| REVIEW | Request paused for human approval |
| Mock Tool | A simulated tool used for safe testing |

# 18. Official Technical References

- Open Policy Agent — Agent Tool Calling: https://www.openpolicyagent.org/docs/agent-tool-calling
- Open Policy Agent — Documentation: https://www.openpolicyagent.org/docs
- Google Gemini API — Models: https://ai.google.dev/gemini-api/docs/models
- Google Gemini API — Structured Outputs: https://ai.google.dev/gemini-api/docs/structured-output
- FastAPI — Documentation: https://fastapi.tiangolo.com/
- React — Documentation: https://react.dev/

---

**END OF PRD.md**