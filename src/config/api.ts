/**
 * Global API configuration constants
 */

// export const RWA_API = 'https://airdrop.tari.com/api';
export const RWA_API = 'https://rwa.y.at';

export const API_ENDPOINTS = {
  RWA_BASE: RWA_API,
  MINER_DOWNLOAD: `${RWA_API}/miner/download`,
  MINER_RPC: `${RWA_API}/miner/rpc`,
} as const;
