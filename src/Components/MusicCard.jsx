import React from 'react';
import PropTypes from 'prop-types';

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
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor="favorita">
          Favorita
          <input
            type="checkbox"
            onChange={ onChange }
            data-trackid={ trackId }
            checked={ favorite }
            id="favorita"
          />
        </label>
      </li>
    );
  }
}

// MusicCard.propTypes = {
//   previewUrl: PropTypes.string.isRequired,
//   musicName: PropTypes.string.isRequired,
//   trackId: PropTypes.number.isRequired,
//   onChange: PropTypes.func.isRequired,
//   favorite: PropTypes.bool.isRequired,
// };

export default MusicCard;
