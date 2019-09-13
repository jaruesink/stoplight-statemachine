import React, { useContext } from 'react';
import { StopLightContext } from '../App';

const StopLightActions: React.FC = () => {
  const { dispatch } = useContext(StopLightContext);
  return (
    <div className="stoplight-actions">
      <button className="button" onClick={() => dispatch({ name: 'SELECT-LIGHT' })}>
        Switch Light
      </button>
      <button className="button" onClick={() => dispatch({ name: 'RESET-STATE' })}>
        Reset
      </button>
    </div>
  );
};

export default StopLightActions;
