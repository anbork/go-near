import { useState, useEffect } from 'react'
import {
  Table,
  Button
} from './layout'
import BidPreview from './BidPreview'

export const MarketTable = ({ contractMethod, limit, isClaimed, filterActiveBids }: { contractMethod: any, limit: number, isClaimed: boolean, filterActiveBids?: any }) => {
  const [feed, setFeed] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(false)

  async function getBets() {
    const lastKey = feed && feed.length > 0 ? feed[feed.length - 1] : null
    const bets = await contractMethod({
      from_key: lastKey,
      limit: limit
    })
    if (bets.length === limit) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }
    setFeed(feed => [...feed, ...bets]);
  }

  useEffect(() => {
    getBets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const bids = feed && feed.map(([bidPrice, bidId]) => {
    return (
      <BidPreview bidId={bidId} key={bidId} isClaimed={isClaimed} filterActiveBids={filterActiveBids} />
    )
  })


  return (
    <>
      <Table>
        {bids}
      </Table>
      {hasMore && <Button onClick={getBets}>Get More</Button>}
    </>
  )
}

