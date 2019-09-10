export type LightColor = 'RED' | 'YELLOW' | 'GREEN';

export type LightMachine = {
  color: LightColor;
  transitions: {
    [key: string]: {
      switch: () => LightColor;
    };
  };
};

export type StopLightState = {
  light: LightMachine;
};

export type StopLightActionTypes = 'SELECT-LIGHT' | 'RESET-STATE';

export type StopLightAction = {
  name: StopLightActionTypes;
  payload?: any;
};

export const lightMachine: LightMachine = {
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

export const stopLightActions = {
  'SELECT-LIGHT': (state: StopLightState, action: StopLightAction) => {
    const light = { ...lightMachine, color: lightMachine.transitions[state.light.color].switch() };
    return { ...state, light };
  },
  'RESET-STATE': (state: StopLightState, action: StopLightAction) => {
    return { ...stopLightInitialState };
  }
};

export const stopLightReducer: (state: StopLightState, action: StopLightAction) => StopLightState = (state, action) => {
  return stopLightActions[action.name](state, action);
};

export const stopLightInitialState: StopLightState = {
  light: lightMachine
};
