import {FC} from 'react'
import styled from 'styled-components'

import {break_down} from 'helpers/media'

const byBigBack = (big?: boolean) => big ? '' : `
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
`

const byBigBase = (big?: boolean) => big ? '' : `
  height: 38px;
  line-height: 38px;
  border-radius: 9px;
  font-weight: 600;
  font-size: 13px;
`

const BorderButtonBack = styled.div<{big?: boolean}>`
  height: 67px;
  line-height: 67px;
  background: linear-gradient(to right, rgba(235, 234, 255, 1), rgba(207, 226, 255, 1), rgba(218, 222, 255, 1), rgba(255, 200, 249, 1));
  border-radius: 17px;

  @media (max-width: ${break_down}) {
    ${({big}) => byBigBack(big)}
  }
`

const BorderButtonBase = styled.div<{big?: boolean}>`
  margin: 1px;
  background: var(--root-background);
  border-radius: 16px;
  text-align: center;
  height: 65px;
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
    ${({big}) => byBigBase(big)}
  }
`

export const BorderButton: FC<{className?: any, onClick?: any, big?: boolean}> =
  ({children, className, onClick, big}) => (
  <BorderButtonBack className={className} big={big}>
    <BorderButtonBase onClick={onClick} big={big}>{children}</BorderButtonBase>
  </BorderButtonBack>
)

const byBigGrey = (big?: boolean) => big ? '' : `
  font-size: 12px;
  font-weight: normal;
`

export const GreyButton = styled.button<{big?: boolean}>`
  height: 67px;
  background: #2C3139;
  border-radius: 17px;
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
    ${({big}) => byBigGrey(big)}
  }
`

export const RainbowButton = styled(GreyButton)`
  background: linear-gradient(to right, rgba(235, 234, 255, 1), rgba(207, 226, 255, 1), rgba(218, 222, 255, 1), rgba(255, 200, 249, 1));
  color: #181B21;
`

