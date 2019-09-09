import React from 'react';

import StopLight from  './StopLight/StopLight';

import './app.scss';

const App: React.FC = () => {
  return (
    <div className="app columns">
      <header className="column">
        <h1>Stop Light State Machine</h1>
        <StopLight />
      </header>
    </div>
  );
}

export default App;
