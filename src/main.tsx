import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { worker } from './api/browser'

async function startApp() {
  if (import.meta.env.DEV) {
    await worker.start()
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

startApp()
