# Bangladesh Specialized Hospital — Frontend Web Portal

Next.js 16 (App Router) patient, doctor, and admin portal for **Bangladesh Specialized Hospital**. Features a public marketing site, a searchable 34+ specialty doctor directory, live consultation slot booking with **bKash** checkout redirection, an interactive floating **AI RAG Medical Assistant (`ChatWidget`)**, Google OAuth & OTP authentication, and role-protected dashboards for **Patients**, **Doctors**, and **Admins**.

**Core Stack:** Next.js 16.3 (App Router, Static Export) · React 19 (React Compiler) · TypeScript · Tailwind CSS v4 · shadcn/ui (`@base-ui/react`) · TanStack Query v5 · TanStack Form · Zod v4 · `ofetch` · `@react-oauth/google` · `lucide-react` · `date-fns` · Biome

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Application Routes & Access Control](#application-routes--access-control)
- [Key Features & UI Modules](#key-features--ui-modules)
- [Data Fetching, Providers & State Architecture](#data-fetching-providers--state-architecture)
- [Client-Side Validation Rules](#client-side-validation-rules)
- [Static Export (`output: "export"`) & Production Builds](#static-export-output-export--production-builds)
- [Scripts & Code Quality](#scripts--code-quality)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- **Bun 1.4+** (recommended — declared as `"packageManager": "bun@1.4.0"` in `package.json`) or **Node.js 20+**
- Running instance of [`healthcare-backend`](../healthcare-backend/README.md) (default: `http://localhost:5000`)

---

## Getting Started

### 1. Install Dependencies

```bash
bun install
# or: npm install
```

### 2. Configure `.env.local`

Create a `.env.local` file in `healthcare-frontend/`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

### 3. Run the Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Required | Used In | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | **Yes** | `src/lib/apiClient.ts` | Base URL for all backend REST requests (e.g., `http://localhost:5000/api/v1`). |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional | `src/providers/google-auth.provider.tsx` | Google OAuth 2.0 Client ID. If omitted, `GoogleAuthProvider` gracefully renders children without wrapping in `GoogleOAuthProvider`. |

---

## Project Structure

```text
healthcare-frontend/
├── next.config.ts                         # React Compiler (`reactCompiler: true`) & Static Export (`output: "export"`)
├── components.json                        # shadcn/ui configuration
├── biome.json                             # Biome formatter & linter rules
├── postcss.config.mjs                     # Tailwind CSS v4 PostCSS plugin
├── public/                                # Static assets (logo.svg, login.jpg, register.jpg, icons)
└── src/
    ├── app/
    │   ├── layout.tsx                     # Root HTML shell, Inter/Geist fonts, Providers, global Toaster
    │   ├── globals.css                    # Tailwind CSS v4 theme tokens & styles
    │   ├── (public)/
    │   │   ├── (marketing)/
    │   │   │   ├── layout.tsx             # Public Header + main + Footer
    │   │   │   ├── page.tsx               # Homepage (Hero, Departments, Featured Doctors, How It Works, ChatWidget)
    │   │   │   ├── about-us/page.tsx      # Hospital overview & clinical pillars + ChatWidget
    │   │   │   └── doctors/
    │   │   │       ├── page.tsx           # Specialist directory with search, filter, sort, pagination + ChatWidget
    │   │   │       └── [id]/page.tsx      # Static-generated doctor profile & live today's booking slots + ChatWidget
    │   │   └── (authentication)/
    │   │       ├── login/page.tsx         # Email/password login + Google OAuth
    │   │       ├── register/page.tsx      # Patient registration form
    │   │       ├── register/verify-account/page.tsx # 6-digit OTP email verification (Patient)
    │   │       ├── apply/page.tsx         # Doctor application form with resume & document uploads
    │   │       └── apply/verify-account/page.tsx    # 6-digit OTP email verification (Doctor applicant)
    │   └── (dashboard)/
    │       ├── layout.tsx                 # Global AuthGuard for all dashboard routes
    │       ├── dashboard/                 # Patient portal (RoleGuard: PATIENT)
    │       │   ├── layout.tsx
    │       │   ├── page.tsx
    │       │   └── my-appointments/page.tsx
    │       ├── doctor/                    # Doctor portal (RoleGuard: DOCTOR)
    │       │   ├── layout.tsx
    │       │   ├── page.tsx
    │       │   └── schedules/page.tsx
    │       └── admin/                     # Admin portal (RoleGuard: ADMIN, SUPER_ADMIN)
    │           ├── layout.tsx
    │           ├── page.tsx
    │           └── approve-doctor/page.tsx
    ├── api/                               # Typed `ofetch` API wrappers
    │   ├── auth.api.ts                    # login, register, verifyAccount, logout, getMe, googleOAuth
    │   ├── doctor.api.ts                  # applyAsDoctor (FormData), verifyDoctorAccount, getAllDoctors, approveDoctor, public directory/profile, today's schedule
    │   ├── schedule.api.ts                # createSchedule, getMySchedules, publishSchedule, deleteSchedule
    │   ├── appointment.api.ts             # bookAppointment, getMyAppointments
    │   └── chat.api.ts                    # sendChatMessage (`POST /chat`)
    ├── hooks/                             # TanStack Query hooks & utilities
    │   ├── auth.hook.ts                   # useLogin, useRegistration, useVerifyAccount, useLogout, useGoogleOAuth, useGetMe
    │   ├── doctor.hook.ts                 # useApplyAsDoctor, useVerifyDoctorAccount, useGetAllDoctors, useApproveDoctor, useGetAllPublicDoctors, usePublicDoctorProfile, useGetTodayScheduleByDoctor, Suspense variants
    │   ├── schedule.hook.ts               # useCreateSchedule, useMySchedules, useSuspenseMySchedules, usePublishSchedule, useDeleteSchedule
    │   ├── appointment.hook.ts            # useBookAppointment, useGetMyAppointments
    │   ├── chat.hook.ts                   # useSendChatMessage
    │   ├── debounce.hook.ts               # useDebounce (350ms search debounce)
    │   └── use-mobile.ts                  # Viewport breakpoint hook
    ├── components/
    │   ├── auth/                          # AuthGuard, RoleGuard, AuthLoading, AccessDenied
    │   ├── dashboard/                     # DashboardShell, DashboardSidebar
    │   ├── form/                          # LoginForm, RegisterForm, VerifyAccountForm, DoctorApplyForm, CreateScheduleForm
    │   ├── layout/public/                 # Public Header & Footer
    │   ├── modules/
    │   │   ├── chat/                      # ChatWidget (AI RAG Assistant)
    │   │   ├── homepage/                  # Hero, DepartmentsSection, FeaturedDoctors, HowItWorksSection
    │   │   ├── doctors/                   # PublicDoctorList, DoctorCard, DoctorBooking
    │   │   ├── doctor-approval/           # DoctorApprovalTabs, DoctorApprovalTable, DoctorReviewSheet, loading state
    │   │   ├── doctor-schedule/           # ScheduleList, ScheduleTable, ScheduleCreateDialog, ScheduleDetailSheet, ScheduleActions, loading state
    │   │   ├── my-appointments/           # AppointmentList (including bKash callback status screens)
    │   │   └── google-login/              # GoogleLogin button wrapper
    │   └── ui/                            # shadcn/ui + Base UI primitives (button, calendar, card, checkbox, dialog, field, input, input-otp, label, pagination, popover, separator, sheet, sidebar, skeleton, spinner, table, table-pagination, tabs, textarea, toast, tooltip)
    ├── lib/
    │   ├── apiClient.ts                   # ofetch instance (`baseURL`, `credentials: "include"`)
    │   └── utils.ts                       # `cn()` class merge helper
    ├── providers/                         # Providers composition (GoogleAuthProvider -> QueryProvider -> TooltipProvider)
    ├── routes/                            # Sidebar route definitions (admin.routes.ts, doctor.routes.ts, patient.routes.ts)
    ├── types/                             # TypeScript domain types (api, appointment, auth, chat, doctor, schedule, sidebar, user)
    ├── utils/                             # Helper utilities (e.g., file-size.util.ts)
    └── validation/                        # Zod v4 schemas (auth, doctor-application, schedule)
```

---

## Application Routes & Access Control

### Public & Marketing Routes (`(public)/(marketing)`)

| Path | Access | Key Functionality |
| --- | --- | --- |
| `/` | Public | Landing page with Hero, clinical Departments showcase, Featured Doctors, How It Works, and floating AI `ChatWidget`. |
| `/doctors` | Public | Full specialist directory: debounced search (`searchTerm`), 34+ specialty dropdown & quick-filter pills, sorting (`Most Experienced`, `Fee: Low to High`, `Fee: High to Low`, `Newest Added`), 12-per-page pagination, URL query param sync, and `ChatWidget`. |
| `/doctors/[id]` | Public | Specialist profile (BMDC badge, credentials grid, bio, fee in BDT), live today's consultation slots (`DoctorBooking`) with bKash checkout confirmation modal, and `ChatWidget`. |
| `/about-us` | Public | Hospital mission, core clinical pillars, and `ChatWidget`. |

### Authentication & Onboarding Routes (`(public)/(authentication)`)

| Path | Access | Key Functionality |
| --- | --- | --- |
| `/login` | Public | Credential login + Google OAuth (`GoogleLogin`). |
| `/register` | Public | Patient sign-up with password strength & Bangladeshi mobile validation. |
| `/register/verify-account` | Public | 6-digit OTP email verification (`input-otp`) for new patients. |
| `/apply` | Public | Doctor application form supporting multipart uploads (required resume + up to 5 supporting documents). |
| `/apply/verify-account` | Public | 6-digit OTP email verification for doctor applicants. |

### Protected Dashboard Routes (`(dashboard)`)

All routes under `(dashboard)` are wrapped by `AuthGuard` (verifies session via `useGetMe()` and redirects unauthenticated users to `/login`) plus a role-specific `RoleGuard` (shows `AccessDenied` on unauthorized roles):

| Path | Allowed Roles | Key Functionality |
| --- | --- | --- |
| `/dashboard` | `PATIENT` | Patient dashboard overview inside `DashboardShell`. |
| `/dashboard/my-appointments` | `PATIENT` | Patient appointment list and bKash redirect callback handling (`?status=success` / `?status=failure`). |
| `/doctor` | `DOCTOR` | Doctor dashboard overview inside `DashboardShell`. |
| `/doctor/schedules` | `DOCTOR` | Create daily schedules (dialog), inspect schedule details (sheet), publish `DRAFT` -> `PUBLISHED`, and delete drafts. |
| `/admin` | `ADMIN`, `SUPER_ADMIN` | Admin dashboard overview inside `DashboardShell`. |
| `/admin/approve-doctor` | `ADMIN`, `SUPER_ADMIN` | Tabbed doctor verification queue (`PENDING`, `APPROVED`, `REJECTED`), paginated table, and slide-over `DoctorReviewSheet` to inspect documents and approve/reject applicants. |

---

## Key Features & UI Modules

### 1. Interactive AI RAG Chat Widget (`src/components/modules/chat/chat-widget.tsx`)
- Mounted across `/`, `/doctors`, `/doctors/[id]`, and `/about-us`.
- Floating accessible dialog (`role="dialog"`, `Escape` to close, auto-focus input, `aria-live="polite"`, smooth auto-scroll).
- Listens for the custom browser event `window.dispatchEvent(new Event("open-healthcare-chat"))` so CTAs anywhere on the page (such as the Hero section) can open the assistant directly.
- Includes quick-start symptom prompts, maintains multi-turn `sessionId` state across requests, parses inline `**bold**` text, displays clickable **Recommended Specialists** cards linking directly to `/doctors/[id]` with fee in BDT, and surfaces a 24/7 emergency hotline (`10633`) disclaimer.

### 2. Live Doctor Booking & bKash Redirect (`src/components/modules/doctors/doctor-booking.tsx`)
- Queries `GET /schedule/todays-schedule?doctorId=...` for open slots.
- Redirects unauthenticated visitors to `/login` when clicking **Book Now**.
- On booking success, opens a confirmation dialog advising 10-minute payment completion and redirects the browser to `paymentUrl` (bKash checkout) on clicking **Pay Now with bKash**.

### 3. Doctor Application & Admin Review
- **Applicant Side (`DoctorApplyForm`)**: Submits multipart `FormData` (`data` JSON + `resume` + `additionalFiles`) to `POST /doctor/apply-as-doctor`, then transitions to OTP verification.
- **Admin Side (`DoctorApprovalTabs` / `DoctorReviewSheet`)**: Filter applicants by status tabs, review BMDC license, qualifications, experience, bio, resume, and supporting files, and approve or reject with a reason.

### 4. Doctor Schedule Management (`src/components/modules/doctor-schedule/`)
- Create schedules via `ScheduleCreateDialog` with date, start/end time, and Google Meet link validation.
- View slot details in `ScheduleDetailSheet`, publish `DRAFT` schedules for immediate patient booking, or remove unpublished drafts.

---

## Data Fetching, Providers & State Architecture

- **Provider Hierarchy (`src/providers/index.tsx`)**:
  ```text
  GoogleAuthProvider -> QueryProvider -> TooltipProvider -> App + Toaster
  ```
- **HTTP Client (`src/lib/apiClient.ts`)**: Uses `ofetch.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, credentials: "include" })` so HTTP-only `accessToken` and `refreshToken` cookies are sent automatically on every request.
- **TanStack Query (`src/providers/query.provider.tsx`)**: Singleton browser `QueryClient` with a `60_000ms` (1-minute) default `staleTime`. All API calls are wrapped cleanly in `src/api/*.api.ts` and exposed as typed query/mutation hooks in `src/hooks/*.hook.ts`.
- **Forms**: Powered by `@tanstack/react-form` with Zod v4 schemas (`src/validation/`).

---

## Client-Side Validation Rules

Defined in `src/validation/`:

- **Auth (`auth.validation.ts`)**:
  - Passwords require at least **8 characters**, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.
  - Patient registration requires `name` (3–10 characters), matching `confirmPassword`, and optional valid Bangladeshi mobile number (`^(?:\+?880|0)1[3-9]\d{8}$`).
- **Doctor Application (`doctor-application.validation.ts`)**:
  - Required `resume` file + up to **5** `additionalFiles`.
  - Allowed MIME types: `PDF`, `DOC`, `DOCX`, `PNG`, `JPEG`, max **5 MB** per file.
  - `experienceYears` whole number between `0` and `60`; `bio` up to `1000` characters.
- **Schedule (`schedule.validation.ts`)**:
  - `endTime > startTime` with at least **20 minutes** duration (`MINIMUM_SLOT_MINUTE = 20`).
  - `meetingLink` must match a valid Google Meet URL (`^https://meet\.google\.com/[a-z]{3}-[a-z]{4}-[a-z]{3}$`).

---

## Static Export (`output: "export"`) & Production Builds

[`next.config.ts`](./next.config.ts) enables:
- `reactCompiler: true` (via `babel-plugin-react-compiler`)
- `output: "export"` (generates a static site in `out/`)

Because `/doctors/[id]/page.tsx` implements `generateStaticParams()` by paginating `GET /doctor/public/all-doctors` at build time:
1. Ensure `healthcare-backend` is running and seeded.
2. Ensure `NEXT_PUBLIC_API_BASE_URL` is set in `.env.local` or your CI environment.
3. Run `bun run build` so all doctor detail routes are statically pre-rendered.

*(If the backend is unreachable during build, `generateStaticParams()` catches the error and returns `[]`, meaning individual doctor pages won't be pre-generated in the static export.)*

---

## Scripts & Code Quality

```bash
bun run dev      # Start Next.js development server (http://localhost:3000)
bun run build    # Production build (static export)
bun run start    # Start Next.js server
bun run lint     # Run Biome linter & checks (`biome check`)
bun run format   # Auto-format code with Biome (`biome format --write`)
```

> Note: Next.js 16 writes [`AGENTS.md`](./AGENTS.md) on `next dev` to point AI coding tools to local version-matched Next.js docs under `node_modules/next/dist/docs/`.

---

## Troubleshooting

- **Logged-in user keeps getting redirected to `/login`**:
  - Verify `NEXT_PUBLIC_API_BASE_URL` matches the backend host (`http://localhost:5000/api/v1`) and backend `FRONTEND_URL` is set to `http://localhost:3000`. Mixing `localhost` and `127.0.0.1` causes browsers to withhold cookies.
- **Doctors directory shows "Could not load doctors right now"**:
  - Confirm `healthcare-backend` is running on the URL configured in `NEXT_PUBLIC_API_BASE_URL` and check browser console/network tab for CORS errors.
- **AI Chat Widget fails to respond**:
  - Check backend logs for OpenRouter or `pgvector` errors; verify `bun run test:openrouter` and `bun run index:doctors` succeed in `healthcare-backend/`.
- **Google Sign-In button missing or failing**:
  - Ensure `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set in `.env.local` and matches `GOOGLE_CLIENT_ID` in `healthcare-backend/.env`, and that `http://localhost:3000` is listed as an Authorized JavaScript Origin in Google Cloud Console.
