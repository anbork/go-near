import {
  BackButton,
  Bread,
  BreadDot,
  BreadItem,
  Card,
  Cards,
  CardTitle,
  CardValue,
  Container,
  Main,
  MoneyIcon,
  TableHeader,
  TableHeaders,
  TableIndex,
  TableTitle,
  Title,
  Value
} from './layout'
import {useToMarket} from 'helpers/routes'
import {ProfileTable} from 'components/ProfileTable'
import {useTopScroll} from 'helpers/hooks'

export const Profile = () => {
  useTopScroll()
  const toMarket = useToMarket()

  return (
    <Container>
      <BackButton onClick={toMarket} />
      <Main>
        <Title>luozhiwei.near</Title>
        <Bread>
          <BreadItem>1 Offers</BreadItem>
          <BreadDot />
          <BreadItem>18 Bids</BreadItem>
          <BreadDot />
          <BreadItem>5 Claims</BreadItem>
          <BreadDot />
          <BreadItem>3 Aacquisitions</BreadItem>
        </Bread>
        <Cards>
          <Card type="bag">
            <CardTitle>Bids volume:</CardTitle>
            <CardValue>
              <MoneyIcon />
              <Value>851.99</Value>
            </CardValue>
          </Card>
          <Card type="coin">
            <CardTitle>Profit taken</CardTitle>
            <CardValue>
              <MoneyIcon />
              <Value>1,202.95</Value>
            </CardValue>
          </Card>
          <Card type="cup">
            <CardTitle>Available rewards</CardTitle>
            <CardValue>
              <MoneyIcon />
              <Value>500.00</Value>
            </CardValue>
          </Card>
        </Cards>
        <TableHeaders>
          <TableHeader active={true}>
            <TableTitle>Participating</TableTitle>
            <TableIndex>7</TableIndex>
          </TableHeader>
          <TableHeader>
            <TableTitle>Successful claims</TableTitle>
            <TableIndex>5</TableIndex>
          </TableHeader>
        </TableHeaders>
        <ProfileTable />
      </Main>
    </Container>
  )
}
