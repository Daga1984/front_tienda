import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/auth/register', { username, password, role })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Error desconocido')
    }
  }

  return (
    <div className="card">
      <h2>Registrar usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Usuario</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Rol</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button type="submit">Registrar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
