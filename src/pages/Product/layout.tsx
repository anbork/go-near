import styled from 'styled-components'
import {Link} from 'react-router-dom'

import back_png from 'assets/images/back.png'
import arrow_png from 'assets/images/arrow.png'
import point_png from 'assets/images/point.png'
import {
  MoneyIcon as MoneyIconBase,
  MoneyInvertIcon as MoneyInvertIconBase,
  OkIcon as OkIconBase
} from 'components/Icons'
import {
  RainbowButton,
  BorderButton,
  GreyButton
} from 'components/Core'
import {CompetitorsTable} from 'components/CompetitorsTable'
import {break_down} from 'helpers/media'

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

export const BackButton = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #2C3139;
  margin-top: 45px;
  grid-column: 1;
  grid-row: 1;
  justify-self: start;
  background-image: url(${back_png});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 14px 14px;
  cursor: pointer;

  @media (max-width: ${break_down}) {
    width: 44px;
    height: 44px;
    border-radius: 22px;
    margin-top: 22px;
    background-color: #181B21;
  }
`

export const Main = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: start;

  @media (max-width: ${break_down}) {
    margin-top: 16px;
    border-bottom: 1px solid #3F4450;
  }
`

export const Title = styled.div`
  height: 130px;
  line-height: 130px;
  font-weight: bold;
  font-size: 88px;

  @media (max-width: ${break_down}) {
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    font-size: 33px;
  }
`

export const Balance = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${break_down}) {
    margin-top: 15px;
  }
`

export const BalanceTitle = styled.div`
  height: 24px;
  line-height: 24px;
  font-weight: normal;
  font-size: 19px;

  @media (max-width: ${break_down}) {
    font-size: 15px;
  }
`

export const BalanceMoneyIcon = styled(MoneyIconBase)`
  margin: 0 7px 0 10px;

  @media (max-width: ${break_down}) {
    margin: 0 7px 0 5px;
  }
`

export const BalanceInvertIcon = styled(MoneyInvertIconBase)`
  margin: 0 7px;
`

export const BalanceValue = styled.div`
  font-weight: 600;
  font-size: 19px;

  @media (max-width: ${break_down}) {
    font-size: 15px;
  }
`

export const BalanceDetails = styled.div`
  margin-top: 6px;
  line-height: 20px;
  font-weight: normal;
  font-size: 13px;
  color: #8C95A6;

  @media (max-width: ${break_down}) {
    margin-top: 4px;
  }
`

export const BalanceButtons = styled.div<{type?: string} | any>`
  ${({type}) => type === 'one' ? 'margin-top: 46px;' : 'margin-top: 22px;'}
  width: auto;
  display: flex;
  border-bottom: 1px solid #3F4450;

  @media (max-width: ${break_down}) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    ${({type}) => type === 'one' ? 'margin-top: 37px;' : 'margin-top: 16px;'}
  }
`

export const ClaimButton = styled(RainbowButton)`
  width: 246px;
  margin-bottom: 37px;

  @media (max-width: ${break_down}) {
    width: auto;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 16px;
  }
`

export const WillButton = styled(GreyButton)`
  width: 298px;
  margin-bottom: 37px;

  @media (max-width: ${break_down}) {
    width: auto;
    margin-bottom: 0;
  }
`

export const WillPrefix = styled.span`
  color: #8C95A6;
  margin-right: 7px;
`

export const WillTime = styled.span`
  font-weight: bold;
`

export const BidButton = styled(BorderButton)`
  width: 190px;
  margin-left: 18px;
  margin-bottom: 37px;

  @media (max-width: ${break_down}) {
    margin-left: 0;
    width: auto;
    margin-bottom: 24px;
    margin-top: 16px;
    font-weight: bold;
    font-size: 16px;
    line-height: 65px;
  }
`

export const Question = styled.div`
  margin-top: 20px;
  height: 28px;
  line-hieght: 28px;
  font-weight: 600;
  font-size: 16px;
  color: #8C95A6;

  @media (max-width: ${break_down}) {
    font-size: 15px;
  }
`

export const Text = styled.div`
  margin-top: 25px;
  width: 452px;
  font-weight: normal;
  font-size: 14px;
  line-height: 26px;

  @media (max-width: ${break_down}) {
    margin-top: 16px;
    font-size: 14px;
    width: auto;
    line-height: 24px;
  }
`

export const Rules = styled(Link)`
  margin-top: 24px;
  cursor: pointer;
  height: 24px;
  line-height: 24px;
  font-weight: 600;
  font-size: 13px;
  color: #ffffff;
  text-decoration: none;
  border-bottom: 1px solid #FF9494;

  &::after {
    content: ' ';
    width: 8px;
    height: 8px;
    padding-left: 14px;
    background-image: url(${arrow_png});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 8px 8px;
  }

  @media (max-width: ${break_down}) {
    margin-top: 20px;
    margin-bottom: 35px;
  }
`

export const Competitors = styled.div`
  grid-column: 3;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 440px;
  margin-top: 35px;

  @media (max-width: ${break_down}) {
    width: auto;
    margin-top: 20px;
  }
`

export const CompetitorsTitle = styled.div`
  height: 42px;
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;

  @media (max-width: ${break_down}) {
    height: 24px;
    line-height: 24px;
    font-size: 16px;
  }
`

export const CompetitorsFounded = styled.div`
  margin-top: 2px;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  height: 22px;
  color: #8C95A6;

  @media (max-width: ${break_down}) {
    margin-top: 7px;
    font-size: 14px;
    height: 21px;
    line-height: 21px;
  }
`

export const FoundedName = styled.span`
  color: #FF9494;
  cursor: pointer;
`

export const Table = styled(CompetitorsTable)``

export const Claimed = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;

  @media (max-width: ${break_down}) {
    margin-top: 33px;
    display: grid;
    grid-template-columns: 33px auto 1fr;
    grid-template-rows: 22px 22px;
  }
`

export const ClaimedIcon = styled(OkIconBase)`
  width: 28px;
  height: 28px;

  @media (max-width: ${break_down}) {
    width: 24px;
    height: 24px;
    grid-row: 1 / 3;
    grid-column: 1;
    align-self: start;
  }
`

export const ClaimedBy = styled.div`
  margin-left: 9px;
  color: #8C95A6;
  font-weight: normal;
  font-size: 17px;
  line-height: 24px;
  height: 24px;

  @media (max-width: ${break_down}) {
    margin-left: 0;
    font-size: 14px;
    line-height: 22px;
    height: 22px;
    grid-row: 1;
    grid-column: 2;
  }
`

export const ClaimedName = styled.div`
  margin-left: 4px;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 17px;
  line-height: 24px;
  height: 24px;

  @media (max-width: ${break_down}) {
    font-size: 14px;
    line-height: 22px;
    height: 22px;
    grid-row: 1;
    grid-column: 3;
  }
`

export const ClaimedDot = styled.img`
  width: 6px;
  height: 6px;
  object-fit: contain;
  margin: 0 7px;

  @media (max-width: ${break_down}) {
    display: none;
  }
`

ClaimedDot.defaultProps = {
  src: point_png
}

export const ClaimedDateTime = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  height: 24px;
  color: #8C95A6;

  @media (max-width: ${break_down}) {
    font-size: 13px;
    line-height: 22px;
    height: 22px;
    grid-row: 2;
    grid-column: 2 / 4;
  }
`
