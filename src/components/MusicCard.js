import React from 'react';
import PropTypes from 'prop-types';
import addSong from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      trackId: '',
      isLoading: false,
      favorite: [],
    };
  }

    fetchFavorite = async ({ target }) => {
      const value = target.checked;
      this.setState({
        isLoading: true,
      });
      const response = await addSong(value);
      this.setState({
        isLoading: false,
        favorite: response,
      });
    }

    render() {
      const { trackId, isLoading, favorite } = this.state;
      const { musicName, previewMusic } = this.props;
      return (
        isLoading
          ? <Loading />
          : (
            <div>
              <p>{favorite}</p>
              <h3>{musicName}</h3>
              <label htmlFor={ trackId }>
                Favorita
                <input
                  id={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  checked={ this.fetchFavorite }
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
  musicName: PropTypes.string.isRequired,
  previewMusic: PropTypes.string.isRequired,
};
