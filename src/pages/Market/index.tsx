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
  useTopScroll()
  
  const { near }: { near: INearProps | null } = useContext(NearContext)

  const getStats = async () => {
    let global_stats = await near?.contract.get_global_stats()
    if (global_stats) global_stats = mapStats(global_stats)
    setStats(global_stats)
  }

  useEffect(() => {
    getStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near])

  if (!near || !stats) return null
  
  let getTopBets = near.contract.get_top_bets
  let getTopClaims = near.contract.get_top_claims

  return (
    <Container>
      <Title>Market</Title>
      <ClaimTitle>On Claim ({stats?.numBidsOnClaim})</ClaimTitle>
      <MarketTable contractMethod={getTopClaims} limit={5} type={'claims'} />
      <ActiveTitle>Active ({stats?.numBids})</ActiveTitle>
      <MarketTable contractMethod={getTopBets} limit={25} type={'bets'} />
    </Container>
  )
}
