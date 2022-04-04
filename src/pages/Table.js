import React from 'react';
import PropTypes from 'prop-types';
import { headerCell } from '../constants';

export default function Table({ expenses, deleteExpenseBtn, editExpenseBtn }) {
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
                <td>{(exchangeRates[currency].name).split('/')[0]}</td>
                <td>{Number((exchangeRates)[currency].ask).toFixed(2)}</td>
                <td>{(((exchangeRates)[currency].ask) * value).toFixed(2)}</td>
                {/* <td>4.20</td>
                <td>420.41</td> */}
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => editExpenseBtn(id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteExpenseBtn(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </header>
  );
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseBtn: PropTypes.func.isRequired,
  editExpenseBtn: PropTypes.func.isRequired,
};
