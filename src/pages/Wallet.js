import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// export default function Wallet({ email }) {
//   // const renderEverything = (
//   //   props.children { <h1>hey</h1>}
//   // );
//   return (
//     <div>
//       <h1>TrybeWallet</h1>
//       <span data-testid="email-field">{email}</span>
//       <span data-testid="total-field">0</span>
//       <span data-testid="header-currency-field">BRL</span>
//     </div>
//   );
// }

class Wallet extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, null)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
