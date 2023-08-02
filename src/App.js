import './App.css';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  
} from "react-router-dom";
import Login from './component/login';
import Register from './component/register';
import Home from './component/home';
import Doctor from './component/doctor';
import SingleDoctor from './component/singleDoc';
import Patient from './component/patient';

export default function App() {
  return (
    <Router >
        
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/doctors/doctor/:doctorId" element={<SingleDoctor />} />
          <Route path="/appointment/patient/:patientId" element={<Patient />} />
          
        </Routes>
    </Router>          
  
  );
};

