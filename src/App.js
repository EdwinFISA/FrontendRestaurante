import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
import Logout from './Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  return (
    <Router>
      <div className="d-flex vh-100"> {/* Usamos vh-100 para asegurar que ocupe toda la pantalla */}
        <Sidebar />
        <div className="flex-grow-1 p-3 bg-light overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
