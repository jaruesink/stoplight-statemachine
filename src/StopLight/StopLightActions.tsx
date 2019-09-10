import React, { useContext } from 'react';
import { StopLightContext } from '../App';

const StopLightActions: React.FC = () => {
  const { switchLight, resetState } = useContext(StopLightContext);
  return (
    <div className="stoplight-actions">
      <button className="button" onClick={switchLight}>
        Switch Light
      </button>
      <button className="button" onClick={resetState}>
        Reset
      </button>
    </div>
  );
};

export default StopLightActions;
