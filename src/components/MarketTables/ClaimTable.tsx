import {
  Bids,
  Client,
  ClientSuffix,
  Row,
  Table,
  MoneyIcon,
  StartsButton
} from './layout'

export const ClaimTable = () => {
  return (
    <Table>
      <Row>
        <Client>fil<ClientSuffix>.near</ClientSuffix></Client>
        <Bids>27 bids</Bids>
        <StartsButton>Starts from <MoneyIcon /> 8.83</StartsButton>
      </Row>
      <Row>
        <Client>gandalf<ClientSuffix>.near</ClientSuffix></Client>
        <Bids>15 bids</Bids>
        <StartsButton>Starts from <MoneyIcon /> 9.20</StartsButton>
      </Row>
      <Row>
        <Client>moonglow<ClientSuffix>.near</ClientSuffix></Client>
        <Bids>50 bids</Bids>
        <StartsButton>Starts from <MoneyIcon /> 19.08</StartsButton>
      </Row>
      <Row>
        <Client>narntt<ClientSuffix>.near</ClientSuffix></Client>
        <Bids>16 bids</Bids>
        <StartsButton>Starts from <MoneyIcon /> 5.03</StartsButton>
      </Row>
      <Row>
        <Client>aim<ClientSuffix>.near</ClientSuffix></Client>
        <Bids>16 bids</Bids>
        <StartsButton>Starts from <MoneyIcon /> 110.21</StartsButton>
      </Row>
      <Row>
        <Client>fbr<ClientSuffix>.near</ClientSuffix></Client>
        <Bids>18 bids</Bids>
        <StartsButton>Starts from <MoneyIcon /> 7.71</StartsButton>
      </Row>
    </Table>
  )
}
