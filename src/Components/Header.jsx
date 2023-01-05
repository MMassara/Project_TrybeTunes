import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingText from './LoadingText';

class Header extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  componentDidMount() {
    this.showUser();
  }

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

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component" className="headerItems">
        <div>
          <Link
            data-testid="link-to-search"
            to="/search"
          >
            <button type="button" className="navButtons">
              Pesquisar
            </button>
          </Link>
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
          >
            <button type="button" className="navButtons">
              Favoritos
            </button>
          </Link>
          <Link
            data-testid="link-to-profile"
            to="/profile"
          >
            <button type="button" className="navButtons">
              Perfil
            </button>
          </Link>
        </div>
        { loading === true
          ? <LoadingText /> : <h3 data-testid="header-user-name">{name}</h3> }
      </header>
    );
  }
}

export default Header;
