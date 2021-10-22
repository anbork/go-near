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
import {useToProduct} from 'helpers/routes'
import {useToProfile} from 'helpers/routes'

export const ClaimTable = () => {
  const toProductTwo = useToProduct('two')
  const toProfile = useToProfile()
  
  return (
    <Table>
      <Row>
        <Client onClick={toProfile}>playerone<ClientSuffix>.near</ClientSuffix></Client>
        <OkIcon />
        <ClaimedPrefix>Claimed by</ClaimedPrefix>
        <Claimed onClick={toProfile}>onsails.near</Claimed>
        <DetailsButton onClick={toProductTwo}>View Details</DetailsButton>
      </Row>
      <Row>
        <Client onClick={toProfile}>rar<ClientSuffix>.near</ClientSuffix></Client>
        <OkIcon />
        <ClaimedPrefix>Claimed by</ClaimedPrefix>
        <Claimed onClick={toProfile}>fil.near</Claimed>
        <DetailsButton onClick={toProductTwo}>View Details</DetailsButton>
      </Row>
      <Row>
        <Client onClick={toProfile}>future<ClientSuffix>.near</ClientSuffix></Client>
        <OkIcon />
        <ClaimedPrefix>Claimed by</ClaimedPrefix>
        <Claimed onClick={toProfile}>narn.near</Claimed>
        <DetailsButton onClick={toProductTwo}>View Details</DetailsButton>
      </Row>
    </Table>
  )
}
