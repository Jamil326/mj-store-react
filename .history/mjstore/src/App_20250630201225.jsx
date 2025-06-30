import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext";
import UserProvider from "./context/userContext";
im

import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";


const App = () => {

   useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        toast.success("New content is available! Click here to update.", {
          autoClose: false,
          closeOnClick: true,
          onClick: () => window.location.reload(),
        });
      });

      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data && event.data.type === "NEW_VERSION_AVAILABLE") {
          toast.info("A new version is available. Please refresh.", {
            autoClose: false,
            onClick: () => window.location.reload(),
          });
        }
      });
    }
  }, []);

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
