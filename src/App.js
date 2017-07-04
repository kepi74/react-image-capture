import React, { Component } from 'react';

const hasGetUserMedia = () => {
  if (!navigator) {
    return false;
  }
  return !!(
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );
};
class ImageCapture extends Component {
  constructor() {
    super();
    this.state = {
      hasGetUserMedia: false,
    };
  }

  componentDidMount() {
    this.setState({
      hasGetUserMedia: hasGetUserMedia(),
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>{`${this.state.hasGetUserMedia}`}</div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>----------</div>
        <ImageCapture />
        <div>----------</div>
      </div>
    );
  }
}

export default App;
