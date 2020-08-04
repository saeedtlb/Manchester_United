import React, { Component } from 'react';

import Animate from 'react-move/Animate';
import { easePolyOut } from 'd3-ease';

import PlayerCard from '../../UI/PlayerCard';
import mata from '../../../Resources/player/Midfielders/Mata.png';

class HomeCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {
          bottom: 90,
          left: 300,
        },
        {
          bottom: 60,
          left: 200,
        },
        {
          bottom: 30,
          left: 100,
        },
        {
          bottom: 0,
          left: 0,
        },
      ],
    };
  }
  showAnimationCards = () =>
    this.state.cards.map((card, id) => (
      <Animate
        key={id}
        show={this.props.show}
        start={{
          left: 0,
          bottom: 0,
        }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: { duration: 500, ease: easePolyOut },
        }}
      >
        {({ left, bottom }) => (
          <div
            style={{
              position: 'absolute',
              left,
              bottom,
            }}
          >
            <PlayerCard number="8" name="juan" lastname="mata" bck={mata} />
          </div>
        )}
      </Animate>
    ));
  render() {
    return <div>{this.showAnimationCards()}</div>;
  }
}

export default HomeCards;
