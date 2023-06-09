import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import {
  addSong,
  removeSong,
  getFavoriteSongs,
} from '../services/favoriteSongsAPI';
import LoadingText from '../Components/LoadingText';

class Album extends React.Component {
  state = {
    musics: [],
    albumName: '',
    artistName: '',
    image: '',
    loading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const url = history.location.pathname;
    const albumId = url.split('/')[url.split('/').length - 1];
    const musics = await getMusics(albumId);
    await this.getSelectedSongs();
    this.setState({
      musics,
      albumName: musics[0].collectionName,
      artistName: musics[0].artistName,
      image: musics[0].artworkUrl60,
    });
  }

  getSelectedSongs = async () => {
    const selectedSongs = await getFavoriteSongs();
    const selectedIds = selectedSongs.map((element) => element.trackId);
    this.setState({
      favoriteSongs: selectedIds,
    });
  };

  favoriteSong = async ({ target }) => {
    const { musics, favoriteSongs } = this.state;
    const musicId = target.dataset.trackid; // string
    const selectedSong = Number(musicId);
    const music = musics.find((element) => element.trackId === selectedSong);
    const removeSongs = favoriteSongs.filter(
      (element) => element !== selectedSong,
    );
    this.setState({
      loading: true,
    });
    if (target.checked) {
      await addSong(music);
      favoriteSongs.push(Number(musicId));
      this.setState({
        loading: false,
        favoriteSongs,
      });
    } else {
      await removeSong(music);
      this.setState({
        loading: false,
        favoriteSongs: removeSongs,
      });
    }
  };

  render() {
    const { musics, albumName, artistName, image, loading, favoriteSongs } = this.state;
    const listMusics = musics
      .filter((element) => element.kind === 'song')
      .map((music) => (
        <MusicCard
          musicName={ music.trackName }
          previewUrl={ music.previewUrl }
          key={ music.trackId }
          trackId={ music.trackId }
          onChange={ this.favoriteSong }
          favorite={ favoriteSongs.includes(music.trackId) }
        />
      ));

    return (
      <div>
        <Header />
        <div data-testid="page-album">
          {loading === true ? (
            <LoadingText />
          ) : (
            <>
              <div className="selectedAlbum">
                <img src={ image } alt={ artistName } className="albumImage" />
                <div
                  data-testid="artist-name"
                  className="selectedArtist"
                >
                  {artistName}
                </div>
                <div
                  data-testid="album-name"
                  className="selectedArtist"
                >
                  Álbum -
                  {albumName}
                </div>
              </div>
              <div className="allSongs">{listMusics}</div>
            </>
          )}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
