import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingText from '../Components/LoadingText';

class Search extends React.Component {
  state = {
    artist: '',
    validArtist: true,
    loading: false,
    selectedArtist: [],
    afterSearch: false,
    albums: [1],
  };

  onInputChange = (event) => {
    const { target } = event;
    const { value } = target;
    const rightName = value.length >= 2;

    this.setState({
      artist: value,
      validArtist: !rightName,
    });
  };

  getArtist = async () => {
    const { artist } = this.state;
    const searchArtist = await searchAlbumsAPI(artist);

    if (searchArtist.length === 0) {
      this.setState({
        artist: '',
        validArtist: true,
        selectedArtist: artist,
        albums: searchArtist,
        afterSearch: false,
      });
    } else {
      this.setState({
        artist: '',
        validArtist: true,
        selectedArtist: artist,
        albums: searchArtist,
        afterSearch: true,
      });
    }
  };

  onHandleClick = async () => {
    this.setState({
      loading: true,
    });
    await this.getArtist();
    this.setState({
      loading: false,
    });
  };

  render() {
    const {
      validArtist,
      artist,
      loading,
      selectedArtist,
      afterSearch,
      albums,
    } = this.state;

    const errorArtist = <span>Nenhum álbum foi encontrado</span>;
    const message = (
      <h4>
        Resultado de álbuns de:
        {' '}
        {selectedArtist}
      </h4>
    );

    const showAlbums = albums.map((album) => (
      <div key={ album.collectionId }>
        <Link
          data-testid={ `link-to-album-${album.collectionId}` }
          to={ `/album/${album.collectionId}` }
        >
          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        </Link>
        {album.collectionName}
        {' '}
        {album.artistName}
      </div>
    ));

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <div>
            <label htmlFor="search">
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ this.onInputChange }
                value={ artist }
                id="search"
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ validArtist }
              onClick={ this.onHandleClick }
            >
              Pesquisar
            </button>
          </div>
          {loading && <LoadingText />}
          {afterSearch === true ? message : null}
          {afterSearch === true ? showAlbums : null}
          {albums.length === 0 ? errorArtist : null}
        </form>
      </div>
    );
  }
}

export default Search;
