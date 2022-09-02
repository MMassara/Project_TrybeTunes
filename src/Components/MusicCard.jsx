import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  render() {
    const { previewUrl, musicName, trackId, onChange, favorite } = this.props;

    return (
      <li>
        <section>{musicName}</section>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            onChange={ onChange }
            data-trackid={ trackId }
            checked={ favorite }
          />
        </label>
      </li>
    );
  }
}

export default MusicCard;
