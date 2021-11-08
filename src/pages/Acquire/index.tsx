import {useState, useContext} from 'react'

import {
  Container,
  Title,
  DetailsOne,
  Form,
  HeadOne,
  HeadTwo,
  Helper,
  Button,
  InputContainer,
  Input,
  Link,
  HelperSeed
} from './layout'
import { useTopScroll } from 'helpers/hooks'
import { useParams } from 'react-router-dom'
import useSWRImmutable from 'swr/immutable'
import { mapProfile } from 'helpers/mappers'
import { BeatLoader } from "react-spinners";
import { NearContext, INearProps, generateSeedPhrase, parseSeedPhrase } from 'helpers/near'

export const Acquire = () => {
  const { bidId } = useParams<{ bidId: string }>();
  const { near }: { near: INearProps | null } = useContext(NearContext)

  const [seedPhrase, setSeedPhrase] = useState<string>(generateSeedPhrase().seedPhrase)
  const [userPublicKey, setUserPublicKey] = useState<string | null>(null)
  const [acquireSuccess, setAcquireSuccess] = useState<boolean>(false)
  const [loadingSeedPhrase, setLoadingSeedPhrase] = useState<boolean>(false)
  useTopScroll()


  const acquireBidSeedPhrase = async () => {
    if (!near) return
    setLoadingSeedPhrase(true)
    const publicKey = parseSeedPhrase(seedPhrase, '').publicKey
    await near.contract.acquire({ bid_id: bidId, new_public_key: publicKey }, '200000000000000', '0')
    setAcquireSuccess(true)
  }


  const acquireBidPublicKey = async () => {
    if (!near) return
    setLoadingSeedPhrase(true)
    await near.contract.acquire({ bid_id: bidId, new_public_key: userPublicKey }, '200000000000000', '0')
    setAcquireSuccess(true)
  }

  const fetchProfile = async () => {
    if (!near) return
    if (near.signedAccountId) {
      return mapProfile(await near.contract.get_profile({
        profile_id: near.signedAccountId
      }))
    }
  }

  const { data: profile } = useSWRImmutable(['get_profile', near?.signedAccountId, bidId], fetchProfile)
  const isMineAcquisition = profile?.acquisitions.some(id => bidId === id)
  const recoverLink = near ? near.config.walletUrl + '/recover-seed-phrase' : '#'

  if (!isMineAcquisition) return (
    <Container>
      <Form>
        <Title>Acquire {bidId}</Title>
        <DetailsOne>You haven't access to that Acquisition.</DetailsOne>
      </Form>
    </Container>
  )

  if (acquireSuccess) return (
    <Container>
      <Form>
        <Title>Acquire {bidId}</Title>
        <DetailsOne>Contract instruction has been sent.</DetailsOne>
        {userPublicKey ? <></> :
          <>
            <HelperSeed>Seed phrase used:</HelperSeed>
            <InputContainer>
              <Input defaultValue={seedPhrase} readOnly={true} />
            </InputContainer>
            <HelperSeed>Go to <Link href={recoverLink}>wallet</Link> and restore your account</HelperSeed>
          </>
        }
      </Form>
    </Container>
  )

  return (
    <Container>
      <Form>
        <Title>Acquire {bidId}</Title>
        <DetailsOne>Do it easy way or like a pro?</DetailsOne>

        <HeadOne>Use a seed phrase</HeadOne>
        <Helper>Save this randomly generated seed phrase or choose your own</Helper>
        <InputContainer>
          <Input value={seedPhrase} onChange={(e: any) => setSeedPhrase(e.target.value)} />
        </InputContainer>
        {loadingSeedPhrase
          ?
          <Button><BeatLoader /></Button>
          :
          <Button onClick={acquireBidSeedPhrase}>Acquire using seed phrase</Button>
        }

        <HeadTwo>or — Transfer your public key</HeadTwo>
        <Helper>Put your base58 public key</Helper>
        <InputContainer>
          <Input value={userPublicKey || ''} onChange={(e: any) => setUserPublicKey(e.target.value)} placeholder="Example: 9bk1tm45X2hBSffmD65pA2vch862jtcz75mkRR7MXNVj" />
        </InputContainer>
        {loadingSeedPhrase 
          ?
          <Button><BeatLoader /></Button>
          : 
          <Button onClick={acquireBidPublicKey}>Acquire using new public key</Button>
        }
        
      </Form>
    </Container>
  )
}
