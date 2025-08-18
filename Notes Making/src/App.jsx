import React from "react"
import Navbar from "./components/Navbar"
import About from "./components/About"
import Contact from "./components/contact"
import Home from "./components/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <div className="bg-[#9689ac] min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow flex items-center justify-center py-10 px-4" id="home">
            <div className="w-full max-w-3xl mx-auto">
              <Home />
            </div>
          </main>

          <div id="about">
            <About />
          </div>
          <div id="contact">
            <Contact />
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
