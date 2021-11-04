import { useEffect, useContext, useState } from 'react'
import {
  Bids,
  StartsButton,
  MoneyIcon,
  ProfitBlock
} from './layout'
import { useToBid } from 'helpers/routes'
import { IBid } from 'helpers/mappers'
import { NearContext, INearProps } from 'helpers/near'
import { fromNear } from 'helpers/near'
import Profitable from '../Bid/Profitable'

const BetButton = ({ bid }: { bid: IBid }) => {
  const { near }: { near: INearProps | null } = useContext(NearContext)
  const [balance, setBalance] = useState<number>(0)
  const toBid = useToBid(bid.id)
  const bidLength = bid?.bets?.length || 0

  const getBalance = async () => {
    if (!near || !bid) return
    const account = await near.api.account(bid.id)
    const b = await account.getAccountBalance()
    setBalance(fromNear(b.total))
  }

  useEffect(() => {
    getBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Bids>
        {bidLength} {bidLength > 2 ? 'bids' : 'bid'}
        <ProfitBlock>
          <Profitable bid={bid} balance={balance}>Profitable</Profitable>
        </ProfitBlock>
      </Bids>
      <StartsButton onClick={toBid}>Starts from <MoneyIcon /> {bid?.betPrice.toFixed(2) || 0}</StartsButton>
    </>
  );
}

export default BetButton;