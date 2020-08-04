import React, { Component } from 'react';

import Animate from 'react-move/Animate';
import { easePolyOut } from 'd3-ease';

class Text extends Component {
  animationNumber = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        rotate: 0,
      }}
      enter={{
        opacity: [1],
        rotate: [360],
        timing: { duration: 1000, ease: easePolyOut },
      }}
    >
      {({ opacity, rotate }) => (
        <div
          className="featured_number"
          style={{
            opacity,
            transform: `rotateY(${rotate}deg)`,
          }}
        >
          7
        </div>
      )}
    </Animate>
  );

  animationFirst = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 510,
      }}
      enter={{
        opacity: [1],
        x: [223],
        timing: { duration: 700, ease: easePolyOut },
      }}
    >
      {({ opacity, x }) => (
        <div
          className="featured_first txt"
          style={{
            opacity,
            transform: `translateX(${x}px)`,
          }}
        >
          league
        </div>
      )}
    </Animate>
  );

  animationSecond = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 510,
      }}
      enter={{
        opacity: [1],
        x: [223],
        timing: { delay: 300, duration: 700, ease: easePolyOut },
      }}
    >
      {({ opacity, x }) => (
        <div
          className="featured_second txt"
          style={{
            opacity,
            transform: `translateX(${x}px)`,
          }}
        >
          championsships
        </div>
      )}
    </Animate>
  );

  animationPlayer = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
      }}
      enter={{
        opacity: [1],
        timing: { delay: 800, duration: 1000, ease: easePolyOut },
      }}
    >
      {({ opacity }) => (
        <div
          className="featured_player"
          style={{
            opacity,
          }}
        ></div>
      )}
    </Animate>
  );

  render() {
    return (
      <div className="featured_text">
        {this.animationNumber()}
        {this.animationFirst()}
        {this.animationSecond()}
        {this.animationPlayer()}
      </div>
    );
  }
}

export default Text;
