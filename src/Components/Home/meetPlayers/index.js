import React, { Component } from 'react';

import Reveal from 'react-reveal/Reveal';

import { Tag } from '../../UI/misc';
import HomeCards from './cards';

class MeetPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      text: [
        {
          word: 'Meet',
        },
        {
          word: 'The',
        },
        {
          word: 'Players',
        },
      ],
      txtStyle: {
        background: '#c70101',
        fontSize: '100px',
        padding: '0px 10px',
        color: '#fff',
        display: 'inline-block',
        marginBottom: '20px',
      },
      btnStyle: {
        background: '#fff',
        textTransform: 'capitalize',
        fontSize: '27px',
        fontWeight: 'bold',
        letterSpacing: '3px',
        color: '#000',
        padding: '15px 10px',
        display: 'inline-block',
      },
    };
  }
  render() {
    return (
      <Reveal fraction={0.7} onReveal={() => this.setState({ show: true })}>
        <div className="home_meetplayers">
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <HomeCards show={this.state.show} />
              </div>
              <div className="home_text_wrapper">
                {this.state.text.map((card, id) => (
                  <div key={id}>
                    <Tag style={this.state.txtStyle}>{card.word}</Tag>
                  </div>
                ))}
                <div>
                  <Tag
                    style={this.state.btnStyle}
                    link={true}
                    linkTo="/the_team"
                  >
                    meet them here
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}

export default MeetPlayers;
