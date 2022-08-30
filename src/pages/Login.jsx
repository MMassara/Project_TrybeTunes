import React from "react";


class Login extends React.Component {
  state = {
    nome: '', 
    valideName: true
  }

  validName = () => {
    const {nome, validadeName} = this.state;
    if(nome.length > 3) {
        this.setState({
            validadeName: false,
        })
    }
  }

  render() {
    const {valideName} = this.state;
    return (
    <div data-testid="page-login">
    <form>
        <label>
            <input type='text' data-testid="login-name-input"></input>
        </label>
        <button type="button" data-testid="login-submit-button" disabled={valideName}>Entrar</button>
    </form>
    </div>
    )
  }
}

export default Login;
