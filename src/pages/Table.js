import React from 'react';
import PropTypes from 'prop-types';
import { headerCell } from '../constants';

export default function Table({ expenses }) {
  return (
    <header>
      <table>
        <thead>
          <tr>
            {headerCell.map((element, index) => (
              <th key={ index }>{element}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses !== undefined && expenses
            .map(({ id, description, tag, method, value, exchangeRates, currency }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{(Number(value)).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number((exchangeRates)[currency].ask).toFixed(2)}</td>
                <td>{(((exchangeRates)[currency].ask) * value).toFixed(2)}</td>
                <td>Real</td>
              </tr>
            ))}
        </tbody>
      </table>
    </header>
  );
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
