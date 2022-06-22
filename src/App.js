import './App.css';
import Navigation from './Componants/Navigation/Navigation';
import Logo from './Componants/Logo/Logo';
import ImageLinkForm from './Componants/ImageLinkForm/ImageLinkForm';
import Rank from './Componants/Rank/Rank';
import { Component } from 'react';
import Signin from './Componants/Signin/Signin';
import Clarifai from 'clarifai';
import Particle from './Componants/Particle';
import Register from './Componants/Register/Register';
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
      route: 'signin',
      IsSignedIn: false
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
  onRouteChange = (route) => {
    if (this.state.route === 'home') {
      this.setState({ IsSignedIn: false })
    }
    else if (this.state.route === 'signin') {
      this.setState({ IsSignedIn: true })
    }
    this.setState({ route: route })
  }
  render() {

    // const {IsSignedIn,imageUrl,route,box} = this.state;

    return (
      <div className="App">
        <Particle />
        <Navigation IsSignedIn={this.state.IsSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onClickChange={this.onClickChange} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
          : (this.state.route === 'signin')
            ? < Signin onRouteChange={this.onRouteChange} />
            : < Register onRouteChange={this.onRouteChange} />


        }

      </div>
    );
  }
}

export default App;
