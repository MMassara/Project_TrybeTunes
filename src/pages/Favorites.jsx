import React from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../Components/MusicCard';
import LoadingText from '../Components/LoadingText';

class Favorites extends React.Component {
  state = {
    loading: false,
    favoriteSongs: [],
    isFavorite: true,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    await this.favoritesList();
    this.setState({
      loading: false,
    });
  }

  favoritesList = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
    });
  };

  favoritesSongs = async ({ target }) => {
    const { favoriteSongs } = this.state;
    const musicId = target.dataset.trackid;
    const selectedSong = Number(musicId);
    const music = favoriteSongs.find(
      (element) => element.trackId === selectedSong,
    );

    this.setState({
      loading: true,
    });

    await removeSong(music);

    const newList = await getFavoriteSongs();

    this.setState({
      favoriteSongs: newList,
      loading: false,
    });
  };

  render() {
    const { loading, favoriteSongs, isFavorite } = this.state;
    const listFavorites = favoriteSongs.map((song, index) => (
      <div key={ index + 1 }>
        {/* <img src={ song.artworkUrl30 } alt={ song.artistName } key={ index } /> */}
        <MusicCard
          musicName={ song.trackName }
          previewUrl={ song.previewUrl }
          key={ song.trackId }
          trackId={ song.trackId }
          onChange={ this.favoritesSongs }
          favorite={ isFavorite }
        />
      </div>
    ));

    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          {loading === true
            ? <LoadingText />
            : <div className="favoriteSongs">{listFavorites}</div> }
        </div>
      </div>
    );
  }
}

export default Favorites;
