import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      arrayOfMusic: [],
    };
  }

  componentDidMount() {
    this.fetchMusic();
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

   render() {
     const { artistName, collectionName, arrayOfMusic } = this.state;
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
                 musicName={ music.trackName }
                 previewMusic={ music.previewUrl }
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
