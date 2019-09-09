import React, { useReducer } from 'react';
import classnames from 'classnames';

import './stoplight.scss';

type LightColor = 'RED' | 'YELLOW' | 'GREEN';

type LightMachine = {
  color: LightColor;
  transitions: {
    [key: string]: {
      switch: () => LightColor;
    };
  };
};

type StopLightState = {
  light: LightMachine;
};

type StopLightActionTypes = 'SELECT-LIGHT';

type StopLightAction = {
  name: StopLightActionTypes;
  payload?: any;
};

const lightMachine: LightMachine = {
  color: 'RED',
  transitions: {
    RED: {
      switch: () => 'GREEN'
    },
    YELLOW: {
      switch: () => 'RED'
    },
    GREEN: {
      switch: () => 'YELLOW'
    }
  }
};

const stopLightActions = {
  'SELECT-LIGHT': (state: StopLightState, action: StopLightAction) => {
    const light = { ...lightMachine, color: lightMachine.transitions[state.light.color].switch() };
    return { ...state, light };
  }
};

const stopLightReducer: (state: StopLightState, action: StopLightAction) => StopLightState = (state, action) => {
  return stopLightActions[action.name](state, action);
};

const stopLightInitialState: StopLightState = {
  light: lightMachine
};

const StopLight: React.FC = () => {
  const [state, dispatch] = useReducer(stopLightReducer, stopLightInitialState);

  const switchLight = () => dispatch({ name: 'SELECT-LIGHT' });

  return (
    <div className="stoplight columns" onClick={() => switchLight()}>
      <div className="column">
        <div className={classnames('stoplight-light', 'stoplight-red', { active: state.light.color === 'RED' })}></div>
      </div>
      <div className="column">
        <div
          className={classnames('stoplight-light', 'stoplight-yellow', { active: state.light.color === 'YELLOW' })}
        ></div>
      </div>
      <div className="column">
        <div
          className={classnames('stoplight-light', 'stoplight-green', { active: state.light.color === 'GREEN' })}
        ></div>
      </div>
    </div>
  );
};

export default StopLight;
