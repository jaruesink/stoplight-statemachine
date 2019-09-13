import { Duration } from 'luxon';

export type LightColor = 'RED' | 'YELLOW' | 'GREEN';

export type LightMachine = {
  color: LightColor;
  transitions: {
    [key: string]: {
      timerLength: number;
      switch: () => LightColor;
    };
  };
};

export type StopLightState = {
  light: LightMachine;
  timer: { length?: number; duration?: Duration; interval?: number };
};

export type StopLightActionTypes = 'START-TIMER' | 'END-TIMER' | 'DECREMENT-TIMER' | 'SWITCH-LIGHT' | 'RESET-STATE';

export type StopLightAction = {
  name: StopLightActionTypes;
  payload?: any;
};

export const lightMachine: LightMachine = {
  color: 'RED',
  transitions: {
    RED: {
      timerLength: 2 * 1000,
      switch: () => 'GREEN'
    },
    YELLOW: {
      timerLength: 1 * 1000,
      switch: () => 'RED'
    },
    GREEN: {
      timerLength: 2 * 1000,
      switch: () => 'YELLOW'
    }
  }
};

export type StopLightActions = {
  [key in StopLightActionTypes]: (state: StopLightState, action: StopLightAction) => StopLightState;
};

export const stopLightActions = {
  'START-TIMER': (state: StopLightState, action: StopLightAction) => {
    const timer = { ...state.timer };
    const timerLength = state.light.transitions[state.light.color].timerLength;
    timer.interval = action.payload;
    timer.length = timerLength;
    timer.duration = Duration.fromMillis(timerLength);
    return { ...state, timer };
  },
  'DECREMENT-TIMER': (state: StopLightState, action: StopLightAction) => {
    const timer = { ...state.timer };
    if (!timer.duration) throw new Error('Should only decrement timer when duration is defined');
    timer.duration = timer.duration.minus(action.payload);
    return { ...state, timer };
  },
  'END-TIMER': (state: StopLightState, action: StopLightAction) => ({ ...state, timer: {} }),
  'SWITCH-LIGHT': (state: StopLightState, action: StopLightAction) => {
    const light = { ...state.light, color: lightMachine.transitions[state.light.color].switch() };
    return { ...state, light };
  },
  'RESET-STATE': (state: StopLightState, action: StopLightAction) => {
    return { ...stopLightInitialState };
  }
};

// const stopLightListeners = (initialState: StopLightState, initialAction: StopLightAction) => {
//   const actionListeners: {
//     [key: string]: (
//       state: StopLightState,
//       action: StopLightAction
//     ) => { state: StopLightState; action: StopLightAction };
//   } = {
//     'START-TIMER': (state: StopLightState, action: StopLightAction) => {
//       return { state, action };
//     },
//     'END-TIMER': (state: StopLightState, action: StopLightAction) => {
//       return { state, action };
//     }
//   };

//   return actionListeners[initialAction.name]
//     ? actionListeners[initialAction.name](initialState, initialAction)
//     : { state: initialState, action: initialAction };
// };

export const stopLightReducer: (state: StopLightState, action: StopLightAction) => StopLightState = (state, action) => {
  // const { state, action } = stopLightListeners(initialState, initialAction);
  return stopLightActions[action.name](state, action);
};

export const stopLightInitialState: StopLightState = {
  light: lightMachine,
  timer: {}
};
