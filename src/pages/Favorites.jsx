import React from 'react';
import Header from '../Components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <>
      <Header/>
      <div data-testid="page-favorites" />
      </>
    );
  }
}

export default Favorites;
