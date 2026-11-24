# Kara Delik — Token stüdyosu

Kara Delik’in uzay temalı kontrol paneli görsel dilinden esinlenen Türkçe memecoin konsept prototipi. Mevcut launch kontrolleri görsel demodur; cüzdan işlemi, token dağıtımı veya likidite havuzu oluşturmaz.

## Password setup

Before the first deployment, add a repository Actions secret named `SITE_PASSWORD` under **Settings → Secrets and variables → Actions**. Enter your chosen password directly in GitHub; do not commit it or send it in chat. Each deployment hashes the secret during the build and includes only the hash in the static app.

The password prompt is a lightweight front-end gate for a casual preview. GitHub Pages serves static files publicly, so this does not provide strong access control and can be bypassed by a technically skilled visitor. Do not use it to protect sensitive information.

## Deploy

The workflow in `.github/workflows/pages.yml` builds the site and publishes it with GitHub Pages on every push to `main`. Enable **Settings → Pages → Build and deployment → GitHub Actions** if it is not already selected.

## Local preview

Install dependencies with `npm install`, then run `npm run dev`. Create a `.env.local` file containing `VITE_SITE_PASSWORD_SHA256=<lowercase SHA-256 hex digest of your chosen password>` to unlock the local build. Never put a plaintext password in a committed file.

