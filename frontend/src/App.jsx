import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import FrontPage from './components/FrontPage'
import Login from './components/Login'
import Signup from './components/Signup'
import AdminDashboard from './components/dashboard/AdminDashboard'
import StudentDashboard from './components/dashboard/StudentDashboard'
function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
