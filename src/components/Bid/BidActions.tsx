import {
  BalanceMoneyIcon,
  BalanceInvertIcon,
  BidButton,
  ClaimButton,
  WillButton,
  WillPrefix
} from './layout'
import { Link } from 'react-router-dom'
import { INearProps } from 'helpers/near'
import { IBid } from 'helpers/mappers'
import WillBeClaimed from './WillBeClaimed'

const BetBtn = ({ bidInfo, near }: { bidInfo: IBid, near: INearProps }) => {
  const { betPrice, claimedTime } = bidInfo
  const forfeit = bidInfo.forfeit ? (Math.floor(Date.now() - claimedTime) / 1000 / near.config.claimPeriod) * (bidInfo.betPrice / 40) + bidInfo.betPrice / 40 : 0
  const totalBetPrice = betPrice + forfeit
  async function betBid () {
    if (forfeit < 0.001) {
      await near.contract.bet({ bid_id: bidInfo.id }, '200000000000000', String(Math.floor((totalBetPrice + 1e-5) * 1e9)) + '000000000000000')
    } else {
      await near.contract.bet({ bid_id: bidInfo.id }, '200000000000000', String(Math.floor((totalBetPrice + 1e-5) * 1.001 * 1e9)) + '000000000000000')
    }
  }

  return (
    <BidButton big onClick={betBid}>Bid <BalanceMoneyIcon /> {totalBetPrice.toFixed(5)}</BidButton>
  )
}



const ClaimBtn = ({ bidInfo, near }: { bidInfo: IBid, near: INearProps }) => {
  const { claimedBy, claimPrice, claimedTime } = bidInfo
  async function claimBid() {
    await near.contract.claim({ bid_id: bidInfo.id }, '200000000000000', String(Math.floor((claimPrice + 1e-5) * 1e9)) + '000000000000000')
  }

  return (
    !claimedBy ? (
      <ClaimButton onClick={claimBid}>Claim for <BalanceInvertIcon /> {claimPrice.toFixed(5)}</ClaimButton>
    ) : (
      <WillButton big>
        <WillPrefix>Will be claimed after</WillPrefix>
        <WillBeClaimed claimedTime={claimedTime} claimPeriod={near.config.claimPeriod} />
      </WillButton>
    )
  )
}

const FinalizeBtn = ({ bidInfo, near }: { bidInfo: IBid, near: INearProps }) => {
  async function finalizeBid () {
    await near.contract.finalize({ bid_id: bidInfo.id }, '200000000000000', '0')
  }

  return (
    <Link to={`/acquire/${bidInfo.id}`} className='btn btn-warning w-100' onClick={finalizeBid}>
      Finalize
    </Link>
  )
}

const AcquireBtn = ({ bidInfo }: { bidInfo: IBid }) => {
  return (
    <Link to={`/acquire/${bidInfo.id}`} className='btn btn-warning w-100'>
      Acquire
    </Link>
  )
}

export { BetBtn, ClaimBtn, FinalizeBtn, AcquireBtn }
