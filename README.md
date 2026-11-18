# AI-Powered-Hospital-Management-System-

Full-stack **Bangladesh Specialized Hospital** management and patient portal featuring an AI RAG Healthcare Assistant, 200+ specialist doctors across 34+ departments, online scheduling, and bKash appointment booking.

## Repository Structure

- `L2B7-Project-PH-Healthcare-Backend/` — Express, TypeScript, Prisma (PostgreSQL + `pgvector`), Redis, LangChain / OpenRouter RAG Assistant, Nodemailer, Cloudinary, and bKash integration.
- `PH-Healthcare-Nextjs/` — Next.js 16 (App Router), React 19, Tailwind CSS v4, TanStack Query, shadcn/ui, and interactive AI Chat Widget.

## Quick Start

### 1. Backend
```bash
cd L2B7-Project-PH-Healthcare-Backend
cp .env.example .env   # Fill in DATABASE_URL, REDIS_*, OPENROUTER_API_KEY, etc.
bun install
bunx prisma migrate deploy
bun run seed:doctors
bun run index:doctors
bun run dev
```

### 2. Frontend
```bash
cd PH-Healthcare-Nextjs
bun install
# Set NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1 in .env.local
bun run dev
```
