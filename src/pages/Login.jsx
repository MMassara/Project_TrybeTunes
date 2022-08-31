import React from 'react';
import { createUser } from '../services/userAPI';
import LoadingText from '../Components/LoadingText';

class Login extends React.Component {
  state = {
    name: '',
    valideName: true,
    saving: false,
  };

  onInputChange = (event) => {
    const { target } = event;
    const { type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    if (value.length >= 3) {
      this.setState({
        name: value,
        valideName: false,
      });
    } else {
      this.setState({
        valideName: true,
      });
    }
  };

  sucessLogin = () => {
    // Redireciona para /search e altera o estado
    const { history } = this.props;
    history.push('/search');
    this.setState({
      saving: false,
    });
  };

  saveUser = async () => {
    // Salva no localStorage
    const { name } = this.state;
    await createUser({ name });
  };

  handleClick = async () => {
    this.setState({
      saving: true,
    });
    await this.saveUser();
    this.sucessLogin();
  };

  render() {
    const { valideName, saving } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label>
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ valideName }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
        {saving && <LoadingText />}
      </div>
    );
  }
}

export default Login;
