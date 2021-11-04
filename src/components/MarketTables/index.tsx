import { useState, useEffect } from 'react'
import {
  Row,
  Table,
  Button
} from './layout'
import BidPreview from './BidPreview'

export const MarketTable = ({ contractMethod, limit, type }: { contractMethod: any, limit: number, type: string }) => {
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
      <Row key={bidId}>
        <BidPreview bidId={bidId} type={type} />
      </Row>
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

