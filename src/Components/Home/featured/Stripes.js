import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

class Stripes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stripes: [
        {
          background: '#C70101',
          left: 120,
          rotate: 25,
          top: -260,
          delay: 0,
        },
        {
          background: '#ffffff',
          left: 360,
          rotate: 25,
          top: -397,
          delay: 200,
        },
        {
          background: '#C70101',
          left: 600,
          rotate: 25,
          top: -498,
          delay: 400,
        },
      ],
    };
  }

  showStripes = () =>
    this.state.stripes.map((stripe, i) => {
      return (
        <Animate
          key={i}
          show={true}
          start={{
            opacity: 0,
            background: '#ffffff',
            left: 0,
            rotate: 0,
            top: 0,
          }}
          enter={{
            opacity: [1],
            background: stripe.background,
            left: [stripe.left],
            rotate: [stripe.rotate],
            top: [stripe.top],
            timing: { delay: stripe.delay, duration: 200, ease: easePolyOut },
          }}
        >
          {({ opacity, left, rotate, top, background }) => {
            return (
              <div
                className="stripe"
                style={{
                  background,
                  opacity,
                  transform: `rotate(${rotate}deg) translate(${left}px,${top}px)`,
                }}
              ></div>
            );
          }}
        </Animate>
      );
    });

  render() {
    return <div className="featured_stripes">{this.showStripes()}</div>;
  }
}

export default Stripes;
