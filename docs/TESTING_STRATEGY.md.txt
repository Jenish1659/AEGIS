# AEGIS — TESTING STRATEGY AND QUALITY ASSURANCE

**Project:** AEGIS  
**Document:** Testing Strategy  
**Version:** 1.0  
**Status:** Initial Testing Specification  
**Backend Testing:** Pytest and HTTPX  
**Policy Testing:** OPA Test  
**Frontend Testing:** Vitest and React Testing Library  
**End-to-End Testing:** Playwright (planned)  
**Last Updated:** 14 November 2026

---

# 1. PURPOSE

This document defines the complete testing strategy for AEGIS.

It explains how the application will be tested during development, how security decisions will be verified and how the team will establish that the completed MVP works correctly.

Testing must cover:

- Backend functionality.
- Agent authentication.
- Task Contract validation.
- Request validation.
- Runtime gateway processing.
- Intent-to-Action verification.
- OPA policies.
- Gemini integration.
- ALLOW, BLOCK and REVIEW decisions.
- Protected tool execution.
- Human approval.
- Audit records.
- Database operations.
- Frontend behaviour.
- End-to-end workflows.
- Security failure handling.
- Performance measurements.

The purpose is not simply to make the application run.

The purpose is to verify that AEGIS behaves correctly under normal, invalid, unauthorized and failure conditions.

# 2. TESTING OBJECTIVES

The main testing objectives are:

1. Verify that every implemented feature behaves as required.
2. Confirm that authenticated agent identity is established correctly.
3. Verify that Task Contracts are enforced.
4. Confirm that protected tool requests pass through the gateway.
5. Verify that forbidden operations are blocked.
6. Confirm that OPA decisions are enforced correctly.
7. Verify that Gemini cannot grant protected permissions.
8. Confirm that REVIEW requests cannot execute before approval.
9. Confirm that approval is bound to the exact request.
10. Verify that audit records are accurate.
11. Detect integration failures.
12. Identify security weaknesses before release.
13. Measure actual system performance.
14. Prevent previously fixed issues from returning.

# 3. TESTING PRINCIPLES

## 3.1 Test Every Important Feature

Every required feature must have a defined test.

Generated code alone does not prove that a feature works.

## 3.2 Security Comes First

AEGIS is a security application.

Tests involving identity, permissions, tool execution and policy decisions must be treated as high priority.

## 3.3 Default Deny Must Be Verified

Unknown, missing, malformed or unauthorized requests must never be automatically allowed.

## 3.4 Test Failure Conditions

Do not test only successful requests.

Test what happens when:

- OPA becomes unavailable.
- Gemini times out.
- Database access fails.
- A Task Contract expires.
- Authentication fails.
- A tool execution fails.
- An approval expires.

## 3.5 Test Using Controlled Data

The initial MVP must use fictional records and mock tools.

Never use real customer, company or financial records for test scenarios.

## 3.6 Repeatable Testing

A test must produce a predictable expected result under the same controlled inputs.

Use saved test fixtures and mocked external services.

## 3.7 Independent Verification

Important security behaviours must be verified through more than the response shown to an agent.

For example, a BLOCK decision must also be verified by checking that the protected tool received zero calls.

# 4. TESTING TECHNOLOGY STACK

| Technology | Responsibility |
|---|---|
| Pytest | Backend unit and integration tests |
| HTTPX | API testing |
| unittest.mock | Mock external services and components |
| OPA Test | Rego policy testing |
| Vitest | Frontend unit and component testing |
| React Testing Library | Frontend behaviour testing |
| Playwright | Browser-based end-to-end testing |
| Ruff | Python code quality checks |
| TypeScript Compiler | Frontend type checking |

Use compatible stable versions of the selected tools.

Do not add multiple tools for the same testing responsibility without a clear reason.

# 5. TESTING LEVELS

AEGIS must use multiple levels of testing.

## 5.1 Unit Testing

Tests individual functions and modules without requiring the complete application.

Examples:

- Credential verification.
- Contract validation.
- Request normalization.
- Permission checking.
- Gemini output validation.
- OPA response parsing.
- Approval expiry.
- Audit event creation.

Goal:

Verify that each individual component behaves correctly.

## 5.2 Integration Testing

Tests communication between connected backend components.

Examples:

- FastAPI and SQLite.
- Backend and OPA.
- Backend and Gemini client using mocks.
- Gateway and Task Contract service.
- Gateway and tool registry.
- Approval service and gateway.
- Audit service and database.

Goal:

Verify that components work correctly together.

## 5.3 Policy Testing

Tests the Rego policies independently.

Examples:

- Allowed operation.
- Forbidden operation.
- Resource restriction.
- Expired contract.
- Human approval requirement.
- Default-deny result.

Goal:

Verify that the policy engine produces the correct result for each input.

## 5.4 End-to-End Testing

Tests complete user and agent workflows.

Examples:

- Agent authenticates and performs an allowed request.
- Agent requests a forbidden operation.
- Sensitive request enters REVIEW.
- Authorized reviewer approves a request.
- Dashboard displays the resulting event.

Goal:

Verify that the complete application works from beginning to end.

## 5.5 Security Testing

Tests whether an attacker or unauthorized agent can bypass the intended protections.

Examples:

- Invalid identity.
- Credential misuse.
- Task Contract manipulation.
- Direct tool access.
- Request parameter manipulation.
- Approval misuse.
- Policy service failure.

Goal:

Verify that security boundaries are enforced.

## 5.6 Performance Testing

Measures:

- Request processing time.
- Policy evaluation time.
- Gemini analysis time.
- Total gateway latency.
- Throughput under controlled test conditions.

Goal:

Understand actual performance instead of claiming unsupported speed or accuracy.

# 6. TEST ENVIRONMENTS

## 6.1 Development Environment

Used for individual feature development.

Includes:

- Local FastAPI application.
- Local SQLite database.
- Local OPA service.
- Simulated agents.
- Protected mock tools.
- React development server.

## 6.2 Automated Test Environment

Used for repeatable testing.

Requirements:

- Separate test database.
- Controlled test records.
- Mocked Gemini responses.
- Controlled OPA test configuration.
- Resettable fixtures.
- No dependency on paid hosting.

## 6.3 Optional External API Test Environment

Used only for manual or explicitly enabled Gemini integration tests.

Requirements:

- Valid Gemini API key.
- Available API quota.
- Fictional test inputs.
- API usage monitoring.
- No sensitive records.

Normal automated tests must not require a live Gemini API call.

## 6.4 Future Production Validation

A deployed version will require separate testing of:

- HTTPS.
- Authentication configuration.
- Production database.
- Secret management.
- Network isolation.
- Backups.
- Monitoring.
- Access control.

A successful local MVP test is not proof of production security.

# 7. TEST DATA AND FIXTURES

The testing system must use controlled data.

## 7.1 Test Agents

Create:

**Research Agent**

Task: Research public cybersecurity information.

**Finance Agent**

Task: Prepare reports from simulated financial records.

**Admin Agent**

Task: Perform approved administration operations on test resources.

## 7.2 Test Resources

Use fictional resources such as:

- public_documents.
- test_records.
- finance_test_records.
- admin_test_resources.

## 7.3 Test Task Contracts

Create contracts for:

- Public research.
- Read-only financial reporting.
- Read-only administration audit.
- Approved administration operations.

## 7.4 Test Fixtures

Fixtures should create:

- Agent records.
- Credentials.
- Task Contracts.
- Registered tools.
- Mock Gemini responses.
- Policy input data.
- Approval records.
- Audit records.

The test database must be reset or isolated between relevant test cases.

Test execution must not modify real project data.

# 8. TESTING DIRECTORY STRUCTURE

Recommended structure:

```text
AEGIS/
│
├── backend/
│   └── tests/
│       ├── conftest.py
│       │
│       ├── unit/
│       │   ├── test_authentication.py
│       │   ├── test_contracts.py
│       │   ├── test_validation.py
│       │   ├── test_intent_verifier.py
│       │   ├── test_gemini_validator.py
│       │   ├── test_opa_client.py
│       │   ├── test_approval.py
│       │   └── test_audit.py
│       │
│       ├── integration/
│       │   ├── test_gateway.py
│       │   ├── test_database.py
│       │   ├── test_opa_integration.py
│       │   ├── test_gemini_integration.py
│       │   ├── test_tool_execution.py
│       │   └── test_approval_flow.py
│       │
│       └── security/
│           ├── test_identity_security.py
│           ├── test_contract_security.py
│           ├── test_gateway_bypass.py
│           ├── test_policy_failures.py
│           ├── test_approval_security.py
│           └── test_idempotency.py
│
├── opa/
│   └── tests/
│       ├── aegis_authz_test.rego
│       └── fixtures/
│
├── frontend/
│   └── src/
│       └── features/
│           └── ...
│
├── frontend/tests/
│   ├── components/
│   └── e2e/
│
└── tests/
    └── fixtures/
        ├── agents.json
        ├── contracts.json
        └── tool_requests.json
```

This is the target testing structure.

Create individual test files when their associated module is implemented.

Do not create empty test files merely to match the folder structure.

# 9. AGENT AUTHENTICATION TESTING

Test the following cases.

| Test ID | Test | Expected Result |
|---|---|---|
| AUTH-01 | Valid agent token | Authentication succeeds |
| AUTH-02 | Invalid token | Rejected |
| AUTH-03 | Missing token | Rejected |
| AUTH-04 | Revoked token | Rejected |
| AUTH-05 | Disabled agent | Rejected |
| AUTH-06 | Unknown agent token | Rejected |
| AUTH-07 | Agent submits another agent ID | Authenticated identity remains the credential owner |
| AUTH-08 | Token appears in application logs | No token exposure |
| AUTH-09 | Credential revoked after previous use | Subsequent request rejected |

The system must never trust an agent identity merely because the request body contains a valid-looking ID.

# 10. TASK CONTRACT TESTING

Test the following cases.

| Test ID | Test | Expected Result |
|---|---|---|
| TC-01 | Valid contract creation | Created |
| TC-02 | Unregistered agent | Rejected |
| TC-03 | Unknown tool in contract | Rejected |
| TC-04 | Unsupported operation | Rejected |
| TC-05 | Missing required field | Rejected |
| TC-06 | Expired contract | Cannot authorize |
| TC-07 | Disabled contract | Cannot authorize |
| TC-08 | Agent changes its contract | Rejected |
| TC-09 | Unauthorized user modifies contract | Rejected |
| TC-10 | Contract update | New version recorded |
| TC-11 | Request references another agent's contract | Rejected |
| TC-12 | Historical contract version | Preserved |

# 11. REQUEST VALIDATION TESTING

Test:

- Missing tool identifier.
- Missing operation.
- Missing resource.
- Invalid JSON.
- Unexpected field values.
- Unsupported tool.
- Unsupported operation.
- Invalid parameter type.
- Excessively large request.
- Invalid resource identifier.
- Invalid request fingerprint.
- Reused idempotency key with changed content.

Expected behaviour:

Malformed and unsupported requests must be rejected before protected tool execution.

# 12. AEGIS GATEWAY TESTING

The gateway is the main security boundary, so it requires extensive testing.

| Test ID | Scenario | Expected Result |
|---|---|---|
| GW-01 | Valid authenticated request | Processing begins |
| GW-02 | Invalid identity | Rejected |
| GW-03 | Missing contract | Blocked |
| GW-04 | Expired contract | Blocked |
| GW-05 | Invalid parameters | Rejected |
| GW-06 | Unknown tool | Blocked |
| GW-07 | Forbidden operation | Blocked |
| GW-08 | Out-of-scope resource | Blocked |
| GW-09 | Valid policy decision | Correct enforcement |
| GW-10 | OPA unavailable | No tool execution |
| GW-11 | Invalid OPA result | No tool execution |
| GW-12 | Duplicate request | No duplicate side effect |

## Gateway Enforcement Verification

For every BLOCK test:

1. Send a protected tool request.
2. Receive the BLOCK result.
3. Inspect the mock tool's execution counter.
4. Confirm that the counter did not increase.
5. Confirm that an audit event exists.

**The response alone is not enough. Verify the actual tool execution count.**

# 13. OPA POLICY TESTING

Use OPA's own Rego testing framework.

Run policy tests independently from FastAPI.

## Required Policy Cases

| Test ID | Input | Expected Policy Decision |
|---|---|---|
| OPA-01 | Valid public search | ALLOW |
| OPA-02 | Invalid agent identity | BLOCK |
| OPA-03 | Disabled agent | BLOCK |
| OPA-04 | Expired contract | BLOCK |
| OPA-05 | Tool not in allowed list | BLOCK |
| OPA-06 | Operation not permitted | BLOCK |
| OPA-07 | Resource outside scope | BLOCK |
| OPA-08 | Explicit restricted operation | BLOCK |
| OPA-09 | Sensitive export without approval | REVIEW |
| OPA-10 | Valid approval for exact request | ALLOW if all other checks pass |
| OPA-11 | Approval for another request | Not allowed |
| OPA-12 | Expired approval | Not allowed |
| OPA-13 | Gemini MISMATCH with no hard violation | REVIEW |
| OPA-14 | Gemini UNCLEAR | REVIEW |
| OPA-15 | Gemini MATCH but hard policy violation | BLOCK |
| OPA-16 | Invalid policy input | BLOCK |
| OPA-17 | No matching allow rule | BLOCK |

## OPA Testing Commands

Policy syntax validation:

```bash
opa check --strict opa/policies
```

Policy tests:

```bash
opa test ./opa -v --fail-on-empty
```

All required policy tests must pass before the OPA module is considered complete.

# 14. INTENT-TO-ACTION VERIFICATION TESTING

This tests the main innovation of AEGIS.

The system must distinguish between:

- Whether an agent can access a tool.
- Whether the requested operation is permitted under its current task.

## Primary Test Scenario

**Agent:** Admin Agent.

**Task:** Read-only audit of test records.

**General Tool Permission:** Access to test database.

**Allowed Operation:** Read.

**Requested Operation:** Delete.

Expected behaviour:

1. Authentication succeeds.
2. Task Contract is active.
3. The database tool is registered.
4. The delete operation violates the read-only contract.
5. OPA returns BLOCK.
6. Gateway rejects the request.
7. Database receives zero delete calls.
8. Audit event records the restriction.

This test is mandatory because it demonstrates task-action verification rather than ordinary tool-level access control.

## Additional Tests

- Allowed action within task.
- Forbidden action within an otherwise allowed tool.
- Allowed tool with restricted resource.
- Ambiguous task description.
- Unrelated resource request.
- Expired task contract.
- Updated contract version.

# 15. GEMINI INTEGRATION TESTING

Gemini must be tested independently and through OPA integration.

## 15.1 Unit Testing

Use mocked model responses.

Required cases:

| Test ID | Test | Expected Result |
|---|---|---|
| GEM-01 | Valid MATCH output | Accepted as advisory |
| GEM-02 | Valid MISMATCH output | Accepted as advisory |
| GEM-03 | Valid UNCLEAR output | Accepted as advisory |
| GEM-04 | Missing task_alignment | Rejected |
| GEM-05 | Invalid alignment value | Rejected |
| GEM-06 | Invalid risk signal | Rejected |
| GEM-07 | Missing reason | Rejected |
| GEM-08 | Excessively long reason | Rejected or limited |
| GEM-09 | Empty response | Invalid output |
| GEM-10 | API timeout | Safe failure |
| GEM-11 | Rate limit | Safe failure |
| GEM-12 | Invalid API key | Configuration or service failure |
| GEM-13 | Model unavailable | Safe failure |
| GEM-14 | Model response says MATCH but OPA hard-denies | BLOCK |

## 15.2 Integration Testing

Verify:

- Backend can create analysis input.
- Only required information is sent.
- Structured output is requested.
- The response is validated.
- OPA receives only validated advisory information.
- Gemini never executes tools.
- Gemini cannot override hard restrictions.

## 15.3 Live API Smoke Tests

Live Gemini testing must be optional.

It may be run when:

- API key is configured.
- Quota is available.
- Test data is fictional.
- API use is explicitly enabled.

Normal automated test suites must use mocks.

Do not consume API quota during every local test run.

# 16. HUMAN APPROVAL TESTING

| Test ID | Scenario | Expected Result |
|---|---|---|
| APR-01 | Eligible request requires approval | REVIEW |
| APR-02 | Request appears in approval queue | Visible |
| APR-03 | Authorized reviewer approves | Recorded |
| APR-04 | Authorized reviewer rejects | Recorded |
| APR-05 | Unauthenticated reviewer approves | Rejected |
| APR-06 | Unauthorized role approves | Rejected |
| APR-07 | Approval expires | Cannot execute |
| APR-08 | Approval belongs to another request | Cannot execute |
| APR-09 | Request changes after approval | Cannot execute |
| APR-10 | Contract changes after approval | Revalidate |
| APR-11 | Agent attempts self-approval | Rejected |
| APR-12 | Hard-deny rule exists | Approval cannot override it |

For a successful approval, verify that all current security conditions are rechecked before tool execution.

# 17. PROTECTED TOOL EXECUTION TESTING

The tool execution system must be independently tested.

## Required Cases

- Registered and approved tool executes.
- Unknown tool does not execute.
- BLOCK request does not execute.
- REVIEW request does not execute.
- Approved and revalidated request executes.
- Invalid tool parameters are rejected.
- Tool execution failure is recorded.
- Duplicate request does not repeat a side effect.
- Tool adapter returns a safe result.
- Sensitive tool output is not unnecessarily exposed.

## Execution Verification

Each mock tool should have test instrumentation.

Examples:

- Number of calls.
- Number of successful calls.
- Number of failed calls.
- Number of delete operations.
- Number of export operations.

A blocked request must not increment the corresponding execution counter.

### Gateway Bypass Test

Agents must not have a direct route or credentials for the protected mock tool.

If mock tools are implemented as separate local services, test that direct agent requests are rejected and that only the gateway's authorized execution path can call them.

If the MVP uses in-process adapters, document that process-level isolation is not yet provided. Do not claim stronger isolation than the deployment actually enforces.

# 18. DATABASE TESTING

Test:

- Table creation.
- Primary keys.
- Foreign keys.
- Unique constraints.
- Required fields.
- Relationships.
- Contract version preservation.
- Request history.
- Decision history.
- Approval records.
- Execution records.
- Audit records.
- Database migrations.
- Transaction handling.

Also test:

- Database unavailable.
- Invalid relationship.
- Duplicate records.
- Failed transaction.
- Migration rollback where supported.

Sensitive credentials must not appear in database test outputs.

# 19. AUDIT TESTING

Every important security operation must create the expected audit event.

Required events include:

- Agent registered.
- Credential revoked.
- Contract created.
- Contract updated.
- Request received.
- Identity verified.
- Contract validated.
- Policy evaluated.
- Request blocked.
- Approval requested.
- Request approved.
- Request rejected.
- Tool execution completed.
- Tool execution failed.

Tests must verify:

1. Event creation.
2. Correct request ID.
3. Correct agent ID.
4. Correct event type.
5. Correct timestamp.
6. Related decision details.
7. No exposed secrets.
8. Restricted event modification.

A failed tool execution must not appear as a successful execution.

# 20. FRONTEND TESTING

Frontend tests must verify application behaviour, not security authority.

Use Vitest and React Testing Library for component and UI tests.

Use Playwright for browser-level workflows where required.

## Dashboard Tests

- Dashboard loads.
- Summary values match backend responses.
- Empty state works.
- Loading state works.
- Error state works.
- Activity data displays correctly.

## Agent Management Tests

- Agent list loads.
- Agent details load.
- Registration form validates.
- Status changes use backend APIs.
- Unauthorized actions are rejected.

## Task Contract Tests

- Contract list loads.
- Create form validates.
- Supported tools appear correctly.
- Contract details display.
- Invalid inputs are handled.

## Request Monitoring Tests

- Request history loads.
- Filters work.
- Decision labels are correct.
- Request details are displayed.
- Execution results match backend data.

## Approval Tests

- Pending requests appear.
- Authorized reviewer controls appear.
- Approve and reject actions are submitted correctly.
- Updated status is displayed.

## Audit Tests

- Audit events load.
- Filters work.
- Detail page displays correct information.
- Restricted actions are unavailable.

## Theme and Responsive Tests

- Dark mode works.
- Light mode works.
- Theme preference persists.
- Mobile navigation works.
- Tables remain usable.
- No major horizontal page overflow.
- Keyboard navigation works.
- Focus states remain visible.

A frontend-only test cannot prove that a protected action is authorized. That must be verified through backend tests.

# 21. END-TO-END TEST SCENARIOS

These scenarios must work across all connected components.

## Scenario A — Authorized Research Request

Agent:

Research Agent.

Task:

Gather public cybersecurity information.

Request:

Public web search.

Expected flow:

1. Agent authenticates.
2. Task Contract is retrieved.
3. Request is validated.
4. Required security checks run.
5. OPA returns ALLOW.
6. Gateway executes the mock search tool.
7. Result is returned to the agent.
8. Audit event is recorded.
9. Dashboard shows the allowed request.

Expected outcome: ALLOW and successful execution.

## Scenario B — Task-Action Violation

Agent:

Admin Agent.

Task:

Read-only audit of test records.

Request:

Delete a test record.

Expected flow:

1. Agent authenticates.
2. Active contract is retrieved.
3. Database tool is registered.
4. Delete operation violates task restrictions.
5. OPA returns BLOCK.
6. Gateway rejects the request.
7. Mock database receives zero delete calls.
8. Audit event is created.
9. Dashboard displays the blocked request.

Expected outcome: BLOCK and no execution.

## Scenario C — Cross-Agent Resource Attempt

Agent:

Research Agent.

Task:

Public research.

Request:

Read simulated finance records.

Expected flow:

1. Identity is verified.
2. Task Contract is loaded.
3. Resource is outside permitted scope.
4. OPA returns BLOCK.
5. Gateway rejects the request.
6. Finance mock tool receives zero calls.
7. Event is recorded.

Expected outcome: BLOCK and no execution.

## Scenario D — Human Approval

Agent:

Finance Agent.

Task:

Prepare a quarterly revenue report.

Request:

Bulk export that requires approval.

Expected flow:

1. Request is authenticated.
2. Task Contract is checked.
3. Approval requirement is identified.
4. OPA returns REVIEW.
5. Request is stored in pending state.
6. Reviewer inspects the request.
7. Reviewer approves or rejects.
8. Approval is bound to the exact request.
9. Security conditions are revalidated.
10. Approved request executes.
11. Audit events are recorded.

Expected outcome: REVIEW followed by either APPROVED and EXECUTED or REJECTED without execution.

## Scenario E — Gemini Failure

Agent:

Research Agent.

Task:

A request needs contextual analysis.

Failure:

Gemini times out.

Expected:

- The failed analysis is recorded.
- AEGIS does not treat the failed call as MATCH.
- The request is sent for review or blocked.
- A protected action is not automatically executed.

## Scenario F — OPA Failure

Failure:

OPA service becomes unavailable.

Expected:

- Gateway does not receive a valid decision.
- Protected tool is not called.
- Safe service error is returned.
- Failure event is recorded where possible.

# 22. SECURITY FAILURE AND BYPASS TESTING

The following areas require specific attention.

## 22.1 Identity Spoofing

Attempt to submit a different agent ID in a request body.

Expected: The authenticated credential determines identity.

## 22.2 Credential Revocation

Revoke a previously valid credential and repeat a request.

Expected: The request is rejected.

## 22.3 Contract Manipulation

Attempt to submit different permissions from the active contract.

Expected: The backend uses the authoritative stored contract.

## 22.4 Direct Tool Access

Attempt to reach a protected mock tool outside the gateway path.

Expected: Direct access is rejected under the implemented isolation model.

## 22.5 Approval Reuse

Attempt to apply an approval to changed request parameters.

Expected: Request fingerprint mismatch prevents execution.

## 22.6 Fail-Open Behaviour

Make OPA unavailable or return invalid policy data.

Expected: No protected tool execution.

## 22.7 Gemini Override

Return MATCH from Gemini for a request that violates a hard restriction.

Expected: OPA and the gateway still block it.

## 22.8 Invalid Request Parameters

Send values outside the registered tool schema.

Expected: Request validation rejects the operation before execution.

# 23. PERFORMANCE TESTING

Performance must be measured using controlled local scenarios.

Do not claim fixed latency before measurements are available.

## 23.1 Metrics

**Gateway Processing Time**

Time from gateway request acceptance to the final security decision.

**OPA Evaluation Time**

Time taken to evaluate the policy.

**Gemini Analysis Time**

Time taken to complete the model request.

**Total Decision Latency**

Total time from request receipt to final ALLOW, BLOCK or REVIEW decision.

**Execution Time**

Time taken by the approved mock tool to complete its operation.

**Throughput**

Number of requests processed within a defined period under a controlled test load.

## 23.2 Performance Comparison

Measure at least two paths:

**Deterministic Path**

Authentication, contract checks, OPA evaluation and decision.

**Gemini-Assisted Path**

Authentication, contract checks, Gemini analysis, OPA evaluation and decision.

Record:

- Median latency (P50).
- 95th percentile latency (P95).
- Minimum and maximum where useful.
- Number of completed requests.
- Number of failures.

## 23.3 Performance Test Rules

- Use repeatable test data.
- Record hardware and software environment.
- Record the number of requests.
- Record Gemini configuration.
- Separate cold-start measurements from normal operation.
- Do not use invented benchmark figures.
- Do not compare different test environments as if they were identical.

# 24. SECURITY EVALUATION METRICS

These metrics evaluate the behaviour of the prototype.

## Unauthorized Request Block Rate

```text
Blocked unauthorized requests
-------------------------------- × 100
Total unauthorized test requests
```

## False-Allow Rate

```text
Unauthorized requests incorrectly allowed
------------------------------------------ × 100
Total unauthorized test requests
```

## Valid Request Approval Rate

```text
Valid requests correctly allowed
--------------------------------- × 100
Total valid test requests
```

## False-Block Rate

```text
Valid requests incorrectly blocked
---------------------------------- × 100
Total valid test requests
```

## Policy Decision Accuracy

```text
Correct policy decisions
------------------------ × 100
Total evaluated test requests
```

## Gateway Bypass Rejection

```text
Rejected unauthorized bypass attempts
-------------------------------------- × 100
Total attempted unauthorized bypasses
```

These results must be calculated from actual test records.

A small controlled test set must not be presented as proof of universal security effectiveness.

# 25. REGRESSION TESTING

Whenever code changes, run relevant regression tests.

High-priority regression areas:

- Agent authentication.
- Task Contract enforcement.
- Read-only operation restrictions.
- Resource restrictions.
- Gateway enforcement.
- OPA failure.
- Gemini failure.
- Approval revalidation.
- Tool execution.
- Audit recording.

A fix for one feature must not silently weaken another security requirement.

# 26. BUG AND ISSUE MANAGEMENT

Every discovered issue must be recorded.

## Severity Levels

**CRITICAL**

Potential unauthorized protected execution, major credential exposure or security boundary bypass.

**HIGH**

Major security or application failure that affects core AEGIS behaviour.

**MEDIUM**

Important incorrect behaviour, missing validation or integration issue.

**LOW**

Minor display issue, non-critical usability issue or small improvement.

## Issue Record Format

- Issue ID.
- Description.
- Severity.
- Related component.
- Reproduction steps.
- Expected behaviour.
- Actual behaviour.
- Fix status.
- Regression test.

Critical and high-severity issues must be addressed before release.

# 27. TEST EXECUTION COMMANDS

Suggested commands:

## Backend Tests

```bash
pytest backend/tests -v
```

## Backend Tests with Coverage

```bash
pytest backend/tests --cov=app --cov-report=term-missing
```

## OPA Policy Tests

```bash
opa test ./opa -v --fail-on-empty
```

## OPA Syntax Check

```bash
opa check --strict opa/policies
```

## Python Linting

```bash
ruff check backend
```

## Python Formatting Check

```bash
ruff format --check backend
```

## Frontend Type Checking

```bash
npm run typecheck
```

## Frontend Unit Tests

```bash
npm run test
```

## Frontend Build

```bash
npm run build
```

The actual script names must match the commands configured in the frontend package file.

Playwright end-to-end commands should be documented after its test configuration is implemented.

# 28. TEST REPORT FORMAT

After every important testing run, record:

**Test Run ID:**

**Date:**

**Current Development Phase:**

**Test Environment:**

**Components Tested:**

**Test Command:**

**Total Tests:**

**Passed:**

**Failed:**

**Skipped:**

**Blocked:**

**Critical Issues:**

**High-Severity Issues:**

**Known Limitations:**

**Final Test Status:**

Possible final statuses:

- PASSED.
- FAILED.
- PARTIALLY PASSED.
- BLOCKED.
- NOT RUN.

Never report a test as PASSED if it was not executed.

# 29. TEST COMPLETION CRITERIA

A feature can be marked as tested only when:

1. Its expected behaviour is documented.
2. Relevant test cases exist.
3. Tests have actually been executed.
4. All required cases pass.
5. Failure behaviour is tested.
6. Security restrictions are verified.
7. Test results are recorded.
8. Known issues are documented.

## Critical Security Completion Criteria

Before the MVP release:

- Blocked requests must produce zero protected tool calls.
- REVIEW requests must not execute before approval.
- Hard-deny policies must not be overridden.
- OPA failure must not authorize protected actions.
- Agent credentials must not be exposed.
- Direct bypass must be rejected according to the implemented isolation model.
- Approval must be request-specific and revalidated.

# 30. MVP RELEASE TEST GATE

The AEGIS MVP must pass the following release checks.

| Area | Release Requirement |
|---|---|
| Authentication | Required tests passed |
| Task Contracts | Required tests passed |
| Gateway | Required tests passed |
| OPA | All required policy tests passed |
| Gemini | Validation and failure tests passed |
| Tool Execution | BLOCK and REVIEW prevent premature execution |
| Human Approval | Authorized approval and rejection work |
| Audit | Important events are traceable |
| Database | Relationships and migrations work |
| Dashboard | Actual backend data is displayed |
| Integration | All required demo scenarios work |
| Security | No known unresolved critical or high-severity issue remains |

A failure in a mandatory security gate prevents the MVP from being declared release-ready.

# 31. TEST AUTOMATION AND FUTURE CI

After local testing is stable, configure automated checks using GitHub Actions or another suitable CI system.

Possible automated pipeline:

1. Install backend dependencies.
2. Run Ruff.
3. Run Python unit tests.
4. Run backend integration tests.
5. Run OPA syntax checks.
6. Run OPA policy tests.
7. Install frontend dependencies.
8. Run TypeScript checks.
9. Run frontend tests.
10. Build the frontend.

Live Gemini API tests must remain opt-in so that ordinary CI runs do not depend on an external API quota.

CI must use safe test secrets and fictional test data.

# 32. TESTING LIMITATIONS

Passing the MVP test suite does not prove that AEGIS is completely secure.

Testing is limited by:

- The quality of the test cases.
- The number of tested scenarios.
- The correctness of Task Contracts.
- The correctness of policy rules.
- The implementation of protected tool isolation.
- External model behaviour.
- The local test environment.
- The coverage of failure conditions.

Future production deployment requires broader security testing and independent review.

# 33. FUTURE TESTING ENHANCEMENTS

After the MVP:

- Property-based testing.
- More extensive fuzz testing.
- Longer-duration reliability testing.
- Larger test datasets.
- More advanced model evaluation.
- Additional adversarial input evaluations.
- Dependency and vulnerability scanning.
- Independent security assessment.
- Hosted environment testing.
- Recovery and backup testing.

These are future improvements and not blockers for the initial local prototype.

# 34. OFFICIAL TESTING REFERENCES

- Pytest: https://docs.pytest.org/
- HTTPX: https://www.python-httpx.org/
- Open Policy Agent Policy Testing: https://www.openpolicyagent.org/docs/policy-testing
- Open Policy Agent Policy Language: https://www.openpolicyagent.org/docs/policy-language
- Vitest: https://vitest.dev/
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- Playwright: https://playwright.dev/docs/intro
- Ruff: https://docs.astral.sh/ruff/

---

**END OF TESTING_STRATEGY.md**