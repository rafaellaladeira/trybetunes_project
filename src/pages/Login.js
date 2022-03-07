import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <input data-testid="login-name-input" placeholder="Insira seu nome"></input>
    </div>
    );
  }
}

export default Login;
