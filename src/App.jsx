import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import { AuthContext } from './Context/AuthContextProvider'
import './App.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const App = () => {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App