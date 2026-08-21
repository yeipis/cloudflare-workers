# ⚡ Cloudflare Workers Monorepo

Centralized monorepo managed with **pnpm**, **TypeScript**, and **Wrangler** to develop, test, and deploy Cloudflare Workers.

---

## 📁 Project Structure

```text
cloudflare-workers/
├── .github/workflows/
│   └── deploy.yml              # Automated CI/CD with GitHub Actions
├── workers/
│   └── <worker-name>/          # Individual Cloudflare Worker packages
├── package.json                # Root scripts and shared development dependencies
├── pnpm-workspace.yaml         # pnpm workspace configuration
├── tsconfig.base.json          # Shared base TypeScript configuration
└── README.md
```

---

## 🛠️ Workers

| Worker | Type | Description |
| :--- | :--- | :--- |
| **`project-placeholder`** | HTTP / Fetch | Serves a responsive, dark-themed "In Development" landing page with client-side **English / Spanish** language switching for unfinished projects on `*.yeipi.dev` subdomains. |
| **`email-catch-all-reject`** | Email Routing | Intercepts all incoming emails sent to unconfigured addresses and immediately bounces them with a standard SMTP `550` reject code and bilingual explanation. Also provides an informative JSON status endpoint over HTTP. |

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

Run any worker locally using pnpm workspace filtering:

```bash
# Run a specific worker (e.g. at http://localhost:8787)
pnpm --filter <worker-name> dev
```

> **Convenience Shortcuts:**
> ```bash
> pnpm dev:placeholder
> pnpm dev:email-reject
> ```

---

## 🌐 Routes & Deployment

### Manual Deployment

```bash
# Deploy a single worker
pnpm --filter <worker-name> deploy

# Deploy all workers in the monorepo
pnpm deploy:all
```

### Routing Configuration in `wrangler.jsonc`

Workers can define custom subdomain routes directly in their `wrangler.jsonc` (Infrastructure as Code):

```jsonc
{
  "name": "project-placeholder",
  "workers_dev": false,
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
3. **Manual Trigger (`workflow_dispatch`)**: Trigger on-demand deployments directly from the GitHub web interface:
   - Navigate to the **Actions** tab in your GitHub repository.
   - Select the **CI / CD** workflow in the left sidebar.
   - Click the **Run workflow** dropdown button on the right.
   - Select which worker to deploy (`all`, `project-placeholder`, or `email-catch-all-reject`) and click **Run workflow**.

### 🔑 Required GitHub Secrets

To enable automated deployments, configure the following secrets under **Repository Secrets** in your GitHub repository (**Settings** → **Secrets and variables** → **Actions** → **New repository secret**):

#### 1. `CLOUDFLARE_ACCOUNT_ID`
* **Where to find it:**
  1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com).
  2. In the left sidebar, navigate to **Workers & Pages** (or select your domain zone).
  3. Look at the right sidebar and copy your **Account ID**.
* **In GitHub:**
  - **Name:** `CLOUDFLARE_ACCOUNT_ID`
  - **Secret:** *`<Paste your Account ID>`*

#### 2. `CLOUDFLARE_API_TOKEN`
* **Where to create it:**
  1. In Cloudflare, go to **My Profile** (top-right avatar) → [**API Tokens**](https://dash.cloudflare.com/profile/api-tokens).
  2. Click **Create Token** → select **Create Custom Token** (or start from the *Edit Cloudflare Workers* template).
  3. **Token Name:** e.g., `GitHub Actions - cloudflare-workers`.
  4. Configure the following **Permissions**:
     - **Account** → `Workers Scripts` → `Edit`
     - **Zone** → `Workers Routes` → `Edit` *(Required for route provisioning in `wrangler.jsonc`)*
     - **Zone** → `Zone` → `Read`
  5. Configure **Resources**:
     - **Account Resources:** `Include - All accounts` (or your specific account)
     - **Zone Resources:** `Include - All zones` (or your specific zone `yeipi.dev`)
  6. Click **Continue to summary** → **Create Token** and copy the generated token.
* **In GitHub:**
  - **Name:** `CLOUDFLARE_API_TOKEN`
  - **Secret:** *`<Paste your generated token>`*

---

## ➕ Adding a New Worker

1. **Create the directory:**
   ```bash
   mkdir -p workers/<worker-name>/src
   ```

2. **Add configuration files:**
   - `workers/<worker-name>/package.json`:
     ```json
     {
       "name": "<worker-name>",
       "version": "1.0.0",
       "private": true,
       "scripts": {
         "dev": "wrangler dev",
         "deploy": "wrangler deploy"
       }
     }
     ```
   - `workers/<worker-name>/tsconfig.json`:
     ```json
     {
       "extends": "../../tsconfig.base.json",
       "include": ["src/**/*"]
     }
     ```
   - `workers/<worker-name>/wrangler.jsonc`:
     ```jsonc
     {
       "$schema": "../../node_modules/wrangler/config-schema.json",
       "name": "<worker-name>",
       "main": "src/index.ts",
       "compatibility_date": "2024-09-23"
     }
     ```

3. **Create the entry point:** `workers/<worker-name>/src/index.ts`.

4. **Link workspace and verify:**
   ```bash
   pnpm install
   pnpm typecheck
   ```

5. **Update CI/CD (Optional):**
   Add the new worker filter and deployment step in `.github/workflows/deploy.yml` for automated deployment.

---

## 📚 Official Documentation & References

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/) — Official developer guides, APIs, and runtime specs.
- [Wrangler Configuration Reference (`wrangler.jsonc`)](https://developers.cloudflare.com/workers/wrangler/configuration/) — Complete schema and configuration options for Wrangler.
- [Cloudflare Workers Custom Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/) — Custom domain and route pattern configuration.
- [Cloudflare Email Workers](https://developers.cloudflare.com/email-routing/email-workers/) — Processing and bouncing emails via Email Routing events.
- [pnpm Workspaces](https://pnpm.io/workspaces) — Monorepo workspace configuration with pnpm.
- [Cloudflare Wrangler GitHub Action](https://github.com/cloudflare/wrangler-action) — Automated deployment action for CI/CD pipelines.