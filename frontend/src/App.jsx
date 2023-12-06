import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Talks from './pages/Talks';
import Projects from './pages/Projects';
import Papers from './pages/Papers';
import Login from './pages/Login_new';
import Signup from './pages/Singup';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard isAuthenticated={isAuthenticated} />} />
        <Route exact path='/talks' element={<Talks />} />
        <Route exact path='/projects' element={<Projects />} />
        <Route exact path='/papers' element={<Papers />} />
        <Route exact path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route exact path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
