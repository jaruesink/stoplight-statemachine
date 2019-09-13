import React, { useContext, useEffect } from 'react';
import { StopLightContext } from '../App';

const StopLightActions: React.FC = () => {
  const { state, dispatch } = useContext(StopLightContext);

  const startTimer = () => {
    const time = 1000;
    const payload = window.setInterval(() => dispatch({ name: 'DECREMENT-TIMER', payload: time }), time);
    dispatch({ name: 'START-TIMER', payload });
  };

  const resetState = () => {
    if (state.timer.interval) window.clearInterval(state.timer.interval);
    dispatch({ name: 'RESET-STATE' });
  };

  useEffect(() => {
    if (state.timer.interval && !state.timer.duration) window.clearInterval(state.timer.interval);
    if (state.timer.interval && state.timer.duration && state.timer.duration.milliseconds === 0) {
      window.clearInterval(state.timer.interval);
      dispatch({ name: 'END-TIMER' });
      dispatch({ name: 'SWITCH-LIGHT' });
      startTimer();
    }
  }, [state.timer, dispatch]);

  return (
    <div className="stoplight-actions">
      <button className="button" onClick={startTimer} disabled={!!state.timer.duration}>
        Start Timer
      </button>
      <button className="button" onClick={() => dispatch({ name: 'SWITCH-LIGHT' })}>
        Switch Light
      </button>
      <button className="button" onClick={resetState}>
        Reset
      </button>
    </div>
  );
};

export default StopLightActions;
