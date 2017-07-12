import PropTypes from 'prop-types';
import React, { Component } from 'react';

const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 360;

const hasGetUserMedia = () => {
  if (!navigator) {
    return false;
  }
  return !!navigator.mediaDevices.getUserMedia;
};

class ImageCapture extends Component {
  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
    this.state = {
      hasGetUserMedia: false,
    };
  }

  componentDidMount() {
    const {
      height,
      width,
    } = this.props;

    const isEnabled = hasGetUserMedia();

    this.setState({ // eslint-disable-line react/no-did-mount-set-state
      hasGetUserMedia: isEnabled,
    });

    if (isEnabled) {
      navigator.mediaDevices.getUserMedia({ video: { width, height } })
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.play();
        })
        .catch((err) => {
          console.error('An error occured! ', err); // eslint-disable-line no-console
        });
    }
  }

  takePicture(event) {
    const {
      height,
      width,
    } = this.props;

    event.preventDefault();
    this.canvas.getContext('2d')
      .drawImage(this.video, 0, 0, width, height);
    const img = this.canvas.toDataURL('image/png');
    this.props.takePicture(img);
  }

  render() {
    const {
      buttonTitle,
      height,
      width,
    } = this.props;
    return (
      <div>
        <video ref={(video) => { this.video = video; }} width={width} height={height} />
        <button
          ref={(button) => { this.button = button; }}
          onClick={this.takePicture}
        >
          {buttonTitle}
        </button>
        <canvas width={width} height={height} ref={(canvas) => { this.canvas = canvas; }} style={{ display: 'none' }} />
        <p>{`${this.state.hasGetUserMedia}`}</p>
      </div>
    );
  }
}

ImageCapture.defaultProps = {
  buttonTitle: 'Take picture',
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WIDTH,
};

ImageCapture.propTypes = {
  buttonTitle: PropTypes.string,
  height: PropTypes.number,
  takePicture: PropTypes.func.isRequired,
  width: PropTypes.number,
};

export default ImageCapture;
