import React, { Component } from 'react';

const hasGetUserMedia = () => {
  if (!navigator) {
    return false;
  }
  return !!navigator.mediaDevices.getUserMedia;
};

class ImageCapture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasGetUserMedia: false,
    };
  }

  componentDidMount() {
    const isEnabled = hasGetUserMedia();
    this.setState({
      hasGetUserMedia: isEnabled,
    });
    if (isEnabled) {
      navigator.mediaDevices.getUserMedia({ video: true })
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
    event.preventDefault();
    this.canvas.getContext('2d')
      .drawImage(this.video, 0, 0, 300, 300, 0, 0, 300, 300);
    const img = this.canvas.toDataURL('image/png');
    this.props.takePicture(img);
  };

  render() {
    return (
      <div>
        <video ref={(video) => { this.video = video; }} width="300" height="300" />
        <button ref={(button) => { this.button = button; }} onClick={this.takePicture.bind(this)}>Take picture</button>
        <canvas width="300" height="300" ref={(canvas) => { this.canvas = canvas; }} style={{ display: 'none' }}/>
        <p>{`${this.state.hasGetUserMedia}`}</p>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
    };
  }

  takePicture(image) {
    this.setState({ src: image });
  }

  render() {
    return (
      <div className="App">
        <div>----------</div>
        <ImageCapture takePicture={this.takePicture.bind(this)} />
        <div>----------</div>
        <div>
          <img src={this.state.src} width="300" height="300" />
        </div>
      </div>
    );
  }
}

export default App;
