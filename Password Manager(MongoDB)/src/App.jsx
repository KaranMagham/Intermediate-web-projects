// App.jsx
import Navbar from './components/Navbar'
import About from './components/About'
import Footer from './components/Footer'
import Home from './components/Home'
import Contact from './components/Contact'

function App() {
  return (
    <div className="bg-amber-300 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow" id="home">
        <Home />
      </main>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  )
}

export default App
