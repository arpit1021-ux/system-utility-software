# SystemPulse - Project Progress

## What This Project Is
A system health monitoring platform with two parts:
- **Go agent** (`utility-software/`) - CLI tool that collects system info (disk encryption, antivirus, OS updates, sleep timeout, hardware) and sends it to Supabase
- **React dashboard** (`frontend/`) - Web UI showing all systems' health, security compliance, alerts, and activity logs

## What Was Fixed (June 2026)

### Backend (Go) Fixes
- `common/types.go`: Changed package name from `types` to `common`, added snake_case JSON struct tags matching the SQL schema
- `collect/common.go`: Fixed `types.SystemInfo` -> `common.SystemInfo`, added `getOSName()` to convert Go OS strings to display names (darwin->macOS, etc.)
- `collect/windows.go`, `linux.go`, `mac.go`, `fallback.go`: Fixed type references and imports
- `utils/network.go`: Fixed type reference, cleaned up unused imports
- `main.go`: Cleaned up code structure

### Frontend (React) Fixes
- Created `frontend/.env` with placeholder Supabase credentials
- `database.types.ts`: Changed PascalCase fields to snake_case matching SQL schema (e.g., `Hostname`->`hostname`, `DiskEncrypted`->`disk_encrypted`)
- **ALL page components** updated to use snake_case field names:
  - `Header.tsx`, `SystemList.tsx`, `Dashboard.tsx`, `Systems.tsx`
  - `SystemDetails.tsx`, `Alerts.tsx`, `Security.tsx`, `Activity.tsx`, `Storage.tsx`
- Removed unused `@supabase/auth-helpers-react` dependency (deprecated)

### Verification
- TypeScript type check: **0 errors**
- Vite production build: **successful**

## What Needs To Be Done Next

### 1. Set Up Supabase (TODO)
- Create account at supabase.com
- Create a new project
- Run SQL migrations from `frontend/supabase/migrations/`:
  - `20250517180833_empty_voice.sql` (creates `systems` table)
  - `20250517180843_emerald_cell.sql` (creates `system_history` table)
- Enable Email auth in Authentication -> Providers
- Copy Project URL and anon key

### 2. Configure Frontend
- Edit `frontend/.env` and fill in:
  ```
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key
  ```
- Run with `cd frontend && npm run dev`

### 3. Configure Go Agent
- Edit `utility-software/.env`:
  ```
  SUPABASE_URL=https://your-project.supabase.co
  API_KEY=your-anon-key
  ```
- Install Go if not installed (https://go.dev/dl/)
- Build: `cd utility-software && go build -o myagent .`
- Run as administrator: `.\myagent.exe`
- Enter your Supabase user UUID as Owner ID (found in Supabase Dashboard -> Authentication -> Users)

### 4. Potential Future Improvements
- Add real-time Supabase subscriptions for live dashboard updates
- Add system history tracking using the `system_history` table
- Add scheduled agent runs (cron/task scheduler)
- Store storage data properly instead of random values
- Add email/push notifications for critical alerts
- Deploy the Go agent across multiple machines
