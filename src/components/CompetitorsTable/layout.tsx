import styled from 'styled-components'

import {MoneyIcon as MoneyIconBase} from 'components/Icons'
import {break_down} from 'helpers/media'

export const Table = styled.div`
  margin-top: 33px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (max-width: ${break_down}) {
    margin-top: 26px;
  }
`

export const Row = styled.div`
  height: 45px;
  display: flex;
  justify-content: stretch;
  align-items: center;

  &:nth-child(odd) {
    background-color: #20242C;
    border-radius: 7px;
  }
`

export const Name = styled.div`
  margin-left: 13px;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  height: 22px;
  flex: 1 0;
`

export const NameSuffix = styled.span`
  color: #8C95A6;
`

export const MoneyIcon = styled(MoneyIconBase)`
  width: 21px;
  height: 21px;
`

export const Value = styled.div`
  margin: 0 11px 0 6px;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  height: 22px;
  width: 40px;
`
