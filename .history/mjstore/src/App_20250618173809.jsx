import { Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import { ToastContainer } from 'react-toastify';
import UserProvider from './context/userContext';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton';
import { CartProvider } from './context/CartContext';



function App() {



  return (
    <CartProvider></CartProvider>
    <UserProvider>
    <div  className =' d-flex flex-column min-vh-100 m-0 p-0' >
    
    <header>

       <Header />
       

      
    </header>

    <main className='flex-grow-1'>

         <Outlet  />

    </main>
  
    
        <ToastContainer position="top-right" autoClose={3000} />

    <footer className='p-2 position-fixed bottom-0 end-0 ' >

          <WhatsAppButton phone='8240059967' />  

      
    </footer>

    </div>
    
    </UserProvider>
    
  )
}

export default App
