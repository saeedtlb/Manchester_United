import React, { Component } from 'react';

import Fade from 'react-reveal/Fade';
import FormFields from '../../UI/FormFields';
import { validate } from '../../UI/misc';
import { firebasePromotions } from '../../../firebase';
import Alert from '@material-ui/lab/Alert';

class Enroll extends Component {
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

  resetFormSuccess = (type) => {
    const newFormdata = { ...this.state.formdata };

    for (let key in newFormdata) {
      newFormdata[key].value = '';
      newFormdata[key].valid = false;
      newFormdata[key].validationMessage = '';

      this.setState({
        formError: false,
        formdata: newFormdata,
        formSuccess: type
          ? 'Congratulations'
          : "You're email has already exist",
      });

      setTimeout(() => {
        this.setState({
          formSuccess: '',
        });
      }, 3000);
    }
  };

  submitForm = (e) => {
    e.preventDefault();

    const dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      firebasePromotions
        .orderByChild('email')
        .equalTo(dataToSubmit.email)
        .once('value')
        .then((snapshot) => {
          if (snapshot.val() === null) {
            firebasePromotions.push(dataToSubmit);
            this.resetFormSuccess(true);
          } else {
            this.resetFormSuccess(false);
          }
        });
    } else {
      this.setState({
        formError: true,
        show: true,
      });
    }
    setTimeout(() => {
      this.setState({
        show: false,
        formError: false,
      });
    }, 5000);
  };

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={(e) => this.submitForm(e)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormFields
                id="email"
                formdata={this.state.formdata.email}
                change={(e) => this.updateForm(e)}
              />
            </div>
            <Fade bottom collapse when={this.state.show}>
              <Alert severity="error" className="error_label">
                Somthin went wrong. Try Again!
              </Alert>
            </Fade>
            <Fade bottom collapse when={this.state.formSuccess}>
              <Alert severity="success" className="success_label">
                {this.state.formSuccess}
              </Alert>
            </Fade>
            <button onClick={this.submitForm}>Enroll</button>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
