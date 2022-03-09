import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

const MIN = 2;

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: false,
      artistName: '',
      albuns: [],
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { name } = this.state;
    this.setState({
      isLoading: true,
      artistName: name,
    });

    const response = await searchAlbumsAPI(name);
    this.setState({
      name: '',
      isLoading: false,
      albuns: response,
    });
  }

  render() {
    const { name, isLoading, albuns, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          isLoading
            ? <Loading />
            : (
              <div>
                <input
                  type="text"
                  name="name"
                  value={ name }
                  onChange={ this.handleInput }
                  data-testid="search-artist-input"
                  placeholder="Banda ou artista"
                />
                <button
                  type="button"
                  onClick={ this.handleClick }
                  data-testid="search-artist-button"
                  disabled={ name.length < MIN }
                >
                  Pesquisar
                </button>
              </div>
            )
        }
        {
          albuns.length === 0
            ? (<p>Nenhum álbum foi encontrado</p>)
            : (
              <div>
                <p>
                  Resultado de álbuns de:
                  {' '}
                  { artistName }
                </p>
                <ul>
                  { albuns.map((album) => (
                    <Link
                      to={ `/album/${album.collectionId}` }
                      key={ album.collectionId }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <img
                        src={ album.artworkUrl100 }
                        alt={ album.artistName }
                      />
                      <p>{ album.collectionName }</p>
                      <p>{album.artistName}</p>
                    </Link>
                  ))}
                </ul>
              </div>
            )
        }
      </div>
    );
  }
}

export default Search;
