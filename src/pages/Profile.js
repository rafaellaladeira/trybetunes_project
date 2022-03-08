import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-profile">Perfil</div>
      </div>
    );
  }
}

export default Profile;
