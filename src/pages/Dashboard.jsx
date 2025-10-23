import React from 'react'
import ProductList from '../components/ProductList'

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Usuario: {user?.username} ({user?.role})</p>
      <ProductList />
    </div>
  )
}
