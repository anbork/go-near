import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import {Normalize} from 'styled-normalize'

import {Market, Offer, Bid, Profile, Rules} from 'pages'
import {Layout} from 'components/Layout'
import {GlobalStyle} from './layout'

export const App = () => {
  return (
    <>
      <Normalize />
      <GlobalStyle />
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Market} />
              <Route path="/market" component={Market} />
              <Route path="/offer" component={Offer} />
              <Route path="/bid/:bidId" component={Bid} />
              <Route path="/profile" component={Profile} />
              <Route path="/rules" component={Rules} />
            </Switch>
          </Layout>
        </Router>
    </>
  );
}
