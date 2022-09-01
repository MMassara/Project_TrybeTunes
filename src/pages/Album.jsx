import React from "react";
import Header from "../Components/Header";
import getMusics from "../services/musicsAPI";
import MusicCard from "../Components/MusicCard";

class Album extends React.Component {
  state = {
    musics: [],
    albumName:'',
    artistName:'',
    image: ''
  };

  async componentDidMount() {
    const { history } = this.props;
    const url = history.location.pathname;
    const albumId = url.split("/")[url.split("/").length - 1];
    const musics = await getMusics(albumId);
    this.setState({
      musics,
      albumName: musics[0].collectionName, 
      artistName: musics[0].artistName,
      image: musics[0].artworkUrl60
    });
  }

  render() {
    const { musics, albumName, artistName, image } = this.state;
    console.log(musics)
    const listMusics = musics.filter((element) => element.kind === 'song').map((music) => {music.trackName});
    console.log(listMusics)
    
    
    return (
      <div>
        <Header />
        <div data-testid="page-album">
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
        </div>
      </div>
    );
  }
}

export default Album;
