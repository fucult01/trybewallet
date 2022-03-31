import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { connect } from 'react-redux';
import LoginContainer from './components/LoginContainer';
import Wallet from './pages/Wallet';
// import Header from './pages/Header';

export default class App extends Component {
  render() {
    // const { email } = this.props;
    return (
      <Switch>
        <Route exact path="/" component={ LoginContainer } />
        <Route exact path="/carteira" component={ Wallet } />
        {/* <Route
          exact
          path="/carteira"
          render={ (props) => (
            <Header email={ email }>
              <Wallet { ...props } />
            </Header>
          ) }
        /> */}
      </Switch>
    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.user.email,
// });

// export default connect(mapStateToProps, null)(App);
