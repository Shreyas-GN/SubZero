# Architecture & Tech Stack: SubZero

---

# STEP 1: Architecture Analysis

## Rendering Requirements

SubZero is a highly interactive dashboard application rather than an SEO-focused marketing website.

Requirements:

* Dynamic dashboards
* Real-time UI updates after CRUD operations
* Search and filtering
* Forms and authenticated pages

### Rendering Strategy

* Client-side rendering (CSR) using React
* Backend exposed through REST APIs
* Authentication-protected pages
* No SSR required for MVP

---

## Database Requirements

The application contains strongly related entities:

* Users
* Subscriptions
* Categories

Characteristics:

* One-to-many relationships
* Filtering
* Aggregations
* Date-based queries
* ACID guarantees

### Database Choice

PostgreSQL

Reason:

* Relational data model
* Excellent aggregation capabilities
* Mature Rails support
* Production-ready

---

## Background Processing Requirements

Daily asynchronous jobs are required for:

* Renewal reminder emails
* Scheduled tasks

Requirements:

* Retry mechanism
* Queue management
* Non-blocking execution

### Background Processor

Sidekiq + Redis

---

# STEP 2: Selected Technology Stack

This architecture intentionally mirrors the Bornwest engineering stack.

---

# 1. Core Tech Stack

## Backend

| Component       | Technology      |
| --------------- | --------------- |
| Framework       | Ruby on Rails 8 |
| Language        | Ruby 3.4        |
| API Style       | REST            |
| Background Jobs | Sidekiq         |
| Queue Store     | Redis           |
| Mail Service    | Action Mailer   |
| Testing         | RSpec           |

---

## Database

| Component  | Technology       |
| ---------- | ---------------- |
| Database   | PostgreSQL 17    |
| ORM        | ActiveRecord     |
| Migrations | Rails Migrations |

---

## Frontend

| Component        | Technology                   |
| ---------------- | ---------------------------- |
| Framework        | React 19                     |
| Language         | JavaScript ES2024            |
| Build Tool       | Vite                         |
| Routing          | React Router v7              |
| State Management | Context API                  |
| API Client       | Axios                        |
| Forms            | React Hook Form              |
| Validation       | Zod                          |
| Charts           | Recharts                     |
| Testing          | Jest + React Testing Library |

---

## Styling

| Component     | Technology      |
| ------------- | --------------- |
| CSS Framework | Tailwind CSS v4 |
| Icons         | Lucide React    |

---

## Authentication

### Backend

Rails session authentication

Using:

* bcrypt
* secure cookies
* HttpOnly cookies

### Frontend

Session-based authentication

Protected routes via React Router.

---

## Deployment

| Layer           | Platform       |
| --------------- | -------------- |
| Frontend        | Vercel         |
| Backend         | Render         |
| Database        | PostgreSQL     |
| Redis           | Render Redis   |
| Background Jobs | Sidekiq Worker |

---

# 2. Architectural Patterns

---

## Overall Architecture

```text
React Frontend
        ↓
Axios
        ↓
REST API
        ↓
Ruby on Rails
        ↓
ActiveRecord
        ↓
PostgreSQL
```

Background Processing

```text
Rails
  ↓
Sidekiq
  ↓
Redis
  ↓
Mailers
```

---

## API Structure

RESTful endpoints only.

### Authentication

```text
POST   /api/v1/signup
POST   /api/v1/login
DELETE /api/v1/logout
GET    /api/v1/me
```

---

### Subscriptions

```text
GET    /api/v1/subscriptions
GET    /api/v1/subscriptions/:id
POST   /api/v1/subscriptions
PATCH  /api/v1/subscriptions/:id
DELETE /api/v1/subscriptions/:id
```

---

### Dashboard

```text
GET /api/v1/dashboard
```

Returns:

* total monthly spending
* yearly spending
* active subscriptions
* upcoming renewals

---

## State Management

### Global State

Context API

Stores:

```text
currentUser
authentication state
theme
```

---

### Local State

React useState

Stores:

* forms
* search queries
* filters
* modal visibility

---

## Validation Pattern

### Frontend

React Hook Form + Zod

Immediate validation.

### Backend

ActiveRecord validations.

Example:

```ruby
validates :name, presence: true
validates :amount, numericality: true
```

---

## Error Handling

Backend returns:

```json
{
  "success": false,
  "errors": [
    "Name can't be blank"
  ]
}
```

Frontend displays toast notifications.

---

## Background Job Pattern

Daily cron job:

```text
DailyReminderJob
        ↓
Find subscriptions renewing tomorrow
        ↓
Trigger mailer
        ↓
Send email
```

---

## Testing Strategy

### Backend

RSpec

Tests:

* Models
* Controllers
* Requests
* Services

---

### Frontend

Jest

Tests:

* Components
* Hooks
* Forms

---

## Git Workflow

Branch strategy:

```text
main
develop

feature/authentication
feature/subscriptions
feature/dashboard
feature-search
feature-reminders
```

Commit convention:

```text
feat:
fix:
refactor:
test:
docs:
```

---

# 3. Folder Structure

## Backend (Rails)

```text
backend/
│
├── app/
│   ├── controllers/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── auth_controller.rb
│   │   │       ├── dashboard_controller.rb
│   │   │       └── subscriptions_controller.rb
│   │
│   ├── models/
│   │   ├── user.rb
│   │   └── subscription.rb
│   │
│   ├── jobs/
│   │   └── daily_reminder_job.rb
│   │
│   ├── mailers/
│   │   └── subscription_mailer.rb
│   │
│   ├── serializers/
│   │
│   └── services/
│       └── reminder_service.rb
│
├── config/
├── db/
│   ├── migrate/
│   └── schema.rb
│
├── spec/
│   ├── models/
│   ├── requests/
│   ├── jobs/
│   └── services/
│
└── Gemfile
```

---

## Frontend (React)

```text
frontend/
│
├── src/
│
├── components/
│   ├── ui/
│   ├── cards/
│   ├── charts/
│   └── forms/
│
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── SubscriptionListPage.jsx
│   ├── CreateSubscriptionPage.jsx
│   └── SettingsPage.jsx
│
├── layouts/
│   ├── AuthLayout.jsx
│   └── DashboardLayout.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
├── hooks/
│
├── services/
│   ├── api.js
│   ├── authService.js
│   └── subscriptionService.js
│
├── utils/
│
├── constants/
│
├── assets/
│
├── styles/
│
├── tests/
│
└── main.jsx
```

---

# 4. Third-Party Integrations

## MVP Services

### Redis

Purpose:

Queue storage for Sidekiq.

---

### SMTP Email Provider

Options:

* Mailtrap (development)
* Resend
* SendGrid

Purpose:

Renewal reminder emails.

---

### Charting Library

Recharts

Purpose:

Dashboard analytics.

---

### Toast Notifications

React Hot Toast

Purpose:

Success and error messages.

---

### Icons

Lucide React

Purpose:

UI icons.

---

# Non-MVP Integrations (DO NOT BUILD YET)

## AI Services

OpenAI

Purpose:

Spending insights.

---

## Banking APIs

Plaid

Purpose:

Automatic transaction import.

---

## OCR

Tesseract

Purpose:

Receipt scanning.

---

## Browser Extension APIs

Chrome Extension API

Purpose:

Free trial tracking.

---

# Architecture Principles

1. API-first design.
2. Thin controllers, fat models/services.
3. RESTful endpoints only.
4. Server-side validation mandatory.
5. Background tasks handled through Sidekiq.
6. Feature-based frontend structure.
7. Mobile-responsive UI by default.
8. Test critical business logic.
9. Use Git feature branches.
10. Maintain production-ready code quality.

---
