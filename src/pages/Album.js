import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      arrayOfMusic: [],
      arrayOfFavorites: [],
    };
  }

  componentDidMount() {
    this.fetchMusic();
    this.handleFavorites();
  }

   fetchMusic = async () => {
     const { match: { params: { id } } } = this.props;
     const response = await getMusics(id);
     console.log(response);
     this.setState({
       artistName: response[0].artistName,
       collectionName: response[0].collectionName,
     });

     const musics = response.filter((music) => music.kind === 'song');
     this.setState({
       arrayOfMusic: musics,
     });
   }

   handleFavorites = async () => {
     const response = await getFavoriteSongs();
     console.log(response);
     this.setState({
       arrayOfFavorites: response,
     });
   }

   render() {
     const { artistName, collectionName, arrayOfMusic, arrayOfFavorites } = this.state;
     return (
       <div>
         <Header />
         <div data-testid="page-album">
           <p data-testid="artist-name">{artistName}</p>
           <p data-testid="album-name">{collectionName}</p>
         </div>
         <div>
           {
             arrayOfMusic.map((music) => (
               <MusicCard
                 key={ music.trackId }
                 trackId={ music.trackId }
                 musicName={ music.trackName }
                 previewMusic={ music.previewUrl }
                 arrayOfFavorites={ arrayOfFavorites }
               />
             ))
           }
         </div>
       </div>
     );
   }
}

export default Album;

Album.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  params: PropTypes.instanceOf(Object).isRequired,
};
