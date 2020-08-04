import React, { Component } from 'react';

import { firebase } from '../../firebase';

import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileuploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isUploading: false,
      fileUrl: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return (state = {
        name: props.defaultImgName,
        fileUrl: props.defaultImg,
      });
    }

    return null;
  }

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
    });
  };
  handleUploadError = () => {
    this.setState({
      isUploading: false,
    });
    console.log('error occured');
  };
  handleUploadSuccess = (filename) => {
    this.setState({
      name: filename,
      isUploading: false,
    });

    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({
          fileUrl: url,
        });
      });

    this.props.filename(filename);
  };

  uploadAgain = () => {
    this.setState({
      name: '',
      fileUrl: '',
    });
    this.props.resetImage();
  };

  render() {
    return (
      <div className="player_place">
        {!this.state.fileUrl ? (
          <div>
            <div className="label_inputs">{this.props.tag}</div>
            <FileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        ) : (
          <div className="image_upload_container">
            <img
              style={{ width: '100%' }}
              src={this.state.fileUrl}
              alt={this.state.name}
            />
            <div className="remove" onClick={() => this.uploadAgain()}>
              Remove
            </div>
          </div>
        )}
        {this.state.isUploading ? (
          <div className="progress">
            <CircularProgress thickness={7} style={{ color: '#ff7300' }} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Fileuploader;
