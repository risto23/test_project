import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Contacts from './components/Contacs';

function App() {
  return (
    <Router>
    <div className='flex flex-1 '>
        <div className="flex flex-col items-center mx-auto p-4">
          <h1 className="text-4xl font-bold mb-4">Test Projek</h1>
          <nav className="mb-4">
            <Link to="/" className="mr-4 text-blue-500 text-2xl underline">Home</Link>
            <Link to="/contacts" className="text-blue-500 text-2xl underline">View Contacts</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </div>

    </div>
      
    </Router>
  );
}

export default App;
