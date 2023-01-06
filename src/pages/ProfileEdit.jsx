import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import LoadingText from '../Components/LoadingText';
import { updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
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
      loading: false,
    });
  };

  render() {
    const { name, loading, email, description } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          {loading === false ? (
            <LoadingText />
          ) : (
            <>
              <div>
                <div>
                  <label htmlFor="">
                    Nome:
                  </label>
                  <input type="text" value={ name } />
                </div>
                <div>
                  <label htmlFor="">
                    Email:
                  </label>
                  <input type="text" value={ email } />
                </div>
                <div>
                  <label htmlFor="">
                    Descrição:
                  </label>
                  <input type="text" value={ description } />
                </div>
              </div>
              <Link
                data-testid="link-to-search"
                to="/profile"
              >
                <button type="button">Salvar edição</button>
              </Link>
            </>
          )}
        </div>
      </>
    );
  }
}

export default ProfileEdit;
