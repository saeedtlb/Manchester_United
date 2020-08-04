import React, { Component } from 'react';

import AdminLayout from '../../../HOC/AdminLayout';
import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reversedArray } from '../../UI/misc';

import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

class AdminMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      matches: [],
    };
  }

  componentDidMount() {
    firebaseMatches.once('value').then((snapshot) => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        matches: reversedArray(matches),
      });
    });
  }

  render() {
    return (
      <AdminLayout>
        <div className="matches_table">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Match</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Final</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.matches
                  ? this.state.matches.map((match, id) => (
                      <TableRow key={id}>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>
                          <Link to={`/admin_matches/edit_match/${match.id}`}>
                            {match.local} <strong>-</strong> {match.away}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {match.resultLocal} <strong>-</strong>{' '}
                          {match.resultAway}
                        </TableCell>
                        <TableCell>
                          {match.final === 'Yes' ? (
                            <span className="admin_match_final green">
                              final
                            </span>
                          ) : (
                            <span className="admin_match_final red">
                              this match has not played
                            </span>
                          )}
                        </TableCell>
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

export default AdminMatches;
