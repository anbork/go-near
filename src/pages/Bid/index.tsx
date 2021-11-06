import { useContext, useState, useEffect } from 'react'
import {
  Container,
  BackButton
} from './layout'
import BidComponent from 'components/Bid'
import {useTopScroll} from 'helpers/hooks'
import { useParams } from 'react-router-dom'
import { useToMarket } from 'helpers/routes'
import { mapBidInfo, IBid, IBidSafety } from 'helpers/mappers'
import { NearContext, INearProps, fromNear } from 'helpers/near'
import { Contract } from 'near-api-js'

export const Bid = () => {
  useTopScroll()
  const { bidId } = useParams<{ bidId: string }>();
  const { near }: { near: INearProps | null } = useContext(NearContext)
  const [bidInfo, setBidInfo] = useState<IBid>()
  const [bidSafety, setBidSafety] = useState<IBidSafety>()
  const toMarket = useToMarket()

  const getBidInfo = async () => {
    if (!near) return
    const b = mapBidInfo(await near.contract.get_bid({
      bid_id: bidId
    }))
    b.id = bidId
    setBidInfo(b);
  }

  const getBidSafety = async () => {
    if (!near) {
      return
    }
    const account = await near.api.account(bidId)
    try {
      const codeHash = (await account.state()).code_hash
      const accessKeysLen = (await account.getAccessKeys()).length
      const lockerContract: any = await new Contract(account, bidId, {
        viewMethods: ['get_owner'],
        changeMethods: []
      })
      const lockerOwner = await lockerContract.get_owner({})
      const balance = (await account.getAccountBalance()).total
      setBidSafety({ codeHash, accessKeysLen, lockerOwner, balance: fromNear(balance) })
      return
    } catch (e) {
      console.log('check safety error', e)
    }
    setBidSafety({ codeHash: '(unknown)', accessKeysLen: '(unknown)', lockerOwner: '(not found)', balance: 0 })
    return
  }

  useEffect(() => {
    getBidInfo()
    getBidSafety()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near])

  return (
    <Container>
      <BackButton onClick={toMarket} />
      { near && bidInfo && bidSafety && <BidComponent bidInfo={bidInfo} bidSafety={bidSafety} near={near} /> }
    </Container>
  )
}
