import {
  Container,
  Title,
  ClaimTitle,
  ActiveTitle,
} from './layout'
import {ActiveTable, ClaimTable} from 'components/MarketTables'
import {useTopScroll} from 'helpers/hooks'

export const Market = () => {
  useTopScroll()
  
  return (
    <Container>
      <Title>Market</Title>
      <ClaimTitle>On Claim (3)</ClaimTitle>
      <ClaimTable />
      <ActiveTitle>Active (25)</ActiveTitle>
      <ActiveTable />
    </Container>
  )
}
