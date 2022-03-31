import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from '../pages/Login';
import { userLogin } from '../actions';

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  onEmailChange({ target }) {
    const { value } = target;
    this.setState({
      email: value,
    }, () => this.validate());
  }

  onPasswordChange({ target }) {
    const { value } = target;
    this.setState({
      password: value,
    }, () => this.validate());
  }

  onBtnClick() {
    const { email } = this.state;
    const { history, saveUserEmailToStore } = this.props;
    saveUserEmailToStore(email);
    history.push('/carteira');
  }

  validate() {
    const { email, password } = this.state;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-z]{3}/;
    const passwordMinimumLength = 6;
    const isPasswordValid = password.length >= passwordMinimumLength;
    const isEmailValid = emailRegex.test(email);

    return (isPasswordValid && isEmailValid)
      ? this.setState({ isButtonDisabled: false })
      : this.setState({ isButtonDisabled: true });
  }

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <Login
        onEmailChange={ this.onEmailChange }
        onPasswordChange={ this.onPasswordChange }
        query={ email }
        password={ password }
        isButtonDisabled={ isButtonDisabled }
        onBtnClick={ this.onBtnClick }
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserEmailToStore: (payload) => dispatch(userLogin(payload)),
});

export default connect(null, mapDispatchToProps)(LoginContainer);

LoginContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveUserEmailToStore: PropTypes.func.isRequired,
};
