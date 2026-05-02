import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Learning from './pages/Learning'
import Mentorship from './pages/Mentorship'
import Networking from './pages/Networking'
import Funding from './pages/Funding'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/funding" element={<Funding />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
