import {FC} from 'react'
import {
  InnerContainer,
  OuterContainer,
  Content,
  Header,
  Light
} from './layout'

export const Layout: FC<{}> = ({children}) => {
  return (
    <OuterContainer>
    <InnerContainer>
      <Header />
      <Light />
      <Content>{children}</Content>
    </InnerContainer>
    </OuterContainer>
  )
}
