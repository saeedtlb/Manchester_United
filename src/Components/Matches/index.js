import React, { Component } from 'react';

import { firebaseMatches } from '../../firebase';
import { firebaseLooper, reversedArray } from '../UI/misc';
import MatchesList from './MatchesList';
import LeagueTable from './Table';

import CircularProgress from '@material-ui/core/CircularProgress';

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      matches: [],
      filterMatches: [],
      playedFilter: 'All',
      resultFilter: 'All',
    };
  }

  componentDidMount() {
    firebaseMatches.once('value').then((snapshot) => {
      let matches = firebaseLooper(snapshot);
      matches = reversedArray(matches);

      this.setState({
        isLoading: false,
        matches,
        filterMatches: matches,
      });
    });
  }

  showPlayed = (type) => {
    const list = this.state.matches.filter((match) => {
      return match.final === type;
    });

    this.setState({
      filterMatches: type === 'All' ? this.state.matches : list,
      playedFilter: type,
      resultFilter: 'All',
    });
  };

  showResult = (result) => {
    const list = this.state.matches.filter((match) => {
      return match.result === result;
    });

    this.setState({
      filterMatches: result === 'All' ? this.state.matches : list,
      playedFilter: 'All',
      resultFilter: result,
    });
  };

  render() {
    const state = this.state;
    return (
      <div className="the_matches_container">
        {this.state.isLoading ? (
          <div className="progress">
            <CircularProgress thickness={7} style={{ color: '#ff7300' }} />
          </div>
        ) : (
          <div className="the_matches_wrapper">
            <div className="left">
              <div className="match_filters">
                <div className="match_filter_box">
                  <div className="tag">Show Match</div>
                  <div className="cont">
                    <div
                      className={`option ${
                        this.state.playedFilter === 'All' ? 'active' : null
                      }`}
                      onClick={() => this.showPlayed('All')}
                    >
                      All
                    </div>
                    <div
                      className={`option ${
                        this.state.playedFilter === 'Yes' ? 'active' : null
                      }`}
                      onClick={() => this.showPlayed('Yes')}
                    >
                      Played
                    </div>
                    <div
                      className={`option ${
                        this.state.playedFilter === 'No' ? 'active' : null
                      }`}
                      onClick={() => this.showPlayed('No')}
                    >
                      Not Played
                    </div>
                  </div>
                </div>

                <div className="match_filter_box">
                  <div className="tag">Result Game</div>
                  <div className="cont">
                    <div
                      className={`option ${
                        this.state.resultFilter === 'All' ? 'active' : null
                      }`}
                      onClick={() => this.showResult('All')}
                    >
                      All
                    </div>
                    <div
                      className={`option ${
                        this.state.resultFilter === 'W' ? 'active' : null
                      }`}
                      onClick={() => this.showResult('W')}
                    >
                      W
                    </div>
                    <div
                      className={`option ${
                        this.state.resultFilter === 'L' ? 'active' : null
                      }`}
                      onClick={() => this.showResult('L')}
                    >
                      L
                    </div>
                    <div
                      className={`option ${
                        this.state.resultFilter === 'D' ? 'active' : null
                      }`}
                      onClick={() => this.showResult('D')}
                    >
                      D
                    </div>
                  </div>
                </div>
              </div>

              <MatchesList matches={state.filterMatches} />
            </div>
            <div className="right">
              <LeagueTable />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Matches;
