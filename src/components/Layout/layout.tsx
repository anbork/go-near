import styled from 'styled-components'

import {Header as HeaderBase} from 'components/Header'
import {ReactComponent as LightSVG} from 'assets/images/light.svg'
import {break_down} from 'helpers/media'

export const OuterContainer = styled.div`
  background-color: var(--root-background);
  display: grid;
  justify-content: center;

  @media (min-width: 1440px) {
    grid-template-columns: 1440px;
  }

  @media (max-width: 1439px) {
    grid-template-columns: 100%;
  }
`

export const InnerContainer = styled.div`
  min-height: 100vh;
  max-width: 1440px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: var(--header-height) auto;
  justify-items: stretch;

  @media (max-width: 1439px) {
    grid-template-rows: var(--header-height__mob) auto;
  }
`

export const Light = styled(LightSVG)`
  grid-row: 1 / 3;
  grid-column: 1 / 2;
  margin: 20px 0 0 -128px;
  z-index: 1;

  @media (max-width: ${break_down}) {
    margin: -60px 0 0 -140px;
  }
`

export const Header = styled(HeaderBase)`
  grid-row: 1;
  grid-column: 1;
  z-index: 3;

  @media (max-width: ${break_down}) {
    position: fixed;
    width: 100%;
    background-color: var(--root-background);
  }
`

export const Content = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  min-height: calc(100vh - var(--header-height));
  color: white;
  font-weight: bold;
  justify-self: stretch;
  z-index: 2;
`
