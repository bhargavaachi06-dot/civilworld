# CIVILWORLD — FULL-STACK WEB APPLICATION
**Engineering & Construction Execution + Practical Civil Training Academy**

CivilWorld integrates turnkey construction, residential/commercial building execution, and estimation (BOQ) with a practical training academy providing hands-on site and documentation exposure for civil engineering graduates.

---

## Architecture Overview

```text
Civil World/
├── client/                     # Frontend (React, Vite, React Router, Lucide Icons)
│   ├── src/
│   │   ├── api/client.js       # Centralized API fetch wrapper with cookie/token handling
│   │   ├── context/AuthContext # In-memory session authentication provider
│   │   ├── components/         # Navbar, Footer, ProtectedRoute, EnquiryForm
│   │   └── pages/              # 18 Public Pages + Protected Admin Dashboard Shell
│   ├── index.html
│   └── package.json
│
├── server/                     # Backend (Node.js ES Modules, Express, Mongoose)
│   ├── src/
│   │   ├── config/             # Config loader & dedicated civilworld_db connector
│   │   ├── controllers/        # Auth, Admin overview/audit, Public leads
│   │   ├── middleware/         # Auth guard, Rate limiting, Input validation, Error handler
│   │   ├── models/             # User (Admin), AuditLog, Enquiry
│   │   ├── routes/             # Health, Auth, Admin, Public
│   │   └── scripts/            # Secure CLI script for initial admin creation
│   ├── tests/                  # Automated API & security test suite (node:test)
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

### Run Backend API & Security Tests:
```powershell
cd server
npm test
```
*Runs all 9 automated tests covering health checks, rate limiting, validation, unauthorized access rejection, and lead handling.*

### Run Frontend Production Build:
```powershell
cd client
npm run build
```

---

## 7. Public Pages Implemented (18 Pages)

1. **Home** (`/`) — Hero, construction overview, academy overview, site protocol, featured projects, student pathway, lead form, footer.
2. **About CivilWorld** (`/about`) — Mission, vision, dual vertical model, core pillars.
3. **Construction Services** (`/services`) — Overview of all contracting divisions.
4. **Residential Construction** (`/services/residential`) — Villas, duplexes, independent apartments.
5. **Commercial Construction** (`/services/commercial`) — Offices, retail hubs, structural code compliance.
6. **Interior Design & Execution** (`/services/interior`) — Turnkey joinery, modular kitchens, lighting.
7. **Exterior Design & Elevation** (`/services/exterior`) — Facades, ACP/HPL cladding, structural glazing.
8. **Turnkey Projects** (`/services/turnkey`) — Concept to key-in-hand single-point execution.
9. **Estimation & BOQ** (`/services/estimation-boq`) — Bill of quantities, rate analysis, Bar Bending Schedules.
10. **Project Portfolio** (`/portfolio`) — Representative project case studies with interactive category filtering.
11. **CivilWorld Academy** (`/academy`) — Academy overview, field mentorship, safety & accreditation disclaimer.
12. **Training Programs** (`/academy/programs`) — Detailed graduate course curricula and batch enrollment.
13. **Practical Site Training** (`/academy/site-training`) — Field rebar checking, shuttering inspection, slump testing.
14. **Documentation Training** (`/academy/documentation-training`) — DPR logs, M-Books, contractor billing.
15. **Careers & Job Opportunities** (`/careers`) — Site engineer openings, internships, placement assistance.
16. **Knowledge Center / Blog** (`/blog`) — Field engineering guides, rebar inspection checklists.
17. **Contact Us** (`/contact`) — Regional office info, working hours, interactive enquiry form.
18. **Admin Login** (`/admin/login`) — Secure administrator authentication with rate limiting protection.

---

## 8. Protected Admin Dashboard Modules (13 Navigation Views)

- **Overview** (`/admin/dashboard`): Real-time system telemetry, database status, recent leads, security audit logs.
- **Construction Enquiries** (`/admin/enquiries`): Functional leads manager with status actions (new, contacted, in-progress, closed).
- **Audit Logs** (`/admin/audit-logs`): Immutable audit trail of logins, logouts, IPs, and administrative events.
- **Website Content** (`/admin/content`): Milestone 2 CMS placeholder shell.
- **Construction Projects** (`/admin/projects`): Milestone 2 project manager placeholder shell.
- **Students** (`/admin/students`): Milestone 2 student directory placeholder shell.
- **Training Programs** (`/admin/training`): Milestone 2 program configuration placeholder shell.
- **Documentation** (`/admin/docs`): Milestone 2 template library placeholder shell.
- **Certificates** (`/admin/certificates`): Milestone 2 certificate verification placeholder shell.
- **Careers** (`/admin/careers`): Milestone 2 job publisher placeholder shell.
- **Announcements** (`/admin/announcements`): Milestone 2 bulletin placeholder shell.
- **Users & Permissions** (`/admin/users`): Milestone 2 RBAC placeholder shell.
- **Settings** (`/admin/settings`): Milestone 2 system settings placeholder shell.

---

## 9. Security & Compliance Highlights

- **Dedicated Database**: Enforced check for `civilworld_db` prevents any cross-database contamination.
- **Password Hashing**: Bcrypt with 12 salt rounds; passwords never exposed in JSON or server logs.
- **HttpOnly Cookies**: Session tokens protected against cross-site scripting (XSS); in-memory token fallback.
- **Rate Limiting**: Brute-force protection on authentication and public enquiry forms.
- **No Long-Lived Tokens in LocalStorage**: Session verified dynamically on mount.
- **Audit Logging**: All authentication attempts, lockouts, and admin actions logged with timestamp and IP.
- **Compliance Disclaimers**: Transparently states that training certificates verify practical skill completion and do not represent government university degrees; no false promises of guaranteed employment.
