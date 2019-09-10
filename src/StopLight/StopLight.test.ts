import { stopLightReducer, stopLightInitialState } from './StopLightHelpers';

it('GREEN turns YELLOW', () => {
  // SETUP
  const initialState = stopLightInitialState;
  initialState.light.color = 'GREEN';

  // ACTION
  const newState = stopLightReducer(initialState, { name: 'SELECT-LIGHT' });

  // TEST
  expect(newState.light.color).toEqual('YELLOW');
});

it('YELLOW turns RED', () => {
  // SETUP
  const initialState = stopLightInitialState;
  initialState.light.color = 'YELLOW';

  // ACTION
  const newState = stopLightReducer(initialState, { name: 'SELECT-LIGHT' });

  // TEST
  expect(newState.light.color).toEqual('RED');
});

it('RED turns GREEN', () => {
  // SETUP
  const initialState = stopLightInitialState;
  initialState.light.color = 'RED';

  // ACTION
  const newState = stopLightReducer(initialState, { name: 'SELECT-LIGHT' });

  // TEST
  expect(newState.light.color).toEqual('GREEN');
});
