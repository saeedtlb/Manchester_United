import React, { Component } from 'react';

import AdminLayout from '../../../HOC/AdminLayout';
import { firebasePlayers } from '../../../firebase';
import { firebaseLooper } from '../../UI/misc';

import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

class AdminPlayers extends Component {
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
      this.setState({
        isLoading: false,
        players,
      });
    });
  }

  render() {
    return (
      <AdminLayout>
        <div className="player_table">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.players
                  ? this.state.players.map((player, id) => (
                      <TableRow key={id}>
                        <TableCell>
                          <Link to={`/admin_players/add_player/${player.id}`}>
                            {player.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin_players/add_player/${player.id}`}>
                            {player.lastname}
                          </Link>
                        </TableCell>
                        <TableCell>{player.number}</TableCell>
                        <TableCell>{player.position}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="admin_progress">
            {this.state.isLoading ? (
              <CircularProgress thickness={7} style={{ color: '#ff7300' }} />
            ) : (
              ''
            )}
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminPlayers;
