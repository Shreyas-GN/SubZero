# Implementation Roadmap: SubZero

---

# STEP 1: Scope Analysis

The MVP consists of:

* User authentication
* Subscription CRUD
* Category management
* Dashboard analytics
* Search and filters
* Upcoming renewals
* Background email reminders
* Responsive React UI
* Error handling and validation

The architecture uses:

* React + Tailwind
* Rails API
* PostgreSQL
* Sidekiq + Redis

The schema contains:

* users
* categories
* subscriptions
* reminder_logs
* sessions

---

# STEP 2: Dependency Mapping

The following dependency order must be respected:

```text id="lm1r2w"
Project Setup
      ↓
Database
      ↓
Models
      ↓
Authentication
      ↓
API Endpoints
      ↓
Business Logic
      ↓
Frontend Pages
      ↓
Dashboard
      ↓
Background Jobs
      ↓
Polish & Testing
      ↓
Deployment
```

Frontend pages should never be built before APIs exist.

---

# Implementation Roadmap: SubZero

---

# Foundation

---

## Phase 1: Repository Initialization

### Objective

Create the monorepo structure and initialize frontend and backend projects.

### Tasks

* [ ] Create repository.
* [ ] Create backend Rails API project.
* [ ] Create frontend React + Vite project.
* [ ] Configure Git.
* [ ] Create `.env.example`.
* [ ] Create README.
* [ ] Create branch strategy.

### Verification

Repository contains:

```text id="2bg0gl"
backend/
frontend/
```

Applications start successfully.

---

## Phase 2: Backend Infrastructure

### Objective

Configure Rails and database infrastructure.

### Tasks

* [ ] Configure PostgreSQL.
* [ ] Configure UUID primary keys.
* [ ] Configure Redis.
* [ ] Configure Sidekiq.
* [ ] Configure CORS.
* [ ] Create API namespace structure.
* [ ] Configure serializers.
* [ ] Setup environment variables.

### Verification

Backend boots successfully.

Database connection works.

Redis connection works.

---

## Phase 3: Database Schema

### Objective

Implement database tables and relationships.

### Tasks

#### Users table

* [ ] Create migration.
* [ ] Add indexes.

#### Categories table

* [ ] Create migration.
* [ ] Add unique constraint.

#### Subscriptions table

* [ ] Create migration.
* [ ] Add foreign keys.
* [ ] Add enum fields.
* [ ] Add indexes.

#### Reminder logs table

* [ ] Create migration.
* [ ] Add indexes.

#### Sessions table

* [ ] Create migration.

### Verification

Database migrations execute successfully.

Relationships are valid.

---

# Authentication Layer

---

## Phase 4: User Authentication

### Objective

Implement secure user authentication.

### Tasks

* [ ] Create User model.
* [ ] Add bcrypt.
* [ ] Implement signup endpoint.
* [ ] Implement login endpoint.
* [ ] Implement logout endpoint.
* [ ] Implement current-user endpoint.
* [ ] Configure secure cookies.
* [ ] Add validations.

### Verification

User can:

* Register
* Login
* Logout

Session persists.

---

# Backend & API

---

## Phase 5: Categories Module

### Objective

Implement category management.

### Tasks

* [ ] Create Category model.
* [ ] Seed default categories.
* [ ] Create category endpoints.
* [ ] Add validations.

### Verification

Categories can be retrieved successfully.

---

## Phase 6: Subscription Module

### Objective

Implement subscription CRUD.

### Tasks

* [ ] Create Subscription model.
* [ ] Add associations.
* [ ] Add validations.
* [ ] Create controller.
* [ ] Implement:

```text id="iz8lnj"
GET subscriptions
POST subscriptions
PATCH subscriptions
DELETE subscriptions
GET single subscription
```

* [ ] Add soft delete support.

### Verification

CRUD operations function correctly.

---

## Phase 7: Search & Filters

### Objective

Allow users to search and filter subscriptions.

### Tasks

* [ ] Search by name.
* [ ] Filter by category.
* [ ] Filter by status.
* [ ] Add query parameters.

### Verification

Filtering and searching return correct records.

---

## Phase 8: Dashboard APIs

### Objective

Provide analytics endpoints.

### Tasks

* [ ] Total monthly spending.
* [ ] Total yearly spending.
* [ ] Active subscription count.
* [ ] Upcoming renewals.
* [ ] Recent subscriptions.

### Verification

Dashboard endpoint returns aggregated data.

---

# Core Feature Logic

---

## Phase 9: Reminder System

### Objective

Implement email reminder engine.

### Tasks

* [ ] Configure ActionMailer.
* [ ] Create ReminderLog model.
* [ ] Create mail templates.
* [ ] Create ReminderService.
* [ ] Create DailyReminderJob.
* [ ] Configure Sidekiq cron.

Workflow:

```text id="g8gj3m"
Daily Job
 ↓
Find renewals
 ↓
Send email
 ↓
Create reminder log
```

### Verification

Renewal emails are delivered successfully.

Logs are created.

---

# Frontend Integration

---

## Phase 10: React Foundation

### Objective

Setup frontend architecture.

### Tasks

* [ ] Configure Tailwind.
* [ ] Configure React Router.
* [ ] Setup Axios.
* [ ] Setup Context API.
* [ ] Setup protected routes.
* [ ] Configure toast notifications.

### Verification

Frontend structure is operational.

---

## Phase 11: Authentication Pages

### Objective

Implement login and registration pages.

### Tasks

* [ ] Register page.
* [ ] Login page.
* [ ] Auth context.
* [ ] Session persistence.
* [ ] Logout functionality.

### Verification

User can authenticate through UI.

---

## Phase 12: Dashboard UI

### Objective

Build dashboard experience.

### Tasks

* [ ] Statistics cards.
* [ ] Upcoming renewals section.
* [ ] Recent subscriptions.
* [ ] Loading states.
* [ ] Empty states.

### Verification

Dashboard displays API data.

---

## Phase 13: Subscription Management UI

### Objective

Create subscription screens.

### Tasks

* [ ] Subscription list page.
* [ ] Create form.
* [ ] Edit form.
* [ ] Delete modal.
* [ ] Form validation.
* [ ] Loading states.

### Verification

User can manage subscriptions visually.

---

## Phase 14: Search and Filter UI

### Objective

Implement filtering experience.

### Tasks

* [ ] Search input.
* [ ] Category dropdown.
* [ ] Status filter.
* [ ] Query synchronization.

### Verification

Search and filters work correctly.

---

# Polish & Final MVP

---

## Phase 15: Error Handling

### Objective

Improve reliability.

### Tasks

* [ ] API error handling.
* [ ] Toast notifications.
* [ ] Validation errors.
* [ ] 404 pages.
* [ ] Unauthorized states.

### Verification

Application gracefully handles failures.

---

## Phase 16: Responsive Design

### Objective

Ensure mobile compatibility.

### Tasks

* [ ] Mobile navbar.
* [ ] Tablet layout.
* [ ] Responsive cards.
* [ ] Responsive tables.

### Verification

UI works on:

* Mobile
* Tablet
* Desktop

---

## Phase 17: Testing

### Objective

Validate business logic.

### Tasks

### Backend

* [ ] Model specs.
* [ ] Request specs.
* [ ] Service specs.
* [ ] Job specs.

### Frontend

* [ ] Component tests.
* [ ] Form tests.
* [ ] Dashboard tests.

### Verification

Critical functionality is covered.

---

## Phase 18: Seed Data

### Objective

Improve development experience.

### Tasks

* [ ] Create categories seed.
* [ ] Create demo user.
* [ ] Create sample subscriptions.

### Verification

Fresh setup contains usable demo data.

---

## Phase 19: Deployment

### Objective

Deploy production MVP.

### Tasks

### Backend

* [ ] Deploy Rails API.
* [ ] Configure PostgreSQL.
* [ ] Configure Redis.
* [ ] Configure Sidekiq worker.
* [ ] Configure environment variables.

### Frontend

* [ ] Deploy React app.
* [ ] Configure API URLs.
* [ ] Configure CORS.

### Verification

Production environment is operational.

---

## Phase 20: Final QA

### Objective

Validate the complete MVP.

### Tasks

Verify:

* [ ] Registration
* [ ] Login
* [ ] Logout
* [ ] Add subscription
* [ ] Edit subscription
* [ ] Delete subscription
* [ ] Search
* [ ] Filters
* [ ] Dashboard analytics
* [ ] Upcoming renewals
* [ ] Email reminders
* [ ] Mobile responsiveness
* [ ] Error handling

### Verification

The complete MVP is production-ready.

---

# Build Sequence Summary

```text id="0t2byk"
Phase 1  Repository Setup
      ↓
Phase 2  Infrastructure
      ↓
Phase 3  Database
      ↓
Phase 4  Authentication
      ↓
Phase 5  Categories
      ↓
Phase 6  Subscription CRUD
      ↓
Phase 7  Search & Filters
      ↓
Phase 8  Dashboard APIs
      ↓
Phase 9  Reminder Engine
      ↓
Phase 10 Frontend Setup
      ↓
Phase 11 Auth UI
      ↓
Phase 12 Dashboard UI
      ↓
Phase 13 Subscription UI
      ↓
Phase 14 Search UI
      ↓
Phase 15 Error Handling
      ↓
Phase 16 Responsive Design
      ↓
Phase 17 Testing
      ↓
Phase 18 Seed Data
      ↓
Phase 19 Deployment
      ↓
Phase 20 Final QA
```

This sequence should be followed strictly. No phase should begin until the verification criteria of the previous phase have been satisfied.

---
