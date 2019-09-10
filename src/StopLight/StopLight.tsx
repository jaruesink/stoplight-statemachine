import React, { useReducer, useContext } from 'react';
import classnames from 'classnames';
import { StopLightState } from './StopLightHelpers';

import './stoplight.scss';
import { StopLightContext } from '../App';

const StopLight: React.FC = () => {
  const {
    state: { light }
  } = useContext(StopLightContext);
  return (
    <div className="stoplight columns">
      <div className="column">
        <div className={classnames('stoplight-light', 'stoplight-red', { active: light.color === 'RED' })}></div>
      </div>
      <div className="column">
        <div className={classnames('stoplight-light', 'stoplight-yellow', { active: light.color === 'YELLOW' })}></div>
      </div>
      <div className="column">
        <div className={classnames('stoplight-light', 'stoplight-green', { active: light.color === 'GREEN' })}></div>
      </div>
    </div>
  );
};

export default StopLight;
