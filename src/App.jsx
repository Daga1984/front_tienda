import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

function App() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Home</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user ? (
          <button onClick={() => { localStorage.removeItem('user'); window.location.href = '/' }}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
