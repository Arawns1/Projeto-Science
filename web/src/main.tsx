import React from 'react'
import ReactDOM from 'react-dom/client'
import '../app/globals.css'
import Login from './screens/auth/Login.tsx'
import Home from './screens/home/Home.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
)
