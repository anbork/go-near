
import { useContext, useEffect, useState } from 'react';
import {
  Row,
  Client,
  ClientSuffix
} from './layout'
import { NearContext, INearProps } from 'helpers/near'
import { IBid } from 'helpers/mappers'
import { useToBid } from 'helpers/routes'
import ClaimButton from './ClaimButton'
import BetButton from './BetButton'

const BidPreview = ({ bidId, isClaimed, filterActiveBids }: { bidId: string, isClaimed: boolean, filterActiveBids?: any }) => {
  const [bid, setBid] = useState<IBid>()
  const toBid = useToBid(bidId)
  const { near }: { near: INearProps | null } = useContext(NearContext)

  const getBid = async () => {
    const _bid = await near?.api.get_bid(bidId)
    if (_bid) {
      if (_bid.claimedBy && !isClaimed && filterActiveBids) {
        filterActiveBids(_bid.id)
      }
      setBid(_bid)
    }
  }

  useEffect(() => {
    getBid()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near])

  if (!bid) return null

  const [prefixName, postfixName] = bidId.split('.')
  const accountName = (
    <Client onClick={toBid}>{prefixName}<ClientSuffix>.{postfixName}</ClientSuffix></Client>
  )


  if (bid.claimedBy) {
    if (!isClaimed) {
      return null
    }
    return (
      <Row>
        {accountName}
        <ClaimButton bid={bid} />
      </Row>
    )
  }
  return (
    <Row>
      { accountName }
      <BetButton bid={bid} />
    </Row>
  );
}

export default BidPreview;