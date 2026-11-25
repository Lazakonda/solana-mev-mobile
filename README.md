# Kara Delik — Token Studio

An English-language Solana token studio with live DEX Screener discovery, illustrated meme concepts, SPL token creation, Raydium CPMM pool setup, a wallet portfolio view, and a wallet-signed airdrop planner. Every on-chain transaction requires review and approval in Phantom.

## Features

- Read current DEX Screener themes and recent Solana token profiles. Random suggestions are original creative concepts informed by those public signals, not price predictions.
- Create an SPL token with a configurable supply and 0–9 decimals. The app checks Solana's maximum token amount before it builds the transaction.
- Mint the supply to the connected wallet, revoke mint and freeze authorities, and make metadata immutable.
- Download a generated 1024px illustration and a metadata JSON file. Host both at public HTTPS URLs yourself; the app does not provide file hosting.
- Create a Raydium CPMM pool with a chosen token amount and 0.5–100 SOL. Your wallet reviews and signs the transaction. Keep the resulting LP tokens if you want to manage or remove liquidity later.
- View SOL and SPL token balances with estimated market values when DEX Screener has a listed pair.
- Validate airdrop recipient addresses and token balances, estimate new token-account rent, and send in batches of up to two recipients. Phantom approves each batch separately. If a later batch fails, earlier confirmed batches are not reversed.
- Monitor public price, volume, swap, and liquidity changes, including new-pool alerts. This is a read-only monitor; it does not place trades, snipe automatically, or create artificial volume.

## Limits and security

- GitHub Pages is a static host. A client-side password gate is only a casual preview barrier; it cannot protect secrets or enforce fee exemptions. Do not use it as account security.
- The app currently has no configured commission. A commission destination and rate would need to be supplied before implementing that part; never share a wallet seed phrase or private key.
- Public market data may be delayed, incomplete, or unavailable. DEX Screener indexing can take time after a new pool is created.
- No liquidity is guaranteed to be recoverable at its original value. Pool prices move, and liquidity removal returns the assets currently in the pool, less fees and price impact.

## Password setup

For a casual preview gate, add an Actions secret named `SITE_PASSWORD` under **Settings → Secrets and variables → Actions**. The deployment workflow hashes it during the build. This does not make a public static site private.

## Deploy

The workflow in `.github/workflows/pages.yml` builds and publishes on pushes to `main`. Select **Settings → Pages → Build and deployment → GitHub Actions** if needed.

## Local preview

Run `npm install` and `npm run dev`. To unlock locally, set `VITE_SITE_PASSWORD_SHA256` to the lowercase SHA-256 digest of the password in the local environment.

