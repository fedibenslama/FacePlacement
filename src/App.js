import './App.css';
import Navigation from './Componants/Navigation/Navigation';
import Logo from './Componants/Logo/Logo';
import ImageLinkForm from './Componants/ImageLinkForm/ImageLinkForm';
import Rank from './Componants/Rank/Rank';
import { Component } from 'react';
import Clarifai from 'clarifai';
import Particle from './Componants/Particle';
import FaceRecognition from './Componants/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: 'd4be8e0aa00c4940b820c42d24dd40f7'
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }
  CalculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })

  }
  onClickChange = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.CalculateFaceLocation(response)))
      .catch(err => console.log(err));

  }
  render() {


    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Particle />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onClickChange={this.onClickChange} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />


      </div>
    );
  }
}

export default App;
