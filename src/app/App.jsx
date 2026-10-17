import '../App.css'
import AppRoutes from './router/router'
import { BrowserRouter } from 'react-router-dom'
import ConfirmModal from '~/components/Modals/confirmModal.jsx'

function App() {

  return (
    <BrowserRouter>
      <ConfirmModal />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
