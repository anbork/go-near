import { FC, useContext, Dispatch } from 'react'
import { useToProfile } from 'helpers/routes'
import { 
  Auth,
  UserName,
  LogOut,
} from './layout'
import { NearContext, INearProps, IUserProps } from 'helpers/near'

const Authorize: FC = () => {
  const toProfile = useToProfile()
  const { near, user, setUser }: { near: INearProps | null, user: IUserProps, setUser: Dispatch<IUserProps> } = useContext(NearContext)

  if (!near) return null;

  const { wallet, config } = near
  const { signedIn, signedAccountId } = user
  
  const handleSignIn = async () => {
    wallet.requestSignIn(config.contractName)
  }

  const handleSignOut = async () => {
    wallet.signOut()
    setUser({ 
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

