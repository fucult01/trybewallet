import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrencies from '../services/api';
import { deleteExpense, saveCurrenciesToStore,
  saveExpensesToStore, editExpensesToStore } from '../actions';
import Form from './Form';
import Table from './Table';

class Wallet extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      expenseIdToBeEdited: 0,
      currencies: [],
      expenses: '',
      description: '',
      currency: 'CAD',
      paymentMethod: 'Dinheiro',
      expenseType: 'Alimentação',
      totalExpenses: 0,
      isEditClicked: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.deleteExpenseBtn = this.deleteExpenseBtn.bind(this);
    this.editExpenseBtn = this.editExpenseBtn.bind(this);
    this.editExpenses = this.editExpenses.bind(this);
  }

  componentDidMount() {
    const { sendCurrenciesToStore } = this.props;
    getCurrencies().then((resp) => {
      delete resp.USDT;

      sendCurrenciesToStore(Object.keys(resp));
      this.setState({ currencies: Object.keys(resp) });
    });
    this.renderAllExpenses();
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
      this.renderAllExpenses();
    });
    this.setState((prevState) => ({
      expenses: '',
      id: prevState.id + 1,
    }));
  }

  deleteExpenseBtn(id) {
    const { userExpenses, saveNewExpensesToStore } = this.props;
    const { totalExpenses } = this.state;

    const expenseToBeDeleted = userExpenses.filter((element) => element.id === id);
    const expenseValue = Number(expenseToBeDeleted.map(({ value }) => value));

    const exchangeRateCurrency = Number(expenseToBeDeleted.map(
      ({ exchangeRates, currency }) => exchangeRates[currency],
    )[0].ask);
    const expenseToBeDeletedValue = exchangeRateCurrency * expenseValue;
    const valueAfterExpenseDeleted = totalExpenses - expenseToBeDeletedValue;

    this.setState({ totalExpenses: valueAfterExpenseDeleted });
    saveNewExpensesToStore(id);
  }

  editExpenseBtn(id) {
    const { isEditClicked } = this.state;
    this.setState({ isEditClicked: !isEditClicked, expenseIdToBeEdited: id });
  }

  editExpenses() {
    const { expenseIdToBeEdited, expenses, description,
      currency, paymentMethod, expenseType } = this.state;
    const { editExpenses } = this.props;
    getCurrencies().then((resp) => {
      delete resp.USDT;

      editExpenses({
        expenseIdToBeEdited,
        value: expenses,
        description,
        currency,
        method: paymentMethod,
        tag: expenseType,
        exchangeRates: resp,
      });
      this.renderAllExpenses();
    });
    this.setState({ isEditClicked: false });
  }

  renderAllExpenses() {
    const { userExpenses } = this.props;
    let totalUserExpenses = 0;
    userExpenses.forEach(({ currency, value }) => {
      let eachExpense = 0;
      let totalExpensesArray = [];

      const exchangeRatesArray = userExpenses.map((element) => element.exchangeRates);
      const exchangeRatesArrayToObject = Object.assign({}, ...exchangeRatesArray);
      const keyAndValueCurrencies = Object.entries(exchangeRatesArrayToObject);

      const expectedCurrency = keyAndValueCurrencies
        .filter((element) => element.includes(currency))
        .map((element2) => element2[1]);

      const stringToNumberExchangeCurrency = Number(expectedCurrency[0].ask);
      eachExpense = value * stringToNumberExchangeCurrency;
      totalExpensesArray = [...totalExpensesArray, eachExpense];

      totalExpensesArray.forEach((element) => {
        totalUserExpenses += element;
      });
    });
    this.setState({ totalExpenses: totalUserExpenses });
  }

  render() {
    const { email, userExpenses } = this.props;
    const { currencies, expenses, description,
      currency, paymentMethod, expenseType, totalExpenses, isEditClicked } = this.state;

    return (
      <div>
        <h1>TrybeWallet</h1>
        <span data-testid="email-field">{email}</span>
        <span
          data-testid="total-field"
          // data-testid="currency-input"
        >
          {totalExpenses.toFixed(2)}
        </span>
        <span data-testid="header-currency-field">BRL</span>
        <Form
          currencies={ currencies }
          expenses={ expenses }
          description={ description }
          onChange={ this.onChange }
          currency={ currency }
          paymentMethod={ paymentMethod }
          expenseType={ expenseType }
          isEditClicked={ isEditClicked }
        />
        {isEditClicked
          ? (
            <button
              type="button"
              onClick={ this.editExpenses }
            >
              Editar Despesa
            </button>
          )
          : (
            <button
              type="button"
              onClick={ this.onBtnClick }
            >
              Adicionar despesa
            </button>
          )}
        <Table
          expenses={ userExpenses }
          deleteExpenseBtn={ this.deleteExpenseBtn }
          editExpenseBtn={ this.editExpenseBtn }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  userExpenses: state.wallet.expenses,
  allExpanses: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  sendCurrenciesToStore: (payload) => dispatch(saveCurrenciesToStore(payload)),
  sendExpensesToStore: (payload) => dispatch(saveExpensesToStore(payload)),
  saveNewExpensesToStore: (payload) => dispatch(deleteExpense(payload)),
  editExpenses: (payload) => dispatch(editExpensesToStore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  sendCurrenciesToStore: PropTypes.func.isRequired,
  sendExpensesToStore: PropTypes.func.isRequired,
  userExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveNewExpensesToStore: PropTypes.func.isRequired,
  editExpenses: PropTypes.func.isRequired,
};
