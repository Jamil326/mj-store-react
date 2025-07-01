import { Outlet } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { CartProvider } from "./context/CartContext";
import UserProvider from "./context/userContext";
import { useEffect } from 'react';
import NetworkProvider from "./context/NetworkProvider.jsx"; // Adjust path as needed
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import NetworkAlert from './components/NetworkAlert';

const App = () => {

    // Function to handle network status
  const handleNetworkStatus = () => {
    if (!navigator.onLine) {
      toast.error("You are offline. Please check your internet connection.", {
        autoClose: false,
        toastId: "offline-toast", // Prevent duplicate toasts
      });
    } else {
      toast.dismiss("offline-toast"); // Dismiss the offline toast
      toast.success("You are back online!", {
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    // Initial check
    handleNetworkStatus();

    // Event listeners for online/offline events
    window.addEventListener("online", handleNetworkStatus);
    window.addEventListener("offline", handleNetworkStatus);

    // Cleanup listeners
    return () => {
      window.removeEventListener("online", handleNetworkStatus);
      window.removeEventListener("offline", handleNetworkStatus);
    };
  }, []);

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
    <NetworkProvider>
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
      </NetworkProvider>
  );
};

export default App;
