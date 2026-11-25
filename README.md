# Kara Delik — Token Studio

A public English-language Solana token studio with DEX Screener discovery, illustrated meme concepts, fixed-supply token creation, Raydium CPMM liquidity, a portfolio view, and Phantom-signed airdrops.

## Features

- Read public DEX Screener themes and recent Solana token profiles. Random concepts are creative prompts, not predictions or investment recommendations.
- Create SPL tokens with configurable supply and 0–9 decimals. Mint and freeze authorities are revoked and token metadata is locked.
- Download an illustrated 1024px PNG and metadata JSON. Host them at public HTTPS URLs yourself; the site does not store or upload files.
- Create Raydium CPMM pools with 0.5–100 SOL. A clearly shown 1% site fee is added as an instruction to the same pool transaction, so the fee and pool creation either both confirm or both fail. The fee is waived when the connected wallet is the treasury wallet.
- Fees are sent directly to the treasury wallet. They are not held by the site; connect that wallet in Portfolio to see its SOL balance and use Phantom to send or withdraw it.
- Review and sign every transaction in Phantom. The site never requests a seed phrase or private key.
- Validate airdrop recipient addresses and token balances, estimate new token-account rent, and send batches of up to two recipients. Phantom approves each batch separately; confirmed earlier batches cannot be reversed if a later batch fails.
- Monitor public market data and send launch alerts. The monitor does not trade, snipe automatically, or create artificial volume.

## Security and user responsibility

- This is a non-custodial front end. Only connect a wallet you control, verify the recipient and fee in Phantom, and never share recovery words or private keys.
- The 1% fee applies to the SOL amount seeded into a pool through this site's UI. Raydium/network costs are additional. The treasury wallet is `GiD9W2ZYm6ZgGJWj6wf5ihmgwjqHCEbxPU3AeD6g9SHU` and is shown before signing. Users may interact with Solana directly outside this site.
- Connecting the treasury wallet waives the site's fee. GitHub Pages is a static public host, so it cannot keep a password or private owner setting secret.
- Users choose token names, artwork, metadata, recipient lists, and liquidity amounts, and must ensure their use and claims comply with applicable law and platform rules. Token creation and liquidity carry risk; prices can fall and withdrawn assets may be worth less than the deposit.
- No page text can guarantee a particular legal outcome or eliminate responsibility. Have qualified counsel review the service terms for the jurisdictions where the site will be offered.

## Deploy

The workflow in `.github/workflows/pages.yml` builds and publishes the site on pushes to `main`. Select **Settings → Pages → Build and deployment → GitHub Actions** if needed.

## Local preview

Run `npm install` and `npm run dev`.


