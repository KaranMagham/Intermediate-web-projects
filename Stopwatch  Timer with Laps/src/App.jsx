import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Time from './pages/Time'
import Stopwatch from './pages/Stopwatch'
import About from './pages/About'
import Contact from './pages/Contact'
import Alarm from './pages/Alarm'

function App() {
  return (
    <BrowserRouter>
      <div className='flex h-screen'>
        {/* Fixed Sidebar */}
        <Navbar />

        {/* Right-Side Dynamic Content */}
        <div className='flex-1 overflow-y-auto'>
          <Routes>
            <Route path="/" element={<Time />} />
            <Route path="/alarm" element={<Alarm />} />
            <Route path="/stopwatch" element={<Stopwatch />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
