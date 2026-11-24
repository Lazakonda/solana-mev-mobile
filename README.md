# Kara Delik — Token Studio

An English language Solana token studio with live DEX Screener market themes, a market-inspired concept generator, SPL token creation, permanent authority controls, and a Raydium CPMM pool flow. On-chain actions are prepared in the browser and require your connected wallet to review and sign each transaction.

## Capabilities and limits

- Market radar reads public DEX Screener theme, token-profile, boost, and pair data. Suggestions are random creative concepts informed by those signals; they are not predictions.
- Token creation mints 1,000,000,000 SPL tokens to the connected wallet, revokes mint and freeze authority, creates immutable Metaplex metadata, then clears the metadata update authority.
- Raydium CPMM pool setup accepts a base-token amount up to the supply and 0.5–100 SOL. Pool creation spends the selected assets and requires wallet approval.
- Transaction signatures, mint addresses, pool IDs, explorer links, and a DEX Screener link are shown after confirmation.
- The site does not upload or pin images or metadata. Provide a public HTTPS metadata JSON URL whose `image` field points at your hosted artwork before creating the token.
- No wash trading or artificial volume bot is included. The market activity area is a clearly marked monitor preview.
- GitHub Pages is a static host. Its client-side password prompt is suitable only as a casual preview gate; it is bypassable and must not protect sensitive data.

## Password setup

Add a repository Actions secret named `SITE_PASSWORD` under **Settings → Secrets and variables → Actions**. Enter the chosen password only in GitHub; do not commit it or send it in chat. The deployment workflow hashes it during the build and includes only the hash in the static app.

## Deploy

The workflow in `.github/workflows/pages.yml` builds and publishes the site with GitHub Pages on pushes to `main`. Select **Settings → Pages → Build and deployment → GitHub Actions** if needed.

## Local preview

Run `npm install` and `npm run dev`. To unlock locally, set `VITE_SITE_PASSWORD_SHA256` to the lowercase SHA-256 digest of the password in the local environment.

