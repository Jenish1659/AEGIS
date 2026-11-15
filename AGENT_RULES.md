# AEGIS — AI AGENT DEVELOPMENT RULES

**Project:** AEGIS  
**Full Name:** Task-Aware Runtime Security Gateway for Autonomous AI Agents  
**Document:** AI Agent Development Rules  
**Version:** 1.0  
**Status:** Mandatory Development Rules  
**Applies To:** All AI Coding Agents and Human Developers  
**Priority:** Critical

---

# 1. PURPOSE OF THIS DOCUMENT

This document defines the rules, boundaries, coding standards and development procedures that every AI coding agent must follow while developing AEGIS.

The purpose is to ensure that:

- The codebase remains clean and properly structured.
- Every feature follows the approved architecture.
- Security controls are implemented correctly.
- No fake or incomplete functionality is presented as complete.
- All important features are tested.
- The project remains free to develop locally during the MVP stage.
- No AI coding agent makes unauthorized architecture changes.

These rules are mandatory.

An AI coding agent must read this document before modifying or creating project source code.

# 2. DOCUMENT AUTHORITY AND PRIORITY

The following documents define the approved project requirements.

| Document | Authority |
|---|---|
| PRD.md | Defines what AEGIS must do |
| ARCHITECTURE.md | Defines how AEGIS is structured |
| AGENT_RULES.md | Defines how the development agent must work |
| DEVELOPMENT_PHASES.md | Defines the implementation order |
| DESIGN_SYSTEM.md | Defines visual design standards |
| UI_UX.md | Defines pages, interactions and user experience |
| BACKEND.md | Defines backend implementation details |
| PROJECT_STATE.md | Tracks completed work and current progress |

### Conflict Resolution

If two documents contain conflicting requirements:

1. Do not silently select one requirement.
2. Identify the conflicting statements.
3. Explain the possible effect on the project.
4. Recommend a correction.
5. Wait for approval before changing important architecture or security decisions.
6. Update all affected documents after approval.

PRD.md and ARCHITECTURE.md must remain the primary product and architecture references.

# 3. GENERAL DEVELOPMENT RULES

Every AI coding agent must follow these rules:

1. Read the relevant documentation before starting work.
2. Inspect the existing project structure before creating files.
3. Understand how existing modules are connected.
4. Follow the approved technology stack.
5. Implement one clearly defined feature at a time.
6. Keep each module focused on one responsibility.
7. Reuse existing services where appropriate.
8. Avoid unnecessary dependencies.
9. Write proper error handling.
10. Write tests for all important functionality.
11. Review generated code before considering it complete.
12. Update documentation when implementation changes.
13. Keep code readable and maintainable.
14. Do not make assumptions about unfinished requirements.
15. Report problems instead of hiding them.

# 4. STRICTLY PROHIBITED ACTIONS

An AI coding agent must never:

- Delete existing project files without checking their purpose.
- Rewrite the entire project when only one module needs modification.
- Change the approved technology stack without approval.
- Create duplicate implementations of the same service.
- Create empty files just to complete the folder structure.
- Leave TODOs or placeholder functions for required MVP features.
- Use hardcoded security decisions in place of actual policy evaluation.
- Use fake backend responses as actual application data.
- Generate fake dashboard statistics.
- Expose API keys, passwords or tokens.
- Store real secrets in source code.
- Give AI agents direct credentials for protected tools.
- Allow tool execution before security approval.
- Trust a Gemini response as a permission decision.
- Bypass OPA when a policy decision is required.
- Ignore failed tests.
- Disable existing security checks merely to make a test pass.
- Claim successful implementation without verification.
- Install unnecessary libraries or frameworks.
- Replace a working architecture with a more complex one without justification.
- Create arbitrary shell, SQL or code execution capabilities for agents.

Destructive changes must be explained and approved.

# 5. PROJECT TECHNOLOGY RULES

The following is the approved initial technology stack.

## 5.1 Backend

**Language:** Python 3.12+

**Framework:** FastAPI

Approved supporting libraries:

| Library | Responsibility |
|---|---|
| Pydantic | Data and request validation |
| SQLAlchemy 2 | Database operations |
| Alembic | Database migrations |
| HTTPX | HTTP communication |
| google-genai | Gemini API integration |
| Pytest | Automated testing |
| Ruff | Code formatting and linting |

Do not introduce alternative backend frameworks without approval.

## 5.2 Frontend

**Language:** TypeScript

**Framework:** React

**Build Tool:** Vite

Approved supporting libraries:

- Tailwind CSS for styling.
- React Router for navigation.
- Zod for client-side data validation.

The frontend must communicate with the backend through documented APIs.

Frontend validation must never replace backend security validation.

## 5.3 Security Policy Engine

**Engine:** Open Policy Agent (OPA)

**Policy Language:** Rego

Rules:

- Keep policies separate from application code.
- Use clear policy names.
- Test every important policy.
- Do not create a second policy engine that duplicates OPA.
- Do not grant access when OPA is unavailable or its response is invalid.

## 5.4 AI Model

**Initial Model:** Gemini 3.8 Flash

**Integration:** Gemini API

Rules:

- Read the configured model from environment settings.
- Do not hardcode the model ID throughout the application.
- Validate every model response.
- Apply request timeouts.
- Handle rate limits.
- Handle unavailable services.
- Never allow the model to execute tools directly.
- Never let the model override hard security restrictions.

The model must be replaceable without rewriting the entire application.

## 5.5 Database

Initial database: SQLite.

Future database: PostgreSQL.

Use SQLAlchemy for database access and Alembic for schema migrations.

Do not introduce multiple databases for the initial MVP without a clear requirement.

## 5.6 Testing

Use:

- Pytest for Python testing.
- HTTPX for API integration testing.
- OPA policy tests for Rego policies.
- React testing tools when frontend behaviour needs automated testing.

Every important security path must have an automated test.

# 6. CODE QUALITY RULES

## 6.1 Python Rules

- Follow clear Python naming conventions.
- Use type hints for public functions and important data structures.
- Keep functions focused.
- Avoid unnecessarily large classes.
- Use Pydantic schemas for API inputs and outputs.
- Use dependency injection where appropriate.
- Use proper exception handling.
- Avoid unnecessary global state.
- Keep business logic separate from API routes.
- Keep database queries separate from business logic.

## 6.2 TypeScript and React Rules

- Use TypeScript instead of plain JavaScript for application code.
- Define types for API requests and responses.
- Keep components small and reusable.
- Separate API communication from UI components.
- Handle loading, empty, success and error states.
- Avoid hardcoded security statistics.
- Do not store secret backend credentials in the browser.
- Keep security decisions in the backend.
- Use accessible labels and controls.

## 6.3 Rego Rules

- Use clear and readable policy names.
- Keep security conditions explicit.
- Prefer default-deny behaviour.
- Test ALLOW, BLOCK and REVIEW paths.
- Test missing fields.
- Test invalid inputs.
- Do not use permissive fallback rules.

## 6.4 General Code Rules

Every source file must have a real responsibility.

A file must not exist only to import or re-export code from another file without a clear purpose.

Imports must be used properly.

Avoid circular dependencies.

Avoid duplicate functions and unnecessary repeated logic.

Keep configuration separate from implementation.

# 7. SECURITY BOUNDARIES

This section is mandatory because AEGIS is a security product.

## 7.1 Agent Identity

- Authenticate agents through registered credentials.
- Do not trust identity values supplied only in request bodies.
- Use unique identities.
- Support disabling or revoking credentials.
- Never reveal original API tokens after creation.

## 7.2 Task Contracts

- Task Contracts must be stored and controlled by the backend.
- An agent must not modify its own permissions.
- Validate contract ownership.
- Validate contract status.
- Validate expiry.
- Track contract versions.
- Reject unknown or missing contracts.

## 7.3 Gateway Enforcement

- Every protected tool request must pass through the AEGIS Gateway.
- The gateway must use an explicit tool registry.
- Only registered tool adapters can execute.
- The agent must not receive protected tool credentials.
- Never execute unknown tool names dynamically.
- Never trust a frontend ALLOW result.

## 7.4 Gemini Boundaries

Gemini is an advisory context-analysis service.

It may:

- Analyse task context.
- Analyse requested actions.
- Identify possible mismatches.
- Return structured risk signals.
- Explain possible concerns.

It must never:

- Grant protected resource access.
- Change Task Contracts.
- Modify security policies.
- Execute protected tools.
- Override OPA restrictions.
- Authenticate agents.
- Approve its own REVIEW requests.

Gemini output must be treated as untrusted input.

## 7.5 OPA Boundaries

OPA is the policy decision engine.

It must evaluate structured input using Rego policies.

The AEGIS Gateway must enforce the result.

If OPA is unavailable, returns an error or produces an invalid decision, the protected request must not execute.

## 7.6 Human Approval Boundaries

- Only authenticated and authorized reviewers may approve.
- An agent cannot approve its own request.
- Approval must be linked to the exact request.
- Approval must expire.
- Approval cannot bypass explicit hard-deny restrictions.
- Security conditions must be checked again before execution.

## 7.7 Database Boundaries

- Agents cannot connect directly to protected databases.
- All data access must happen through backend services.
- Use parameterized queries.
- Validate database operations.
- Do not expose database connection strings to the frontend.
- Never store plain API credentials.
- Restrict access to sensitive tables.

# 8. ERROR HANDLING RULES

All services must handle errors safely and consistently.

## 8.1 Authentication Errors

Invalid, missing, disabled or expired credentials must result in request rejection.

## 8.2 Request Validation Errors

Malformed or unsupported requests must be rejected before policy evaluation or tool execution.

## 8.3 Task Contract Errors

Missing, invalid, expired or mismatched contracts must never authorize a request.

## 8.4 OPA Errors

If OPA cannot provide a valid decision:

- Do not execute the protected tool.
- Record the failure when audit storage is available.
- Return a safe error response.
- Include a request ID for troubleshooting.

## 8.5 Gemini Errors

Handle:

- API timeout.
- Rate limiting.
- Invalid response.
- Malformed JSON.
- Unsupported output.
- Unavailable model.
- Authentication failure.

If contextual analysis is required and Gemini fails, send the request for human review or block it.

Do not automatically allow it.

## 8.6 Database Errors

If the database is unavailable, do not authorize a protected action using missing or stale information.

## 8.7 Tool Execution Errors

If a tool fails:

- Record the execution failure.
- Return a safe response.
- Avoid uncontrolled retries of operations with side effects.
- Use idempotency protection where appropriate.

## 8.8 Error Response Format

Use a consistent structure.

Example:

```json
{
  "success": false,
  "request_id": "REQ-001",
  "error": {
    "code": "POLICY_SERVICE_UNAVAILABLE",
    "message": "The security decision could not be completed."
  }
}
```

Never expose stack traces, secrets or internal configuration in API responses.

# 9. DATA PRIVACY RULES

- Use fictional and simulated data during development.
- Never use real financial or customer information in Gemini tests.
- Send only necessary context to external AI services.
- Mask credentials.
- Avoid logging unnecessary request content.
- Protect dashboard access.
- Keep API keys outside source code.
- Remove sensitive information from error messages.

The initial project must remain suitable for local development using test data.

# 10. API DEVELOPMENT RULES

- Follow the approved API architecture.
- Use `/api/v1/` for initial API versioning.
- Validate every incoming request.
- Validate important responses.
- Use consistent status codes.
- Document each endpoint.
- Require authentication where appropriate.
- Keep administrative routes protected.
- Do not expose internal OPA or Gemini endpoints directly to untrusted clients.

# 11. FILE AND FOLDER MANAGEMENT RULES

Before creating a new file:

1. Inspect the existing directory.
2. Check whether the required functionality already exists.
3. Reuse existing modules when appropriate.
4. Create a new file only when there is a clear responsibility.
5. Add necessary imports and tests.
6. Update documentation if the architecture changes.

Never create duplicate files such as:

- `gateway_new.py`
- `gateway_final.py`
- `gateway_final_v2.py`

There must be one approved implementation for each responsibility.

Do not leave abandoned files after refactoring.

# 12. DEPENDENCY MANAGEMENT

- Use approved libraries whenever possible.
- Avoid unnecessary packages.
- Check the official documentation before using unfamiliar libraries.
- Use compatible stable dependency versions.
- Record dependencies in the correct package configuration.
- Keep lock files updated.
- Remove unused dependencies.
- Avoid installing multiple libraries for the same purpose.

The initial development must use free and open-source packages wherever practical.

Do not add paid services as mandatory dependencies for the MVP.

# 13. TESTING RULES

A feature cannot be marked complete simply because its code has been generated.

Every important feature must have tests.

Required testing levels:

**Unit Testing**
Test individual functions and services.

**Integration Testing**
Test communication between the gateway, database, OPA and Gemini integration.

**Security Testing**
Test invalid identity, expired contracts, unauthorized operations and bypass attempts.

**End-to-End Testing**
Test the complete request flow from agent to tool and audit record.

## Mandatory Security Scenarios

1. Valid request is allowed.
2. Unknown agent is blocked.
3. Invalid credentials are rejected.
4. Expired Task Contract is blocked.
5. Unapproved tool is blocked.
6. Allowed database with forbidden operation is blocked.
7. REVIEW request cannot execute before approval.
8. Approval cannot be reused for a modified request.
9. Gemini cannot override a hard policy denial.
10. OPA failure cannot authorize execution.
11. Gemini failure cannot authorize an uncertain sensitive request.
12. Direct agent-to-tool access is rejected.
13. A blocked request results in zero protected tool calls.

Tests must use controlled mock resources.

# 14. AI CODING AGENT WORKFLOW

Every development task must follow this process.

## Step 1 — Understand

Read relevant project documentation and inspect existing code.

## Step 2 — Plan

Explain:

- What needs to be implemented.
- Which files need to be created or changed.
- How the implementation will work.
- Which tests will be added.

## Step 3 — Implement

Implement only the approved feature.

Do not modify unrelated modules.

## Step 4 — Test

Run relevant automated tests and report their actual results.

## Step 5 — Review

Check for:

- Duplicate logic.
- Missing imports.
- Unused files.
- Security issues.
- Hardcoded values.
- Incomplete functions.
- Unhandled errors.

## Step 6 — Document

Update relevant documentation when implementation changes the established design or behaviour.

## Step 7 — Report

Provide a development report containing:

- Feature completed.
- Files created.
- Files modified.
- Tests executed.
- Tests passed.
- Tests failed.
- Known issues.
- Remaining tasks.

Do not claim success if tests have not been executed.

# 15. APPROVAL REQUIREMENTS

The AI coding agent must ask for approval before:

- Changing the approved technology stack.
- Changing the security architecture.
- Removing a core MVP feature.
- Changing Task Contract permissions or structure.
- Changing the final policy decision model.
- Adding a paid mandatory service.
- Introducing direct agent access to protected tools.
- Replacing an established dependency with a major alternative.
- Making destructive file or database changes.

Small internal improvements that do not change the approved requirements may be completed independently and reported.

# 16. FREE DEVELOPMENT RULES

During the initial MVP:

- Prefer local development.
- Prefer free and open-source packages.
- Use SQLite.
- Run OPA locally.
- Use fictional data.
- Keep Gemini optional and quota-aware.
- Avoid paid hosting.
- Avoid paid databases.
- Avoid paid monitoring platforms.
- Keep deployment optional until the MVP works.

Do not create unnecessary cloud dependencies.

# 17. DEFINITION OF COMPLETION

A task is complete only when:

- Requirements are satisfied.
- The implementation is real.
- The correct files exist.
- No placeholder implementation remains for the required feature.
- Security boundaries are respected.
- Error handling is implemented.
- Relevant tests pass.
- Integration is verified.
- Documentation is updated.
- A clear completion report is provided.

# 18. FINAL INSTRUCTION TO ALL AI CODING AGENTS

You are developing AEGIS, a security-focused software application.

Your priority is correctness, security, clean architecture and verified functionality.

Do not prioritise development speed over security.

Do not create features merely to make the application appear complete.

Do not trust generated code without testing it.

Follow PRD.md, ARCHITECTURE.md and this document at all times.

Implement the project in the order defined in DEVELOPMENT_PHASES.md.

When requirements are unclear or conflict with the approved architecture, stop and report the issue rather than inventing a solution.

**The final goal is a working, testable and maintainable runtime security gateway that controls protected AI agent actions—not a collection of UI screens or disconnected modules.**

---

**END OF AGENT_RULES.md**