import React, { Component } from 'react';

import AdminLayout from '../../../HOC/AdminLayout';
import FormFields from '../../UI/FormFields';
import { firebaseLooper, validate } from '../../UI/misc';
import { database, firebaseTeams, firebaseMatches } from '../../../firebase';

import Fade from 'react-reveal/Fade';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

class AddEditMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      matchId: '',
      formType: '',
      formError: false,
      formSuccess: '',
      teams: [],
      formdata: {
        date: {
          element: 'input',
          value: '',
          config: {
            label: 'Event date',
            name: 'date_input',
            type: 'date',
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
          showlabel: true,
        },
        local: {
          element: 'select',
          value: '',
          config: {
            label: 'Select a local team',
            name: 'select_local',
            type: 'select',
            options: [],
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
          showlabel: false,
        },
        away: {
          element: 'select',
          value: '',
          config: {
            label: 'Select a away team',
            name: 'select_away',
            type: 'select',
            options: [],
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
          showlabel: false,
        },
        resultLocal: {
          element: 'input',
          value: '',
          config: {
            label: 'Result local',
            name: 'result_local_input',
            type: 'text',
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
          showlabel: false,
        },
        resultAway: {
          element: 'input',
          value: '',
          config: {
            label: 'Result Away',
            name: 'result_away_input',
            type: 'text',
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
          showlabel: false,
        },
        referee: {
          element: 'input',
          value: '',
          config: {
            label: 'Referee',
            name: 'referee_input',
            type: 'text',
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
          showlabel: true,
        },
        stadium: {
          element: 'input',
          value: '',
          config: {
            label: 'Stadium',
            name: 'stadium_input',
            type: 'text',
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
          showlabel: true,
        },
        result: {
          element: 'select',
          value: '',
          config: {
            label: 'Team Result',
            name: 'select_result',
            type: 'select',
            options: [
              { key: 'W', value: 'W' },
              { key: 'L', value: 'L' },
              { key: 'D', value: 'D' },
              { key: 'n/a', value: 'n/a' },
            ],
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
          showlabel: true,
        },
        final: {
          element: 'select',
          value: '',
          config: {
            label: 'Game Played ?',
            name: 'select_played',
            type: 'select',
            options: [
              { key: 'Yes', value: 'Yes' },
              { key: 'No', value: 'No' },
            ],
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
          showlabel: true,
        },
      },
    };
  }

  updateFields = (match, teamOption, teams, type, matchId) => {
    const newFormdata = { ...this.state.formdata };

    for (let key in newFormdata) {
      if (match) {
        newFormdata[key].value = match[key];
        newFormdata[key].valid = true;
      }
      if (key === 'local' || key === 'away') {
        newFormdata[key].config.options = teamOption;
      }
    }

    this.setState({
      matchId,
      formType: type,
      teams,
      formdata: newFormdata,
    });
  };

  componentDidMount() {
    const matchId = this.props.match.params.id;

    const getTeams = (match, type) => {
      firebaseTeams.once('value').then((snapshot) => {
        const teams = firebaseLooper(snapshot);
        const teamOption = [];

        teams.forEach((child) => {
          teamOption.push({
            key: child.thmb,
            value: child.shortName,
          });
        });

        this.updateFields(match, teamOption, teams, type, matchId);
      });
    };

    if (!matchId) {
      //add
      this.setState({ isLoading: false });
      getTeams(null, 'Add Match');
    } else {
      database
        .ref(`matches/${matchId}`)
        .once('value')
        .then((snapshot) => {
          const match = snapshot.val();
          this.setState({ isLoading: false });
          getTeams(match, 'Edit Match');
        });
    }
  }

  updateForm(element) {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    newElement.value = element.event.target.value;

    let validData = validate(newElement);
    [newElement.valid, newElement.validationMessage] = validData;

    newFormdata[element.id] = newElement;

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  }

  successForm = (msg) => {
    this.setState({
      formSuccess: msg,
    });
    setTimeout(() => {
      this.setState({
        formSuccess: '',
      });
      this.props.history.push('/admin_matches');
    }, 3000);
  };

  submitForm = (e) => {
    e.preventDefault();

    const dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    this.state.teams.forEach((team) => {
      if (dataToSubmit.local === team.shortName) {
        dataToSubmit['localThmb'] = team.thmb;
      }
      if (dataToSubmit.away === team.shortName) {
        dataToSubmit['awayThmb'] = team.thmb;
      }
    });

    if (formIsValid) {
      if (this.state.formType === 'Edit Match') {
        database
          .ref(`matches/${this.state.matchId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Update Correctly');
          })
          .catch(() => {
            this.setState({ formError: true });
          });
      } else {
        //Add
        firebaseMatches
          .push(dataToSubmit)
          .then(() => {
            this.successForm('Match Has Added Correctly');
          })
          .catch(() => {
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    return (
      <AdminLayout>
        {
          //Loading till get information if it's editing
          this.state.isLoading ? (
            <div className="admin_progress">
              {this.state.isLoading ? (
                <CircularProgress thickness={7} style={{ color: '#ff7300' }} />
              ) : (
                ''
              )}
            </div>
          ) : (
            //main page when we catch information
            <div className="editmatch_dialog_wrapper">
              <h2>{this.state.formType}</h2>
              <div>
                <form onSubmit={(e) => this.submitForm(e)}>
                  <FormFields
                    id={'date'}
                    formdata={this.state.formdata.date}
                    change={(e) => this.updateForm(e)}
                  />
                  <div className="select_team_layout">
                    <div className="label_input">Local</div>
                    <div className="wrapper">
                      <div className="left">
                        <FormFields
                          id={'local'}
                          formdata={this.state.formdata.local}
                          change={(e) => this.updateForm(e)}
                        />
                      </div>
                      <>
                        <FormFields
                          id={'resultLocal'}
                          formdata={this.state.formdata.resultLocal}
                          change={(e) => this.updateForm(e)}
                        />
                      </>
                    </div>
                  </div>

                  <div className="select_team_layout">
                    <div className="label_input">Away</div>
                    <div className="wrapper">
                      <div className="left">
                        <FormFields
                          id={'away'}
                          formdata={this.state.formdata.away}
                          change={(e) => this.updateForm(e)}
                        />
                      </div>
                      <>
                        <FormFields
                          id={'resultAway'}
                          formdata={this.state.formdata.resultAway}
                          change={(e) => this.updateForm(e)}
                        />
                      </>
                    </div>
                  </div>

                  <div className="split_fields">
                    <FormFields
                      id={'referee'}
                      formdata={this.state.formdata.referee}
                      change={(e) => this.updateForm(e)}
                    />
                    <FormFields
                      id={'stadium'}
                      formdata={this.state.formdata.stadium}
                      change={(e) => this.updateForm(e)}
                    />
                  </div>

                  <div className="split_fields last">
                    <FormFields
                      id={'result'}
                      formdata={this.state.formdata.result}
                      change={(e) => this.updateForm(e)}
                    />
                    <FormFields
                      id={'final'}
                      formdata={this.state.formdata.final}
                      change={(e) => this.updateForm(e)}
                    />
                  </div>

                  <Fade bottom collapse when={this.state.formSuccess}>
                    <Alert severity="success">{this.state.formSuccess}</Alert>
                  </Fade>
                  {this.state.formError ? (
                    <div className="error_label">Somthing went wrong</div>
                  ) : (
                    ''
                  )}

                  <div className="admin_submit">
                    <button onClick={(e) => this.submitForm(e)}>
                      {this.state.formType}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }
      </AdminLayout>
    );
  }
}

export default AddEditMatch;
