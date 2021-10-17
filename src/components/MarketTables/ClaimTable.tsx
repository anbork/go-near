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
import {useToProfile} from 'helpers/routes'

export const ClaimTable = () => {
  const toProfile = useToProfile()
  
  return (
    <Table>
      <Row>
        <Client>playerone<ClientSuffix>.near</ClientSuffix></Client>
        <OkIcon />
        <ClaimedPrefix>Claimed by</ClaimedPrefix>
        <Claimed>onsails.near</Claimed>
        <DetailsButton onClick={toProfile}>View Details</DetailsButton>
      </Row>
      <Row>
        <Client>rar<ClientSuffix>.near</ClientSuffix></Client>
        <OkIcon />
        <ClaimedPrefix>Claimed by</ClaimedPrefix>
        <Claimed>fil.near</Claimed>
        <DetailsButton onClick={toProfile}>View Details</DetailsButton>
      </Row>
      <Row>
        <Client>future<ClientSuffix>.near</ClientSuffix></Client>
        <OkIcon />
        <ClaimedPrefix>Claimed by</ClaimedPrefix>
        <Claimed>narn.near</Claimed>
        <DetailsButton onClick={toProfile}>View Details</DetailsButton>
      </Row>
    </Table>
  )
}
