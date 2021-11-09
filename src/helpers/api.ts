import { Near, Account, WalletConnection, Contract } from 'near-api-js'
import { mapBidInfo, mapProfile, mapStats, IBid, IProfile, IBidSafety, IStat } from 'helpers/mappers'
import { config } from './config'

export const fromNear = (s: string) => (parseFloat(s) / 1e24 || 0) as number

export interface NearContract extends Contract {
  bet?(params: { bid_id: string }, gas: string, amount: string): void
  claim?(params: { bid_id: string }, gas: string, amount: string): void
  finalize?(params: { bid_id: string }, gas: string, amount: string): void
  get_bid?(params: { bid_id: string }): any
  acquire?(params: { bid_id: string, new_public_key: string }, gas: string, amount: string): void
  get_profile?(params: { profile_id: string }): any
  get_global_stats?(): any
  get_top_bets?(params: { from_key: string | null, limit: number }): [string, string][]
  get_top_claims?(params: { from_key: string | null, limit: number }): [string, string][]
}
class Api {
  readonly near: Near;
  readonly contract: NearContract;
  readonly walletConnection: WalletConnection;

  constructor(near: Near) {
    this.near = near;
    this.walletConnection = new WalletConnection(near, config.contractName)
    this.contract = new Contract(this.walletConnection.account(), config.contractName, {
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
  }

  signIn(): void {
    this.walletConnection.requestSignIn(config.contractName)
  }

  signOut(): void {
    this.walletConnection.signOut()
  }

  async get_account_id(): Promise<string> {
    return await this.walletConnection.getAccountId()
  }

  async account(bid_id: string): Promise<Account> {
    return await this.near.account(bid_id)
  }

  async bet(bid_id: string, amount: number): Promise<void> {
    await this.contract.bet?.({ bid_id }, '200000000000000', String(amount) + '000000000000000')
  }

  async claim(bid_id: string, amount: number): Promise<void> {
    await this.contract.claim?.({ bid_id }, '200000000000000', String(amount) + '000000000000000')
  }

  async finalize(bid_id: string): Promise<void> {
    await this.contract.finalize?.({ bid_id }, '200000000000000', '0')
  }

  async get_bid(bid_id: string): Promise<IBid> {
    let bid = await this.contract.get_bid?.({ bid_id })
    if (bid) bid = mapBidInfo({ id: bid_id, ...bid })
    return bid
  }

  async get_bid_safety(bid_id: string): Promise<IBidSafety> {
    const account = await this.account(bid_id)
    try {
      const codeHash = (await account.state()).code_hash
      const accessKeysLen = (await account.getAccessKeys()).length
      const lockerContract: any = await new Contract(account, bid_id, {
        viewMethods: ['get_owner'],
        changeMethods: []
      })
      const lockerOwner = await lockerContract.get_owner({})
      const balance = (await account.getAccountBalance()).total
      return { codeHash, accessKeysLen, lockerOwner, balance: fromNear(balance) }
    } catch (e) {
      console.log('check safety error', e)
    }
    return { codeHash: '(unknown)', accessKeysLen: '(unknown)', lockerOwner: '(not found)', balance: 0 }
  }

  async acquire(bid_id: string, new_public_key: string ): Promise<void> {
    await this.contract.acquire?.({ bid_id, new_public_key }, '200000000000000', '0')
  }

  async get_profile(profile_id: string | null): Promise<IProfile> {
    const profile = profile_id ? await this.contract.get_profile?.({ profile_id }) : null
    return mapProfile(profile)
  }

  async get_balance(bid_id: string): Promise<number> {
    const account = await this.account(bid_id)
    const b = await account.getAccountBalance()
    return fromNear(b.total)
  }

  async get_global_stats(): Promise<IStat> {
    return mapStats(await this.contract.get_global_stats?.())
  }

  async get_top_bets(from_key: string | null, limit: number): Promise<[string, string][]> {
    if (!this.contract.get_top_bets) return []
    return await this.contract.get_top_bets?.({ from_key, limit })
  }

  async get_top_claims(from_key: string | null, limit: number): Promise<[string, string][]> {
    if (!this.contract.get_top_claims) return []
    return await this.contract.get_top_claims?.({ from_key, limit })
  }
}

export default Api