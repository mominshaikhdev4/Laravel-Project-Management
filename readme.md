# 📋 Laravel Project Management

A full-featured project management application built with **Laravel 12**, **Inertia.js**, **React 19**, and **Tailwind CSS v4**. Manage projects, assign tasks, track progress by priority and status, and collaborate across teams.

---

## ✨ Features

| Module | Capabilities |
|--------|-------------|
| **Auth** | Register, Login, Email Verification, Forgot/Reset Password, Profile management |
| **Dashboard** | Live task summary — pending, in progress, completed (global vs mine) + active task list |
| **Projects** | Full CRUD — create, view, edit, delete projects; image upload; filter & sort |
| **Tasks** | Full CRUD — create, view, edit, delete tasks; assign to user & project; image upload; filter & sort |
| **My Tasks** | Filtered task list scoped to the authenticated user |
| **Users** | Admin CRUD for user accounts with password management |
| **Sorting & Filtering** | Sort by any column, filter by name/status across all resource lists |
| **Pagination** | Server-side pagination with 10 items per page |

---

## 🛠️ Tech Stack

- **Backend**: PHP 8.3, Laravel 12, Laravel Breeze (auth scaffolding)
- **Frontend**: React 19, JSX, Inertia.js v2, Tailwind CSS v4, Heroicons
- **Build**: Vite 7, pnpm
- **Database**: PostgreSQL (local & Railway)

---

## 🚀 Local Setup

### Prerequisites

- PHP 8.3+
- Composer
- Node 20+ and pnpm (`npm i -g pnpm`)
- PostgreSQL

### Steps

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd Laravel-Project-Management

# 2. Install PHP dependencies
composer install

# 3. Copy the environment file and generate app key
cp .env.example .env
php artisan key:generate

# 4. Configure your database credentials in .env
#    Set DB_CONNECTION=pgsql, DB_HOST, DB_PORT=5432, DB_DATABASE, DB_USERNAME, DB_PASSWORD

# 5. Run migrations
php artisan migrate

# 6. (Optional) Seed demo data — 2 users, 30 projects, 900 tasks
php artisan db:seed

# 7. Install JS dependencies and build assets
pnpm install
pnpm run build

# 8. Create the storage symlink
php artisan storage:link

# 9. Start the development server
composer run dev
```

App runs at **http://localhost:8000**

**Demo credentials** (after seeding):

| Email | Password | Role |
|-------|----------|------|
| `zura@example.com` | `admin` | Admin |
| `john@example.com` | `admin` | User |

---

## 🚂 Deploy to Railway

### 1. Add a PostgreSQL Service

In your Railway project → **+ New** → **Database** → **PostgreSQL**. Railway injects the connection variables automatically.

### 2. Set Environment Variables

In your Railway service's **Variables** tab, add:

| Variable | Value |
|----------|-------|
| `APP_NAME` | `Laravel Project Management` |
| `APP_ENV` | `production` |
| `APP_KEY` | Run `php artisan key:generate --show` locally to get this |
| `APP_DEBUG` | `false` |
| `APP_URL` | Your Railway public URL (e.g. `https://yourapp.up.railway.app`) |
| `DB_CONNECTION` | `pgsql` |
| `DB_HOST` | From Railway Postgres plugin (`PGHOST`) |
| `DB_PORT` | `5432` |
| `DB_DATABASE` | From Railway Postgres plugin (`PGDATABASE`) |
| `DB_USERNAME` | From Railway Postgres plugin (`PGUSER`) |
| `DB_PASSWORD` | From Railway Postgres plugin (`PGPASSWORD`) |
| `SESSION_DRIVER` | `database` |
| `QUEUE_CONNECTION` | `database` |
| `CACHE_STORE` | `database` |
| `LOG_CHANNEL` | `stderr` |
| `FILESYSTEM_DISK` | `public` |

> **Tip**: Since the config handles `DATABASE_URL` automatically, you can also let Laravel run directly on Railway's `DATABASE_URL` connection string!

### 3. Deploy

Railway auto-detects `nixpacks.toml` and will:
1. Install **PHP 8.3** (with pdo_pgsql, mbstring, curl, zip, gd, bcmath, intl)
2. Install **Node 20**
3. Run `npm ci` + `composer install --no-dev`
4. Build Vite assets (`npm run build`)
5. Cache Laravel routes and views (excluding build-time environment caching to prevent runtime env issues)
6. Create the storage symlink
7. On startup: `php artisan migrate --force` then start the server

```bash
git add .
git commit -m "fix: prepare for Railway PostgreSQL deployment"
git push origin main
```

---

## 📁 Project Structure

```
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/              # Breeze-style auth controllers
│   │   │   ├── DashboardController.php
│   │   │   ├── ProjectController.php
│   │   │   ├── TaskController.php
│   │   │   └── UserController.php
│   │   ├── Requests/              # Form validation (Store/Update for each resource)
│   │   └── Resources/             # API Resources (ProjectResource, TaskResource, etc.)
│   ├── Models/
│   │   ├── Project.php
│   │   ├── Task.php
│   │   └── User.php
│   └── Providers/
│       └── AppServiceProvider.php
├── database/
│   ├── factories/                 # ProjectFactory, TaskFactory, UserFactory
│   ├── migrations/                # users, projects, tasks tables
│   └── seeders/DatabaseSeeder.php
├── resources/js/
│   ├── Pages/
│   │   ├── Dashboard.jsx
│   │   ├── Project/               # Index, Create, Edit, Show
│   │   ├── Task/                  # Index, Create, Edit, Show
│   │   └── User/                  # Index, Create, Edit
│   ├── Components/                # Reusable UI components
│   └── Layouts/                   # AuthenticatedLayout
├── routes/
│   ├── web.php                    # Main resource routes
│   └── auth.php                   # Auth routes (register, login, verify, etc.)
├── nixpacks.toml                  # Railway build configuration
└── Procfile                       # Railway start command
```

---

## 📊 Data Model

```
Users ──< Projects (created_by, updated_by)
Users ──< Tasks    (assigned_user_id, created_by, updated_by)
Projects ──< Tasks (project_id)
```

- **Projects** have a name, description, status (`pending` | `in_progress` | `completed`), due date, and optional image.
- **Tasks** belong to a project and an assigned user; have priority (`low` | `medium` | `high`) and status.
- **Users** are created by admins via the User CRUD or self-register via the auth flow.

---

## 🧪 Running Tests

```bash
php artisan test
```

---

## 📄 License

MIT
