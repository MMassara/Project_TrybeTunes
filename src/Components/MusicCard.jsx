import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { previewUrl, musicName, trackId, onChange, favorite } = this.props;

    return (
      <div className="eachSong">
        <div className="musicName">{musicName}</div>
        <audio
          className="previewSong"
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <div className="favoriteInput">
          <label htmlFor="favorite">
            Favorita
            <input
              type="checkbox"
              onChange={ onChange }
              data-trackid={ trackId }
              checked={ favorite }
              data-testid={ `checkbox-music-${trackId}` }
              id="favorite"
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  musicName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default MusicCard;
