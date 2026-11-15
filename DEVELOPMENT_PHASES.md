# AEGIS — DEVELOPMENT PHASES

**Project:** AEGIS  
**Document:** Development Roadmap and Implementation Plan  
**Version:** 1.0  
**Status:** Initial Development Plan  
**Development Approach:** AI-Assisted, Modular and Test-Driven Development  
**Target:** Free Local MVP First

---

# 1. PURPOSE

This document divides AEGIS development into clear implementation phases.

Each phase defines:

- Objective.
- Features to implement.
- Development tasks.
- Expected files and outputs.
- Dependencies.
- Testing requirements.
- Completion conditions.

The AI coding agent must follow these phases in order.

A new phase must not be considered complete simply because its files have been generated.

Every phase must pass its defined completion conditions before the project moves forward.

# 2. DEVELOPMENT APPROACH

AEGIS will be built using an incremental development approach.

The project will progress from a basic development environment to a complete local security application.

The main development order is:

**Documentation → Environment → Data and Identity → Task Contracts → Mock Agents and Tools → Gateway → OPA → Gemini → Approval and Audit → Dashboard → Security Testing → Release**

The backend security engine must be developed before the frontend dashboard.

# 3. PHASE OVERVIEW

| Phase | Name | Main Outcome |
|---|---|---|
| 0 | Documentation and Readiness | Approved development blueprint |
| 1 | Repository and Environment Setup | Working local development environment |
| 2 | Database and Data Models | Database foundation |
| 3 | Agent Identity and Task Contracts | Controlled agent permissions |
| 4 | Agents and Mock Tool System | Simulated agents and protected tools |
| 5 | Runtime Security Gateway | Central request-processing system |
| 6 | OPA Policy Engine | Independent security enforcement rules |
| 7 | Intent Verification and Gemini | Context-aware task-action analysis |
| 8 | Approval and Audit System | Human review and security records |
| 9 | React Security Dashboard | Complete administration interface |
| 10 | Integration and Security Testing | Verified end-to-end MVP |
| 11 | Finalization and Deployment Preparation | Release-ready local MVP |

---

# PHASE 0 — DOCUMENTATION AND PROJECT READINESS

## Objective

Prepare the complete project blueprint before source-code development begins.

## Tasks

1. Read PRD.md.
2. Read ARCHITECTURE.md.
3. Read AGENT_RULES.md.
4. Read DEVELOPMENT_PHASES.md.
5. Check for contradictions between documents.
6. Confirm the initial MVP scope.
7. Confirm the approved technology stack.
8. Confirm the target folder structure.
9. Define the initial development configuration.
10. Prepare a clear implementation plan.

## Expected Deliverables

- Approved documentation.
- Confirmed architecture.
- Final MVP feature list.
- Development checklist.
- Initial repository plan.

## AI Agent Instructions

The AI agent must review the documentation and identify missing or conflicting requirements.

It must not generate application source code during this phase.

## Completion Conditions

- All four initial documents are available.
- No major requirement conflicts remain.
- The technology stack is approved.
- The implementation order is understood.
- The development environment requirements are listed.

**Completion Gate:** Human approval is required before starting implementation.

---

# PHASE 1 — REPOSITORY AND DEVELOPMENT ENVIRONMENT

## Objective

Create a clean local development environment for the complete AEGIS application.

## Tasks

### 1. Repository Setup

- Initialize Git.
- Create the GitHub repository.
- Configure the root folder.
- Add README.md.
- Add .gitignore.
- Add .env.example.
- Keep real environment files outside version control.

### 2. Backend Setup

- Install the selected Python version.
- Create the backend project.
- Configure FastAPI.
- Configure Pydantic.
- Configure SQLAlchemy.
- Set up Pytest.
- Set up Ruff.
- Configure application settings.

### 3. Frontend Setup

- Set up React.
- Configure TypeScript.
- Configure Vite.
- Configure Tailwind CSS.
- Configure React Router.
- Configure the frontend project structure.

### 4. Policy Engine Setup

- Install or obtain the OPA executable.
- Start OPA locally.
- Verify its API is reachable.
- Prepare a basic Rego policy test.

### 5. Database Setup

- Configure SQLite.
- Establish the database connection.
- Configure SQLAlchemy.
- Prepare Alembic.

### 6. Environment Validation

Confirm that:

- Backend starts.
- Frontend starts.
- OPA starts.
- Database connection works.
- Environment configuration loads properly.

## Expected Deliverables

- Working backend application.
- Working frontend application.
- Local OPA service.
- SQLite connection.
- Git repository.
- Environment configuration.
- Basic health endpoints.

## Testing Requirements

- Backend startup test.
- Frontend startup test.
- Database connection test.
- OPA health test.
- Configuration loading test.

## Completion Conditions

All development services must start locally without errors.

The backend must respond to its health endpoint.

The frontend must open successfully.

OPA must accept a basic policy query.

No real API key should be required to run the initial application shell.

---

# PHASE 2 — DATABASE AND DATA MODELS

## Objective

Build the database foundation and define how the main AEGIS data will be stored.

## Tasks

### 1. Database Structure

Create models for:

- Agents.
- Agent credentials.
- Task Contracts.
- Registered tools.
- Tool requests.
- Security decisions.
- Approval requests.
- Audit events.
- Dashboard users or administrators.

### 2. Relationships

Define appropriate relationships between:

- Agent and credentials.
- Agent and Task Contracts.
- Task Contract and tool permissions.
- Tool request and agent.
- Tool request and contract version.
- Tool request and security decision.
- Tool request and approval record.
- Tool request and audit events.

### 3. Database Migrations

- Configure Alembic.
- Create the first migration.
- Apply migrations.
- Test migration consistency.
- Prepare future schema updates.

### 4. Validation

- Define primary keys.
- Define foreign keys.
- Define unique constraints.
- Define required fields.
- Define timestamps.
- Define indexes for commonly searched records.

## Expected Deliverables

- Database connection layer.
- SQLAlchemy models.
- Repository layer.
- Initial database migration.
- Database documentation.
- Database tests.

## Testing Requirements

- Create records.
- Retrieve records.
- Update allowed records.
- Check database relationships.
- Reject invalid records.
- Verify migrations.

## Completion Conditions

All required MVP entities must be stored and retrieved correctly.

Database operations must use the backend.

Agents and frontend components must not connect directly to the protected database.

---

# PHASE 3 — AGENT IDENTITY AND TASK CONTRACT MANAGEMENT

## Objective

Create the identity and permission foundation of AEGIS.

## Tasks

### 1. Agent Registration

Implement:

- Agent creation.
- Unique agent ID generation.
- Agent name.
- Agent type.
- Agent status.
- Agent authentication.

### 2. Credential Management

- Generate unique random credentials.
- Store credential digests securely.
- Authenticate incoming agent requests.
- Support credential revocation.
- Support disabling agents.
- Prevent credential exposure.

### 3. Task Contract Management

Implement contract creation and retrieval.

Each contract must support:

- Contract ID.
- Agent ID.
- Contract version.
- Task description.
- Allowed tools.
- Allowed operations.
- Allowed resources.
- Restrictions.
- Expiry.
- Status.

### 4. Contract Authorization

- Only authorized administrators can create or update contracts.
- Agents cannot change their own contracts.
- The contract must belong to the authenticated agent.
- Expired contracts cannot authorize requests.
- Contract changes must create an updated version.

### 5. Initial Agent Records

Create the following test agents:

**Research Agent**

Task: Public cybersecurity research.

**Finance Agent**

Task: Financial reporting using simulated records.

**Admin Agent**

Task: Approved test administration.

## Expected Deliverables

- Agent management service.
- Authentication service.
- Task Contract service.
- Agent API endpoints.
- Contract API endpoints.
- Database integration.
- Unit tests.

## Testing Requirements

- Valid agent authentication.
- Invalid credential rejection.
- Disabled agent rejection.
- Contract creation.
- Contract retrieval.
- Expired contract rejection.
- Unauthorized contract modification rejection.

## Completion Conditions

The system must correctly identify an authenticated agent and retrieve its authoritative Task Contract.

No request must be authorized solely because it provides an agent name or ID.

---

# PHASE 4 — SIMULATED AGENTS AND PROTECTED MOCK TOOLS

## Objective

Create the agents and controlled tools required to demonstrate AEGIS.

## Tasks

### 1. Agent Simulation

Create three Python agent clients:

- Research Agent.
- Finance Agent.
- Admin Agent.

Each client must:

- Have its own registered identity.
- Use its assigned Task Contract.
- Generate structured tool requests.
- Send requests to the AEGIS Gateway.
- Receive and display decisions.
- Handle blocked and failed requests.

### 2. Tool Registry

Create a central registry of approved mock tools.

The registry must define:

- Tool identifier.
- Tool description.
- Supported operations.
- Accepted parameters.
- Allowed resource types.
- Tool adapter.

### 3. Mock Tools

Implement controlled mock tools.

**Public Search**

Returns fictional public research results.

**Public Document Reader**

Reads controlled test documents.

**Finance Mock Database**

Contains fictional financial records.

**Admin Mock Tools**

Support approved test administration operations.

### 4. Tool Execution Protection

- Agents must not execute tools directly.
- Agents must not receive tool credentials.
- Only registered tool adapters may execute.
- Protected tool adapters must remain behind the gateway.
- Unknown tools must be rejected.

### 5. Test Scenario Preparation

Create controlled scenario inputs for:

- Valid requests.
- Unauthorized resource access.
- Forbidden operations.
- Ambiguous operations.
- Malicious instructions inside test documents.

## Expected Deliverables

- Three agent clients.
- Tool registry.
- Mock tool adapters.
- Scenario runner.
- Fictional test data.
- Agent integration tests.

## Testing Requirements

Confirm that the agents can generate requests and that the mock tools work independently.

Confirm that mock tools are not directly exposed to agent clients.

## Completion Conditions

All three simulated agents must be capable of sending structured requests through the planned gateway interface.

The mock tools must support safe and repeatable test scenarios.

---

# PHASE 5 — AEGIS RUNTIME SECURITY GATEWAY

## Objective

Build the central security gateway and request-processing pipeline.

This is the most important implementation phase.

## Tasks

### 1. Gateway API

Create the protected tool-request endpoint.

Proposed route:

`POST /api/v1/tool-requests`

### 2. Authentication

- Authenticate the agent.
- Retrieve the verified agent identity.
- Reject invalid credentials.
- Reject disabled agents.

### 3. Request Validation

Validate:

- Tool identifier.
- Operation.
- Resource.
- Parameters.
- Request structure.
- Supported operation types.

### 4. Request Normalization

Normalize request fields into a consistent internal structure.

### 5. Task Contract Retrieval

- Retrieve the active contract.
- Validate ownership.
- Verify status.
- Verify expiry.
- Retrieve permitted tools.
- Retrieve permitted operations.
- Retrieve permitted resources.

### 6. Preliminary Restrictions

Reject clear violations before unnecessary external AI calls.

Examples:

- Invalid identity.
- Missing contract.
- Expired contract.
- Forbidden tool.
- Forbidden operation.
- Out-of-scope resource.

### 7. Request Tracking

Generate and maintain:

- Request ID.
- Agent ID.
- Contract ID.
- Request timestamp.
- Processing status.

### 8. Decision Coordination

Coordinate the next stages:

- Contextual analysis when required.
- OPA policy evaluation.
- Final decision.
- Tool execution.
- Audit recording.

## Expected Deliverables

- FastAPI gateway.
- Request validation.
- Authentication integration.
- Contract integration.
- Request ID system.
- Structured gateway responses.
- Gateway tests.

## Testing Requirements

Test valid, invalid, expired and out-of-scope requests.

Confirm that no tool is executed during the preliminary validation stage.

## Completion Conditions

All protected tool requests must enter through the gateway.

The gateway must authenticate the agent, validate the request and retrieve the correct Task Contract.

It must be possible to test the gateway without Gemini or the frontend.

---

# PHASE 6 — OPEN POLICY AGENT INTEGRATION

## Objective

Implement independent security policy evaluation using OPA and Rego.

## Tasks

### 1. OPA Client

Create backend communication with the local OPA service.

### 2. Policy Input

Prepare structured input containing:

- Verified agent identity.
- Agent status.
- Task Contract.
- Contract status.
- Requested tool.
- Requested operation.
- Target resource.
- Relevant validated contextual signals.
- Approval information when required.

### 3. Rego Policy Development

Create policies for:

- Agent access.
- Tool restrictions.
- Operation restrictions.
- Resource restrictions.
- Contract expiry.
- Human approval requirements.
- Default-deny behaviour.

### 4. Decision Handling

OPA must provide a valid structured decision.

Supported values:

- ALLOW.
- BLOCK.
- REVIEW.

### 5. Failure Handling

- OPA unavailable: Do not execute.
- Invalid decision: Do not execute.
- Missing policy result: Do not execute.
- Unknown policy input: Do not automatically allow.

### 6. Policy Testing

Write tests for every major policy.

## Expected Deliverables

- OPA client.
- Rego policy files.
- Policy response validation.
- Policy test suite.
- Gateway integration.

## Testing Requirements

At minimum, test:

1. Valid public search.
2. Forbidden finance access.
3. Allowed database with forbidden delete operation.
4. Expired contract.
5. Unknown tool.
6. Missing resource permission.
7. Sensitive operation requiring REVIEW.
8. OPA failure.

## Completion Conditions

OPA must produce the expected decisions for all defined policy scenarios.

The gateway must correctly enforce those decisions.

A blocked request must result in zero calls to its protected mock tool.

---

# PHASE 7 — INTENT VERIFICATION AND GEMINI INTEGRATION

## Objective

Add contextual task-action analysis to support the core AEGIS innovation.

## Part A — Deterministic Intent Verification

### Tasks

- Compare assigned task with requested operation.
- Check permitted tools.
- Check resource scope.
- Check action type.
- Check known task restrictions.
- Identify requests that require deeper analysis.

Create a structured verification result.

Possible alignment values:

- MATCH.
- MISMATCH.
- UNCLEAR.

Deterministic restrictions must take priority over AI recommendations.

## Part B — Gemini Integration

### Tasks

1. Configure Gemini API.
2. Configure model ID through environment settings.
3. Build the Gemini client.
4. Prepare controlled analysis prompts.
5. Send minimum required task and request context.
6. Request structured output.
7. Validate output using Pydantic.
8. Handle invalid responses.
9. Handle timeouts and quota limits.
10. Record model processing duration.

### Gemini Output

The advisory response should include:

- Task alignment.
- Risk signals.
- Reason.
- Whether further review is suggested.

### Integration Logic

Gemini is used only when additional contextual analysis is required.

Its output is included as an advisory signal in the final OPA evaluation.

Gemini must never grant permissions.

## Part C — Safe Failure Behaviour

- If Gemini is unavailable and its analysis is not required, continue with independent policy evaluation.
- If contextual analysis is required but unavailable, return REVIEW or BLOCK.
- Invalid output must never authorize an operation.
- Hard policy restrictions must never be overridden.

## Expected Deliverables

- Intent verification service.
- Gemini API client.
- Prompt and output schemas.
- Model response validation.
- OPA integration.
- Gemini failure tests.

## Testing Requirements

Test valid task alignment, clear mismatches, ambiguous requests, invalid JSON, missing model output, API timeouts and quota errors.

Use mocked Gemini responses for repeatable automated tests.

## Completion Conditions

Gemini must return validated advisory information when requested.

OPA must remain the final policy decision engine.

The application must continue enforcing deterministic restrictions if Gemini is unavailable.

---

# PHASE 8 — HUMAN APPROVAL AND AUDIT SYSTEM

## Objective

Implement controlled human review and a useful record of security activity.

## Part A — Human Approval

### Tasks

- Create approval requests for REVIEW decisions.
- Show requested tool and operation.
- Show agent and Task Contract information.
- Show the reason for review.
- Authenticate reviewers.
- Support approve and reject actions.
- Add approval expiry.
- Bind approval to the exact request.
- Revalidate contract and policies before execution.

### Approval Rules

- Agents cannot approve their own requests.
- Unauthenticated users cannot approve.
- Expired approvals cannot execute.
- Modified requests cannot reuse existing approvals.
- Hard-deny policy restrictions cannot be bypassed by approval.

## Part B — Audit System

### Tasks

Record:

- Request ID.
- Agent identity.
- Contract ID and version.
- Tool and operation.
- Resource.
- Security decision.
- Reason.
- Gemini analysis status, when relevant.
- OPA decision.
- Reviewer information.
- Execution result.
- Timestamp.
- Processing duration.

### Audit Rules

- Do not store secrets.
- Avoid unnecessary sensitive data.
- Restrict modification through application access controls.
- Link related events using the request ID.
- Keep clear distinctions between rejected, approved and executed requests.

## Expected Deliverables

- Approval service.
- Approval APIs.
- Audit service.
- Audit database models.
- Request history.
- Approval tests.

## Testing Requirements

Test:

- Approval request creation.
- Authorized approval.
- Unauthorized approval rejection.
- Expired approval.
- Modified request rejection.
- Revalidation after approval.
- Audit event creation.
- Audit failure handling.

## Completion Conditions

A REVIEW request must remain unexecuted until approved.

After approval, the request must be revalidated before tool execution.

Every important decision must be traceable through its audit events.

---

# PHASE 9 — REACT SECURITY DASHBOARD

## Objective

Build the complete user interface for monitoring and administering AEGIS.

The frontend must be built after the main backend security flow works.

## Tasks

### 1. Application Shell

- Application layout.
- Sidebar navigation.
- Header.
- Main dashboard area.
- Responsive layout.
- Error and loading handling.

### 2. Dashboard Overview

Display:

- Total requests.
- Allowed requests.
- Blocked requests.
- Pending reviews.
- Recent security events.
- Agent activity.

All data must come from backend APIs.

### 3. Agent Management

- List registered agents.
- View agent details.
- View agent status.
- View assigned Task Contracts.
- Enable and disable agents where authorized.

### 4. Task Contract Management

- View contracts.
- Create contracts.
- Update contracts.
- View permissions.
- View restrictions.
- View contract history and expiry.

### 5. Request Monitoring

- List incoming requests.
- View request details.
- View tool and operation.
- View security decisions.
- View rejection reasons.
- View execution results.

### 6. Human Approval Interface

- Show pending requests.
- Display review reasons.
- Approve authorized requests.
- Reject requests.
- View approval history.

### 7. Audit Dashboard

- Display audit events.
- Filter by agent.
- Filter by decision.
- Filter by time.
- View complete request history.

### 8. API Integration

Connect all frontend screens to documented backend endpoints.

### 9. Access Control

Protect administrative features through backend authentication and authorization.

## Expected Deliverables

- Complete React application.
- Responsive dashboard.
- Agent management screens.
- Task Contract screens.
- Request monitoring.
- Approval interface.
- Audit interface.
- API integration.

## Testing Requirements

- Navigation tests.
- Component tests.
- API integration tests.
- Authentication behaviour.
- Loading and error states.
- Responsive layout checks.
- Permission checks for administrative operations.

## Completion Conditions

The dashboard must display actual backend data.

Every administrative action must be validated and authorized by the backend.

No security decision may depend on a frontend-only condition.

---

# PHASE 10 — COMPLETE INTEGRATION AND SECURITY TESTING

## Objective

Connect all AEGIS modules and test the complete end-to-end system.

## Part A — System Integration

Connect:

- Three simulated agents.
- Agent authentication.
- Task Contract service.
- Gateway.
- Request validator.
- Intent verification.
- Gemini.
- OPA.
- Decision engine.
- Tool registry.
- Mock tools.
- Approval system.
- Audit service.
- React dashboard.

## Part B — Required Demonstration Scenarios

### Scenario A — Authorized Request

**Agent:** Research Agent

**Task:** Collect public cybersecurity information.

**Request:** Public web search.

Expected:

- Identity verified.
- Contract validated.
- Tool and operation permitted.
- OPA returns ALLOW.
- Gateway executes mock search.
- Audit event is stored.

### Scenario B — Task-Action Violation

**Agent:** Admin Agent

**Task:** Read-only audit of test records.

**Request:** Delete a test record.

Expected:

- Identity valid.
- Database tool generally available.
- Task permits read only.
- Delete operation violates the contract.
- OPA returns BLOCK.
- Gateway does not call the mock database.
- Audit event records the reason.

This is the primary demonstration of Intent-to-Action Security Verification.

### Scenario C — Cross-Agent Resource Attempt

**Agent:** Research Agent

**Task:** Public cybersecurity research.

**Request:** Read simulated finance records.

Expected:

- Resource is outside the Research Agent's permitted scope.
- OPA blocks the request.
- Finance mock tool receives zero calls.
- Security event is recorded.

### Scenario D — Human Review

**Agent:** Finance Agent

**Task:** Prepare a quarterly revenue report.

**Request:** Bulk export of finance records.

Expected:

- Request matches the general finance task.
- Export policy requires approval.
- Gateway returns REVIEW.
- Request remains paused.
- Reviewer approves or rejects the specific request.
- Security conditions are revalidated before execution.

## Part C — Security Testing

Test:

- Invalid identities.
- Revoked credentials.
- Expired contracts.
- Unauthorized operations.
- Resource violations.
- Invalid request parameters.
- Direct tool access attempts.
- Gemini failure.
- OPA failure.
- Database failure.
- Approval misuse.
- Duplicate requests.
- Tool execution failure.

## Part D — Performance Evaluation

Measure:

- Decision latency.
- Gemini-assisted decision latency.
- False-allow rate.
- False-block rate.
- Unauthorized request block rate.
- Valid request approval rate.
- Gateway-bypass rejection.

Report actual results.

Do not invent performance percentages.

## Part E — Code Quality Review

Check:

- Duplicate source files.
- Unused functions.
- Unused dependencies.
- Circular imports.
- Missing error handling.
- Incomplete implementations.
- Exposed secrets.
- Weak authorization.
- Incorrect policy decisions.
- Missing test coverage.

## Expected Deliverables

- Integrated AEGIS application.
- Complete automated tests.
- Security test report.
- Demonstration scenario runner.
- Performance evaluation report.
- Fixed critical issues.

## Completion Conditions

All required MVP scenarios must work.

Critical security tests must pass.

No known critical or high-severity security issue should remain unresolved for the MVP release.

Any remaining limitation must be documented.

---

# PHASE 11 — FINALIZATION AND DEPLOYMENT PREPARATION

## Objective

Prepare a complete, reliable local MVP and document its deployment requirements.

## Tasks

### 1. Project Cleanup

- Remove unused files.
- Remove unused dependencies.
- Remove debug code.
- Remove temporary test data.
- Review folder structure.
- Check environment configuration.
- Check Git history for exposed secrets.

### 2. Documentation

Prepare:

- README.
- Installation guide.
- Local setup instructions.
- Backend instructions.
- Frontend instructions.
- OPA policy guide.
- Gemini configuration guide.
- API documentation.
- Testing instructions.
- Known limitations.

### 3. Local Startup

Prepare a repeatable startup procedure for:

- Backend.
- Frontend.
- OPA.
- Database.
- Simulated agents.

Docker Compose may be added if it makes local development and startup more reliable.

### 4. Configuration

Prepare:

- `.env.example`.
- Dependency lock files.
- Database migration commands.
- Demo data setup.
- Test commands.
- Startup commands.

### 5. Security Review

Review:

- Authentication.
- Credential handling.
- Gateway enforcement.
- Task Contract restrictions.
- OPA integration.
- Gemini safety boundaries.
- Human approval.
- Audit access.
- Error handling.

### 6. Release Preparation

- Create a stable version tag.
- Prepare a release summary.
- Record known limitations.
- Prepare a working demonstration.
- Prepare backup and recovery instructions.

### 7. Future Deployment Planning

Do not deploy sensitive systems until production controls are ready.

Future deployment may require:

- Hosted backend.
- PostgreSQL.
- Secure secret management.
- HTTPS.
- Authentication hardening.
- Rate limits.
- Monitoring.
- Database backups.
- Access control.
- Production testing.

Paid deployment is outside the initial free local MVP requirement.

## Expected Deliverables

- Working local AEGIS MVP.
- Complete documentation.
- Passing automated tests.
- Demonstration instructions.
- Release checklist.
- Known limitations.
- Future deployment plan.

## Completion Conditions

A new developer must be able to set up and run the project using the documented instructions.

All MVP scenarios must be repeatable.

All required features must have verification evidence.

The project must not depend on undocumented manual steps.

---

# 4. DEVELOPMENT MILESTONES

These milestones summarize the main achievements.

## Milestone 1 — Security Foundation

Includes:

- Development environment.
- Database.
- Agent identity.
- Task Contracts.
- Mock tools.

**Proof:** Agents have separate identities and permitted operations.

## Milestone 2 — Working Runtime Gateway

Includes:

- Gateway.
- Request validation.
- OPA.
- Task-action checks.
- Protected tool execution.

**Proof:** A forbidden operation is blocked before the tool is called.

## Milestone 3 — Intelligent Security Workflow

Includes:

- Gemini analysis.
- Human approval.
- Audit system.
- Failure handling.

**Proof:** Ambiguous requests can be reviewed while explicit policy restrictions remain enforced.

## Milestone 4 — Complete AEGIS Application

Includes:

- React dashboard.
- All three agents.
- End-to-end testing.
- Security evaluation.
- Local release preparation.

**Proof:** The complete application runs and demonstrates all required MVP scenarios.

# 5. DEVELOPMENT DEPENDENCIES

The phases have dependencies.

The following requirements must be maintained:

| Feature | Depends On |
|---|---|
| Task Contract Management | Database and Agent Identity |
| Mock Agent Requests | Agent Registration and Tool Definitions |
| Gateway | Authentication, Contracts and Request Schemas |
| OPA | Gateway and Normalized Request Data |
| Gemini | Gateway and Task Context |
| Final Decision | OPA and Validated Context |
| Tool Execution | Gateway Decision and Tool Registry |
| Human Approval | Request Management and Authentication |
| Audit System | Request and Decision Flow |
| Dashboard | Backend APIs and Authentication |
| End-to-End Testing | All Core Modules |

Do not implement dependent features using fake service responses simply to move to the next phase.

# 6. AI CODING AGENT IMPLEMENTATION METHOD

The coding agent must use the following method for every phase.

## Step 1 — Read

Read all relevant project documents.

## Step 2 — Inspect

Inspect the existing source code and identify implemented functionality.

## Step 3 — Plan

Prepare a list of:

- Files to create.
- Files to modify.
- Components to implement.
- Dependencies.
- Tests required.

## Step 4 — Implement

Implement only the current phase's approved tasks.

## Step 5 — Test

Run the relevant tests.

Do not skip tests because of time pressure.

## Step 6 — Review

Review code quality, security boundaries and architecture consistency.

## Step 7 — Report

Provide a summary of:

- Implemented features.
- Changed files.
- Tests passed.
- Tests failed.
- Remaining issues.
- Completion status.

## Step 8 — Update Progress

Update PROJECT_STATE.md once that file has been introduced in the documentation plan.

Do not claim that an entire phase is complete when only part of it has been implemented.

# 7. PHASE COMPLETION STATUS

Each phase must have one of these statuses:

| Status | Meaning |
|---|---|
| NOT_STARTED | Work has not begun |
| IN_PROGRESS | Work is currently being implemented |
| BLOCKED | A dependency or issue prevents progress |
| TESTING | Implementation is awaiting verification |
| COMPLETED | All completion conditions are satisfied |

A phase cannot be marked COMPLETED if required tests fail or critical functionality is missing.

# 8. TIME AND RESOURCE PLANNING

Development time will depend on implementation quality, testing results, coding-agent limits and integration issues.

The project should be developed incrementally.

Do not sacrifice security testing to finish within an arbitrary time limit.

The first release must prioritize a reliable local MVP over enterprise-scale features.

## Free-First Development Requirements

- Use local development wherever possible.
- Use free and open-source libraries.
- Use SQLite for the first version.
- Run OPA locally.
- Use fictional test data.
- Keep Gemini usage within available free quotas.
- Avoid paid hosting until deployment is required.
- Avoid mandatory paid services.

All external AI calls must be configurable and optional where the deterministic security design allows it.

# 9. PROJECT-WIDE SUCCESS CRITERIA

The initial AEGIS MVP succeeds when:

1. Three simulated agents can authenticate.
2. Each agent has a separate Task Contract.
3. Protected tool calls pass through the gateway.
4. Invalid or unauthorized requests are rejected.
5. Task-action mismatches are evaluated.
6. OPA produces and the gateway enforces policy decisions.
7. Gemini provides validated advisory analysis when needed.
8. REVIEW requests require authorized human approval.
9. Audit events are correctly stored.
10. The dashboard displays real application data.
11. Direct agent access to protected tools is rejected.
12. The complete demonstration scenarios work.
13. Required automated tests pass.
14. Setup and operation are documented.

These criteria establish functional success for the controlled MVP. They do not prove that the software is immune to every possible security attack.

# 10. FUTURE DEVELOPMENT AFTER MVP

The following features can be considered after the first version has been verified:

- Advanced anomaly detection.
- Agent behaviour profiling.
- Data Loss Prevention.
- Model Context Protocol integrations.
- Multi-agent communication monitoring.
- More advanced risk scoring.
- Enterprise identity integration.
- Centralized policy administration.
- Cryptographically protected audit records.
- Scalable hosted infrastructure.
- Advanced reports and analytics.

None of these features should delay the core MVP.

# 11. FINAL DEVELOPMENT RULE

**Build one working layer at a time.**

The most important implementation priority is:

**Agent Identity → Task Contract → Gateway → OPA → Enforcement → Tool Execution**

After that, add Gemini, human approval, audit and the dashboard.

The gateway and its independent policy enforcement must remain the foundation of AEGIS throughout development.

Never treat generated code, an attractive dashboard or a successful mock response as proof of completed security functionality.

Every important feature must work, be tested and satisfy its acceptance conditions before the project moves to the next phase.

---

**END OF DEVELOPMENT_PHASES.md**