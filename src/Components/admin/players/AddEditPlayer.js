import React, { Component } from 'react';

import AdminLayout from '../../../HOC/AdminLayout';
import FormFields from '../../UI/FormFields';
import { validate } from '../../UI/misc';
import { database, firebase, firebasePlayers } from '../../../firebase';
import Fileuploader from '../../UI/Fileuploader';

import Fade from 'react-reveal/Fade';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

class AddEditPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      playerId: '',
      formType: '',
      formError: false,
      formSuccess: '',
      defaultImg: '',
      formdata: {
        name: {
          element: 'input',
          value: '',
          config: {
            label: 'First Name',
            name: 'firstName_input',
            type: 'text',
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
          showlabel: true,
        },
        lastname: {
          element: 'input',
          value: '',
          config: {
            label: 'Last Name',
            name: 'lastName_input',
            type: 'text',
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
          showlabel: true,
        },
        number: {
          element: 'input',
          value: '',
          config: {
            label: 'Number',
            name: 'number_input',
            type: 'text',
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
          showlabel: true,
        },
        position: {
          element: 'select',
          value: '',
          config: {
            label: 'Select a Position',
            name: 'select_position',
            type: 'select',
            options: [
              { key: 'Keeper', value: 'Keeper' },
              { key: 'Defence', value: 'Defence' },
              { key: 'Midfield', value: 'Midfield' },
              { key: 'Striker', value: 'Striker' },
            ],
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
          showlabel: true,
        },
        image: {
          element: 'image',
          value: '',
          validation: {
            required: true,
          },
          valid: false,
        },
      },
    };
  }

  componentDidMount() {
    const playerId = this.props.match.params.id;

    if (!playerId) {
      this.setState({
        formType: 'Add Player',
      });
    } else {
      // Edit player
      database
        .ref(`/players/${playerId}`)
        .once('value')
        .then((snapshot) => {
          const player = snapshot.val();

          firebase
            .storage()
            .ref('players')
            .child(player.image)
            .getDownloadURL()
            .then((url) => {
              this.updateFields(playerId, player, 'Edit Player', url);
            })
            .catch(() => {
              this.updateFields(
                playerId,
                { ...player, image: '' },
                'Edit Player'
              );
            });
        });
    }
  }

  updateFields = (playerId, player, type, defaultImg = '') => {
    const newFormdata = { ...this.state.formdata };

    for (let key in newFormdata) {
      newFormdata[key].value = player[key];
      newFormdata[key].valid = true;
    }

    this.setState({
      isLoading: false,
      playerId,
      formType: type,
      defaultImg,
      formdata: newFormdata,
    });
  };

  updateForm(element, content = '') {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    if (content) {
      newElement.value = content;
    } else {
      newElement.value = element.event.target.value;
    }

    let validData = validate(newElement);
    [newElement.valid, newElement.validationMessage] = validData;

    newFormdata[element.id] = newElement;

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  }

  submitForm = (e) => {
    e.preventDefault();

    const dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      if (this.state.formType === 'Edit Player') {
        database
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.setState({
              formSuccess: 'Update Correctly',
            });
            setTimeout(() => {
              this.setState({ formSuccess: '' });
              this.props.history.push('/admin_players');
            }, 3000);
          })
          .catch(() => {
            this.setState({
              formError: true,
            });
          });
      } else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_players');
          })
          .catch((e) => {
            console.log('somthing went wrong' + e);
            this.setState({
              formError: true,
            });
          });
      }
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  resetImage = () => {
    this.setState({
      defaultImg: '',
      formdata: {
        ...this.state.formdata,
        image: {
          value: '',
          valid: false,
        },
      },
    });
  };
  storeFilename = (filename) => {
    this.updateForm({ id: 'image' }, filename);
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
            <div className="editplayer_dialog_wrapper">
              <h2>{this.state.formType}</h2>
              <div>
                <form
                  onSubmit={(e) => this.submitForm(e)}
                  style={{ position: 'relative' }}
                >
                  <Fileuploader
                    dir="players"
                    tag="Player Image"
                    defaultImg={this.state.defaultImg}
                    defaultImgName={this.state.formdata.image.value}
                    resetImage={() => this.resetImage()}
                    filename={(filename) => this.storeFilename(filename)}
                  />

                  <FormFields
                    id={'name'}
                    formdata={this.state.formdata.name}
                    change={(e) => this.updateForm(e)}
                  />
                  <FormFields
                    id={'lastname'}
                    formdata={this.state.formdata.lastname}
                    change={(e) => this.updateForm(e)}
                  />

                  <FormFields
                    id={'number'}
                    formdata={this.state.formdata.number}
                    change={(e) => this.updateForm(e)}
                  />

                  <FormFields
                    id={'position'}
                    formdata={this.state.formdata.position}
                    change={(e) => this.updateForm(e)}
                  />

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

export default AddEditPlayer;
