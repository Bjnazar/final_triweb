import React from 'react';
import Navbar from './Navbar';
import './App.css';
import landingPageImage from './../assets/landing_page.jpg'; 

function App() {
  return (
    <div>

<Navbar />

    
    <div className="App">
    <img src={landingPageImage} alt="Landing Page" />

    </div>
    </div>
  );
}

export default App;

