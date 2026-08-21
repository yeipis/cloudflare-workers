# ⚡ Cloudflare Workers Monorepo

Centralized monorepo managed with **pnpm**, **TypeScript**, and **Wrangler** to develop, test, and deploy Cloudflare Workers.

---

## 📁 Project Structure

```text
cloudflare-workers/
├── .github/workflows/
│   └── deploy.yml              # Automated CI/CD with GitHub Actions
├── workers/
│   ├── project-placeholder/    # HTTP Worker: Responsive bilingual placeholder page
│   └── email-catch-all-reject/ # Email Routing Worker: Catch-all rejection bounce for unrouted mail
├── package.json                # Root scripts and shared development dependencies
├── pnpm-workspace.yaml         # pnpm workspace configuration
├── tsconfig.base.json          # Shared base TypeScript configuration
└── README.md
```

---

## 🛠️ Workers

| Worker | Type | Description |
| :--- | :--- | :--- |
| **`project-placeholder`** | HTTP / Fetch | Serves a responsive, dark-themed "In Development" landing page with client-side **English / Spanish** language switching for `*.yeipi.dev` subdomains. |
| **`email-catch-all-reject`** | Email Routing | Intercepts all incoming emails sent to unconfigured addresses and immediately bounces them with a standard SMTP `550` reject code and bilingual explanation. Also provides an informative JSON endpoint over HTTP. |

---

## 🚀 Quick Commands

### Installation
```bash
pnpm install
```

### Type Checking
Run TypeScript type checks across all packages in the monorepo:
```bash
pnpm typecheck
```

### Local Development

Use the standard pnpm workspace filter syntax:

```bash
# Run the placeholder worker (http://localhost:8787)
pnpm --filter project-placeholder dev

# Run the email worker (http://localhost:8787)
pnpm --filter email-catch-all-reject dev
```

> **Tip:** You can also use the convenience aliases configured in the root `package.json`:
> ```bash
> pnpm dev:placeholder
> pnpm dev:email-reject
> ```

---

## 🌐 Routes & Deployment

### Manual Deployment
```bash
# Deploy a single worker
pnpm --filter project-placeholder deploy
pnpm --filter email-catch-all-reject deploy

# Deploy all workers in the monorepo
pnpm deploy:all
```

### Routing Configuration in `wrangler.jsonc`
Workers can define their own routes directly in `wrangler.jsonc` (Infrastructure as Code):

```jsonc
{
  "name": "project-placeholder",
  "routes": [
    { "pattern": "poketools.yeipi.dev/*", "zone_name": "yeipi.dev" },
    { "pattern": "greenfleet.yeipi.dev/*", "zone_name": "yeipi.dev" },
    { "pattern": "parkit.yeipi.dev/*", "zone_name": "yeipi.dev" }
  ]
}
```

---

## 🤖 CI / CD (GitHub Actions)

The repository includes an automated workflow at `.github/workflows/deploy.yml`:
1. **Pull Requests & Pushes**: Automatically executes `pnpm typecheck` to prevent regressions.
2. **Push to `main`**: Uses `paths-filter` to detect which worker directories have changed and only deploys the affected workers to Cloudflare.

### 🔑 Required GitHub Secrets
To enable automated deployments, configure the following secrets in GitHub (**Settings** → **Secrets and variables** → **Actions**):

- `CLOUDFLARE_API_TOKEN`: Cloudflare API Token with `Workers Scripts: Edit` and `Workers Routes: Edit` permissions.
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID (located in your Workers dashboard sidebar).

---

## ➕ Adding a New Worker

1. Create a new directory in `workers/<worker-name>`:
   ```bash
   mkdir -p workers/my-new-worker/src
   ```
2. Add `package.json`, `tsconfig.json` (extending `../../tsconfig.base.json`), and `wrangler.jsonc`.
3. Create `src/index.ts`.
4. Run `pnpm install` at the root to link the new package into the workspace.
5. Verify types with `pnpm typecheck`.