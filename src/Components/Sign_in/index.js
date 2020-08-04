import React, { Component } from 'react';

import { firebase } from '../../firebase';
import Fade from 'react-reveal/Fade';
import Alert from '@material-ui/lab/Alert';
import FormFields from '../UI/FormFields';
import { Link } from 'react-router-dom';
import { validate } from '../UI/misc';

class Sign_in extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      formError: false,
      formSuccess: '',
      formdata: {
        email: {
          element: 'input',
          value: '',
          config: {
            name: 'email_input',
            type: 'email',
            placeholder: 'Enter your email',
          },
          validation: {
            required: true,
            email: true,
          },
          valid: false,
          validationMessage: '',
        },
        password: {
          element: 'input',
          value: '',
          config: {
            name: 'password_input',
            type: 'password',
            placeholder: 'Enter your password',
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
        },
      },
    };
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

  submitForm = (e) => {
    e.preventDefault();

    const dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.props.history.push('/dashboard');
        })
        .catch((err) => {
          this.setState({
            formError: true,
            show: true,
          });
          setTimeout(() => {
            this.setState({
              show: false,
              formError: false,
            });
          }, 3000);
        });
    } else {
      this.setState({
        formError: true,
        show: true,
      });
      setTimeout(() => {
        this.setState({
          show: false,
          formError: false,
        });
      }, 3000);
    }
  };

  render() {
    return (
      <div className="signIn_page">
        <div className="signIn_layout">
          <div className="lights"></div>
          <div className="field">
            <Link to="/">
              <div className="logo"></div>
            </Link>
            <div className="signIn_wrapper">
              <form onSubmit={(e) => this.submitForm(e)}>
                <h2>log in</h2>

                <FormFields
                  id="email"
                  formdata={this.state.formdata.email}
                  change={(e) => this.updateForm(e)}
                />

                <FormFields
                  id="password"
                  formdata={this.state.formdata.password}
                  change={(e) => this.updateForm(e)}
                />

                <Fade bottom collapse when={this.state.show}>
                  <Alert severity="error" className="error_label">
                    Somthin went wrong. Try Again!
                  </Alert>
                </Fade>
                <button onClick={this.submitForm}>log in</button>
              </form>
            </div>
          </div>
          <div className="lights"></div>
        </div>
      </div>
    );
  }
}

export default Sign_in;
