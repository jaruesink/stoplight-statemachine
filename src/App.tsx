import React, { useReducer } from 'react';
import './app.scss';

import StopLight from './StopLight/StopLight';
import StopLightActions from './StopLight/StopLightActions';
import { stopLightReducer, stopLightInitialState, StopLightState, StopLightAction } from './StopLight/StopLightHelpers';

export const StopLightContext: React.Context<{
  switchLight?: (value?: any) => void;
  resetState?: (value?: any) => void;
  state: StopLightState;
}> = React.createContext({ state: stopLightInitialState });

const App: React.FC = () => {
  const [state, dispatch] = useReducer(stopLightReducer, stopLightInitialState);
  return (
    <StopLightContext.Provider
      value={{
        state,
        switchLight: () => dispatch({ name: 'SELECT-LIGHT' }),
        resetState: () => dispatch({ name: 'RESET-STATE' })
      }}
    >
      <div className="app columns">
        <header className="column">
          <h1>Stop Light State Machine</h1>
          <StopLight />
          <StopLightActions />
        </header>
      </div>
    </StopLightContext.Provider>
  );
};

export default App;
