import {
  BalanceMoneyIcon,
  BalanceInvertIcon,
  Button,
  ColoredButton,
  WillButton,
  WillPrefix
} from './layout'
import { INearProps } from 'helpers/near'
import { IBid } from 'helpers/mappers'
import { useToAcquire } from 'helpers/routes'
import Moment from 'react-moment'

const BetBtn = ({ bidInfo, near, nowTime }: { bidInfo: IBid, near: INearProps, nowTime: number }) => {
  const { betPrice, claimedTime } = bidInfo
  const forfeit = bidInfo.forfeit ? (Math.floor(nowTime - claimedTime) / 1000 / near.config.claimPeriod) * (bidInfo.betPrice / 40) + bidInfo.betPrice / 40 : 0
  const totalBetPrice = betPrice + forfeit
  async function betBid () {
    if (bidInfo.forfeit < 0.001) {
      await near.contract.bet({ bid_id: bidInfo.id }, '200000000000000', String(Math.floor((totalBetPrice + 1e-5) * 1e9)) + '000000000000000')
    } else {
      await near.contract.bet({ bid_id: bidInfo.id }, '200000000000000', String(Math.floor((totalBetPrice + 1e-5) * 1.001 * 1e9)) + '000000000000000')
    }
  }

  return (
    <Button big onClick={betBid} disabled={!near.signedAccountId}>Bid <BalanceMoneyIcon /> {totalBetPrice.toFixed(5)}</Button>
  )
}



const ClaimBtn = ({ bidInfo, near, nowTime }: { bidInfo: IBid, near: INearProps, nowTime: number }) => {
  const { claimedBy, claimPrice, claimedTime } = bidInfo
  async function claimBid() {
    await near.contract.claim({ bid_id: bidInfo.id }, '200000000000000', String(Math.floor((claimPrice + 1e-5) * 1e9)) + '000000000000000')
  }

  return (
    !claimedBy ? (
      <ColoredButton onClick={claimBid} disabled={!near.signedAccountId}>Claim for <BalanceInvertIcon /> {claimPrice.toFixed(5)}</ColoredButton>
    ) : (
      <WillButton big>
        <WillPrefix>Will be claimed after</WillPrefix>
        <Moment date={claimedTime} format='hh:mm:ss' add={{ seconds: near.config.claimPeriod }} duration={nowTime} />
      </WillButton>
    )
  )
}

const FinalizeBtn = ({ bidInfo, near }: { bidInfo: IBid, near: INearProps }) => {
  const toAcquire = useToAcquire(bidInfo.id)

  async function finalizeBid() {
    near.contract.finalize({ bid_id: bidInfo.id }, '200000000000000', '0')
    toAcquire()
  }

  return (
    <ColoredButton onClick={finalizeBid} disabled={bidInfo.claimedBy !== near.signedAccountId}>Finalize</ColoredButton>
  )
}

const AcquireBtn = ({ bidInfo }: { bidInfo: IBid }) => {
  const toAcquire = useToAcquire(bidInfo.id)

  return (
    <ColoredButton onClick={toAcquire}>Acquire</ColoredButton>
  )
}

export { BetBtn, ClaimBtn, FinalizeBtn, AcquireBtn }
