import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchName();
  }

  fetchName = async () => {
    this.setState({
      isLoading: true,
    });
    const response = await getUser();
    this.setState({
      name: response.name,
      isLoading: false,
    });
  }

  render() {
    const { name, isLoading } = this.state;
    return (
      isLoading
        ? <Loading />
        : (
          <header
            data-testid="header-component"
            className="header"
          >
            <p data-testid="header-user-name">{ name }</p>
            <Link to="/search" data-testid="link-to-search"> Search </Link>
            <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
            <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
          </header>
        )
    );
  }
}

export default Header;
