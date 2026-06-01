import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/board.css'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('找不到 #root 元素，请检查 index.html')
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
