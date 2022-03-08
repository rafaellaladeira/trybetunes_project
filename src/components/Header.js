import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  }

  fetchName = async () => {
    this.setState({
      isLoading: true,
    });

    await getUser();
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { isLoading } = this.state;
    return (
      isLoading
        ? <Loading />
        : (
          <header data-testid="header-component">
            <div data-testid="header-user-name">{ this.fetchName }</div>
            <Link to="/search" data-testid="link-to-search"> Search </Link>
            <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
            <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
          </header>
        )
    );
  }
}

export default Header;
