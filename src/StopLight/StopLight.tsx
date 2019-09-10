import React, { useReducer } from 'react';
import classnames from 'classnames';

import './stoplight.scss';

import { stopLightReducer, stopLightInitialState } from './StopLightHelpers';

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
