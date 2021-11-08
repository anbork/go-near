import { useContext, useState, useEffect } from 'react'
import {
  Container,
  BackButton
} from './layout'
import BidComponent from 'components/Bid'
import {useTopScroll} from 'helpers/hooks'
import { useParams } from 'react-router-dom'
import { useToMarket } from 'helpers/routes'
import { mapBidInfo, mapProfile, IBidSafety, IProfile } from 'helpers/mappers'
import { NearContext, INearProps, fromNear } from 'helpers/near'
import { Contract } from 'near-api-js'
import useSWR from 'swr'

export const Bid = () => {
  useTopScroll()
  const { bidId } = useParams<{ bidId: string }>();
  const { near }: { near: INearProps | null } = useContext(NearContext)
  const [bidSafety, setBidSafety] = useState<IBidSafety>()
  const [profile, setProfile] = useState<IProfile | null>(null)
  const toMarket = useToMarket()

  const fetchBid = async () => {
    if (!near) return
    const _bid = await near.contract.get_bid({
      bid_id: bidId
    })
    return mapBidInfo(_bid ? { ..._bid, id: bidId } : null)
  }

  const { data: bidInfo } = useSWR(['get_bid', near?.connected, bidId], fetchBid, { refreshInterval: 60000 })
  
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

  const getProfile = async () => {
    if (!near) return
    if (near.signedAccountId) {
      const b = mapProfile(await near.contract.get_profile({
        profile_id: near.signedAccountId
      }))
      setProfile(b);
    } else {
      setProfile(null);
    }
  }

  useEffect(() => {
    getBidSafety()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near])


  useEffect(() => {
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near?.signedAccountId])

  return (
    <Container>
      <BackButton onClick={toMarket} />
      { near && bidInfo && bidSafety && <BidComponent bidInfo={bidInfo} bidSafety={bidSafety} near={near} profile={profile} /> }
    </Container>
  )
}
