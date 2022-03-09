import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicName, previewMusic } = this.props;
    return (
      <div>
        <h3>{musicName}</h3>
        <audio data-testid="audio-component" src={ previewMusic } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  previewMusic: PropTypes.string.isRequired,
};
