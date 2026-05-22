# Contributing to CowCare

Thanks for your interest! CowCare is an open-source milk supply chain DApp on Celo. All contributions are welcome.

## Quick Start

```bash
git clone https://github.com/jajafwangshak86-ops/cow-milk-site
cd cow-milk-site
npm install
npm run dev        # http://localhost:3000
```

## Development Workflow

1. Fork the repo and create a feature branch from `main`
2. Make your changes
3. Run checks before opening a PR:
   ```bash
   npm run typecheck   # TypeScript
   npm run lint        # ESLint
   npm test            # Unit tests
   npm run build       # Full build
   ```
4. Open a pull request with a clear description of what changed and why

## Project Structure

```
app/          Next.js App Router pages and API routes
components/   React components (home/, tracker/, layout/, ui/)
lib/          Pure utility functions (rpc, decode, format, constants)
hooks/        React hooks
types/        Shared TypeScript types
contracts/    Solidity contract + deploy/interact scripts
sdk/          cowcare-sdk npm package
__tests__/    Unit tests
```

## What to Work On

- Check [open issues](https://github.com/jajafwangshak86-ops/cow-milk-site/issues) for `good first issue` labels
- Bug fixes, performance improvements, and accessibility improvements are always welcome
- New features should have a corresponding issue/discussion first

## Smart Contract

The contract is deployed on Celo Mainnet at `0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8`. To run the full supply chain walkthrough locally:

```bash
# Add PRIVATE_KEY to .env first
node contracts/interact.js
```

## SDK (`cowcare-sdk`)

The `sdk/` directory is a standalone npm package. To build it:

```bash
cd sdk
npm install
npm run build
npm test
```

## Code Style

- TypeScript strict mode — no `any`
- Tailwind CSS for styling — no inline styles
- Keep components small and focused
- Pure functions in `lib/` — no side effects, easy to test

## Commit Messages

Use conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `test:`

## License

By contributing, you agree your code will be licensed under MIT.
