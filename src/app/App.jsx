import '../App.css'
import AppRoutes from './router/router'
import { BrowserRouter } from 'react-router-dom'
import ConfirmModal from '~/components/Modals/ConfirmModal.jsx'
import Notifications from '~/components/layout/Notifications.jsx'

function App() {
  return (
    <BrowserRouter>
      <Notifications />
      <ConfirmModal />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
