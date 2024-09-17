import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './componentes/App/App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/onest';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
