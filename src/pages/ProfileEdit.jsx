import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import LoadingText from '../Components/LoadingText';
import { updateUser, getUser } from '../services/userAPI';

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

  editProfileName = (event) => {
    const { target } = event;
    const { value } = target;
    this.setState({
      name: value,
    });
  };

  editProfileEmail = (event) => {
    const { target } = event;
    const { value } = target;
    this.setState({
      email: value,
    });
  };

  editProfileDescription = (event) => {
    const { target } = event;
    const { value } = target;
    this.setState({
      description: value,
    });
  };

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

  saveEdit = async () => {
    const { name, email, description } = this.state;
    await updateUser({ name, email, description });
  };

  render() {
    const { name, loading, email, description } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit" className="showProfile ">
          {loading === true ? (
            <LoadingText />
          ) : (
            <div>
              <div className="profileInfos">
                <div className="eachInfo">
                  <label htmlFor="editName">
                    Nome:
                    <input
                      type="text"
                      value={ name }
                      id="editName"
                      onChange={ this.editProfileName }
                    />
                  </label>
                </div>
                <div className="eachInfo">
                  <label htmlFor="editEmail">
                    Email:
                    <input
                      type="text"
                      value={ email }
                      id="editEmail"
                      onChange={ this.editProfileEmail }
                    />
                  </label>
                </div>
                <div className="eachInfo">
                  <label htmlFor="editDescription">
                    Descrição:
                    <textarea
                      type="text"
                      value={ description }
                      id="editDescription"
                      onChange={ this.editProfileDescription }
                      cols="40"
                      rows="5"
                    />
                  </label>
                </div>
              </div>
              <Link
                data-testid="link-to-search"
                to="/profile"
              >
                <button
                  type="button"
                  onClick={ this.saveEdit }
                  className="editProfileButton"
                >
                  Salvar edição
                </button>
              </Link>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default ProfileEdit;
