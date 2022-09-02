import React from "react";
import Header from "../Components/Header";
import getMusics from "../services/musicsAPI";
import MusicCard from "../Components/MusicCard";
import { addSong, removeSong, getFavoriteSongs} from "../services/favoriteSongsAPI";
import LoadingText from "../Components/LoadingText";

class Album extends React.Component {
  state = {
    musics: [],
    albumName:'',
    artistName:'',
    image: '', 
    loading: false,
    favoriteSongs: [] 
  };

  getSelectedSongs = async () => {
    const selectedSongs = await getFavoriteSongs();
    const selectedIds = selectedSongs.map((element) => element.trackId)
    this.setState({
    favoriteSongs:selectedIds
    })
  }

  async componentDidMount() {
    const { history } = this.props;
    const url = history.location.pathname;
    const albumId = url.split("/")[url.split("/").length - 1];
    const musics = await getMusics(albumId);
    await this.getSelectedSongs();
    this.setState({
      musics,
      albumName: musics[0].collectionName, 
      artistName: musics[0].artistName,
      image: musics[0].artworkUrl60,
    });
  }

  favoriteSong = async ({target}) => {
    const { musics, favoriteSongs } = this.state;
    const musicId = target.dataset.trackid;
    const music = musics.find((element) => element.trackId == musicId);
    this.setState({
      loading:true
    })
    if(target.checked) {
      await addSong(music)
      favoriteSongs.push(Number(musicId))
      this.setState({
        loading:false,
        favoriteSongs, 
      })
    } else {
      await removeSong(music)
      this.setState({
        loading:false,
        favoriteSongs: this.state.favoriteSongs.filter((element) => element != Number(musicId))
      })
    }
  }

  render() {
    const { musics, albumName, artistName, image, loading, favoriteSongs } = this.state;
    const listMusics = musics
    .filter((element) => element.kind === 'song')
    .map((music) => <MusicCard 
    musicName={music.trackName} 
    previewUrl={music.previewUrl} 
    key={music.trackId} 
    trackId={music.trackId}
    onChange={this.favoriteSong}
    favorite={favoriteSongs.includes(music.trackId)}/>);

    return (
      <div>
        <Header />
        <div data-testid="page-album">
          {
          loading === true ? <LoadingText/> : 
          <>
          <div>
            <img src={image} />
            <section data-testid="artist-name">{artistName}</section>
            <section data-testid="album-name">
              {albumName}
            </section>
          </div>
          <ul>
           {listMusics}
          </ul>
          </>
          }
        </div>
      </div>
    );
  }
}

export default Album;
