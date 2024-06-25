import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import UserWelcome from '../profile/UserWelcome'
import Routing from './routing'
import AuthProvider from '../auth/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <Routing />
  </AuthProvider>
  </React.StrictMode>,
)