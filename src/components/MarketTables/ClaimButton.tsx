import {
  Claimed,
  ClaimedPrefix,
  DetailsButton,
  OkIcon,
} from './layout'
import { useToProfile, useToBid } from 'helpers/routes'
import { IBid } from 'helpers/mappers'

const ClaimButton = ({ bid }: { bid: IBid }) => {
  const toProduct = useToBid(bid.id)
  const toProfile = useToProfile()

  return (
    <>
      <OkIcon />
      <ClaimedPrefix>Claimed by</ClaimedPrefix>
      <Claimed onClick={toProfile}>{bid?.claimedBy}</Claimed>
      <DetailsButton onClick={toProduct}>View Details</DetailsButton>
    </>
  );
}

export default ClaimButton;