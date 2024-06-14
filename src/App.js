import logo from './logo.svg';
import './App.css';
import Login from './assets/pages/Login';
import SignUp from './assets/pages/SignUp';
import ImageUploader from './assets/pages/ImageUploader';
import NotificationButton from './assets/pages/Notification';
import FirestoreText from './assets/pages/FirestoreText';
import CameraComponent from './assets/pages/CameraComponent';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <SignUp /> */}
      {/* <ImageUploader /> */}
      {/* <CameraComponent /> */}
      {/* <NotificationButton /> */}
      {/* <FirestoreText /> */}
      <Routes>
        <Route path='/camera' element={<CameraComponent />} />
        <Route path='/' element={<ImageUploader /> } />
      </Routes>
    </div>
  );
}

export default App;
