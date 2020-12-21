import {Navigation} from './components/Navigation/Navigation'
import {FaceRecognition} from './components/FaceRecognition/FaceRecognition'
import {Logo} from './components/Logo/Logo'
import {ImageLinkForm} from './components/ImageLinkForm/ImageLinkForm'
import {Rank} from './components/Rank/Rank'
import './App.css';
import Particles from 'react-particles-js'
import { Component } from 'react';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin'

const app = new Clarifai.App({
  apiKey: '16e410a5289849abb2e56944750e5e49'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  // FACE BOX MATH
  faceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  // BOX and input values
  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  // CLARIFAI API - 
  onButtonSubmit = () => {
    // image example  https://buffer.com/library/content/images/size/w300/2020/05/Frame-9.png 
    this.setState({imageUrl: this.state.input});
    console.log(this.state.input);

    app.models
    .initModel({
      id: Clarifai.FACE_DETECT_MODEL,
    })
    .then((faceDetectModel) => {
      return faceDetectModel.predict(
        "https://samples.clarifai.com/face-det.jpg"
      );
    })
    .then(response => this.displayFaceBox(this.faceLocation(response)))
    .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    this.setState({route: route})
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} />
        { this.state.route === 'signin' 
          ? <Signin onRouteChange={this.onRouteChange} />
          : <div> 
              <Logo />
              <Rank />
              <ImageLinkForm 
              onButtonSubmit={this.onButtonSubmit} 
              onInputChange={this.onInputChange} 
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
        }
      </div>
    );
  }
}


export default App;
