# Bangladesh Specialized Hospital — Backend API

REST API and AI RAG backend for the **Bangladesh Specialized Hospital** management platform. Handles authentication (email OTP, JWT cookies, Google OAuth), doctor onboarding & verification, 20-minute consultation scheduling, **bKash** tokenized appointment checkout & refunds, **PDFKit** digital prescriptions uploaded to **Cloudinary**, role-based analytics, automated cron maintenance, and a **LangChain + OpenRouter + `pgvector`** doctor-finding AI assistant.

**Core Stack:** Node.js 20+ / Bun · Express 5 · TypeScript · Prisma 7 (`@prisma/adapter-pg`) · PostgreSQL + `pgvector` · Redis · LangChain · OpenRouter · bKash · Cloudinary · PDFKit · Nodemailer + EJS · Zod v4 · Biome

---

## 🌐 Live Deployed API

| Resource | Live Production URL | Notes |
| --- | --- | --- |
| **API Base URL** | `https://healthcare-backend-production-9c03f7c4.up.railway.app/api/v1` | All v1 routes mounted here |
| **Health Check** | [https://healthcare-backend-production-9c03f7c4.up.railway.app/](https://healthcare-backend-production-9c03f7c4.up.railway.app/) | Root health endpoint |
| **Public Doctors API** | [https://healthcare-backend-production-9c03f7c4.up.railway.app/api/v1/doctor/public/all-doctors](https://healthcare-backend-production-9c03f7c4.up.railway.app/api/v1/doctor/public/all-doctors) | Public specialist directory |
| **AI RAG Chat Endpoint** | `POST https://healthcare-backend-production-9c03f7c4.up.railway.app/api/v1/chat` | LangChain + OpenRouter + `pgvector` assistant |
| **Live Frontend App** | [https://healthcare-frontend-production-3ce69b5c.up.railway.app](https://healthcare-frontend-production-3ce69b5c.up.railway.app) | Connected client portal |
| **Railway Project** | [Railway Project Dashboard](https://railway.com/project/4a52d4a0-79a0-4533-bb79-016696852882) | Railway project `bangladesh-specialized-hospital` |

---

## Table of Contents

- [Live Deployed API](#-live-deployed-api)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Database Schema & Data Models](#database-schema--data-models)
- [AI RAG Doctor-Finding Architecture](#ai-rag-doctor-finding-architecture)
- [REST API Reference](#rest-api-reference)
  - [Health & Utility](#health--utility)
  - [Auth (`/api/v1/auth`)](#auth-apiv1auth)
  - [User (`/api/v1/user`)](#user-apiv1user)
  - [Doctor (`/api/v1/doctor`)](#doctor-apiv1doctor)
  - [Schedule (`/api/v1/schedule`)](#schedule-apiv1schedule)
  - [Appointment (`/api/v1/appointment`)](#appointment-apiv1appointment)
  - [Payment (`/api/v1/payment`)](#payment-apiv1payment)
  - [Prescription (`/api/v1/prescription`)](#prescription-apiv1prescription)
  - [Analytics (`/api/v1/analytics`)](#analytics-apiv1analytics)
  - [AI Chat (`/api/v1/chat`)](#ai-chat-apiv1chat)
- [Core Business Rules & Workflows](#core-business-rules--workflows)
- [Authentication, Cookies & RBAC](#authentication-cookies--rbac)
- [Background Cron Jobs](#background-cron-jobs)
- [Email Templates](#email-templates)
- [Scripts & Tooling](#scripts--tooling)
- [Build & Deployment](#build--deployment)
- [Known Implementation Nuances & Troubleshooting](#known-implementation-nuances--troubleshooting)

---

## Prerequisites

| Requirement | Version / Details |
| --- | --- |
| **Node.js** or **Bun** | Node.js 20+ or Bun 1.4+ (`bun.lock` and `package-lock.json` are present) |
| **PostgreSQL** | 14+ with the **`pgvector`** extension installed (`extensions = [vector]`) |
| **Redis** | Local Redis or cloud Redis (used for OTP storage, chat history, and bKash token caching) |
| **OpenRouter API Key** | Required for AI RAG chat completions and embeddings |
| **External Services** | Cloudinary (images/resumes/PDFs), bKash Tokenized Checkout Sandbox/Prod, Google OAuth Client ID, SMTP (e.g., Gmail App Password) |

---

## Getting Started

### 1. Install Dependencies

```bash
bun install
# or: npm install
```

> `postinstall` automatically runs `prisma generate`, generating the typed Prisma client into `src/generated/prisma/` (git-ignored). Re-run `bunx prisma generate` whenever any file in `prisma/schema/` changes.

### 2. Configure `.env`

```bash
cp .env.example .env
```

Fill in all required values in `.env`. **Important:** `.env.example` does not yet include the `OPENROUTER_*` variables read by `src/app/config/index.ts`; append them manually (see [Environment Variables](#environment-variables) below).

### 3. Run Database Migrations

```bash
bunx prisma migrate deploy
# or during local schema development:
bunx prisma migrate dev
```

This enables the PostgreSQL `vector` extension and applies all committed migrations under `prisma/migrations/`.

### 4. Seed Sample Doctors (Optional, Recommended for Dev)

```bash
bun run seed:doctors
```

Seeds **75 approved specialist doctors** across **69 specializations** (all with shared dev password `Doctor@1234` and verified email accounts).

> On every server startup, `src/server.ts` also automatically seeds three core accounts from `.env` if they do not exist: `SUPER_ADMIN`, `TESTER_ADMIN` (`ADMIN`), and `TESTER_DOCTOR` (`DOCTOR`).

### 5. Verify OpenRouter & Index Doctor Embeddings

```bash
# Smoke-test OpenRouter embedding + chat model connectivity
bun run test:openrouter

# Embed all approved, non-deleted doctors into the pgvector doctor_embeddings table
bun run index:doctors
```

### 6. Start the Development Server

```bash
bun run dev
```

Expected startup sequence (`src/server.ts`):
1. Connects to PostgreSQL via Prisma (`@prisma/adapter-pg`).
2. Connects to Redis (`redisClient.connect()`).
3. Verifies Nodemailer SMTP connection (logs a warning and continues booting if SMTP credentials are missing/invalid).
4. Seeds Super Admin, Tester Admin, and Tester Doctor if missing.
5. Registers both `node-cron` background jobs.
6. Starts listening on `PORT` (default `5000`).

Confirm health:
```bash
curl http://localhost:5000/
# {"success":true,"message":"Welcome to Bangladesh Specialized Hospital Backend"}
```

---

## Environment Variables

All environment variables are loaded centrally in [`src/app/config/index.ts`](./src/app/config/index.ts). Application code imports `config` rather than reading `process.env` directly.

### Server, Database & Auth

| Variable | Required | Description |
| --- | --- | --- |
| `NODE_ENV` | Yes | `development` or `production`. In `development`, `globalErrorHandler` returns detailed error messages/stacks and cookies use `secure: false, sameSite: "lax"`. In `production`, errors are masked and cookies use `secure: true, sameSite: "none"`. |
| `PORT` | Yes | HTTP server port (e.g., `5000`). |
| `DATABASE_URL` | Yes | PostgreSQL connection URI (shared by Prisma and `PGVectorStore`). |
| `APP_URL` | Optional | Exposed as `config.bak_url`. |
| `FRONTEND_URL` | Yes | Allowed CORS origin (`credentials: true`) and OpenRouter `HTTP-Referer` header (e.g., `http://localhost:3000`). |
| `BCRYPT_SALT_ROUNDS` | Yes | Bcrypt hashing cost factor (e.g., `10`). |
| `JWT_ACCESS_SECRET` | Yes | Secret key for signing JWT access tokens. |
| `JWT_REFRESH_SECRET` | Yes | Secret key for signing JWT refresh tokens. |
| `JWT_ACCESS_EXPIRES_IN` | Yes | Access token TTL (e.g., `1d`). |
| `JWT_REFRESH_EXPIRES_IN` | Yes | Refresh token TTL (e.g., `7d`). |
| `GOOGLE_CLIENT_ID` | For Google OAuth | Google OAuth 2.0 Client ID verified via `google-auth-library`. |

### Auto-Seeded Accounts (Startup)

| Variable | Description |
| --- | --- |
| `SUPER_ADMIN_NAME`, `SUPER_ADMIN_EMAIL`, `SUPER_ADMIN_PASSWORD` | Seeded as `Role.SUPER_ADMIN` on startup if no super admin exists. |
| `TESTER_ADMIN_NAME`, `TESTER_ADMIN_EMAIL`, `TESTER_ADMIN_PASSWORD` | Seeded as `Role.ADMIN` on startup if not found by email. |
| `TESTER_DOCTOR_NAME`, `TESTER_DOCTOR_EMAIL`, `TESTER_DOCTOR_PASSWORD` | Seeded as an approved `Role.DOCTOR` on startup if not found by email. |

### Redis, Email & Media

| Variable | Description |
| --- | --- |
| `REDIS_USER`, `REDIS_PASSWORD`, `REDIS_HOST`, `REDIS_PORT` | Redis connection settings (OTP codes, chat history, bKash token cache). |
| `SMTP_USER`, `SMTP_PASSWORD`, `EMAIL_SENDER` | Nodemailer SMTP credentials and sender address for transactional emails. |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Cloudinary credentials for avatars, doctor resumes/documents, and prescription PDFs. |

### bKash Payment Gateway

| Variable | Description |
| --- | --- |
| `BKASH_BASE_URL` | Tokenized checkout API base URL (e.g., `https://tokenized.sandbox.bka.sh/v1.2.0-beta`). |
| `BKASH_USERNAME`, `BKASH_PASSWORD` | bKash merchant API credentials. |
| `BKASH_APP_KEY`, `BKASH_APP_SECRET` | bKash application credentials. |
| `BKASH_CALLBACK_URL` | Base API URL prefix for callback construction (e.g., `http://localhost:5000/api/v1`). Callback path becomes `${BKASH_CALLBACK_URL}/appointment/book-appointment/payment/callback`. |

### OpenRouter AI & RAG *(Add to `.env` manually — not listed in `.env.example`)*

| Variable | Required | Description |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | Yes (for RAG) | OpenRouter API key for both chat completions and vector embeddings. |
| `OPENROUTER_CHAT_MODEL` | Yes (for RAG) | Primary OpenRouter chat model ID (e.g., `openai/gpt-4o-mini` or `google/gemini-2.0-flash-001`). |
| `OPENROUTER_FALLBACK_CHAT_MODELS` | Optional | Comma-separated fallback chat model IDs passed via OpenRouter `models` routing. |
| `OPENROUTER_EMBEDDING_MODEL` | Yes (for RAG) | OpenRouter embedding model ID (e.g., `openai/text-embedding-3-small`). |

---

## Project Structure

```text
healthcare-backend/
├── prisma.config.ts                       # Multi-file Prisma schema & migration config
├── tsup.config.ts                         # Production bundle config (ESM + CJS to dist/)
├── vercel.json                            # Vercel Node serverless deployment config
├── biome.json                             # Biome linter/formatter configuration
├── Doctor-Finding Chatbot Architecture.png # RAG architecture diagram
├── Project Requirements.md                # Full domain specification
├── FRONTEND_PLAN.md                       # Companion frontend architecture plan
├── L2B7 Ph-Healthcare.postman_collection.json # Postman API collection
├── prisma/
│   ├── schema/
│   │   ├── schema.prisma                  # Prisma client generator & pgvector extension
│   │   ├── enums.prisma                   # Role, UserStatus, Gender, AuthProvider, AppointmentStatus, PaymentStatus, DoctorVerificationStatus, ScheduleStatus
│   │   ├── user.prisma                    # User model
│   │   ├── patient.prisma                 # Patient model
│   │   ├── doctor.prisma                  # Doctor model
│   │   ├── schedule.prisma                # Schedule model
│   │   ├── appointment.prisma             # Apppointment model
│   │   ├── payment.prisma                 # Payment model
│   │   └── chat.prisma                    # DoctorEmbeddig (pgvector) model
│   └── migrations/                        # Historical SQL migrations
└── src/
    ├── server.ts                          # Process bootstrap: DB, Redis, SMTP, seeds, crons, HTTP listener
    ├── app.ts                             # Express app, CORS, JSON/URL/cookie parsers, v1 router mounting, error handlers
    ├── generated/prisma/                  # Generated Prisma client (git-ignored)
    └── app/
        ├── config/index.ts                # Centralized env configuration
        ├── interfaces/index.ts            # Shared query/pagination interfaces (IQuery)
        ├── lib/
        │   ├── prisma.ts                  # Shared PrismaClient instance
        │   ├── redis.ts                   # Shared Redis client
        │   ├── llm.ts                     # OpenRouter ChatOpenAI + retry wrapper & OpenRouterEmbeddings
        │   ├── vectorStore.ts             # LangChain PGVectorStore over doctor_embeddings (cosine distance)
        │   ├── bkash.ts                   # bKash grant/refresh ID token manager cached in Redis
        │   ├── cloudinary.ts              # Cloudinary SDK config
        │   ├── multer.ts                  # Multer in-memory upload middleware
        │   ├── nodemailer.ts              # SMTP transporter
        │   ├── googleAuth.ts              # Google OAuth2Client
        │   └── cron.ts                    # Scheduled background maintenance jobs
        ├── middleware/
        │   ├── checkAuth.ts               # `auth(...roles)` JWT + DB verification + role guard
        │   ├── validateRequest.ts         # Zod schema body validation middleware
        │   ├── globalErrorHandler.ts      # Unified Prisma / AppError / Error JSON formatter
        │   └── notFound.ts                # 404 fallback middleware
        ├── module/
        │   ├── auth/                      # Register, OTP verify, login, Google OAuth, refresh, forgot/reset password, logout, me
        │   ├── user/                      # Profile image upload to Cloudinary
        │   ├── doctor/                    # Doctor application, OTP verify, admin approval, profile update, public discovery
        │   ├── schedule/                  # Daily schedule CRUD, publishing, today's slots
        │   ├── appointment/               # Booking, bKash payment & callback, cancel/refund, status transitions, listings
        │   ├── payment/                   # Patient & admin payment histories
        │   ├── prescription/              # PDFKit prescription generation, Cloudinary upload, email delivery
        │   ├── analytics/                 # Role-specific metrics for patient, doctor, admin
        │   └── chat/                      # RAG chatbot controller, service, indexer, prompts, validation
        ├── scripts/
        │   ├── indexDoctors.ts            # Full re-index CLI for doctor_embeddings
        │   └── testOpenRouter.ts          # OpenRouter chat & embedding verification script
        ├── templates/                     # 6 EJS email templates
        └── utils/
            ├── AppError.ts                # Custom HTTP error class
            ├── catchAsync.ts              # Async Express error wrapper
            ├── jwt.ts                     # JWT sign & verify helpers
            ├── randomPassword.ts          # Temporary password generator for approved doctors
            ├── seed.ts                    # Startup seeders (Super Admin, Tester Admin, Tester Doctor)
            ├── seedDoctors.ts             # Standalone seeder for 75 specialist doctors
            └── sendResponse.ts            # Standardized API response envelope
```

---

## Database Schema & Data Models

Prisma is configured with a multi-file schema (`prisma/schema/`) and PostgreSQL `pgvector` extension.

### Models

| Prisma Model | Table Name | Key Fields & Relations |
| --- | --- | --- |
| **`User`** | `users` | `id` (UUID), `name`, `email` (unique), `password?`, `googleId?` (unique), `authProvider`, `emailVerified`, `role`, `status`, `needPasswordChange`, `imageUrl`, `imagePublicId`, soft-delete fields; 1-to-1 with `Patient?` and `Doctor?`. |
| **`Patient`** | `patients` | `id` (UUIDv7), `name`, `email` (unique), `contactNumber?`, `address?`, `userId` (unique FK -> `User`), `appointments[]`. |
| **`Doctor`** | `doctors` | `id` (UUID), `name`, `email` (unique), `address?`, `specialization`, `licenseNumber` (unique), `qualifications`, `experienceYears`, `bio?`, `consultationFee` (`Decimal(10,2)`), `contactNumber?`, `verificationStatus`, `rejectionReason?`, `reviewedBy?`, `reviewedAt?`, `resume?`, `resumePublicId?`, `additionalFiles` (`Json`), `userId` (unique FK -> `User`), `schedules[]`, `appointments[]`. |
| **`Schedule`** | `schedules` | `id` (UUID), `startDateTime`, `endDateTime`, `totalSlots`, `availableSlots`, `meetingLink`, `status` (`DRAFT`/`PUBLISHED`), `doctorId` (FK -> `Doctor`), `appointments[]`. Unique constraint on `(doctorId, startDateTime, endDateTime)`. |
| **`Apppointment`** *(note triple-p in schema)* | `appointments` | `id` (UUID), `status`, `joiningTime?`, `serialNumber?`, `recordUrl?`, `recordPublicId?`, `prescriptionUrl?`, `prescriptionPublicId?`, `patientId`, `doctorId`, `scheduleId`, 1-to-1 `payment?`. Unique constraints on `(patientId, doctorId, scheduleId)` and `(scheduleId, serialNumber, joiningTime)`. |
| **`Payment`** | `payments` | `id` (UUID), `status`, `amount` (`Decimal(10,2)`), `currency` (`BDT`), `paymentGateway` (`bkash`), `merchantInvoiceNumber` (unique), `bkashPaymentId?` (unique), `bkashTrxId?`, `payerReference?`, `paidAt?`, `gatewayResponse` (`Json`), refund fields (`refundTrxId`, `refundAmount`, `refundReason`, `refundedAt`), `appointmentId` (unique FK -> `Apppointment`). |
| **`DoctorEmbeddig`** *(note spelling in schema)* | `doctor_embeddings` | `id` (UUID via `gen_random_uuid()`), `content?`, `metadata` (`Json`), `embedding` (`Unsupported("vector")`). Managed by LangChain `PGVectorStore`. |

### Enums (`prisma/schema/enums.prisma`)

- **`Role`**: `SUPER_ADMIN`, `ADMIN`, `DOCTOR`, `PATIENT`
- **`UserStatus`**: `ACTIVE`, `BLOCKED`, `DELETED`
- **`Gender`**: `MALE`, `FEMALE`, `OTHER`
- **`AuthProvider`**: `GOOGLE`, `CREDENTIAL`
- **`DoctorVerificationStatus`**: `PENDING`, `APPROVED`, `REJECTED`
- **`ScheduleStatus`**: `DRAFT`, `PUBLISHED`
- **`AppointmentStatus`**: `PENDING`, `CONFIRMED`, `CANCELLED`, `ONGOING`, `COMPLETED`
- **`PaymentStatus`**: `UNPAID`, `PAID`, `FAILED`, `CANCELLED`, `REFUNDED`

---

## AI RAG Doctor-Finding Architecture

See the visual diagram in [`Doctor-Finding Chatbot Architecture.png`](./Doctor-Finding%20Chatbot%20Architecture.png).

### Components

1. **LLM & Embeddings (`src/app/lib/llm.ts`)**
   - `chatModel`: Wraps `@langchain/openai`'s `ChatOpenAI` pointed at `https://openrouter.ai/api/v1` with `temperature: 0.2`, automatic OpenRouter fallback model routing (`[OPENROUTER_CHAT_MODEL, ...OPENROUTER_FALLBACK_CHAT_MODELS]`), and `.withRetry({ stopAfterAttempt: 3 })`.
   - `embeddings`: Custom `OpenRouterEmbeddings` extending LangChain's `Embeddings` calling OpenRouter's `/embeddings` endpoint with `encoding_format: "float"` and 3 retries.
2. **Vector Store (`src/app/lib/vectorStore.ts`)**
   - `PGVectorStore` backed by a dedicated `pg.Pool`, writing to `doctor_embeddings` with **cosine** distance similarity (`distanceStrategy: "cosine"`).
3. **Indexer (`src/app/module/chat/chat.indexer.ts`)**
   - `buildDoctorDocument()`: Combines doctor name, specialization, qualifications, years of experience, and bio into a single LangChain `Document` with `metadata: { doctorId }`.
   - `upsertDoctorEmbedding(doctorId)`: Deletes stale vector and re-inserts only if the doctor exists, is not deleted, and is `APPROVED`. Triggered automatically (non-blocking) inside `DoctorServices.approveDoctor` and `DoctorServices.updateDoctorProfile`.
   - `reindexAllDoctors()`: Prunes obsolete vectors and batch-reindexes all approved doctors (`INDEX_BATCH_SIZE = 20`). Invoked by `bun run index:doctors` and the daily 3:00 AM cron job.
4. **Chat Service (`src/app/module/chat/chat.service.ts`)**
   - Loads/saves up to `10` messages per session in Redis (`chat:session:<sessionId>`, TTL = `3600` seconds).
   - When history exists, runs `condenseQuestionChain` (`CONDENSE_QUESTION_PROMPT`) to produce a standalone search query.
   - Runs `vectorStore.similaritySearchWithScore(searchQuery, 4)` (`TOP_K_DOCTORS = 4`).
   - Hydrates the matched doctors from Prisma along with **today's upcoming `PUBLISHED` schedules with `availableSlots > 0`**, preserving vector similarity rank order.
   - Runs `answerChain` (`CHAT_SYSTEM_PROMPT`) enforcing medical safety rules (no diagnosis/medications, emergency escalation, grounded strictly in retrieved context, concise English bulleted output).
   - Returns `{ sessionId, answer, doctors: [{ id, name, specialization, consultationFee }] }`.

---

## REST API Reference

Base URL: `http://localhost:5000`
Standard success envelope (`sendResponse`):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "...",
  "data": {},
  "meta": { "page": 1, "limit": 10, "total": 75, "totalPages": 8 }
}
```

### Health & Utility

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/` | Public | API health check (`Welcome to Bangladesh Specialized Hospital Backend`). |
| `GET` | `/test` | Public | Smoke-tests `getBkashIdToken()` against bKash API. |

### Auth (`/api/v1/auth`)

| Method | Path | Auth / Roles | Validation / Middleware | Description |
| --- | --- | --- | --- | --- |
| `POST` | `/api/v1/auth/register` | Public | `PatientRegistrationZodSchema` | Registers a patient (`name` 3–10 chars, `email`, strong `password`, optional `patient.contactNumber`) and sends a 6-digit OTP email stored in Redis. |
| `POST` | `/api/v1/auth/verify-email` | Public | `PatientEmailVerifyZodSchema` | Verifies email + 6-digit OTP, activates account, sets `accessToken`/`refreshToken` cookies, and returns tokens + user/patient. |
| `POST` | `/api/v1/auth/login` | Public | `LoginZodSchema` | Authenticates via email & password, sets HTTP-only cookies, and returns `{ accessToken, refreshToken }`. |
| `GET` | `/api/v1/auth/me` | `SUPER_ADMIN`, `ADMIN`, `DOCTOR`, `PATIENT` | `auth(...)` | Returns the authenticated user profile. |
| `POST` | `/api/v1/auth/refresh-token` | Public (uses cookie) | — | Issues a fresh access token using the `refreshToken` cookie. |
| `POST` | `/api/v1/auth/google` | Public | — | Verifies Google `idToken` via `google-auth-library`, signs in or provisions patient account, and sets auth cookies. |
| `POST` | `/api/v1/auth/forgot-password` | Public | `ForgotPasswordZodSchema` | Emails a password-reset OTP (`forgot-password.ejs`). |
| `POST` | `/api/v1/auth/reset-password` | Public | `ResetPasswordZodSchema` | Resets password using `email`, `otp`, and strong `newPassword`; sends confirmation email (`reset-password-success.ejs`). |
| `POST` | `/api/v1/auth/logout` | Public | — | Clears `accessToken` and `refreshToken` cookies. |

### User (`/api/v1/user`)

| Method | Path | Auth / Roles | Validation / Middleware | Description |
| --- | --- | --- | --- | --- |
| `PATCH` | `/api/v1/user/profile-image` | All authenticated roles | `upload.single("profileImage")` | Streams profile image to Cloudinary, updates `User.imageUrl`/`imagePublicId`, and destroys previous image if present. |

### Doctor (`/api/v1/doctor`)

| Method | Path | Auth / Roles | Validation / Middleware | Description |
| --- | --- | --- | --- | --- |
| `POST` | `/api/v1/doctor/apply-as-doctor` | Public | `upload.fields([{ name: "resume", maxCount: 1 }, { name: "additionalFiles", maxCount: 10 }])` | Submits a doctor application (`data` JSON string + resume + supporting files uploaded to Cloudinary) and sends an email verification OTP. |
| `POST` | `/api/v1/doctor/apply-as-doctor/verify-email` | Public | — | Verifies doctor applicant's email OTP so application enters admin review queue. |
| `POST` | `/api/v1/doctor/approve-doctor` | `ADMIN`, `SUPER_ADMIN` | `auth(...)` | Approves or rejects a doctor application, generates temporary password on approval, sends EJS email, and syncs vector embedding. |
| `GET` | `/api/v1/doctor/all-doctors` | `ADMIN`, `SUPER_ADMIN` | `auth(...)` | Paginated, filterable list of all doctors (including verification status, resumes, and review metadata). |
| `PATCH` | `/api/v1/doctor/update-my-profile` | `DOCTOR` | `UpdateDoctorProfileValidationZodSchema` | Updates authenticated doctor's profile fields and re-syncs their vector embedding. |
| `GET` | `/api/v1/doctor/public/available-today` | Public | — | Lists approved doctors who have open published schedules today. |
| `GET` | `/api/v1/doctor/public/all-doctors` | Public | — | Paginated, searchable (`searchTerm`), filterable (`specialization`), sortable (`sortBy`, `sortOrder`) public directory of approved doctors. |
| `GET` | `/api/v1/doctor/public/:doctorId` | Public | — | Returns sanitized public profile of a single approved doctor (excludes private files and admin metadata). |

### Schedule (`/api/v1/schedule`)

| Method | Path | Auth / Roles | Validation / Middleware | Description |
| --- | --- | --- | --- | --- |
| `POST` | `/api/v1/schedule/create-schedule` | `DOCTOR` | `CreateScheduleValidationZodSchema` | Creates a `DRAFT` schedule (`startDateTime`, `endDateTime`, `meetingLink`), auto-calculating 20-minute `totalSlots` & `availableSlots`. |
| `GET` | `/api/v1/schedule/my-schedules` | `DOCTOR` | `auth(...)` | Lists the authenticated doctor's schedules with filtering & pagination. |
| `GET` | `/api/v1/schedule/all-schedules` | `ADMIN`, `SUPER_ADMIN` | `auth(...)` | Lists all schedules across all doctors. |
| `GET` | `/api/v1/schedule/todays-schedule` | Public | — | Returns today's published, bookable schedules (filterable by `doctorId`, `page`, `limit`). |
| `PATCH` | `/api/v1/schedule/update-schedule/:scheduleId` | `DOCTOR` | `UpdateScheduleValidationZodSchema` | Updates a doctor's own schedule. |
| `PATCH` | `/api/v1/schedule/publish-schedule/:scheduleId` | `DOCTOR` | `auth(...)` | Transitions a `DRAFT` schedule to `PUBLISHED`. |
| `GET` | `/api/v1/schedule/:scheduleId` | `DOCTOR`, `ADMIN`, `SUPER_ADMIN` | `auth(...)` | Fetches details for a specific schedule. |
| `DELETE` | `/api/v1/schedule/:scheduleId` | `DOCTOR` | `auth(...)` | Soft-deletes a doctor's schedule. |

### Appointment (`/api/v1/appointment`)

| Method | Path | Auth / Roles | Validation / Middleware | Description |
| --- | --- | --- | --- | --- |
| `POST` | `/api/v1/appointment/book-appointment` | `PATIENT` | `BookAppointmentValidationZodSchema` | Creates a `PENDING` appointment for an open today's published schedule and initiates a bKash checkout session, returning `paymentUrl`. |
| `POST` | `/api/v1/appointment/pay-appointment` | `PATIENT` | `auth(...)` | Initiates/retries bKash payment for an existing pending appointment. |
| `GET` | `/api/v1/appointment/book-appointment/payment/callback` | Public (bKash redirect) | — | Executes bKash payment; on `success`, confirms appointment, assigns `serialNumber` & `joiningTime`, decrements `availableSlots`, emails PDF receipt, and redirects to frontend. |
| `POST` | `/api/v1/appointment/cancel-appointment` | `PATIENT`, `ADMIN`, `SUPER_ADMIN` | `auth(...)` | Cancels an appointment, increments `availableSlots`, and triggers an automatic bKash refund if cancelled >1 hour before `startDateTime`. |
| `PATCH` | `/api/v1/appointment/update-status/:appointmentId` | `DOCTOR` | `UpdateAppointmentStatusValidationZodSchema` | Updates consultation status (e.g., `CONFIRMED` -> `ONGOING` -> `COMPLETED`). |
| `GET` | `/api/v1/appointment/my-appointments` | `PATIENT` | `auth(...)` | Paginated list of the authenticated patient's appointments. |
| `GET` | `/api/v1/appointment/doctor-appointments` | `DOCTOR` | `auth(...)` | Paginated list of the authenticated doctor's appointments. |
| `GET` | `/api/v1/appointment/all-appointments` | `ADMIN`, `SUPER_ADMIN` | `auth(...)` | Paginated list of all appointments platform-wide. |
| `GET` | `/api/v1/appointment/:appointmentId` | All authenticated roles | `auth(...)` | Retrieves full details for a single appointment. |

### Payment (`/api/v1/payment`)

| Method | Path | Auth / Roles | Description |
| --- | --- | --- | --- |
| `GET` | `/api/v1/payment/my-payments` | `PATIENT` | Lists the authenticated patient's payment history. |
| `GET` | `/api/v1/payment/all-payments` | `ADMIN`, `SUPER_ADMIN` | Lists all payment records platform-wide. |
| `GET` | `/api/v1/payment/:paymentId` | `PATIENT`, `ADMIN`, `SUPER_ADMIN` | Retrieves a single payment record by ID. |

### Prescription (`/api/v1/prescription`)

| Method | Path | Auth / Roles | Validation / Middleware | Description |
| --- | --- | --- | --- | --- |
| `POST` | `/api/v1/prescription/create-prescription` | `DOCTOR` | `CreatePrescriptionValidationZodSchema` | Generates a branded PDFKit prescription (`appointmentId`, `findings`, `medicines[]`) for a `COMPLETED` appointment, uploads to Cloudinary (`raw`/`pdf`), saves URL on appointment, and emails the patient. |
| `GET` | `/api/v1/prescription/:appointmentId` | All authenticated roles | `auth(...)` | Retrieves the prescription details & PDF URL for an appointment. |

### Analytics (`/api/v1/analytics`)

| Method | Path | Auth / Roles | Description |
| --- | --- | --- | --- |
| `GET` | `/api/v1/analytics/patient-analytics` | `PATIENT` | Total, upcoming, completed, cancelled appointments and spending summary. |
| `GET` | `/api/v1/analytics/doctor-analytics` | `DOCTOR` | Doctor schedule, appointment, and earnings metrics. |
| `GET` | `/api/v1/analytics/admin-analytics` | `ADMIN`, `SUPER_ADMIN` | Platform-wide doctor counts (total/pending/approved/rejected), patient counts, appointment counts, revenue, and refund aggregates. |

### AI Chat (`/api/v1/chat`)

| Method | Path | Auth / Roles | Validation / Middleware | Description |
| --- | --- | --- | --- | --- |
| `POST` | `/api/v1/chat` | Public | `SendChatMessageZodSchema` | Accepts `{ message: string (1–1000 chars), sessionId?: uuid }` and returns `{ sessionId, answer, doctors }`. |

---

## Core Business Rules & Workflows

- **20-Minute Slot Engine**: Every schedule must start and end on the same calendar day, with `startDateTime < endDateTime` and duration `>= 20` minutes. Only **one non-deleted schedule per doctor per day** is permitted. `totalSlots = Math.floor(durationInMinutes / 20)`.
- **Serial Number & Joining Time**: Upon successful bKash callback, `serialNumber = (totalSlots - availableSlots) + 1` and `joiningTime = startDateTime + (serialNumber - 1) * 20 minutes`.
- **Same-Day Future Booking Rule**: Patients can only book `PUBLISHED` schedules occurring today before `startDateTime`, with `availableSlots > 0` and a configured doctor `consultationFee`. Duplicate active appointments by the same patient on the same schedule are blocked.
- **bKash Token Caching (`src/app/lib/bkash.ts`)**: bKash `id_token` (1-hour TTL) and `refresh_token` (28-day TTL) are cached in Redis (`bkash:idToken`, `bkash:refreshToken`). When the ID token has `<= 10` minutes remaining and a valid refresh token exists, it refreshes seamlessly; otherwise it requests a fresh grant token.
- **Refund Cutoff Rule**: Cancelling an appointment restores `availableSlots` and triggers an automated bKash refund if `now < subHours(schedule.startDateTime, 1)` (cancelled at least 1 hour before schedule start).
- **One Prescription Per Completed Appointment**: Prescriptions can only be generated once per appointment and only after its status reaches `COMPLETED`.

---

## Authentication, Cookies & RBAC

`auth(...requiredRoles)` in [`src/app/middleware/checkAuth.ts`](./src/app/middleware/checkAuth.ts) guards protected endpoints:
1. Extracts JWT from `req.cookies.accessToken`, falling back to `Authorization: Bearer <token>` (or raw token header).
2. Verifies token signature with `JWT_ACCESS_SECRET`.
3. Checks `role` from token payload against `requiredRoles`.
4. Queries `prisma.user.findUnique` matching `id`, `email`, `name`, and `role`.
5. Rejects accounts with `status === "BLOCKED"` (`403 Forbidden`).
6. Attaches `{ userId, email, name, role }` to `req.user`.

Cookie lifetimes: `accessToken` = 1 day, `refreshToken` = 7 days (`httpOnly: true`; `secure: false, sameSite: "lax"` in development; `secure: true, sameSite: "none"` in production).

---

## Background Cron Jobs

Registered in `src/server.ts` via [`src/app/lib/cron.ts`](./src/app/lib/cron.ts):

| Job | Schedule | Behavior |
| --- | --- | --- |
| `deleteUnverifiedDoctors` | `*/10 * * * *` (every 10 minutes) | Deletes `DOCTOR` users with `emailVerified: false`, `verificationStatus: PENDING`, and `createdAt < now - 1 hour`. |
| `reindexDoctorEmbeddings` | `0 3 * * *` (daily at 3:00 AM) | Calls `reindexAllDoctors()` to keep `doctor_embeddings` synchronized with PostgreSQL. |

---

## Email Templates

Located in `src/app/templates/` and rendered via EJS + Nodemailer:
- `registration-user-otp.ejs` — 6-digit registration verification OTP
- `patient-welcome-email.ejs` — Welcome message upon patient verification
- `doctor-application-approved.ejs` — Approval notice with generated temporary password
- `doctor-application-rejected.ejs` — Rejection notice with admin's rejection reason
- `forgot-password.ejs` — Password reset OTP
- `reset-password-success.ejs` — Password change confirmation

---

## Scripts & Tooling

```bash
bun run dev              # Run development server with hot reload (tsx watch src/server.ts)
bun run build            # Bundle production build to dist/ using tsup
bun run start            # Run bundled production server (node dist/server.js)
bun run seed:doctors     # Seed 75 sample approved doctors into PostgreSQL
bun run index:doctors    # Re-index all approved doctors into pgvector
bun run test:openrouter  # Verify OpenRouter embedding and chat completion APIs
bun run lint:check       # Lint ./src with Biome
bun run lint:fix         # Auto-fix lint issues in ./src with Biome
bun run format:check     # Check formatting in ./src with Biome
bun run format:fix       # Format ./src with Biome
```

Prisma CLI helpers:
```bash
bunx prisma generate        # Regenerate Prisma client into src/generated/prisma
bunx prisma migrate dev     # Create & apply a new migration locally
bunx prisma migrate deploy  # Apply committed migrations in staging/prod
bunx prisma studio          # Open Prisma Studio GUI (http://localhost:5555)
```

API Testing: Import [`L2B7 Ph-Healthcare.postman_collection.json`](./L2B7%20Ph-Healthcare.postman_collection.json) into Postman.

---

## Build & Deployment

- **Production Deployment (Railway — Active)**:
  - Deployed in project **`bangladesh-specialized-hospital`** on Railway ([Dashboard](https://railway.com/project/4a52d4a0-79a0-4533-bb79-016696852882)).
  - Build command: `bun install && bunx prisma generate && bun run build`
  - Start command: `bun run start` (executes `node dist/server.js`)
  - Connected to cloud Neon PostgreSQL (`pgvector` enabled) and private Railway Redis service (`redis.railway.internal:6379`).
  - Automatically redeploys on pushes to `main` branch.
- **Bundling**: `bun run build` runs `tsup` (`tsup.config.ts`), bundling `src/server.ts` into `dist/` (both ESM & CJS formats with sourcemaps and a `createRequire` banner shim for CJS dependencies).
- **Vercel**: [`vercel.json`](./vercel.json) routes all requests (`/(.*)`) to `dist/server.js` using `@vercel/node`. Ensure all environment variables (including `DATABASE_URL`, `REDIS_*`, `OPENROUTER_*`, `FRONTEND_URL`, and `NODE_ENV=production`) are configured in the deployment environment.

---

## Known Implementation Nuances & Troubleshooting

- **Prisma Model Naming**: Note the exact generated Prisma client spellings: `prisma.apppointment` (three `p`s) and `prisma.doctorEmbeddig` (missing `n`). The underlying PostgreSQL table names are `appointments` and `doctor_embeddings`.
- **Patient Registration Name Length**: `PatientRegistrationZodSchema` currently constrains `name` to `min(3)` and `max(10)` characters.
- **`Cannot find module '.../src/generated/prisma'`**: Run `bunx prisma generate`.
- **Missing `OPENROUTER_*` vars**: Because `.env.example` does not list them yet, ensure `OPENROUTER_API_KEY`, `OPENROUTER_CHAT_MODEL`, `OPENROUTER_EMBEDDING_MODEL` (and optionally `OPENROUTER_FALLBACK_CHAT_MODELS`) are added to `.env`, then run `bun run test:openrouter`.
- **PostgreSQL `vector` extension error**: Install `pgvector` on your PostgreSQL host (e.g., `brew install pgvector` on macOS or use a Postgres provider with `pgvector` enabled like Neon/Supabase/Railway) before running migrations.
- **SMTP Startup Warning**: If SMTP credentials are invalid, the server logs a warning and starts anyway so local API/RAG development isn't blocked, but email delivery (OTP, welcome, approval, prescriptions) will fail until valid SMTP credentials are provided.
- **Production Error Masking**: When `NODE_ENV` is not `"development"`, `globalErrorHandler` returns `"Internal Server Error"` in the response body while still setting the appropriate HTTP status code.
