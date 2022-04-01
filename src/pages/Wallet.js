import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrencies from '../services/api';
import { saveCurrenciesToStore, saveExpensesToStore } from '../actions';
import Form from './Form';
import Table from './Table';

let totalExpenses = 0;

class Wallet extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      currencies: [],
      expenses: '',
      description: '',
      currency: 'USD',
      paymentMethod: 'Dinheiro',
      expenseType: 'Alimentação',
      sum: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  componentDidMount() {
    const { sendCurrenciesToStore } = this.props;
    getCurrencies().then((resp) => {
      delete resp.USDT;

      sendCurrenciesToStore(Object.keys(resp));
      this.setState({ currencies: Object.keys(resp) });
    });
  }

  onChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;

    this.setState({
      [name]: value,
    });
  }

  onBtnClick() {
    const { sendExpensesToStore } = this.props;
    const { expenses, description,
      currency, paymentMethod, expenseType, id } = this.state;

    getCurrencies().then((resp) => {
      delete resp.USDT;

      sendExpensesToStore({
        id,
        value: expenses,
        description,
        currency,
        method: paymentMethod,
        tag: expenseType,
        exchangeRates: resp,
      });
      const keyAndValueCurrencies = Object.entries(resp);

      const expectedCurrency = keyAndValueCurrencies
        .filter((element) => element.includes(currency))
        .map((element2) => element2[1]);

      const stringToNumberExchangeCurrency = Number(expectedCurrency[0].ask);

      totalExpenses = expenses * stringToNumberExchangeCurrency;
      this.setState((prevState) => ({
        sum: prevState.sum + totalExpenses,
      }));
    });

    this.setState((prevState) => ({
      expenses: '',
      id: prevState.id + 1,
    }));
  }

  render() {
    const { email, userExpenses } = this.props;
    const { currencies, expenses, description,
      currency, paymentMethod, expenseType, sum } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">{sum.toFixed(2)}</span>
        <span data-testid="header-currency-field">BRL</span>
        <Form
          currencies={ currencies }
          expenses={ expenses }
          description={ description }
          onChange={ this.onChange }
          currency={ currency }
          paymentMethod={ paymentMethod }
          expenseType={ expenseType }
        />
        <button
          type="button"
          onClick={ this.onBtnClick }
        >
          Adicionar despesa
        </button>
        <Table expenses={ userExpenses } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  userExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  sendCurrenciesToStore: (payload) => dispatch(saveCurrenciesToStore(payload)),
  sendExpensesToStore: (payload) => dispatch(saveExpensesToStore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  sendCurrenciesToStore: PropTypes.func.isRequired,
  sendExpensesToStore: PropTypes.func.isRequired,
  userExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
