import React from 'react'
import ReactDOM from 'react-dom/client'
import API from './API.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <API />
  </HashRouter>,
)
