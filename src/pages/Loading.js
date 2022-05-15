import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <div data-testid="page-loading">Carregando...</div>
      </div>
    );
  }
}

export default Loading;
