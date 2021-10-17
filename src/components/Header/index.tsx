import {FC} from 'react'

import {
  Auth,
  UserName,
  LogOut,
  Brand,
  Container,
  Line,
  Menu,
  MenuButton,
  MenuItem
} from './layout'
import {useRouteCheck, CheckState, useOpen} from 'helpers/routes'

export const Header: FC<{className?: any}> = ({className}) => {
  const {isMarket, isOffer, isRules} = useRouteCheck() as CheckState
  const [open, setOpen] = useOpen()

  return (
    <Container className={className}>
      <MenuButton open={open} onClick={() => setOpen(!open)} />
      <Brand />
      <Menu open={open}>
        <MenuItem onClick={() => setOpen(false)} to="/" active={isMarket}>Market</MenuItem>
        <MenuItem onClick={() => setOpen(false)} to="/offer" active={isOffer}>Offer</MenuItem>
        <MenuItem onClick={() => setOpen(false)} to="/rules" active={isRules}>{open ? 'Rules' : 'How it works'}</MenuItem>
      </Menu>
      <Auth open={open}>
        <UserName>narntt.near</UserName>
        <LogOut />
      </Auth>
      <Line />
    </Container>
  )
}
