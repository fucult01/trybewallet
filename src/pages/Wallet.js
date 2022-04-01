import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrencies from '../services/api';
import { saveCurrenciesToStore } from '../actions';
import Form from './Form';

class Wallet extends Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    const { sendCurrenciesToStore } = this.props;
    getCurrencies().then((resp) => {
      delete resp.USDT;
      // console.log(resp);
      sendCurrenciesToStore(Object.keys(resp));
      this.setState({ currencies: Object.keys(resp) });
    });
  }

  render() {
    const { email } = this.props;
    const { currencies } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
        <Form currencies={ currencies } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  sendCurrenciesToStore: (payload) => dispatch(saveCurrenciesToStore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  sendCurrenciesToStore: PropTypes.func.isRequired,
};
