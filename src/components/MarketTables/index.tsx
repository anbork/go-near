import { useState, useEffect } from 'react'
import {
  Bids,
  Client,
  ClientSuffix,
  Claimed,
  ClaimedPrefix,
  DetailsButton,
  OkIcon,
  Row,
  Table,
  MoneyIcon,
  StartsButton,
  Button
} from './layout'
import { useToProfile, useToProduct } from 'helpers/routes'
import { fromNear } from 'helpers/near'

export const MarketTable = ({ contractMethod, limit, type }: { contractMethod: any, limit: number, type: string }) => {
  const toProfile = useToProfile()
  const toProductTwo = useToProduct('two')
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
    }
    setFeed(feed => [...feed, ...bets]);
  }

  useEffect(() => {
    getBets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const bids = feed && feed.map(([bidPrice, bidId]) => {
    const [prefix, postfix] = bidId.split('.')
    bidPrice = fromNear(bidPrice).toFixed(2)

    if (type === "claims")
      return (
        <Row key={bidId}>
          <Client onClick={toProfile}>{prefix}<ClientSuffix>.{postfix}</ClientSuffix></Client>
          <OkIcon />
          <ClaimedPrefix>Claimed by</ClaimedPrefix>
          <Claimed onClick={toProfile}>dna.near</Claimed>
          <DetailsButton onClick={toProductTwo}>View Details</DetailsButton>
        </Row>
      )
    return (
      <Row key={bidId}>
        <Client onClick={toProfile}>{prefix}<ClientSuffix>.{postfix}</ClientSuffix></Client>
        <Bids></Bids>
        <StartsButton>Starts from <MoneyIcon /> {bidPrice}</StartsButton>
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

