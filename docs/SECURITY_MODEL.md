# AEGIS — SECURITY MODEL AND THREAT ANALYSIS

**Project:** AEGIS  
**Document:** Security Model  
**Version:** 1.0  
**Status:** Initial Security Specification  
**Security Approach:** Zero Trust, Least Privilege and Runtime Enforcement  
**Application Type:** AI Agent Runtime Security Gateway  
**Last Updated:** 14 November 2026

---

# 1. PURPOSE

This document defines the security model of AEGIS.

It identifies the assets that need protection, the threats the system is designed to address, the boundaries between trusted and untrusted components, and the controls required to protect autonomous AI agents and their connected tools.

It also defines how AEGIS must behave when a security component fails.

This document is mandatory for all developers and AI coding agents working on security-related functionality.

# 2. SECURITY OBJECTIVE

The main security objective of AEGIS is:

**Prevent unauthorized or out-of-scope AI agent tool actions from reaching protected resources.**

AEGIS achieves this by placing an independent security gateway between AI agents and protected tools.

Every protected request must be evaluated against:

1. Authenticated agent identity.
2. Active Task Contract.
3. Requested tool.
4. Requested operation.
5. Target resource.
6. Security policies.
7. Additional contextual signals when required.

The system must enforce security decisions before protected tool execution.

# 3. SECURITY PRINCIPLES

## 3.1 Zero Trust

No agent or request should be trusted automatically.

Every protected request must be authenticated and evaluated against current security requirements.

Being registered in AEGIS does not automatically grant permission to perform every action.

## 3.2 Least Privilege

Each agent must receive only the permissions required for its assigned task.

Permissions must be restricted by:

- Tool.
- Operation.
- Resource.
- Task scope.
- Contract validity.
- Approval requirements.

## 3.3 Defense in Depth

AEGIS must use multiple security controls.

These include:

- Authentication.
- Request validation.
- Task Contracts.
- Deterministic security checks.
- OPA policy enforcement.
- Gateway-controlled tool execution.
- Human approval.
- Audit records.

No single model or security check should be treated as sufficient protection.

## 3.4 Separation of Duties

Each component has a separate responsibility.

| Component | Responsibility |
|---|---|
| Agent Authentication | Establish requesting identity |
| Task Contract Service | Provide authoritative task permissions |
| Intent Verification | Assess task-action alignment |
| Gemini | Provide advisory contextual analysis |
| OPA | Evaluate security policies |
| AEGIS Gateway | Enforce final decisions |
| Human Reviewer | Approve eligible requests |
| Audit Service | Record security events |

Gemini must never independently grant protected access.

## 3.5 Fail-Closed Security

If the system cannot establish that a protected operation is permitted, it must not execute that operation.

Examples:

- Invalid OPA response: Do not execute.
- Missing Task Contract: Block.
- Expired contract: Block.
- Unauthenticated agent: Reject.
- Required Gemini analysis unavailable: Review or Block.
- Expired human approval: Do not execute.

A service failure must never be converted into an ALLOW decision.

# 4. ASSETS THAT REQUIRE PROTECTION

AEGIS must protect the following assets.

## 4.1 Agent Credentials

Agent credentials authenticate AI agents.

Risks:

- Credential theft.
- Unauthorized use.
- Credential exposure in logs.
- Credential reuse.
- Credential compromise.

Protection:

- Generate high-entropy random tokens.
- Store credential digests.
- Revoke compromised credentials.
- Never expose tokens to Gemini.
- Never print credentials in application logs.

## 4.2 Task Contracts

Task Contracts define the permitted scope of each agent.

Risks:

- Unauthorized modification.
- Contract replacement.
- Expiry bypass.
- Permission escalation.
- Contract ownership manipulation.

Protection:

- Store contracts in the backend database.
- Restrict modification to authorized administrators.
- Maintain contract versions.
- Check contract ownership.
- Verify expiry and status on every protected request.
- Do not accept agent-supplied contracts as authoritative.

## 4.3 Protected Tools and Resources

Examples:

- Public search tools.
- Finance mock database.
- Admin mock tools.
- External APIs.
- Future integrated enterprise resources.

Risks:

- Unauthorized access.
- Forbidden operations.
- Credential exposure.
- Direct agent access.
- Parameter manipulation.

Protection:

- Execute tools only through registered adapters.
- Keep protected credentials on the server.
- Validate all parameters.
- Enforce gateway-only access.
- Reject unknown operations.

## 4.4 Security Policies

OPA policies determine which actions are permitted.

Risks:

- Unauthorized policy changes.
- Incorrect policy rules.
- Permissive fallback rules.
- Policy configuration mistakes.
- Policy service bypass.

Protection:

- Keep policy changes under authorized control.
- Use version control for policy files.
- Test Rego policies.
- Apply default-deny behaviour.
- Record policy versions with decisions.

## 4.5 Gemini API Credentials

The Gemini API key allows the application to access the model.

Risks:

- API key exposure.
- Unauthorized API use.
- Excessive model consumption.
- Key theft through logs or frontend code.

Protection:

- Keep the key in backend environment configuration.
- Never expose it to React.
- Avoid logging it.
- Apply usage limits.
- Support key rotation.

## 4.6 Human User Sessions

Human administrators and reviewers have access to sensitive management operations.

Risks:

- Account compromise.
- Session theft.
- Unauthorized approval.
- Privilege escalation.

Protection:

- Secure password hashing.
- Protected sessions.
- Role-based authorization.
- Session expiry.
- Secure logout.
- Approval identity verification.

## 4.7 Audit Records

Audit records contain evidence of system activity.

Risks:

- Unauthorized modification.
- Deletion.
- Sensitive data exposure.
- False event records.

Protection:

- Restrict database permissions.
- Prevent ordinary dashboard users from modifying audit events.
- Use controlled append-only application behaviour.
- Protect backups.
- Record important decisions and execution outcomes.

The initial MVP will provide application-level audit protection. It must not claim cryptographic tamper-proof storage unless a suitable integrity mechanism is implemented and tested.

# 5. TRUST BOUNDARIES

A trust boundary separates components with different security responsibilities or levels of trust.

AEGIS must clearly enforce the following boundaries.

## 5.1 Untrusted AI Agent Boundary

AI agents are not trusted security authorities.

Their requests may contain:

- Incorrect information.
- Malicious instructions.
- Invalid parameters.
- Unexpected operations.
- Attempts to access restricted resources.

The gateway must validate all incoming requests.

## 5.2 Gateway Boundary

The AEGIS Gateway is the main enforcement boundary.

It accepts authenticated requests and coordinates security evaluation.

It must never blindly forward agent-generated tool calls.

## 5.3 Task Contract Boundary

The Task Contract database is a trusted source of permission information.

Only authorized backend operations can modify active contracts.

The agent cannot replace or change the contract through a request.

## 5.4 Gemini Boundary

Gemini is an external advisory service.

Its outputs must be considered untrusted until validated.

The model cannot:

- Change policies.
- Authenticate an agent.
- Grant permissions.
- Execute protected tools.
- Approve requests.
- Override hard restrictions.

## 5.5 OPA Boundary

OPA evaluates security policies.

Only the trusted backend should communicate with the internal policy service.

OPA must not be exposed as an unrestricted public API.

## 5.6 Protected Tool Boundary

Protected tools must not accept direct agent credentials.

They must accept requests only from the trusted gateway execution path.

This boundary is essential.

If an agent can bypass the gateway, AEGIS cannot guarantee enforcement for that tool.

# 6. THREAT MODEL

The initial MVP uses a threat-model-based design.

The following threats are in scope.

## 6.1 Prompt Injection

**Threat:**

An agent reads untrusted content containing instructions that attempt to change its behaviour or make it perform unrelated actions.

**Example:**

A Research Agent reads a document instructing it to access confidential finance records.

**Possible impact:**

- Unauthorized data access.
- Task deviation.
- Restricted tool requests.

**AEGIS Protection:**

- Compare requested actions with the active Task Contract.
- Check resource restrictions.
- Use Gemini for additional contextual analysis when needed.
- Enforce the final decision through OPA and the gateway.

**Limitation:**

AEGIS does not guarantee detection of every prompt injection. It controls protected actions that violate its configured security rules and task restrictions.

## 6.2 Agent Goal Hijack

**Threat:**

Untrusted input attempts to redirect the agent away from its assigned objective.

**Example:**

A public research task is redirected towards reading private employee records.

**Protection:**

- Authoritative Task Contracts.
- Task-action verification.
- Resource restrictions.
- OPA policies.
- Gateway enforcement.

## 6.3 Excessive Permissions

**Threat:**

An agent has more permissions than required.

**Example:**

A Research Agent can access the entire company database.

**Protection:**

- Tool-specific permissions.
- Operation-specific permissions.
- Resource-level restrictions.
- Least-privilege Task Contracts.

## 6.4 Forbidden Operation

**Threat:**

An agent requests an operation that is not allowed for the current task.

**Example:**

An Admin Agent has access to a database but is assigned a read-only audit task. It requests a delete operation.

**Protection:**

- Operation-level Task Contract restrictions.
- Rego policies.
- Gateway decision enforcement.

This is a primary AEGIS demonstration scenario.

## 6.5 Unauthorized Resource Access

**Threat:**

An agent attempts to use another agent's resources.

**Example:**

The Research Agent requests Finance Database access.

**Protection:**

- Agent-specific resource scopes.
- Contract ownership checks.
- OPA evaluation.
- Protected tool adapters.

## 6.6 Credential Theft

**Threat:**

An attacker obtains an agent token or protected tool credential.

**Protection:**

- Secure credential generation.
- Credential digest storage.
- Token revocation.
- Server-side secret management.
- Gateway-held tool credentials.
- Safe logging.

## 6.7 Direct Gateway Bypass

**Threat:**

An agent attempts to access a protected tool without using AEGIS.

**Protection:**

- Do not distribute protected tool credentials to agents.
- Keep adapters behind the gateway.
- Restrict internal tool access.
- Reject direct requests.
- Test unauthorized direct access attempts.

## 6.8 Task Contract Manipulation

**Threat:**

An agent or unauthorized user attempts to change permissions.

**Protection:**

- Backend-controlled contracts.
- Administrative authorization.
- Versioned contracts.
- Audit records.
- Revalidation before execution.

## 6.9 Parameter Manipulation

**Threat:**

An agent sends invalid or dangerous parameters.

**Protection:**

- Pydantic request validation.
- Tool-specific parameter schemas.
- Input length limits.
- Explicit operation allowlists.
- Parameterized database queries.

## 6.10 Gemini Manipulation

**Threat:**

Untrusted context influences the model's analysis and causes it to provide misleading advisory output.

**Protection:**

- Clearly separate untrusted content from trusted policy data.
- Treat model output as untrusted.
- Validate output schemas.
- Never grant permission based on Gemini alone.
- Apply independent OPA policies.

## 6.11 OPA Service Failure

**Threat:**

The policy service becomes unavailable or produces an invalid response.

**Protection:**

- Fail closed.
- Do not execute protected tools.
- Record the service failure.
- Return a controlled error response.

## 6.12 Human Approval Misuse

**Threat:**

An unauthorized user attempts to approve a sensitive action, or an approval is reused for another request.

**Protection:**

- Reviewer authentication.
- Reviewer role checks.
- Request-specific approval binding.
- Approval expiry.
- Revalidation before execution.
- Approval history.

## 6.13 Duplicate Request Execution

**Threat:**

An agent retries a request, potentially causing the same action to execute more than once.

**Protection:**

- Idempotency keys for supported operations.
- Duplicate-request detection.
- Request status tracking.
- Safe handling of side-effecting operations.

# 7. SECURITY DECISION HIERARCHY

AEGIS must maintain a clear decision hierarchy.

## Level 1 — Hard Security Restrictions

Examples:

- Invalid identity.
- Expired contract.
- Disabled agent.
- Forbidden tool.
- Forbidden operation.
- Restricted resource.
- Invalid request.

These conditions cannot be overridden by Gemini or human approval.

## Level 2 — Contextual Analysis

Gemini may provide additional advisory information for ambiguous requests.

Its result is validated and supplied to OPA as contextual input.

## Level 3 — Final Policy Decision

OPA evaluates the trusted facts, policy rules and validated advisory signals.

It returns:

- ALLOW.
- BLOCK.
- REVIEW.

## Level 4 — Enforcement

The gateway performs the required action.

- ALLOW: Execute through the registered adapter.
- BLOCK: Reject without execution.
- REVIEW: Pause and request approval.

**The model never has direct control over protected tool execution.**

# 8. SECURITY DECISION EXAMPLES

| Scenario | Required decision |
|---|---|
| Unknown agent | BLOCK |
| Revoked credential | BLOCK |
| Missing Task Contract | BLOCK |
| Expired contract | BLOCK |
| Unapproved tool | BLOCK |
| Forbidden delete operation | BLOCK |
| Out-of-scope resource | BLOCK |
| Ambiguous sensitive request | REVIEW |
| Sensitive export requiring approval | REVIEW |
| Fully permitted request | ALLOW |
| OPA unavailable | No execution |
| Gemini failure when required | REVIEW or BLOCK |

An infrastructure failure must be recorded separately from an explicit policy denial.

# 9. SECURE AGENT IDENTITY

Every registered agent must have a unique identity.

Authentication requirements:

- High-entropy random token generation.
- Secure digest storage.
- Credential revocation.
- Agent status checking.
- Credential expiry where configured.
- No credential logging.
- Constant-time comparison where applicable.

An `agent_id` supplied in the JSON body must never be treated as authenticated identity.

# 10. SECURE TASK CONTRACT DESIGN

Task Contracts are trusted backend records.

Security requirements:

- Only authorized administrators can create or update contracts.
- Contracts belong to registered agents.
- Contract version must be tracked.
- Active contract validity must be checked.
- Expiry must be enforced.
- Unknown tools must not become permitted tools.
- Unsupported operations must be rejected.
- Agents must not change their own permissions.

Contract modifications must create traceable history.

# 11. SECURE TOOL EXECUTION

The tool registry must contain explicitly approved tool adapters.

Each adapter must define:

- Tool ID.
- Description.
- Supported operations.
- Parameter schema.
- Execution function.
- Resource scope.

Security rules:

- Never dynamically execute arbitrary tool names.
- Never execute arbitrary shell commands from agents.
- Never execute arbitrary SQL supplied by agents.
- Never expose protected credentials.
- Validate parameters before execution.
- Use restricted access to protected resources.
- Record execution outcomes.

For the MVP, all protected tools must be mock services with fictional data.

# 12. GEMINI SECURITY REQUIREMENTS

Gemini must receive only the information required for contextual task-action analysis.

Never send:

- API keys.
- Passwords.
- Authentication tokens.
- Database credentials.
- Unnecessary private records.
- Complete database contents.

Required protections:

- Controlled prompt structure.
- Input sanitization where appropriate.
- Structured output validation.
- Request timeout.
- Quota handling.
- Error handling.
- Output size limits.
- No direct tool execution.
- No independent authorization authority.

Gemini results must be distinguishable from OPA decisions in the dashboard and audit records.

# 13. DATABASE AND AUDIT SECURITY

Database requirements:

- Use parameterized queries.
- Apply access control.
- Use migrations.
- Avoid storing unnecessary sensitive content.
- Protect database credentials.
- Enforce foreign-key relationships.
- Use transactions for related operations.

Audit requirements:

- Record important security events.
- Restrict event modification.
- Avoid storing secrets.
- Link events through request IDs.
- Preserve decision history.
- Protect database backups.

The MVP audit system provides controlled application-level write protection, not guaranteed cryptographic immutability.

# 14. HUMAN USER SECURITY

Dashboard users must be authenticated.

Initial requirements:

- Secure password hashing.
- Session expiry.
- Logout.
- Role-based authorization.
- Login rate limiting.
- CSRF protection when cookie-based sessions are used.
- Secure cookies in production.
- Backend permission checks.

The following roles are planned:

- Administrator.
- Security Operator.
- Reviewer.
- Auditor.

# 15. NETWORK AND SERVICE SECURITY

For local development:

- Bind internal services to local interfaces where possible.
- Do not expose OPA publicly.
- Keep mock tools inside the protected backend.
- Restrict CORS to the development frontend origin.
- Keep API keys outside the frontend.
- Avoid unnecessary external ports.

For future deployment:

- Use HTTPS.
- Restrict service-to-service access.
- Use private network connections where appropriate.
- Apply rate limits.
- Use secure secrets management.
- Keep database and policy services private.
- Monitor access and failures.

# 16. SECURITY ERROR HANDLING

| Failure | Expected action |
|---|---|
| Invalid identity | Reject |
| Missing contract | BLOCK |
| Expired contract | BLOCK |
| Invalid parameter | Reject |
| OPA timeout | No execution |
| OPA invalid output | No execution |
| Gemini timeout | REVIEW or BLOCK when required |
| Gemini invalid response | REVIEW or BLOCK when required |
| Database unavailable | No protected authorization |
| Approval expired | No execution |
| Tool execution error | Record failure |

Do not silently replace security failures with successful responses.

# 17. SECURITY TESTING PLAN

The following tests are mandatory.

## Identity Tests

- Unknown identity.
- Invalid token.
- Revoked token.
- Disabled agent.
- Missing token.
- Expired credential where implemented.

## Contract Tests

- Missing contract.
- Invalid contract.
- Expired contract.
- Wrong agent ownership.
- Unauthorized contract modification.
- Contract version change.

## Authorization Tests

- Forbidden tool.
- Forbidden operation.
- Restricted resource.
- Invalid parameters.
- Disallowed export.
- Read-only task requesting deletion.

## Integration Failure Tests

- OPA unavailable.
- Invalid OPA response.
- Gemini unavailable.
- Gemini malformed output.
- Database failure.
- Tool execution failure.

## Bypass Tests

- Agent tries to contact a protected mock tool directly.
- Agent supplies a different agent ID in its request.
- Agent attempts to change its own Task Contract.
- Agent attempts to reuse approval for modified request data.

## Expected Security Result

A blocked request must produce zero executions of the protected mock tool.

A REVIEW request must remain unexecuted until the exact request is approved and revalidated.

# 18. SECURITY ACCEPTANCE CRITERIA

The security model is implemented correctly only when:

1. Agent identities are authenticated.
2. Task Contracts are trusted and protected.
3. Gateway access is mandatory for protected tools.
4. Every protected request is validated.
5. Task-action restrictions are checked.
6. OPA decisions are enforced.
7. Gemini cannot independently grant access.
8. Approval is authorized and request-specific.
9. Direct bypass attempts are rejected.
10. Security decisions are recorded.
11. Failure conditions do not silently authorize actions.
12. Required security tests pass.

# 19. SECURITY LIMITATIONS

AEGIS does not guarantee:

- Detection of every prompt injection.
- Detection of every malicious intention.
- Complete protection against compromised host systems.
- Security of tools that are configured to bypass the gateway.
- Correctness of an incorrectly written Task Contract.
- Protection against every possible software vulnerability.

AEGIS protects the configured application-level execution path.

Its real effectiveness depends on correct implementation, secure deployment, proper tool isolation and ongoing testing.

# 20. SECURITY IMPROVEMENTS FOR FUTURE VERSIONS

Possible enhancements:

- Cryptographic audit integrity.
- Advanced anomaly detection.
- Agent behaviour profiling.
- More advanced DLP.
- Enterprise identity integration.
- Stronger service-to-service authentication.
- MCP tool security.
- Central policy administration.
- External security assessment.
- Production threat monitoring.

These are not mandatory features of the initial MVP.

# 21. OFFICIAL SECURITY REFERENCES

- OWASP Top 10 for Agentic Applications: https://genai.owasp.org/
- OWASP GenAI Security Project: https://genai.owasp.org/
- Open Policy Agent: https://www.openpolicyagent.org/docs
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- FastAPI Security: https://fastapi.tiangolo.com/tutorial/security/
- Google Gemini API: https://ai.google.dev/gemini-api/docs

---

**END OF SECURITY_MODEL.md**