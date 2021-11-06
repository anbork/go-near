
import { useContext, useEffect, useState } from 'react';
import {
  Client,
  ClientSuffix
} from './layout'
import { NearContext, INearProps } from 'helpers/near'
import { mapBidInfo, IBid } from 'helpers/mappers'
import { useToBid } from 'helpers/routes'
import ClaimButton from './ClaimButton'
import BetButton from './BetButton'

const BidPreview = ({ bidId, type }: { bidId: string, type: string }) => {
  const [bid, setBid] = useState<IBid>()
  const toBid = useToBid(bidId)
  const { near }: { near: INearProps | null } = useContext(NearContext)

  const getBid = async () => {
    const b = await near?.contract.get_bid({ bid_id: bidId })
    if (b) {
      const _bid = {
        id: bidId,
        ...b
      }
      setBid(mapBidInfo(_bid))
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


  if (bid.claimedBy)
    return (
      <>
        { accountName }
        <ClaimButton bid={bid} />
      </>
    );
  return (
    <>
      { accountName }
      <BetButton bid={bid} />
    </>
  );
}

export default BidPreview;