# SubZero

![Rails](https://img.shields.io/badge/Ruby_on_Rails-8-red?style=flat-square)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat-square)
![Redis](https://img.shields.io/badge/Redis-red?style=flat-square)
![Sidekiq](https://img.shields.io/badge/Sidekiq-Background_Jobs-green?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=flat-square)
![RSpec](https://img.shields.io/badge/Tested-RSpec-success?style=flat-square)
![Vitest](https://img.shields.io/badge/Tested-Vitest-success?style=flat-square)

<p align="center">
  <img src="./docs/dashboard.gif" width="100%" alt="SubZero Dashboard"/>
</p>

## A high-fidelity SaaS application engineered to track, visualize, and automate recurring financial subscriptions.

SubZero helps users understand where their recurring money goes, receive renewal reminders, and eliminate forgotten subscriptions before they silently accumulate.

---

# Tech Stack

| Layer          | Technology                  |
| -------------- | --------------------------- |
| Backend        | Ruby on Rails 8 API         |
| Frontend       | React 19 + Vite             |
| Database       | PostgreSQL                  |
| Queue System   | Sidekiq + Redis             |
| Validation     | React Hook Form + Zod       |
| Charts         | Recharts                    |
| Testing        | RSpec + FactoryBot + Vitest |
| Infrastructure | Docker + Docker Compose     |

---

# System Architecture

SubZero follows a service-oriented backend architecture with thin controllers and isolated business logic.

```text
React 19
    ↓
REST API
    ↓
Rails Controllers
    ↓
Service Objects
    ↓
PostgreSQL
    ↓
Redis + Sidekiq
    ↓
ActionMailer
```

### Backend Patterns

* **Service Object Pattern** keeps controllers thin and business logic reusable.
* **Session-based HttpOnly authentication** protects user sessions.
* **Strict multi-tenant foreign-key isolation** ensures users only access their own records.
* **Soft-delete patterns** preserve historical financial data.
* **Global exception handling** normalizes API failures.

---

# Asynchronous Pipeline

Heavy work is intentionally removed from request-response cycles.

```text
Daily Cron
     ↓
Sidekiq Worker
     ↓
Reminder Service
     ↓
ReminderLog Ledger
     ↓
ActionMailer
     ↓
User Inbox
```

The asynchronous pipeline prevents email generation from blocking web requests and provides retry safety.

---

# Hard Problems Solved

### Idempotency & Deduplication

Engineered a `ReminderLog` ledger system that guarantees users never receive duplicate renewal emails, even if Sidekiq retries jobs.

---

### Global Exception Handling

Centralized error recovery at the ApplicationController layer to enforce a normalized JSON contract and avoid leaking internal stack traces.

---

### Multi-Tenant Data Isolation

Designed database relationships with strict foreign-key ownership so users cannot access records belonging to other accounts.

---

### Resilient UI States

Implemented loading skeletons, empty states, and hydrated data states to eliminate layout shift and maintain a predictable experience.

---

### Soft Deletion

Preserved historical financial records while excluding deleted subscriptions from active queries.

---

# One-Command Setup

```bash
docker compose up -d
```

Expected services:

```text
✔ postgres     running
✔ redis        running
✔ rails-api    running
✔ sidekiq      running
✔ react-app    running
```

---

# Environment Variables

| Variable        | Description            |
| --------------- | ---------------------- |
| DATABASE_URL    | PostgreSQL connection  |
| REDIS_URL       | Redis connection       |
| SECRET_KEY_BASE | Rails secret           |
| SMTP_USERNAME   | Mail provider username |
| SMTP_PASSWORD   | Mail provider password |
| FRONTEND_URL    | React application URL  |

---

# Project Structure

```text
SubZero
│
├── backend
│   ├── app
│   │   ├── controllers
│   │   ├── models
│   │   ├── services
│   │   ├── jobs
│   │   └── mailers
│   │
│   ├── spec
│   └── config
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── services
│   │   └── utils
│   │
│   └── tests
│
├── docker-compose.yml
└── README.md
```

---

# Testing Strategy

### Backend

* RSpec
* FactoryBot
* Request specs
* Service object tests
* Model validations

### Frontend

* Vitest
* Utility tests
* Axios mocks
* Deterministic component behavior

---

# Design Goals

* Product-grade architecture
* Thin controllers
* Background processing
* Multi-tenant safety
* Predictable error contracts
* Responsive UI
* High testability
* Docker-first development

---

<details>

<summary>Local Development</summary>

### Backend

```bash
cd backend
bundle install
rails db:create db:migrate
rails s
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

</details>

<details>

<summary>API Documentation</summary>

### Auth

POST /login

POST /register

POST /logout

### Subscriptions

GET /subscriptions

POST /subscriptions

PATCH /subscriptions/:id

DELETE /subscriptions/:id

### Dashboard

GET /dashboard

</details>

---

Built to demonstrate full-stack ownership, product thinking, and production-grade engineering principles.
