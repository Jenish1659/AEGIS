# AEGIS – Task-Aware Runtime Security Gateway for Autonomous AI Agents

**Tagline:** Verify Every Action. Enforce Least Privilege.

**Project Type:** AI Security / Cybersecurity  
**Project Stage:** Documentation and Planning / MVP Development Pending  
**Primary Language:** Python  
**Backend:** FastAPI  
**Frontend:** React + TypeScript  
**Policy Engine:** Open Policy Agent (OPA)  
**AI Integration:** Google Gemini API  
**Database:** SQLite for MVP, PostgreSQL for future deployment

---

## 1. Project Overview

AEGIS is a task-aware runtime security gateway designed to protect tools and resources used by autonomous AI agents.

AI agents can perform tasks such as searching information, reading records, processing data, and interacting with external tools. However, giving an AI agent access to a tool does not mean every action it requests should be allowed.

For example, an agent may have access to a database for reading information but should not be allowed to delete records when its assigned task only permits reading.

AEGIS addresses this problem by checking whether an agent's requested action matches its assigned task, permissions, resource scope, and security policies before allowing the action to execute.

It acts as a security layer between AI agents and protected tools.

**Core principle: An agent must not perform an action simply because it has access to a tool. The requested action must also be permitted by its current task and security policy.**

---

## 2. Problem Statement

Autonomous AI agents can interact with multiple tools and services. This creates security risks when agents:

- Perform actions outside their assigned tasks.
- Attempt operations that exceed their permissions.
- Follow malicious or manipulated instructions.
- Access resources they do not need.
- Attempt unauthorized changes to protected systems.
- Make tool requests that do not match the user's original intention.

Traditional access control often checks whether an agent has general permission to use a tool. However, it may not fully verify whether the requested operation is appropriate for the agent's current task.

AEGIS introduces task-aware runtime verification to address this gap.

---

## 3. Proposed Solution

AEGIS works as an application-layer security gateway between AI agents and protected tools.

Before a protected tool request is executed, AEGIS checks:

1. Agent identity and authentication.
2. Assigned task and active Task Contract.
3. Requested tool and operation.
4. Target resource and permitted scope.
5. Deterministic security restrictions.
6. Additional context when required.
7. Final authorization through Open Policy Agent.

AEGIS produces one of three decisions:

| Decision | Meaning |
|---|---|
| ALLOW | The request satisfies the required security rules. |
| BLOCK | The request violates a mandatory security rule. |
| REVIEW | Human approval or additional verification is required. |

The gateway enforces the final decision. A blocked or unapproved request must never reach the protected tool.

---

## 4. Core Innovation – Intent-to-Action Security Verification

The main concept behind AEGIS is **Intent-to-Action Security Verification**.

It checks whether an agent's requested action is consistent with its currently assigned task.

For example:

- Assigned task: Read customer records.
- Available tool: Database.
- Requested operation: Read records.
- Result: ALLOW, if all other policies are satisfied.

However:

- Assigned task: Read customer records.
- Available tool: Database.
- Requested operation: Delete records.
- Result: BLOCK.

The important difference is that AEGIS does not rely only on general tool access. It also evaluates the current task and requested operation.

This is the main security capability that the MVP aims to demonstrate.

---

## 5. Main Features

### 5.1 Agent Identity Management
- Register simulated AI agents.
- Assign unique identities.
- Authenticate agents using backend-managed credentials.
- Track agent activity.
- Prevent agents from choosing their own trusted identity through request data.

### 5.2 Task Contract Management
- Create task contracts.
- Assign tasks to agents.
- Define permitted tools and operations.
- Define permitted resources.
- Set approval requirements.
- Track active contract versions.

### 5.3 Runtime Security Gateway
- Intercept protected tool requests.
- Validate agent identity.
- Check the active Task Contract.
- Perform deterministic security checks.
- Submit trusted policy input to OPA.
- Enforce ALLOW, BLOCK, and REVIEW decisions.

### 5.4 OPA Policy Enforcement
- Use Open Policy Agent as the policy decision point.
- Apply default-deny authorization.
- Enforce operation and resource restrictions.
- Return a final policy decision.
- Prevent execution when policy evaluation fails.

### 5.5 Gemini Context Analysis
- Use Gemini for additional context analysis when necessary.
- Analyze unclear task-to-action relationships.
- Return structured advisory information.
- Pass validated results to the backend policy process.

**Important:** Gemini is not the final authorization authority. It cannot grant permissions, override mandatory restrictions, or execute protected tools.

### 5.6 Human Approval
- Send selected requests for human review.
- Display pending approval requests.
- Allow authorized reviewers to approve or reject requests.
- Bind approval to the exact request.
- Revalidate the request before execution.

### 5.7 Audit Logging
- Record security decisions.
- Record agent and task information.
- Track tool execution outcomes.
- Maintain request history.
- Support filtering and monitoring.

### 5.8 Security Dashboard
- Display agent activity.
- Show ALLOW, BLOCK, and REVIEW decisions.
- Display pending approvals.
- Show recent security events.
- Provide request monitoring and audit history.

---

## 6. System Architecture

The planned request flow is:

```text
             AI AGENT
                 |
                 v
        Agent Authentication
                 |
                 v
        Request Validation
                 |
                 v
        Task Contract Check
                 |
                 v
       Deterministic Checks
                 |
          +------+------+
          |             |
          v             v
       BLOCK       Context Needed?
                        |
                  +-----+-----+
                  |           |
                 No          Yes
                  |           |
                  |           v
                  |      Gemini Analysis
                  |           |
                  +-----+-----+
                        |
                        v
                Final OPA Decision
                        |
             +----------+----------+
             |          |          |
             v          v          v
           ALLOW      BLOCK      REVIEW
             |          |          |
             v          v          v
        Protected    Reject     Human Review
          Tool        Request       |
             |                    |
             v                    v
         Execution             Revalidate
             |
             v
        Audit Logging
```

The backend is responsible for building trusted policy input and enforcing the final decision.

OPA must not be directly accessible to AI agents or the frontend.

---

## 7. Technology Stack

| Area | Technology |
|---|---|
| Backend | Python, FastAPI |
| Data Validation | Pydantic |
| Database ORM | SQLAlchemy |
| Database Migration | Alembic |
| Policy Engine | Open Policy Agent |
| Policy Language | Rego |
| AI Integration | Google Gemini API |
| AI SDK | google-genai |
| Frontend | React |
| Frontend Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Frontend Validation | Zod |
| Backend Testing | Pytest |
| API Testing | HTTPX |
| Frontend Testing | Vitest, React Testing Library |
| End-to-End Testing | Playwright |
| Version Control | Git and GitHub |
| Local Database | SQLite |
| Future Database | PostgreSQL |

Technology versions and dependencies should be verified during environment setup.

---

## 8. Simulated Agents for the MVP

The initial MVP will use three simulated agents.

### Research Agent
- Performs permitted public research.
- Uses approved research tools.
- Cannot access restricted finance or administration operations.

### Finance Agent
- Works with fictional finance records.
- Performs permitted reading and report tasks.
- Cannot perform unauthorized financial operations.

### Admin Agent
- Performs approved test administration tasks.
- Uses simulated administrative tools.
- Must follow the permissions defined in its active Task Contract.

These agents will use fictional data and mock tools during the initial demonstration.

---

## 9. Main Security Demonstration

The MVP should demonstrate three important outcomes.

### Scenario 1: Authorized Request

- Agent receives a task to search public information.
- The request matches its Task Contract.
- Security checks pass.
- OPA returns ALLOW.
- The mock research tool executes.

### Scenario 2: Unauthorized Request

- Admin Agent receives a read-only database task.
- It attempts to delete a record.
- The requested operation violates its Task Contract.
- AEGIS returns BLOCK.
- The delete operation is never executed.
- The audit record shows the blocked request.

### Scenario 3: Human Approval

- An agent requests an operation that requires additional approval.
- AEGIS returns REVIEW.
- The request is sent to the approval dashboard.
- An authorized reviewer makes a decision.
- The request is revalidated before any execution.

All demonstration results must come from actual implementation and test execution. Planned scenarios must not be presented as completed test results.

---

## 10. Security Principles

AEGIS follows these security principles:

- Least privilege.
- Default-deny authorization.
- Fail-closed policy enforcement.
- Trusted agent authentication.
- Server-side Task Contracts.
- Gateway-controlled tool execution.
- No direct agent access to protected tool credentials.
- Gemini is advisory, not authoritative.
- Human approval for selected sensitive operations.
- Request-specific approval validation.
- Secure audit logging.
- Input validation and controlled error handling.

If OPA is unavailable or returns an invalid response, protected execution must not proceed.

If Gemini is unavailable when additional context is required, the request must not automatically be allowed. It should be sent for review or blocked according to the defined policy.

---

## 11. Project Structure

The planned high-level structure is:

```text
AEGIS/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── gateway/
│   │   ├── policies/
│   │   ├── tools/
│   │   ├── approvals/
│   │   ├── audit/
│   │   └── main.py
│   ├── tests/
│   ├── alembic/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── main.tsx
│   └── package.json
│
├── opa/
│   ├── policies/
│   └── tests/
│
├── docs/
│   ├── SECURITY_MODEL.md
│   ├── API_SPECIFICATION.md
│   ├── DATABASE_DESIGN.md
│   ├── OPA_POLICY_DESIGN.md
│   ├── GEMINI_INTEGRATION.md
│   └── TESTING_STRATEGY.md
│
├── README.md
├── PRD.md
├── ARCHITECTURE.md
├── AGENT_RULES.md
├── DEVELOPMENT_PHASES.md
├── DESIGN_SYSTEM.md
├── UI_UX.md
├── BACKEND.md
├── PROJECT_STATE.md
└── DOCUMENTATION_CONSISTENCY_CHECK.md
```

This is the planned structure. The actual repository must be updated to match the final approved architecture.

---

## 12. Installation and Setup

**Current status:** The implementation and environment setup have not yet been verified. The following steps describe the planned setup.

### Prerequisites

Install:

- Python 3.12 or a compatible supported version.
- Node.js LTS.
- npm.
- Git.
- Open Policy Agent.
- A code editor such as Visual Studio Code.

### Backend Setup

```bash
cd backend

python -m venv .venv
```

Activate the virtual environment.

Windows:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the development server:

```bash
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

### OPA Setup

OPA should run as a private service accessible only to the backend.

Its policy files and test commands must follow `docs/OPA_POLICY_DESIGN.md`.

Do not expose OPA directly to the browser or AI agents.

---

## 13. Environment Variables

The backend will use environment variables for configuration.

Example:

```env
APP_ENV=development
DATABASE_URL=sqlite:///./aegis.db

GEMINI_ENABLED=false
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.8-flash

OPA_URL=http://localhost:8181
```

These are example development settings, not a complete production configuration.

Additional settings for authentication, secrets, timeouts, and security controls must be defined during implementation.

**Never commit `.env` files, API keys, passwords, access tokens, or private credentials to GitHub.**

Create a `.env.example` file containing placeholder values only.

---

## 14. Testing Strategy

Testing is required before presenting AEGIS as a working security system.

The planned testing areas include:

- Agent authentication tests.
- Task Contract validation tests.
- Tool and operation authorization tests.
- OPA policy tests.
- Gemini response validation tests.
- Approval workflow tests.
- Protected tool execution tests.
- Direct tool bypass tests.
- Audit logging tests.
- Backend API tests.
- Frontend component tests.
- End-to-end workflow tests.

Important security test:

A blocked request must produce zero protected tool execution calls.

Testing must also verify that missing policy responses, invalid identities, expired approvals, and unavailable required services do not lead to unauthorized execution.

---

## 15. Development Roadmap

The project will be developed in phases:

1. Documentation review and finalization.
2. Repository and development environment setup.
3. Database models and migrations.
4. Agent identity and Task Contract implementation.
5. Mock agents and protected tools.
6. Runtime gateway implementation.
7. OPA policy integration.
8. Gemini context analysis integration.
9. Human approval and audit logging.
10. Frontend dashboard development.
11. Full system integration and security testing.
12. Final documentation, demonstration, and release preparation.

Each phase must be tested and verified before moving to the next phase.

---

## 16. Project Limitations

The initial MVP will have the following limitations:

- Uses simulated agents and mock protected tools.
- Uses fictional data.
- Does not guarantee detection of every prompt injection attack.
- Depends on correct Task Contracts and security policies.
- Gemini analysis may be incorrect or incomplete.
- Security enforcement depends on all protected tool calls passing through the gateway.
- Local MVP testing does not prove production-level isolation or security.

These limitations must be clearly stated in project demonstrations and documentation.

---

## 17. Future Improvements

Possible future improvements include:

- Integration with real agent frameworks.
- Support for additional protected tools.
- Advanced policy management.
- Stronger service isolation.
- More detailed security analytics.
- Improved approval workflows.
- PostgreSQL deployment.
- Production authentication and identity management.
- Additional security testing and monitoring.

These are future possibilities, not completed MVP features.

---

## 18. Documentation

The project documentation is divided into two groups.

### Main Documentation

- `PRD.md`
- `ARCHITECTURE.md`
- `AGENT_RULES.md`
- `DEVELOPMENT_PHASES.md`
- `DESIGN_SYSTEM.md`
- `UI_UX.md`
- `BACKEND.md`
- `PROJECT_STATE.md`

### Technical Documentation

- `docs/SECURITY_MODEL.md`
- `docs/API_SPECIFICATION.md`
- `docs/DATABASE_DESIGN.md`
- `docs/OPA_POLICY_DESIGN.md`
- `docs/GEMINI_INTEGRATION.md`
- `docs/TESTING_STRATEGY.md`

The documentation consistency review is maintained in:

- `DOCUMENTATION_CONSISTENCY_CHECK.md`

All documentation must remain aligned with the actual implementation.

---

## 19. Project Status

| Area | Current Status |
|---|---|
| Project concept | Defined |
| Product requirements | Drafted |
| System architecture | Drafted |
| Security model | Drafted |
| API specification | Drafted |
| Database design | Drafted |
| OPA policy design | Drafted |
| Gemini integration plan | Drafted |
| Testing strategy | Drafted |
| UI/UX documentation | Drafted |
| README | Created |
| Full consistency review | Pending |
| Backend implementation | Not started |
| Frontend implementation | Not started |
| Integration testing | Not started |
| Final demonstration | Pending |

Project status must be updated only after actual work has been completed and verified.

---

## 20. Final Objective

The goal of AEGIS is to demonstrate how a task-aware security gateway can reduce unauthorized actions by autonomous AI agents through trusted identity, explicit task permissions, runtime policy enforcement, optional context analysis, and human approval.

**AEGIS – Verify Every Action. Enforce Least Privilege.**