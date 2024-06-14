import logo from './logo.svg';
import './App.css';
import Login from './assets/pages/Login';
import SignUp from './assets/pages/SignUp';
import ImageUploader from './assets/pages/ImageUploader';
import NotificationButton from './assets/pages/Notification';
import FirestoreText from './assets/pages/FirestoreText';
import CameraComponent from './assets/pages/CameraComponent';
import { Route, Routes } from 'react-router-dom';
import Operation from './assets/pages/Operation';
import ForgetPassword from './assets/pages/ForgotPassword';
import ResetPassword from './assets/pages/ResetPassword';

function App() {
  // alert(document.cookie);
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
        <Route path='/images' element={<ImageUploader /> } />
        <Route path='/login' element={<Login /> } />
        <Route path='/signup' element={<SignUp /> } />
        <Route path='/texts' element={<FirestoreText /> } />
        <Route path='/notification' element={<NotificationButton /> } />
        <Route path='/' element={<NotificationButton /> } />
        <Route path='/operation' element={<Operation /> } />
        <Route path='/forgot-password' element={<ForgetPassword /> } />
        <Route path='/reset-password/:userId' element={<ResetPassword /> } />
      </Routes>
    </div>
  );
}

export default App;
