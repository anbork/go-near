import {FC} from 'react'
import styled from 'styled-components'

import ok_png from 'assets/images/ok.png'
import money_png from 'assets/images/money.png'
import {break_down} from 'helpers/media'

export const TableTitle = styled.div`
  margin-top: 50px;
  font-weight: 600;
  font-size: 24px;
  height: 36px;
  line-height: 36px;
  color: #8C95A6;

  @media (max-width: ${break_down}) {
    margin-top: 30px;
    font-size: 15px;
  }
`

export const Table = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (max-width: ${break_down}) {
    margin-top: 16px;
  }
`

export const Row = styled.div`
  height: 125px;
  border-bottom: 1px solid #3F4450;
  display: flex;
  justify-content: stretch;
  align-items: center;

  &:first-child {
    border-top: 1px solid #3F4450;
  }

  @media (max-width: ${break_down}) {
    height: 76px;
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-template-rows: 38px 38px;
  }
`

export const Client = styled.div`
  flex: 1 0;
  font-weight: bold;
  font-size: 30px;

  @media (max-width: ${break_down}) {
    grid-column: 1;
    grid-row: 1;
    align-self: end;
    height: 21px;
    line-height: 21px;
    font-weight: 600;
    font-size: 14px;
  }
`

export const ClientSuffix = styled.span`
  color: #8C95A6;
`

export const OkIcon = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;

  @media (max-width: ${break_down}) {
    width: 20px;
    height: 20px;
    grid-column: 3;
    grid-row: 1 / 3;
    align-self: center;
    margin-left: 10px;
  }
`

OkIcon.defaultProps = {
  src: ok_png
}

export const Claimed = styled.div`
  font-size: 16px;
  margin-left: 6px;

  @media (max-width: ${break_down}) {
    margin-left: 0;
    font-size: 12px;
    grid-column: 2;
    grid-row: 2;
    height: 21px;
    line-height: 21px;
    align-self: start;
    justify-self: end;
  }
`

export const ClaimedPrefix = styled.div`
  margin-left: 8px;
  font-size: 16px;
  color: #8C95A6;

  @media (max-width: ${break_down}) {
    margin-left: 0;
    font-size: 12px;
    grid-column: 2;
    grid-row: 1;
    height: 21px;
    line-height: 21px;
    align-self: end;
    justify-self: end;
  }
`

export const DetailsButton = styled.div`
  margin-left: 26px;
  width: 228px;
  height: 67px;
  background: #2C3139;
  border-radius: 17px;
  text-align: center;
  line-height: 67px;
  font-weight: bold;
  font-size: 16px;
  border: none;
  outline: none;
  cursor: pointer;
  color: #ffffff;

  @media (max-width: ${break_down}) {
    margin-left: 0;
    width: auto;
    font-size: 12px;
    font-weight: normal;
    background: none;
    grid-column: 1;
    grid-row: 2;
    height: 18px;
    line-height: 18px;
    align-self: start;
    justify-self: start;
    text-align: left;
    color: #8C95A6;
    cursor: pointer;

    &::after {
      content: '>';
      padding-left: 2px;
      padding-top: 1px;
      position: relative;
      top: 1px;
    }
  }
`

export const Bids = styled.div`
  font-size: 16px;
  color: #8C95A6;

  @media (max-width: ${break_down}) {
    font-size: 12px;
    grid-column: 1;
    grid-row: 2;
    height: 18px;
    line-height: 18px;
    align-self: start;
    justify-self: start;
    text-align: left;
  }
`


const StartsButtonBack = styled.div`
  margin-left: 26px;
  width: 228px;
  height: 67px;
  background: linear-gradient(to right, rgba(235, 234, 255, 1), rgba(207, 226, 255, 1), rgba(218, 222, 255, 1), rgba(255, 200, 249, 1));
  border-radius: 17px;

  @media (max-width: ${break_down}) {
    margin-left: 0;
    width: 170px;
    height: 40px;
    border-radius: 10px;
    grid-column: 2;
    grid-row: 1 / 3;
    align-self: center;
  }
`

const StartsButtonBase = styled.button`
  margin-top: 1px;
  margin-left: 1px;
  width: 226px;
  height: 65px;
  background: var(--root-background);
  border-radius: 16px;
  text-align: center;
  line-height: 65px;
  font-weight: bold;
  font-size: 16px;
  border: none;
  outline: none;
  cursor: pointer;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${break_down}) {
    width: 168px;
    height: 38px;
    line-height: 38px;
    border-radius: 9px;
    font-weight: 600;
    font-size: 13px;
  }
`

export const MoneyIcon = styled.img`
  width: 25px;
  height: 25px;
  margin: 0 8px;
  object-fit: contain;

  @media (max-width: ${break_down}) {
    width: 20px;
    height: 20px;
  }
`

MoneyIcon.defaultProps = {
  src: money_png
}


export const StartsButton: FC<{}> = ({children}) => (
  <StartsButtonBack>
    <StartsButtonBase>{children}</StartsButtonBase>
  </StartsButtonBack>
)
