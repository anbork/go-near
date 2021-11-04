import { createContext } from 'react';
import * as nearAPI from 'near-api-js'

interface INearConfig {
  accountSuffix: string,
  networkId: string,
  nodeUrl: string,
  contractName: string,
  walletUrl: string,
  marketPublicKey: string,
  wasmCode: string,
  claimPeriod: number
}

export interface IUserProps {
  signedIn: boolean;
  signedAccountId: string | null;
}

export interface INearProps {
  connected: boolean;
  wallet: nearAPI.WalletConnection;
  config: INearConfig;
  api: nearAPI.Near;
  contract: any;
}

export const NearContext = createContext<any>(null);

const nearConfig: INearConfig = getConfig(process.env.REACT_APP_ENVIRONMENT || 'development')

export const connectNear = async (): Promise<INearProps> => {
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore()
  const near = await nearAPI.connect(Object.assign({ deps: { keyStore } }, nearConfig))
  const walletConnection = new nearAPI.WalletConnection(near, nearConfig.contractName)
  const account = walletConnection.account()
  const contract = new nearAPI.Contract(account, nearConfig.contractName, {
    viewMethods: [
      'get_profile',
      'get_bid',
      'get_top_bets',
      'get_top_claims',
      'get_global_stats'
    ],
    changeMethods: [
      'offer',
      'bet',
      'claim',
      'finalize',
      'acquire',
      'collect_rewards'
    ]
  })



  return {
    connected: true,
    wallet: walletConnection,
    config: nearConfig,
    api: near,
    contract
  }
}

export const fromNear = (s: string) => (parseFloat(s) / 1e24 || 0) as number

function getConfig(env: string): INearConfig {
  switch (env) {
    case 'production':
    case 'mainnet':
      return {
        accountSuffix: 'near',
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        contractName: 'c.nearbet.near',
        walletUrl: 'https://wallet.near.org',
        marketPublicKey: 'ed25519:5mgNVstFy67S469tG2j8MjRchPuKqJFYsydghKRteR42',
        wasmCode: 'https://near.bet/bin',
        claimPeriod: 72 * 60 * 60
      }
    case 'development':
    case 'testnet':
    default:
      return {
        accountSuffix: 'testnet',
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        contractName: 'dev-1616355537428-9726228',
        walletUrl: 'https://wallet.testnet.near.org',
        marketPublicKey: 'ed25519:EgmA4v9E2SjFVu31bmJKJtNW6cjkx2cbM3HyXprsYvrA',
        wasmCode: 'https://near.bet/bin',
        claimPeriod: 15 * 60
      }
  }
}