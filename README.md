# 🎫 AccessPass — NFT-Based Access Control on Sui

This Sui Move smart contract mints an access pass NFT with a label like "VIP" or "Beta Tester", tied to an address. Only the NFT owner can unlock gated functionality.

## 🧠 Features
- NFT-like object with metadata label
- Owner-based access control
- On-chain verification
- Unit tests with `test_scenario`
- TypeScript scripts for minting and access

## 📦 Built With
- Sui Move
- TypeScript + @mysten/sui.js
- Testnet deployment


🧪 Tests
Mint and unlock by owner ✅

Rejection by non-owner ❌

🧰 Scripts
mint.ts

unlock.ts
