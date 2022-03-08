import React from 'react';
// import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const MIN = 3;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: false,
    };
  }

    handleInput = ({ target: { name, value } }) => {
      this.setState({
        [name]: value,
      });
    };

    handleClick = async () => {
      const { name } = this.state;
      this.setState({
        isLoading: true,
      });

      await createUser(name);
      this.setState({
        isLoading: false,
      });
      // { <Redirect to="/search" /> }
    }

    render() {
      const { name, isLoading } = this.state;
      return (
        isLoading
          ? <Loading />
          : (
            <div data-testid="page-login" onSubmit={ this.handleClick }>
              <input
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleInput }
                data-testid="login-name-input"
                placeholder="Insira seu nome"
              />
              <button
                type="submit"
                disabled={ name.length < MIN }
                data-testid="login-submit-button"
              >
                Entrar
              </button>
            </div>
          )
      );
    }
}

export default Login;
