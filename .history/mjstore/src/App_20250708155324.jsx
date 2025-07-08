import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CartProvider } from "./context/CartContext";
import UserProvider from "./context/userContext";
import { useEffect } from "react";
import NetworkProvider from "./context/NetworkProvider.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import NetworkAlert from "./components/NetworkAlert";

const App = () => {
  // Handle network status changes and show toast
  const handleNetworkStatus = () => {
    if (!navigator.onLine) {
      toast.error("You are offline. Please check your internet connection.", {
        autoClose: false,
        toastId: "offline-toast", // Prevent duplicate toasts
      });
    } else {
      toast.dismiss("offline-toast");
      sessionStorage.removeItem("offline-toast-shown"); // Reset toast flag
      toast.success("You are back online!", {
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    handleNetworkStatus(); // Initial check

    // === Global fetch override to prevent API calls when offline ===
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      if (!navigator.onLine) {
        if (!sessionStorage.getItem("offline-toast-shown")) {
          toast.error("You are offline. Cannot connect to server.", {
            toastId: "global-offline-toast",
          });
          sessionStorage.setItem("offline-toast-shown", "true");
        }
        return Promise.reject(new Error("Offline: request blocked."));
      }

      sessionStorage.removeItem("offline-toast-shown"); // Reset flag when back online
      return originalFetch(...args);
    };

    // Listen for online/offline status changes
    window.addEventListener("online", handleNetworkStatus);
    window.addEventListener("offline", handleNetworkStatus);

    return () => {
      window.fetch = originalFetch; // Restore original fetch
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
        if (event.data?.type === "NEW_VERSION_AVAILABLE") {
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
            {/* Optional: persistent offline alert */}
            <NetworkAlert />

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
              <Footer />
              <WhatsAppButton />
            </footer>
          </div>
        </CartProvider>
      </UserProvider>
    </NetworkProvider>
  );
};

export default App;
