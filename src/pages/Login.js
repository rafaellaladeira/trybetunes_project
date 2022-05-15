import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const MIN = 3;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: false,
      redirect: false,
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
        redirect: false,
      });
      await createUser({ name });
      this.setState({
        isLoading: false,
        redirect: true,
      });
    }

    render() {
      const { name, isLoading, redirect } = this.state;
      if (redirect) return <Redirect to="/search" />;
      return (
        isLoading
          ? <Loading />
          : (
            <div
              data-testid="page-login"
              className="login"
            >
              <p
                className="trybetunes"
              >
                trybetunes
              </p>
              <input
                className="inputLogin"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleInput }
                data-testid="login-name-input"
                placeholder="Insira seu nome"
              />
              <button
                className="btnLogin"
                type="button"
                onClick={ this.handleClick }
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
