import {
  Claimed,
  ClaimedPrefix,
  Client,
  ClientSuffix,
  DetailsButton,
  OkIcon,
  Row,
  Table
} from './layout'

export const ClaimTable = () => {
  return (
    <Table>
      <Row>
        <Client>playerone<ClientSuffix>.near</ClientSuffix></Client>
        <OkIcon />
        <ClaimedPrefix>Claimed by</ClaimedPrefix>
        <Claimed>onsails.near</Claimed>
        <DetailsButton>View Details</DetailsButton>
      </Row>
      <Row>
        <Client>rar<ClientSuffix>.near</ClientSuffix></Client>
        <OkIcon />
        <ClaimedPrefix>Claimed by</ClaimedPrefix>
        <Claimed>fil.near</Claimed>
        <DetailsButton>View Details</DetailsButton>
      </Row>
      <Row>
        <Client>future<ClientSuffix>.near</ClientSuffix></Client>
        <OkIcon />
        <ClaimedPrefix>Claimed by</ClaimedPrefix>
        <Claimed>narn.near</Claimed>
        <DetailsButton>View Details</DetailsButton>
      </Row>
    </Table>
  )
}
