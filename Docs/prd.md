# Product Requirements Document (PRD): SubZero

---

# 1. Product Overview

## The Problem

Consumers and professionals subscribe to numerous services but often lose track of recurring payments. This leads to unnecessary spending and forgotten subscriptions.

Existing solutions commonly require direct bank access, creating trust concerns and privacy barriers.

Users need a lightweight and trustworthy way to manage subscriptions without exposing financial credentials.

---

## The Solution

SubZero is a subscription management platform that allows users to manually track subscriptions, view spending insights, monitor upcoming renewals, and receive reminder emails before charges occur.

The application focuses on simplicity, trust, and visibility.

---

# 2. Target Audience

## Persona 1: Casual Subscribers

Users with 5–15 subscriptions such as:

* Netflix
* Spotify
* Prime Video
* ChatGPT
* Canva

Goals:

* Avoid forgotten charges.
* Understand monthly expenses.

---

## Persona 2: Power Users

Users with many recurring services.

Examples:

* Developers
* Designers
* Freelancers
* Students

Goals:

* Organize subscriptions.
* Track spending by category.

---

## Persona 3: Small Business Owners

Users managing SaaS tools.

Examples:

* Notion
* Slack
* Figma
* OpenAI

Goals:

* Monitor recurring costs.
* Receive renewal reminders.

---

# 3. Core User Flows

## Flow 1: Registration

1. User visits landing page.
2. User signs up.
3. Account is created.
4. User is redirected to dashboard.

---

## Flow 2: Add Subscription

1. User clicks "Add Subscription".
2. User enters:

* Name
* Amount
* Billing date
* Category
* Currency

3. User submits form.
4. Subscription is saved.
5. Dashboard updates.

---

## Flow 3: Dashboard Experience (Aha Moment)

1. User logs in.
2. Dashboard displays:

* Total monthly spending
* Total yearly spending
* Number of active subscriptions
* Upcoming renewals

3. User immediately understands recurring expenses.

---

## Flow 4: Renewal Reminder

1. Daily background job executes.
2. System identifies subscriptions renewing tomorrow.
3. Email reminder is generated.
4. User receives notification.
5. User avoids unwanted renewal.

---

## Flow 5: Manage Subscriptions

1. User opens subscription list.
2. User searches subscriptions.
3. User edits or deletes records.
4. Changes are reflected immediately.

---

# 4. Feature Specifications

---

## Authentication Module

### Pages

* Sign Up
* Login

### Capabilities

* Register account
* Login
* Logout
* Session management

---

## Dashboard

### Metrics

* Monthly spending
* Yearly spending
* Active subscription count
* Upcoming renewals

### Components

* Statistics cards
* Recent subscriptions list
* Renewal section

---

## Subscription Management

### Fields

| Field        | Type      |
| ------------ | --------- |
| name         | String    |
| amount       | Decimal   |
| billing_date | Date      |
| category     | String    |
| currency     | String    |
| status       | Enum      |
| user_id      | Reference |

### Operations

* Create
* Read
* Update
* Delete

---

## Categories

Supported categories:

* Entertainment
* Productivity
* AI Tools
* Finance
* Education
* Gaming
* Other

Users can filter subscriptions by category.

---

## Search

Users can search subscriptions by:

* Name
* Category

Search results update dynamically.

---

## Upcoming Renewals

System identifies subscriptions due soon.

Dashboard displays:

* Name
* Amount
* Renewal date

---

## Email Reminder System

Background jobs execute daily.

Behavior:

* Find subscriptions renewing tomorrow.
* Send email notification.

Technology:

* Sidekiq
* Rails Mailer

---

## Responsive User Interface

Layouts supported:

* Desktop
* Tablet
* Mobile

Framework:

* Tailwind CSS

---

# 5. Out of Scope for V1

The following features MUST NOT be built in Version 1:

## AI Features

* Spending analysis
* Recommendation engine
* Subscription health score

---

## Integrations

* Bank account connections
* Plaid integration
* Credit card synchronization

---

## Automation

* Email receipt parsing
* OCR
* Automatic subscription detection

---

## Collaboration

* Shared accounts
* Family plans
* Teams

---

## Notifications

* SMS reminders
* Push notifications
* WhatsApp reminders

---

## Monetization

* Subscription plans
* Premium tiers
* Payment processing

---

## Mobile Applications

* Android app
* iOS app

---

## Browser Extensions

* Chrome extension
* Free-trial detection

---

# Success Criteria

Users should be able to:

1. Register an account.
2. Add subscriptions.
3. View recurring expenses.
4. Track upcoming renewals.
5. Receive reminder emails.
6. Prevent forgotten charges.

---

# Recommended Technical Stack

## Backend

* Ruby on Rails

## Database

* PostgreSQL

## Background Jobs

* Sidekiq

## API

* REST API

## Frontend

* React

## Styling

* Tailwind CSS

## Testing

* RSpec
* Jest

## Deployment

* Render
* Vercel

## Version Control

* Git + GitHub

---
