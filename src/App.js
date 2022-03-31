import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginContainer from './components/LoginContainer';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      {/* <Route exact path="/">
        <LoginContainer />
      </Route> */}
      <Route exact path="/" component={ LoginContainer } />
      <Route exact path="/carteira" component={ Wallet } />
      {/* <Route>

      </Route> */}
    </Switch>
  );
}

export default App;
