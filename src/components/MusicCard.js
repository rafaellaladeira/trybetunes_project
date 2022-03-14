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

  componentDidMount() {
    const { arrayOfFavorites } = this.props;
    this.handleFavorite();
    console.log(arrayOfFavorites);
  }

  handleFavorite = () => {
    const { trackId, arrayOfFavorites } = this.props;
    const { checked } = this.state;
    console.log(arrayOfFavorites);
    console.log(trackId);

    const teste = arrayOfFavorites.some((favorites) => favorites.trackId === trackId);
    console.log(teste);
    if (teste) {
      this.setState({
        checked: true,
      });
    }
    console.log(checked);
  }

  fetchFavorite = async ({ target }) => {
    const { trackId } = this.props;
    const { checked } = target;
    this.setState({
      isLoading: true,
    });
    await addSong({ trackId });
    this.setState({
      isLoading: false,
      checked,
    });
  }

  render() {
    const { isLoading, checked } = this.state;
    const { trackId, musicName, previewMusic, arrayOfFavorites } = this.props;
    console.log(arrayOfFavorites);
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
  arrayOfFavorites: PropTypes.arrayOf.isRequired,
  trackId: PropTypes.number.isRequired,
  musicName: PropTypes.string.isRequired,
  previewMusic: PropTypes.string.isRequired,
};
