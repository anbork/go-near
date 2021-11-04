import styled from 'styled-components'
import { break_down } from 'helpers/media'

export {
  BorderButton,
  GreyButton,
  RainbowButton
} from './Buttons'

export const Container = styled.div`
  margin: 0 var(--margin) 150px;
  display: grid;
  grid-template-columns: 120px 1fr 440px; 

  @media (max-width: ${break_down}) {
    margin: 0 var(--margin__mob) 30px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`