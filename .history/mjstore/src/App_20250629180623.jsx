import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext";
import UserProvider from "./context/userContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import { BackButton } from './components/BackButton';

const App = () => {
  return (
      <UserProvider>
          <CartProvider>

        <div className="d-flex flex-column min-vh-100">
          {/* Header */}
          <header>
            <Header />
          </header>

          {/* Main Content */}
          <main className="flex-grow-1">
            <Outlet />
          </main>

          {/* Toast Notifications */}
          <ToastContainer position="top-right" autoClose={3000} />

          {/* Footer with WhatsApp Button */}
          <footer className="position-relative mt-5">
           <Footer/>
          
          </footer>
        </div>
            </CartProvider>

      </UserProvider>
  );
};

export default App;
