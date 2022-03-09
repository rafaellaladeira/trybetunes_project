import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
// import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  /* constructor() {
    super();

    /* this.state = {
      name: '',
    }; */

  /* componentDidMount() {
    this.getMusics();
  } */

  render() {
    const { artistName } = this.props;
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          <p data-testid="artist-name">{ artistName }</p>
          <p data-testid="album-name" />
        </div>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  // id: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  // album: PropTypes.instanceOf(Object).isRequired,
  // albumName: PropTypes.string.isRequired,
};
