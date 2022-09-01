import React from "react";

class MusicCard extends React.Component {
  render() {
    const { previewUrl, musicName } = this.props;
    return (
      <li>
        <section>{musicName}</section>
        <audio data-testid="audio-component" src={previewUrl} controls>
          <track kind="captions" />O seu navegador não suporta o elemento{" "}
          <code>audio</code>.
        </audio>
      </li>
    );
  }
}

export default MusicCard;
