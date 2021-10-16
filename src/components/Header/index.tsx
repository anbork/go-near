import {FC, useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

import {
  Auth,
  UserName,
  LogOut,
  Brand,
  Container,
  Line,
  Menu,
  MenuButton,
  MenuItem,
  hideScroll
} from './layout'

export const Header: FC<{className?: any}> = ({className}) => {
  const location = useLocation()
  const isMarket = () => location.pathname === '/' || location.pathname === '/market'
  const isOffer = () => location.pathname === '/offer'
  const isRules = () => location.pathname === '/rules'
  const [open, setOpen] = useState(false)

  useEffect(() => {
    hideScroll(open)
  }, [open])

  return (
    <Container className={className}>
      <MenuButton open={open} onClick={() => setOpen(!open)} />
      <Brand />
      <Menu open={open}>
        <MenuItem onClick={() => setOpen(false)} to="/" active={isMarket()}>Market</MenuItem>
        <MenuItem onClick={() => setOpen(false)} to="/offer" active={isOffer()}>Offer</MenuItem>
        <MenuItem onClick={() => setOpen(false)} to="/rules" active={isRules()}>{open ? 'Rules' : 'How it works'}</MenuItem>
      </Menu>
      <Auth open={open}>
        <UserName>narntt.near</UserName>
        <LogOut />
      </Auth>
      <Line />
    </Container>
  )
}
