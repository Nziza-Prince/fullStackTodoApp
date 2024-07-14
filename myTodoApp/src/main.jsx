import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {disableReactDevTools} from "@fvilers/disable-react-devtools"

if(import.meta.env.VITE_UBASE_URL === 'production') disableReactDevTools()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
