import '../App.css'
import AppRoutes from './router/router'
import { BrowserRouter } from 'react-router-dom'
import ConfirmModal from '~/components/Modals/ConfirmModal.jsx'
import Notifications from '~/components/layout/Notifications.jsx'
// import useNotificationsStore from "~/stores/notificationsStore.js";

function App() {
  // const { addNotification } = useNotificationsStore();
  return (
    <BrowserRouter>
      {/* <div className='text-base-content'>
        <button className='bg-primary text-primary-content px-4 py-2 rounded cursor-pointer' onClick={() => addNotification({ message: "Info", type: "info" })}>Add Info</button>
        <button className='bg-primary text-primary-content px-4 py-2 rounded cursor-pointer' onClick={() => addNotification({ message: "Success", type: "success" })}>Add Success</button>
        <button className='bg-primary text-primary-content px-4 py-2 rounded cursor-pointer' onClick={() => addNotification({ message: "Warning", type: "warning" })}>Add Warning</button>
        <button className='bg-primary text-primary-content px-4 py-2 rounded cursor-pointer' onClick={() => addNotification({ message: "Error", type: "error" })}>Add Error</button>
      </div> */}
      <Notifications />
      <ConfirmModal />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
