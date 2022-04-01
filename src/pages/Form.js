import React from 'react';
import PropTypes from 'prop-types';
import { expenseTypes, paymentMethods } from '../constants';

export default function Form({ currencies }) {
  return (
    <>
      <label htmlFor="despesas">
        Valor:
        <input
          name="despesa"
          data-testid="value-input"
        />
      </label>
      <label htmlFor="descricao">
        Descrição:
        <input
          name="descricao"
          data-testid="description-input"
        />
      </label>
      <label htmlFor="moeda">
        Moeda:
        <select id="moeda">
          {currencies.map((element) => (
            <option key={ element }>{element}</option>
          ))}
        </select>
      </label>
      <label htmlFor="pagamento">
        Método de pagamento:
        <select data-testid="method-input">
          {paymentMethods.map((element) => (
            <option key={ element }>{element}</option>
          ))}
        </select>
      </label>
      <label htmlFor="categoria">
        Categoria:
        <select data-testid="tag-input">
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
};
