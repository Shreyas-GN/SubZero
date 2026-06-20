# Database Schema: SubZero

---

# STEP 1: Entity Analysis

## Core Entities

From the PRD and architecture, the MVP contains the following entities:

1. User
2. Subscription
3. Category
4. Email Reminder Log

---

## Data Flows

### User Flow

```text
User
 ↓
Owns
 ↓
Subscriptions
 ↓
Belongs To
 ↓
Category
```

Daily Sidekiq jobs:

```text
Subscriptions
 ↓
Find upcoming renewals
 ↓
Send email
 ↓
Create reminder log
```

---

# STEP 2: Database Analysis

## Database Engine

PostgreSQL 17

## ORM

Ruby on Rails ActiveRecord

## Database Type

Relational Database

Reason:

* Strong relationships
* ACID guarantees
* Aggregations
* Filtering
* Reporting
* Excellent ActiveRecord support

---

# Database Schema: SubZero

---

# 1. Database Overview

| Component          | Technology              |
| ------------------ | ----------------------- |
| Database Engine    | PostgreSQL 17           |
| ORM                | ActiveRecord            |
| Primary Key Type   | UUID                    |
| Timestamp Strategy | created_at / updated_at |
| Soft Delete        | deleted_at              |
| Enum Storage       | Integer                 |
| Decimal Precision  | decimal(10,2)           |
| Timezone           | UTC                     |

---

# 2. Core Architectural Decisions

---

## UUID Primary Keys

All tables use UUID instead of auto-increment integers.

Benefits:

* Safer public identifiers
* Better horizontal scaling
* Prevents ID enumeration attacks

Example:

```sql
id UUID PRIMARY KEY
```

---

## Soft Deletes

Records are never physically deleted.

Instead:

```sql
deleted_at TIMESTAMP
```

Benefits:

* Recovery
* Auditability
* Prevent accidental data loss

---

## Separate Categories Table

Categories are normalized.

Benefits:

* Prevent duplicates
* Easier filtering
* Future analytics support

---

## Reminder Logs

Email deliveries are tracked.

Benefits:

* Prevent duplicate emails
* Auditing
* Retry support

---

# 3. Tables

---

# users

Stores user accounts.

| Column                | Type         | Constraints      |
| --------------------- | ------------ | ---------------- |
| id                    | UUID         | PRIMARY KEY      |
| name                  | VARCHAR(100) | NOT NULL         |
| email                 | VARCHAR(255) | UNIQUE, NOT NULL |
| password_digest       | VARCHAR(255) | NOT NULL         |
| currency              | VARCHAR(10)  | DEFAULT 'INR'    |
| notifications_enabled | BOOLEAN      | DEFAULT true     |
| deleted_at            | TIMESTAMP    | NULL             |
| created_at            | TIMESTAMP    | NOT NULL         |
| updated_at            | TIMESTAMP    | NOT NULL         |

---

## Indexes

```sql
UNIQUE(email)
INDEX(deleted_at)
```

---

# categories

Stores reusable categories.

Examples:

* Entertainment
* AI Tools
* Productivity
* Finance

| Column     | Type         | Constraints     |
| ---------- | ------------ | --------------- |
| id         | UUID         | PRIMARY KEY     |
| name       | VARCHAR(100) | UNIQUE NOT NULL |
| color      | VARCHAR(20)  | NULL            |
| created_at | TIMESTAMP    | NOT NULL        |
| updated_at | TIMESTAMP    | NOT NULL        |

---

## Indexes

```sql
UNIQUE(name)
```

---

# subscriptions

Central business entity.

| Column        | Type          | Constraints       |
| ------------- | ------------- | ----------------- |
| id            | UUID          | PRIMARY KEY       |
| user_id       | UUID          | FK users(id)      |
| category_id   | UUID          | FK categories(id) |
| name          | VARCHAR(255)  | NOT NULL          |
| amount        | DECIMAL(10,2) | NOT NULL          |
| currency      | VARCHAR(10)   | DEFAULT 'INR'     |
| billing_cycle | INTEGER       | DEFAULT 0         |
| renewal_date  | DATE          | NOT NULL          |
| status        | INTEGER       | DEFAULT 0         |
| notes         | TEXT          | NULL              |
| deleted_at    | TIMESTAMP     | NULL              |
| created_at    | TIMESTAMP     | NOT NULL          |
| updated_at    | TIMESTAMP     | NOT NULL          |

---

## Enum Values

### billing_cycle

```ruby
monthly = 0
quarterly = 1
yearly = 2
```

### status

```ruby
active = 0
cancelled = 1
paused = 2
```

---

## Indexes

```sql
INDEX(user_id)
INDEX(category_id)
INDEX(status)
INDEX(renewal_date)
INDEX(deleted_at)

INDEX(user_id, status)
INDEX(user_id, renewal_date)
```

---

# reminder_logs

Tracks email notifications.

| Column          | Type         | Constraints          |
| --------------- | ------------ | -------------------- |
| id              | UUID         | PRIMARY KEY          |
| user_id         | UUID         | FK users(id)         |
| subscription_id | UUID         | FK subscriptions(id) |
| email           | VARCHAR(255) | NOT NULL             |
| reminder_date   | DATE         | NOT NULL             |
| sent_at         | TIMESTAMP    | NULL                 |
| status          | INTEGER      | DEFAULT 0            |
| error_message   | TEXT         | NULL                 |
| created_at      | TIMESTAMP    | NOT NULL             |
| updated_at      | TIMESTAMP    | NOT NULL             |

---

## Enum Values

```ruby
pending = 0
sent = 1
failed = 2
```

---

## Indexes

```sql
INDEX(subscription_id)
INDEX(user_id)
INDEX(reminder_date)

INDEX(subscription_id, reminder_date)
```

---

# sessions

Optional persistent login support.

| Column       | Type         | Constraints  |
| ------------ | ------------ | ------------ |
| id           | UUID         | PRIMARY KEY  |
| user_id      | UUID         | FK users(id) |
| token_digest | VARCHAR(255) | NOT NULL     |
| expires_at   | TIMESTAMP    | NOT NULL     |
| created_at   | TIMESTAMP    | NOT NULL     |
| updated_at   | TIMESTAMP    | NOT NULL     |

---

## Indexes

```sql
INDEX(user_id)
INDEX(expires_at)
```

---

# schema.rb Associations

## User Model

```ruby
has_many :subscriptions
has_many :reminder_logs
has_many :sessions
```

---

## Category Model

```ruby
has_many :subscriptions
```

---

## Subscription Model

```ruby
belongs_to :user
belongs_to :category

has_many :reminder_logs
```

---

## ReminderLog Model

```ruby
belongs_to :user
belongs_to :subscription
```

---

## Session Model

```ruby
belongs_to :user
```

---

# 4. Relationships Summary

---

## One-to-Many

### User → Subscription

```text
User
 1
 |
 N
Subscription
```

One user can own many subscriptions.

---

### Category → Subscription

```text
Category
 1
 |
 N
Subscription
```

One category contains many subscriptions.

---

### Subscription → Reminder Logs

```text
Subscription
 1
 |
 N
ReminderLog
```

One subscription may generate many reminders.

---

### User → Reminder Logs

```text
User
 1
 |
 N
ReminderLog
```

---

### User → Sessions

```text
User
 1
 |
 N
Session
```

---

# Query Patterns Optimized

These indexes support the most common queries:

### Dashboard

```sql
WHERE user_id = ?
AND status = active
```

---

### Upcoming Renewals

```sql
WHERE renewal_date <= tomorrow
```

---

### Category Filters

```sql
WHERE category_id = ?
```

---

### Search

```sql
WHERE user_id = ?
AND name ILIKE '%spotify%'
```

(Future enhancement: PostgreSQL pg_trgm index)

---

# Future Tables (NOT FOR MVP)

Do NOT create these tables yet:

### ai_insights

For OpenAI analysis.

---

### receipts

For OCR and email parsing.

---

### bank_accounts

For Plaid integration.

---

### transactions

For automatic payment tracking.

---

### teams

For multi-user support.

---

### notifications

For SMS and push notifications.

---

### audit_logs

For enterprise plans.

---

# Final ER Diagram

```text
User
 │
 ├──────────────┐
 │              │
 ▼              ▼
Subscription   Session
 │
 ▼
Category
 │
 ▼
ReminderLog
```

---

# Database Principles

1. UUID primary keys everywhere.
2. Soft deletes via deleted_at.
3. UTC timestamps only.
4. Normalized categories.
5. Foreign keys enforced.
6. Indexed for dashboard and renewal queries.
7. No denormalization in MVP.
8. Prepared for future AI and integrations.
9. ActiveRecord-friendly design.
10. Production-grade PostgreSQL schema.

---
