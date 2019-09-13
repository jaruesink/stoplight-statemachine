import React, { useReducer } from 'react';
import './app.scss';

import StopLight from './StopLight/StopLight';
import StopLightActions from './StopLight/StopLightActions';
import { stopLightReducer, stopLightInitialState, StopLightState, StopLightAction } from './StopLight/StopLightHelpers';

// Idea taken from: https://medium.com/@dai_shi/a-thought-on-react-context-default-value-fb3283cb5788
const warningObject: {
  state: any;
  dispatch: any;
} = {
  get dispatch() {
    throw new Error('Please use <[ContextName].Provider value={[add initial value here]}>');
  },
  get state() {
    throw new Error('Please use <[ContextName].Provider value={[add initial value here]}>');
  }
};

export const StopLightContext: React.Context<{
  state: StopLightState;
  dispatch: React.Dispatch<StopLightAction>;
}> = React.createContext(warningObject);

const App: React.FC = () => {
  const [state, dispatch] = useReducer(stopLightReducer, stopLightInitialState);
  return (
    <StopLightContext.Provider value={{ state, dispatch }}>
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
