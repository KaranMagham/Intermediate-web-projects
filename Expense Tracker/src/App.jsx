import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'
import MoneyBrief from './pages/MoneyBrief'
import ManageTransactions from './pages/ManageTransactions'
import OverviewPage from './pages/OverviewPage'
import Settings from './pages/Settings'


function App() {
  return (
    <BrowserRouter>
      <div className='flex h-screen'>
        {/* Fixed Sidebar */}
        <Navbar />

        {/* Right-Side Dynamic Content */}
        <div className='flex-1 overflow-y-auto'>
          <Routes>
            <Route path="/" element={<MoneyBrief />} />
            <Route path="/transactions" element={<ManageTransactions />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
