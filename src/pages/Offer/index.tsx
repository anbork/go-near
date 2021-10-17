import {useState} from 'react'

import {
  Container,
  Main,
  Title,
  DetailsOne,
  DetailsTwo,
  Form,
  HeadOne,
  HeadTwo,
  Helper,
  Button,
  InputContainer,
  Input,
  InputSuffix
} from './layout'

export const Offer = () => {
  const [offer, setOffer] = useState('narn')
  const [reward, setReward] = useState('vlad')

  return (
    <Container>
      <Main>
        <Title>Offer your <br /> account</Title>
        <DetailsOne>Here you can offer your account to the Market. Choose an account to transfer all rewards after claiming your account.</DetailsOne>
        <DetailsTwo>This is NEAR Account Marketplace. It allows you to sell, bid and buy NEAR Account names.</DetailsTwo>
      </Main>
      <Form>
        <HeadOne>Account you offer</HeadOne>
        <InputContainer>
          <Input value={offer} onChange={(e: any) => setOffer(e.target.value)} />
          <InputSuffix>.near</InputSuffix>
        </InputContainer>
        <Helper>All your access keys will be removed</Helper>
        <HeadTwo>Account which takes rewards</HeadTwo>
        <InputContainer>
          <Input value={reward} onChange={(e: any) => setReward(e.target.value)} />
          <InputSuffix>.near</InputSuffix>
        </InputContainer>
        <Helper>All rewards will be transferred to this account</Helper>
        <Button>Offer narn.near</Button>
      </Form>
    </Container>
  )
}
