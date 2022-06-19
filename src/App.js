import './App.css';
import Navigation from './Componants/Navigation/Navigation';
import Logo from './Componants/Logo/Logo';
import ImageLinkForm from './Componants/ImageLinkForm/ImageLinkForm';
import Rank from './Componants/Rank/Rank';
import Particle from './Componants/Particle';
function App() {

  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Particle/>
      <Rank />
      <ImageLinkForm />

      {/* { <Logo/>
      <ImageLinkForm/>
      <FaceRecognition/>} */}
    </div>
  );
}

export default App;
