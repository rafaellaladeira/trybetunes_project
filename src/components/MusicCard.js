import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      checked: false,
    };
  }

  fetchFavorite = async () => {
    const { trackId } = this.props;
    this.setState({
      isLoading: true,
      checked: true,
    });
    await addSong({ trackId });
    this.setState({
      isLoading: false,
      checked: true,
    });
  }

  render() {
    const { isLoading, checked } = this.state;
    const { trackId, musicName, previewMusic } = this.props;
    return (
      isLoading
        ? <Loading />
        : (
          <div>
            <h3>{musicName}</h3>
            <label htmlFor={ trackId }>
              Favorita
              <input
                id={ trackId }
                name={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                onChange={ this.fetchFavorite }
                checked={ checked } // boo
              />
            </label>
            <audio data-testid="audio-component" src={ previewMusic } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
          </div>
        )
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  musicName: PropTypes.string.isRequired,
  previewMusic: PropTypes.string.isRequired,
};
