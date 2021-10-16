import {
  Container,
  Title,
  ClaimTitle,
  ActiveTitle,
} from './layout'
import {ActiveTable, ClaimTable} from 'components/MarketTables'

export const Market = () => {
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
