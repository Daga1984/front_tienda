import { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { username, password })
      console.log('Respuesta del backend:', res.data);
      localStorage.setItem('user', JSON.stringify(res.data.user));
window.location.href = '/dashboard';

    } catch (err) {
      setError(err.response?.data?.message || 'Error desconocido')
    }
  }

  return (
    <div className="card">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Usuario</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
