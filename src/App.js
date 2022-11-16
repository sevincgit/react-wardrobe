import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import CreateNewItemContainer from './components/CreateNewItemContainer';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  //ad a state for Logged in:
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          {loggedIn ? <Route path='/' element={<Container />} /> : <Route path='/' element={<Navigate to='/signup' replace />} />}

          <Route path='/about' element={<div>This is my about page Need to create a component for this!</div>} />
          <Route path='/new-item' element={<CreateNewItemContainer />} />
          <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<div>Pag not found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
