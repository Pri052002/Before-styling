import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage'; // HomePage component
import Login from './components/Login';
import Register from './components/Register'; // Assuming you have a Register component
import StudentDashboard from './components/StudentDashboard';
import ProfessorDashboard from './components/ProfessorDashboard';
import RegistrarDashboard from './components/RegistrarDashboard';
import Payment from './components/Payment';
import ModuleDisplay from './components/ModuleDisplay';

import CreateModule from '../src/components/CreateModule';
import './App.css'; // Ensure the correct path to your App.css file

const App = () => {
    return (
      
        <Router>
            <Routes>
                {/* Home page */}
                <Route path="/" element={<HomePage />} />
                
                {/* Login and Register routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Dashboard routes */}
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
                <Route path="/registrar-dashboard" element={<RegistrarDashboard />} />

                {/* Add any other routes as needed */}


                <Route path="/create-module" element={<CreateModule />} /> 
               
 {/* Payment and Module Display routes */}
 
                <Route path="/payment" element={<Payment />} />
                <Route path="/modules/:courseId" element={<ModuleDisplay />} />


             

            </Routes>
        </Router>
    );
};

export default App;
