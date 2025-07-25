import { useState } from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Footer from './components/Footer'
import Home from './components/Home'
import Contact from './components/Contact'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <div className="bg-amber-300 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow" id="home">
            <Home />
          </main>
          <div id="about">
          <About />
          </div>
          <div id="footer">
            <Footer/>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
