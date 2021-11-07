import { FC, useContext, Dispatch } from 'react'
import { useToProfile } from 'helpers/routes'
import { 
  Auth,
  UserName,
  LogOut,
} from './layout'
import { NearContext, INearProps } from 'helpers/near'

const Authorize: FC = () => {
  const toProfile = useToProfile()
  const { near, setNear }: { near: INearProps | null, setNear: Dispatch<INearProps | null> } = useContext(NearContext)

  if (!near) return null;

  const { wallet, config, signedIn, signedAccountId } = near
  
  const handleSignIn = async () => {
    wallet.requestSignIn(config.contractName)
  }

  const handleSignOut = async () => {
    wallet.signOut()
    setNear({
      ...near,
      signedIn: false, 
      signedAccountId: null
    })
  }

  if (signedIn) {
    return (
      <Auth open={false}>
        <UserName onClick={toProfile}>{signedAccountId}</UserName>
        <LogOut onClick={handleSignOut} />
      </Auth>
    )
  }

  return (
    <Auth open={false}>
      <UserName onClick={handleSignIn}>Sign In</UserName>
    </Auth>
  )

}
export default Authorize

