import {StrictMode, FC, useEffect, useState} from 'react'
import {render} from 'react-dom'
import {App} from 'components/App'
import { NearContext, connectNear, INearProps, IUserProps } from 'helpers/near'

const NearApp: FC = () => {
  let [near, setNear] = useState<INearProps | null>(null);
  let [user, setUser] = useState<IUserProps>({
    signedIn: false,
    signedAccountId: null
  });

  useEffect(() => {
    async function connect() {
      const near: INearProps = await connectNear()
      setNear(near);
      const accountId = await near.wallet.getAccountId()
      setUser({
        signedIn: !!accountId,
        signedAccountId: accountId,
      })
    }

    connect();
  }, []);

  return (
    <StrictMode>
      <NearContext.Provider value={{ near, user, setUser }}>
        <App />
      </NearContext.Provider>
    </StrictMode>
  )
}

render(
  <NearApp />,
  document.getElementById('root')
)
