import React, { Component } from 'react';

import { firebaseLooper } from '../UI/misc';
import { firebase, firebasePlayers } from '../../firebase';
import PlayerCard from '../UI/PlayerCard';

import Fade from 'react-reveal/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      players: [],
    };
  }

  componentDidMount() {
    firebasePlayers.once('value').then((snapshot) => {
      const players = firebaseLooper(snapshot);
      let promises = [];
      players.map((player, i) => {
        promises.push(
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref('players')
              .child(player.image)
              .getDownloadURL()
              .then((url) => {
                player['url'] = url;
                resolve();
              })
              .catch(() => console.log('somthing went wrong'));
          })
        );
      });
      Promise.all(promises).then(() =>
        this.setState({
          isLoading: false,
          players,
        })
      );
    });
  }

  showplayersByCategory = (category) =>
    this.state.players
      ? this.state.players.map((player, i) => {
          return player.position === category ? (
            <Fade left delay={i * 30} key={i}>
              <div className="item">
                <PlayerCard
                  name={player.name}
                  lastname={player.lastname}
                  number={player.number}
                  bck={player.url}
                />
              </div>
            </Fade>
          ) : null;
        })
      : null;

  render() {
    return (
      <div className="the_team_container">
        {!this.state.isLoading ? (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {this.showplayersByCategory('Keeper')}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Defence</div>
              <div className="team_cards">
                {this.showplayersByCategory('Defence')}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Midfield</div>
              <div className="team_cards">
                {this.showplayersByCategory('Midfield')}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Striker</div>
              <div className="team_cards">
                {this.showplayersByCategory('Striker')}
              </div>
            </div>
          </div>
        ) : (
          <div className="progress">
            <CircularProgress thickness={7} style={{ color: '#ff7300' }} />
          </div>
        )}
      </div>
    );
  }
}

export default Team;
