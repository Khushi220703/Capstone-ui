// main.jsx or index.js
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './utils/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
