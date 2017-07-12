import React, { Component } from 'react';
import ImageCapture from './lib/ImageCapture';

class App extends Component {
  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
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
        <ImageCapture takePicture={this.takePicture} widht={640} height={360} />
        <div>
          <img src={this.state.src} width={640} height={360} alt="Capture preview" />
        </div>
      </div>
    );
  }
}

export default App;
