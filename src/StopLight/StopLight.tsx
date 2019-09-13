import React, { useContext } from 'react';
import classnames from 'classnames';

import './stoplight.scss';
import { StopLightContext } from '../App';

const StopLight: React.FC = () => {
  const {
    state: {
      light: { color }
    }
  } = useContext(StopLightContext);
  return (
    <div className="stoplight columns">
      <div className="column">
        <div className={classnames('stoplight-light', 'stoplight-red', { active: color === 'RED' })}></div>
      </div>
      <div className="column">
        <div className={classnames('stoplight-light', 'stoplight-yellow', { active: color === 'YELLOW' })}></div>
      </div>
      <div className="column">
        <div className={classnames('stoplight-light', 'stoplight-green', { active: color === 'GREEN' })}></div>
      </div>
    </div>
  );
};

export default StopLight;
