# Solana Escrow Program

A decentralized escrow system built on Solana blockchain that allows users to create and execute token trades securely.

## Features

- **Token Escrow**: Create escrow accounts to hold tokens during trades
- **Secure Trading**: Atomic token exchanges with proper validation
- **PDA Integration**: Uses Program Derived Addresses for secure token custody
- **Web UI**: Vue.js frontend for easy interaction

## Architecture

### Program Structure
- `src/instruction.rs` - Defines program instructions (InitEscrow, Exchange)
- `src/processor.rs` - Contains business logic for processing instructions
- `src/state.rs` - Defines escrow account data structure
- `src/error.rs` - Custom error types
- `src/entrypoint.rs` - Program entry point

### Frontend Structure
- `escrow-ui/` - Vue.js application
- `src/Alice.vue` - Interface for escrow initialization
- `src/Bob.vue` - Interface for trade execution
- `src/util/` - Utility functions for blockchain interaction

## Setup

### Prerequisites
- Rust 1.70+
- Node.js 16+
- Solana CLI tools

### Backend Setup
```bash
cd program
cargo build-bpf
```

### Frontend Setup
```bash
cd escrow-ui
npm install
npm run serve
```

## Usage

1. **Initialize Escrow**: Use Alice's interface to create an escrow
2. **Execute Trade**: Use Bob's interface to complete the trade
3. **Monitor**: Track escrow state through the UI

## Security Considerations

- All transactions require proper signatures
- Token accounts are validated before operations
- Rent exemption checks are performed
- PDA ensures secure token custody

## Testing

```bash
# Program tests
cd program
cargo test

# Frontend tests
cd escrow-ui
npm run test
npm run test:e2e
```

## Recent Fixes

- Added missing error variants (ExpectedAmountMismatch, AmountOverflow)
- Updated dependencies to latest stable versions
- Fixed missing imports (invoke_signed, TokenAccount)
- Improved test coverage
- Enhanced security with environment-based RPC configuration 