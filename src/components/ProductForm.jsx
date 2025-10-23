import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function ProductForm({ onSaved, editing, setEditing }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (editing) {
      setName(editing.name)
      setPrice(editing.price)
      setStock(editing.stock)
    } else {
      setName('')
      setPrice(0)
      setStock(0)
    }
  }, [editing])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user || user.role !== 'admin') {
      alert('Solo administradores pueden crear o editar productos')
      return
    }
    try {
      if (editing) {
        await api.put(`/products/${editing._id}`, { name, price, stock })
        setEditing(null)
      } else {
        await api.post('/products', { name, price, stock })
      }
      onSaved()
    } catch (err) {
      alert(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="card">
      <h4>{editing ? 'Editar' : 'Nuevo'} producto</h4>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Precio</label>
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        <label>Stock</label>
        <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} required />
        <button type="submit" disabled={!(user && user.role === 'admin')}>
          Guardar
        </button>
        {editing && <button type="button" onClick={() => setEditing(null)}>Cancelar</button>}
        {!(user && user.role === 'admin') && <p>Solo administradores pueden crear/editar productos.</p>}
      </form>
    </div>
  )
}
