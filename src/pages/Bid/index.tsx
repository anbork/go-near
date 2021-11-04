import {Container} from 'components/Core'
import BidComponent from 'components/Bid'
import {useTopScroll} from 'helpers/hooks'
import { useParams } from 'react-router-dom'

export const Bid = () => {
  useTopScroll()
  const { bidId } = useParams<{ bidId: string }>();

  return (
    <Container>
      <BidComponent />
    </Container>
  )
}
