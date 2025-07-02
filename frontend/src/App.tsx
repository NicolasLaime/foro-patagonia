import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import AppRouter from "./router/AppRouter"
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
        <ToastContainer/>
        <NavBar/>
        <AppRouter/>
        <Footer/>
            
    </>
    
  )
}

export default App