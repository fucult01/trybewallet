import React from 'react';
import PropTypes from 'prop-types';

export default function Header({ email, totalExpenses }) {
  return (
    <>
      <h1>TrybeWallet</h1>
      <span data-testid="email-field">{email}</span>
      <span
        data-testid="total-field"
      >
        {totalExpenses.toFixed(2)}
      </span>
      <span data-testid="header-currency-field">BRL</span>
    </>
  );
}

Header.propTypes = {
  totalExpenses: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};
