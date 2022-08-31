import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingText from './LoadingText';

class Header extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  showUser = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      name: user.name,
      loading: false,
    });
  };

  componentDidMount() {
    this.showUser();
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        <h3 data-testid="header-user-name">{name}</h3>
        {loading && <LoadingText />}
      </header>
    );
  }
}

export default Header;
