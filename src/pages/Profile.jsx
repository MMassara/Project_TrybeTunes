import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import LoadingText from '../Components/LoadingText';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    name: '',
    loading: false,
    email: '',
    description: '',
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
      email: user.email,
      description: user.description,
      loading: false,
    });
  };

  render() {
    const { name, loading, email, description } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {loading === true ? (
            <LoadingText />
          ) : (
            <div>
              <Link
                data-testid="link-to-search"
                to="/profile/edit"
              >
                <button type="button">
                  Editar perfil
                </button>
              </Link>
              <div>
                {`Nome: ${name}`}
              </div>
              <div>
                {`Email: ${email}`}
              </div>
              <div>
                {`Descrição: ${description}`}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Profile;
