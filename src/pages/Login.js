import React from 'react';
import PropTypes from 'prop-types';

export default function Login({ email, password,
  onEmailChange, onPasswordChange, onBtnClick, isButtonDisabled }) {
  return (
    <>
      <input
        name="email"
        value={ email }
        onChange={ (e) => onEmailChange(e) }
        placeholder="Enter your email"
        data-testid="email-input"
      />
      <input
        name="password"
        value={ password }
        onChange={ (e) => onPasswordChange(e) }
        placeholder="Enter your password"
        data-testid="password-input"
      />
      <button
        type="button"
        onClick={ onBtnClick }
        disabled={ isButtonDisabled }
      >
        Entrar
      </button>
    </>
  );
}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onBtnClick: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
};
