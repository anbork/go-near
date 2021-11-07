import { useContext, useEffect, useState } from 'react'
import {
  Container,
  Title,
  ClaimTitle,
  ActiveTitle,
} from './layout'
import { MarketTable } from 'components/MarketTables'
import { useTopScroll } from 'helpers/hooks'
import { NearContext, INearProps } from 'helpers/near'
import { mapStats, IStat } from 'helpers/mappers'

export const Market = () => {
  const [stats, setStats] = useState<IStat | null>(null)
  const [filteredBids, setFilteredBids] = useState<string[]>([])

  const filterActiveBids = (bidId: string) => {
    if (!filteredBids.includes(bidId)) {
      setFilteredBids((bids) => {
        return [...bids, bidId]
      })
    }
  }

  useTopScroll()
  
  const { near }: { near: INearProps | null } = useContext(NearContext)

  const getStats = async () => {
    const globalstats = await near?.contract.get_global_stats()
    if (globalstats) {
      setStats(mapStats(globalstats))
    }
  }

  useEffect(() => {
    getStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near])

  if (!near || !stats) return null
  
  const getTopBets = near.contract.get_top_bets
  const getTopClaims = near.contract.get_top_claims

  return (
    <Container>
      <Title>Market</Title>
      <ClaimTitle>On Claim ({stats.numBidsOnClaim})</ClaimTitle>
      <MarketTable contractMethod={getTopClaims} limit={5} isClaimed={true} />
      <ActiveTitle>Active ({stats.numBids - filteredBids.length})</ActiveTitle>
      <MarketTable contractMethod={getTopBets} limit={25} isClaimed={false} filterActiveBids={filterActiveBids} />
    </Container>
  )
}
