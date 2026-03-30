# CI/CD: GitHub Actions Workflows

Documentation for the automated deployment pipeline.

---

## Overview

The repository uses a single GitHub Actions workflow to build and deploy the site to GitHub Pages automatically on every push to `main`.

**File:** `.github/workflows/deploy.yml`
**Trigger:** Push to `main` branch
**Target:** GitHub Pages

---

## Workflow: `deploy.yml`

### Full Configuration

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
        id: deployment
```

---

## Trigger

```yaml
on:
  push:
    branches: [main]
```

The workflow runs **only on pushes to `main`**. Pull requests, branch pushes, and manual triggers do not activate it. To deploy, merge or push directly to `main`.

---

## Permissions

```yaml
permissions:
  contents: read   # Read source code during checkout
  pages: write     # Write to GitHub Pages environment
  id-token: write  # Required for OIDC authentication with GitHub Pages
```

These are the minimum required permissions for GitHub Pages deployment via OIDC (no personal access tokens needed).

---

## Concurrency

```yaml
concurrency:
  group: pages
  cancel-in-progress: true
```

If a new push arrives while a deployment is in progress, the in-progress run is **cancelled** and the new one takes over. This prevents stale deployments from finishing after a newer push has already started.

---

## Build Steps

### 1. Checkout
```yaml
- uses: actions/checkout@v4
```
Clones the repository into the runner environment. Uses `actions/checkout` v4.

---

### 2. Setup Node.js
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm
```
Installs Node.js 20 (LTS). The `cache: npm` option caches the `~/.npm` directory based on `package-lock.json`, speeding up subsequent runs.

---

### 3. Install Dependencies
```yaml
- run: npm ci
```
Uses `npm ci` (not `npm install`) for:
- Reproducible installs — uses exact versions from `package-lock.json`
- Faster in CI — skips dependency resolution
- Fails if `package-lock.json` is out of sync with `package.json`

---

### 4. Build
```yaml
- run: npm run build
```
Runs `vite build`. Output goes to `dist/` with the base path `/retirementSurvialKit/` (configured in `vite.config.js`).

The base path is critical — without it, all asset URLs would be relative to the root domain and all CSS, JS, and images would 404 on GitHub Pages.

---

### 5. Configure Pages
```yaml
- uses: actions/configure-pages@v4
```
Sets up the GitHub Pages environment for the deployment. Validates that GitHub Pages is enabled in repository settings.

---

### 6. Upload Artifact
```yaml
- uses: actions/upload-pages-artifact@v3
  with:
    path: dist
```
Packages the `dist/` folder as a GitHub Pages artifact. This is the built output from Vite.

---

### 7. Deploy
```yaml
- uses: actions/deploy-pages@v4
  id: deployment
```
Publishes the artifact to GitHub Pages. The `id: deployment` label allows the deployment URL to be read via `${{ steps.deployment.outputs.page_url }}` in the environment configuration above.

---

## Environment

```yaml
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
```

Links the job to the `github-pages` environment in GitHub. This surfaces the live deployment URL in the Actions run summary and protects deployments with any configured environment rules.

---

## Why This Approach

### OIDC vs. Personal Access Tokens
This workflow uses OIDC (OpenID Connect) authentication via `id-token: write`. This is more secure than storing a `GITHUB_TOKEN` or personal access token as a secret — the token is generated dynamically per-run and scoped to exactly what's needed.

### `npm ci` vs `npm install`
`npm ci` is always preferred in CI environments:
- Deterministic — same packages every time
- Faster — skips the resolution step
- Safe — fails loudly if lock file is stale

### Single Job
Build and deploy are combined into one job to minimize artifact handoff overhead. For larger projects, separating them provides better failure isolation, but for a static site this size, one job is simpler.

---

## Debugging Failed Deployments

**Build fails (`npm run build` step):**
- Check if `package-lock.json` is committed and up to date
- Run `npm run build` locally and confirm it succeeds
- Look for TypeScript or JSX compilation errors in the Actions log

**Deploy fails after successful build:**
- Verify GitHub Pages is enabled in repository Settings → Pages
- Confirm the source is set to "GitHub Actions" (not a branch)
- Check that `permissions.pages: write` and `permissions.id-token: write` are present

**404 on deployed site:**
- Confirm `vite.config.js` has `base: '/retirementSurvialKit/'`
- Verify the repository name matches the base path exactly (case-sensitive)

**Assets load but app is blank:**
- Open browser DevTools → Console for JavaScript errors
- Check the Network tab for failed asset loads (wrong base path)

---

## Local Equivalent

To replicate what the CI does locally:

```bash
npm ci              # Clean install
npm run build       # Build to dist/
npm run preview     # Serve dist/ locally to verify
```

---

## Deployment URL

After a successful run, the site is available at:

```
https://verone3d.github.io/retirementSurvialKit/
```

The URL format is: `https://<github-username>.github.io/<repository-name>/`
