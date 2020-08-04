import React from 'react';

import Zoom from 'react-reveal/Zoom';
import Shirt from '../../../Resources/pic/SHIRT.png';

const PromotionAnimation = () => {
  return (
    <div className="promotion_animation">
      <div className="left">
        <Zoom>
          <div>
            <span>it's about</span>
            <span>the hopes and the</span>
            <span>dreams</span>
          </div>
        </Zoom>
      </div>
      <div className="right">
        <Zoom>
          <div style={{ background: `url(${Shirt}) no-repeat` }}></div>
        </Zoom>
      </div>
    </div>
  );
};

export default PromotionAnimation;
