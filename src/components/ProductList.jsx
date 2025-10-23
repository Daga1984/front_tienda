import React, { useEffect, useState } from 'react'
import api from '../services/api'
import ProductForm from './ProductForm'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products')
      setProducts(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  const handleDelete = async (id) => {
    if (!user || user.role !== 'admin') {
      alert('Solo administradores pueden eliminar productos')
      return
    }
    if (!confirm('¿Eliminar producto?')) return
    await api.delete(`/products/${id}`)
    fetchProducts()
  }

  return (
    <div>
      <h3>Productos</h3>
      <ProductForm onSaved={fetchProducts} editing={editing} setEditing={setEditing} />
      <table className="table">
        <thead>
          <tr><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                {user && user.role === 'admin' ? (
                  <>
                    <button onClick={() => setEditing(p)}>Editar</button>
                    <button onClick={() => handleDelete(p._id)}>Eliminar</button>
                  </>
                ) : (
                  <span>No autorizado</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
