# CIVILWORLD — FULL-STACK WEB APPLICATION
**Engineering & Construction Execution + Practical Civil Training Academy**

CivilWorld integrates turnkey construction, residential/commercial building execution, and estimation (BOQ) with a practical training academy providing hands-on site and documentation exposure for civil engineering graduates.

---

## Architecture Overview

```text
Civil World/
├── client/                     # Frontend (React, Vite, React Router, Lucide Icons)
│   ├── src/
│   │   ├── api/client.js       # Centralized API fetch wrapper with cookie/token handling & file uploads
│   │   ├── context/AuthContext # In-memory session authentication provider
│   │   ├── components/         # Navbar, Footer, ProtectedRoute, EnquiryForm
│   │   └── pages/              # 18 Public Pages + Dynamic /portfolio/:slug + Admin Dashboard
│   │       └── admin/          # Overview, Enquiries, Audit Logs, and ProjectsManager (/admin/projects)
│   ├── index.html
│   └── package.json
│
├── server/                     # Backend (Node.js ES Modules, Express, Mongoose)
│   ├── src/
│   │   ├── config/             # Config loader & dedicated civilworld_db connector
│   │   ├── controllers/        # Auth, Admin overview/audit, Public leads, Project Portfolio controller
│   │   ├── middleware/         # Auth guard, Rate limiting, Input validation, Multer image upload, Error handler
│   │   ├── models/             # User (Admin), AuditLog, Enquiry, Project (Validated construction portfolio)
│   │   ├── routes/             # Health, Auth, Admin, Public
│   │   └── scripts/            # Secure CLI script for initial admin creation
│   ├── tests/                  # Automated API, Security & Project tests (node:test - 20 passing tests)
│   ├── uploads/projects/       # Safe local static storage for project covers & gallery media
│   ├── .env.example            # Safe placeholders for production configuration
│   └── package.json
│
├── package.json                # Root orchestration scripts
└── README.md
```

---

## 1. Prerequisites

- **Node.js**: v18.0.0 or higher (v24.x tested)
- **MongoDB**: Community Server (targeting dedicated `civilworld_db`)
- **Shell**: Windows PowerShell

---

## 2. Setup & Installation (Windows PowerShell)

Run these commands from the project root (`Civil World`):

```powershell
# 1. Install root, backend, and frontend dependencies
npm run install:all
```

---

## 3. Database Safety & Starting MongoDB

CivilWorld is strictly configured to only use the dedicated database:
**`mongodb://localhost:27017/civilworld_db`**

It will never touch, query, drop, or connect to any other database.

To start the MongoDB Windows service (if not already running):
```powershell
Start-Service MongoDB
```
*To verify MongoDB service status:*
```powershell
Get-Service -Name MongoDB
```
*(Note: If MongoDB is offline, the CivilWorld backend will automatically start in safe mode without crashing and provide diagnostic warnings).*

---

## 4. Creating the Initial Secure Administrator

Per production security protocols, there is **no public registration endpoint** and **no default password seeded**.

Create your superadmin account securely via the CLI script:

```powershell
# Run from the server directory
cd server
npm run create-admin
```
The script will prompt you for:
1. Administrator Full Name
2. Administrator Email Address
3. Strong Password (minimum 8 characters)
4. Password Confirmation

The password will be hashed using **bcrypt** (12 rounds) and saved directly into `civilworld_db`. Passwords are never logged or exposed.

---

## 5. Running the Application Locally

Open two Windows PowerShell windows (one for backend, one for frontend):

### Terminal 1 — Start the Backend API (Port 5000):
```powershell
cd server
npm run dev
```
- API Server: `http://localhost:5000`
- Health Endpoint: `http://localhost:5000/api/health`

### Terminal 2 — Start the Frontend (Port 5173):
```powershell
cd client
npm run dev
```
- Web Application: `http://localhost:5173`
- Admin Portal: `http://localhost:5173/admin/login`

---

## 6. Running Tests & Quality Checks

### Run Backend API, Security & Project Tests:
```powershell
cd server
npm test
```
*Runs all 20 automated tests (10 core & security tests + 10 construction portfolio tests) covering health checks, rate limiting, validation, unauthorized access rejection, project slug auto-generation, public data scrubbing, and safe error handling.*

### Run Frontend Production Build:
```powershell
cd client
npm run build
```

---

## 7. Public Pages Implemented (18 Pages + Dynamic Detail)

1. **Home** (`/`) — Hero, construction overview, academy overview, site protocol, featured projects, student pathway, lead form, footer.
2. **About CivilWorld** (`/about`) — Mission, vision, dual vertical model, core pillars.
3. **Construction Services** (`/services`) — Overview of all contracting divisions.
4. **Residential Construction** (`/services/residential`) — Villas, duplexes, independent apartments.
5. **Commercial Construction** (`/services/commercial`) — Offices, retail hubs, structural code compliance.
6. **Interior Design & Execution** (`/services/interior`) — Turnkey joinery, modular kitchens, lighting.
7. **Exterior Design & Elevation** (`/services/exterior`) — Facades, ACP/HPL cladding, structural glazing.
8. **Turnkey Projects** (`/services/turnkey`) — Concept to key-in-hand single-point execution.
9. **Estimation & BOQ** (`/services/estimation-boq`) — Bill of quantities, rate analysis, Bar Bending Schedules.
10. **Project Portfolio** (`/portfolio`) — Live construction portfolio backed by `civilworld_db`. Displays published projects only, with category filtering, responsive cards, and professional empty state.
11. **Project Detail Page** (`/portfolio/:slug`) — Dynamic individual project showcase with objectives, interactive milestone timeline, progress photo gallery, and consultation enquiry trigger.
12. **CivilWorld Academy** (`/academy`) — Academy overview, field mentorship, safety & accreditation disclaimer.
13. **Training Programs** (`/academy/programs`) — Detailed graduate course curricula and batch enrollment.
14. **Practical Site Training** (`/academy/site-training`) — Field rebar checking, shuttering inspection, slump testing.
15. **Documentation Training** (`/academy/documentation-training`) — DPR logs, M-Books, contractor billing.
16. **Careers & Job Opportunities** (`/careers`) — Site engineer openings, internships, placement assistance.
17. **Knowledge Center / Blog** (`/blog`) — Field engineering guides, rebar inspection checklists.
18. **Contact Us** (`/contact`) — Regional office info, working hours, interactive enquiry form.
19. **Admin Login** (`/admin/login`) — Secure administrator authentication with rate limiting protection.

---

## 8. Protected Admin Dashboard Modules

- **Overview** (`/admin/dashboard`): Real-time system telemetry, database status, recent leads, security audit logs.
- **Construction Enquiries** (`/admin/enquiries`): Functional leads manager with status actions (new, contacted, in-progress, closed).
- **Audit Logs** (`/admin/audit-logs`): Immutable audit trail of logins, logouts, IPs, and administrative events.
- **Construction Projects** (`/admin/projects`): **[ACTIVE — Milestone 2 Part 1]** Real portfolio manager:
  - Create and edit projects with validated fields and URL slug generation
  - Draft mode, instant publishing/unpublishing, and soft-archiving
  - Search by project title or location; filter by category, project status, and publication state
  - Interactive Milestone management (title, description, target date, completion status)
  - Safe image upload handler with 5MB file size limit and MIME validation
  - Cover image and gallery support
  - One-click public preview link to `/portfolio/:slug`
- **Website Content** (`/admin/content`): CMS placeholder shell.
- **Students** (`/admin/students`): Student directory placeholder shell (Milestone 2 Part 2).
- **Training Programs** (`/admin/training`): Program configuration placeholder shell.
- **Documentation** (`/admin/docs`): Template library placeholder shell.
- **Certificates** (`/admin/certificates`): Certificate verification placeholder shell.
- **Careers** (`/admin/careers`): Job publisher placeholder shell.
- **Announcements** (`/admin/announcements`): Bulletin placeholder shell.
- **Users & Permissions** (`/admin/users`): RBAC placeholder shell.
- **Settings** (`/admin/settings`): System settings placeholder shell.

---

## 9. Construction Project Portfolio API Reference

### Public Endpoints (No Auth Required)
- `GET /api/public/projects` — Fetch published, non-archived projects (accepts `?category=` filter). Internal admin IDs (`createdBy`, `updatedBy`) are scrubbed.
- `GET /api/public/projects/:slug` — Fetch one published project by its unique URL slug. Returns 404 if draft or archived.

### Admin Endpoints (Requires `admin` or `superadmin` Role)
- `GET /api/admin/projects` — List all projects with pagination (`?page=1&limit=20`), search (`?search=`), category filter (`?category=`), status filter (`?status=`), and publication status (`?publicationStatus=`).
- `GET /api/admin/projects/:id` — Retrieve project by ID for editing.
- `POST /api/admin/projects` — Create new project (validates category, title, slug, location, description).
- `PUT /api/admin/projects/:id` — Update project metadata, objectives, milestones, or dates.
- `PATCH /api/admin/projects/:id/publish` — Toggle publication status between `draft` and `published`.
- `PATCH /api/admin/projects/:id/archive` — Archive project (removes from public display while preserving record).
- `DELETE /api/admin/projects/:id` — Permanently delete project (logged to audit trail).
- `POST /api/admin/projects/upload-image` — Upload image file (`multipart/form-data`, field: `image`). Validates MIME type (`image/jpeg`, `image/png`, `image/webp`), limits to 5MB, and stores in safe local upload directory.

---

## 10. Image Storage & Production Deployment Notes

In local development, uploaded images are safely handled by `multer` and saved to `server/uploads/projects/`. The Express backend exposes `/uploads` as a static directory, and the Vite frontend dev server proxies `/uploads` to `http://localhost:5000`.

### Production Storage Adapter Recommendation:
For containerized or distributed production deployments (e.g. AWS ECS, Heroku, Render, DigitalOcean):
1. **Never store binary image blobs in MongoDB.** Large blobs degrade database query and replication performance.
2. Use an S3-compatible cloud storage adapter (AWS S3, Cloudflare R2, or Google Cloud Storage) by updating `server/src/middleware/upload.js` with `multer-s3` or direct presigned URL uploads.
3. Configure your CDN (e.g. Cloudflare or AWS CloudFront) to cache public project assets.

---

## 11. Security & Compliance Highlights

- **Dedicated Database**: Enforced check for `civilworld_db` prevents any cross-database contamination.
- **Role-Based Access Control**: Sensitive write and update endpoints strictly enforce `admin` / `superadmin` roles via `protect` and `requireRole` middleware.
- **Audit Logging**: All project lifecycle actions (`PROJECT_CREATED`, `PROJECT_UPDATED`, `PROJECT_PUBLISHED`, `PROJECT_ARCHIVED`, `PROJECT_DELETED`, `PROJECT_IMAGE_UPLOADED`) are recorded in `AuditLog` with user ID, IP address, and timestamp.
- **Public Data Scrubbing**: Model implements `.toPublicJSON()`, ensuring internal admin IDs and draft flags are never exposed publicly.
- **Upload Safety**: Magic-byte & MIME validation prevents execution of malicious payloads; files are given sanitized unique names.
- **No Fabricated Projects**: If no projects are published, the public page presents a clean, professional empty state.
- **Compliance Disclaimers**: Transparently states that training certificates verify practical skill completion and do not represent government university degrees; no false promises of guaranteed employment.
