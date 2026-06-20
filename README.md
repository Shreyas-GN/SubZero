# SubZero

Full-stack subscription management SaaS.

## Features

- User authentication
- Subscription CRUD
- Dashboard analytics
- Upcoming renewal reminders
- Email notifications
- Charts and reports
- Multi-tenant architecture
- Background jobs with Sidekiq

## Tech Stack

### Backend
- Ruby on Rails 8
- PostgreSQL
- Redis
- Sidekiq

### Frontend
- React 19
- Tailwind CSS
- Recharts
- React Hook Form + Zod

### Testing
- RSpec
- FactoryBot
- Vitest

### Infrastructure
- Docker
- Docker Compose

## Architecture

React
↓
Rails API
↓
PostgreSQL
↓
Redis + Sidekiq
↓
ActionMailer

## Running Locally

Backend

```bash
cd backend
bundle install
rails db:create db:migrate
rails s
