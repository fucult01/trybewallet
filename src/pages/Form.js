import React from 'react';
import PropTypes from 'prop-types';
import { expenseTypes, paymentMethods } from '../constants';

export default function Form({ currencies, expenses, description,
  onChange, currency, paymentMethod, expenseType }) {
  return (
    <>
      <label htmlFor="despesas">
        Valor:
        <input
          id="despesas"
          type="text"
          name="expenses"
          value={ expenses }
          onChange={ onChange }
          data-testid="value-input"
        />
      </label>
      <label htmlFor="descricao">
        Descrição:
        <input
          type="text"
          name="description"
          value={ description }
          onChange={ onChange }
          data-testid="description-input"
        />
      </label>
      <label htmlFor="moeda">
        Moeda:
        <select
          id="moeda"
          name="currency"
          value={ currency }
          onChange={ onChange }
        >
          {currencies.map((element) => (
            <option key={ element }>{element}</option>
          ))}
        </select>
      </label>
      <label htmlFor="pagamento">
        Método de pagamento:
        <select
          id="pagamento"
          data-testid="method-input"
          name="paymentMethod"
          value={ paymentMethod }
          onChange={ onChange }
        >
          {paymentMethods.map((element) => (
            <option key={ element }>{element}</option>
          ))}
        </select>
      </label>
      <label htmlFor="categoria">
        Categoria:
        <select
          id="categoria"
          data-testid="tag-input"
          name="expenseType"
          value={ expenseType }
          onChange={ onChange }
        >
          {expenseTypes.map((element) => (
            <option key={ element }>{element}</option>
          ))}
        </select>
      </label>
    </>

  );
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  paymentMethod: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenseType: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
