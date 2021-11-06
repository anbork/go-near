import {
  WillTime
} from './layout'
import Moment from 'react-moment'

const WillBeClaimed = ({ claimedTime, claimPeriod }: { claimedTime: number, claimPeriod: number }) => {
  Moment.startPooledTimer(1000)

  return (
    <WillTime>
      <Moment date={claimedTime} format='hh:mm:ss' add={{ seconds: claimPeriod }} durationFromNow />
    </WillTime>
  );
}

export default WillBeClaimed;