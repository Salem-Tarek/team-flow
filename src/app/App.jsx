import '../App.css'
import AppRoutes from './router/router'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
