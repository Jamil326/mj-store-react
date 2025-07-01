import React, { createContext, useState, useEffect } from "react";

export const NetworkContext = createContext();

const NetworkProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Monitor network connectivity
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const checkSlowNetwork = async () => {
      try {
        const start = performance.now();
        await fetch("/ping.json", { cache: "no-store" }); // Replace with a lightweight file
        const duration = performance.now() - start;

        // Mark the network as slow if the response time exceeds 1000ms
        setIsSlow(duration > 1000);
      } catch {
        setIsSlow(false); // No slow detection during offline mode
      }
    };

    // Check for slow network every 10 seconds
    const interval = setInterval(checkSlowNetwork, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NetworkContext.Provider value={{ isOnline, isSlow }}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
