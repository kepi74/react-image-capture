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

const styles = {
  container: {
    position: 'relative',
  },
  button: {
    position: 'absolute',
    bottom: '3em',
    left: '0.5em',
    color: '#ffffff',
    backgroundColor: '#5dade2',
    padding: '0.5em 1.5em',
    fontSize: '1em',
    fontWeight: 'bold',
  },
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
      customStyles: {
        container: containerStyle = styles.container,
        button: buttonStyle = styles.button,
      } = styles,
    } = this.props;
    return (
      <div style={containerStyle}>
        <video ref={(video) => { this.video = video; }} width={width} height={height} />
        <button
          ref={(button) => { this.button = button; }}
          onClick={this.takePicture}
          style={buttonStyle}
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
  customStyles: styles,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WIDTH,
};

ImageCapture.propTypes = {
  buttonTitle: PropTypes.string,
  customStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  height: PropTypes.number,
  takePicture: PropTypes.func.isRequired,
  width: PropTypes.number,
};

export default ImageCapture;
