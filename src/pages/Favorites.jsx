import React from "react";
import Header from "../Components/Header";
import { getFavoriteSongs, addSong, removeSong } from "../services/favoriteSongsAPI";
import MusicCard from "../Components/MusicCard";
import LoadingText from "../Components/LoadingText";

class Favorites extends React.Component {
  state = {
    loading: false,
    favoriteSongs: [],
    isFavorite:true,
  };

  favoritesList = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs
    })
  };

  async componentDidMount() {
    this.setState({
      loading:true
    })
    await this.favoritesList()
    this.setState({
      loading:false
    })
  }

  favoritesSongs = async ({ target }) => {
    const {  favoriteSongs } = this.state;
    const musicId = target.dataset.trackid;
    const music = favoriteSongs.find((element) => element.trackId == musicId);
    const removeSongs = favoriteSongs.filter((element) => element != Number(musicId));
    
    this.setState({
      loading: true,
    });
    
    await removeSong(music)

    this.setState({
      favoriteSongs: removeSongs, 
      loading:false,
    })

  };

  render() {
    const {loading, favoriteSongs, isFavorite} = this.state;
    const listFavorites = favoriteSongs
    .map((song, index) => <section key={index + 1}><img src={song.artworkUrl30} alt={song.artistName} key={index} />
    <MusicCard 
    songName={song.trackName} 
    previewUrl={song.previewUrl} 
    key={song.trackId} 
    trackId={song.trackId} 
    onChange={this.favoritesSongs}
    favorite={isFavorite}
    /></section>)

    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          {loading === true ? <LoadingText/> :
                <ul>
                  {listFavorites}
                </ul>
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
