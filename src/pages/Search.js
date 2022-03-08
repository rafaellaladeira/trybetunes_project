import React from 'react';
import Header from '../components/Header';

const MIN = 2;

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <input
            name="name"
            onChange={ this.handleInput }
            data-testid="search-artist-input"
            placeholder="Banda ou artista"
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ name.length < MIN }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
