# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UnitMetal App is a Next.js 16 web3 application providing a professional interface for DeFi operations. It uses the App Router, React 19, and integrates with multiple EVM chains (Ethereum, Base, Arbitrum, Unichain).

## Commands

```bash
# Development (runs on port 4000 with Turbopack)
bun dev

# Build
bun run build

# Lint
bun run lint

# Start production server
bun start
```

## Architecture

### Provider Stack (app/providers.tsx → app/layout.tsx)
The app wraps children in this order:
1. `ThemeProvider` (next-themes) - dark/light mode
2. `WagmiProvider` - web3 state management
3. `QueryClientProvider` - React Query for async state
4. `RainbowKitProvider` - wallet connection UI
5. `SidebarProvider` - app navigation state

### Key Directories

- **app/** - Next.js App Router pages
- **components/** - React components
  - **ui/** - shadcn/ui components (new-york style, no border radius)
  - Other files are feature components
- **lib/** - Utilities and business logic
  - **build-swap/** - KyberSwap aggregator integration (types, API client, constants)
  - **build-wallet/** - Wallet utilities (Alchemy integration)
- **hooks/** - Custom React hooks

### State Management

- **Jotai** - For local client state
- **TanStack React Query** - For server state/caching
- **TanStack React Form** - For form state (see swap-component.tsx)
- **Wagmi/Viem** - For web3 state and contract interactions

### Styling

- Tailwind CSS v4 with CSS variables
- All UI components use `rounded-none` for sharp corners
- JetBrains Mono font throughout
- shadcn/ui components configured via components.json

### Web3 Integration

- **Supported chains**: Mainnet, Base, Arbitrum, Unichain (configured in providers.tsx)
- **RPC URLs**: Set via environment variables (NEXT_PUBLIC_RPC_URL_*)
- **Swap routing**: KyberSwap Aggregator API (`lib/build-swap/kyberswap.ts`)
- **Native token address**: `0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE`

### Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_RPC_URL_ETHEREUM`
- `NEXT_PUBLIC_RPC_URL_BASE`
- `NEXT_PUBLIC_RPC_URL_ARBITRUM`
- `NEXT_PUBLIC_RPC_URL_UNICHAIN`

### Path Aliases

`@/*` maps to the project root (configured in tsconfig.json).
