import React, { useContext } from "react";
import  NetworkContext  from "./context/NetworkProvider"; // Adjust path as needed
import { Alert } from "react-bootstrap";

const NetworkAlert = () => {
  const { isOnline, isSlow } = useContext(NetworkContext);

  if (!isOnline) {
    return (
      <Alert variant="danger" className="text-center mb-0">
        You are offline. Please check your internet connection.
      </Alert>
    );
  }

  if (isSlow) {
    return (
      <Alert variant="warning" className="text-center mb-0">
        Your network is slow. Some features may take longer to load.
      </Alert>
    );
  }

  return null;
};

export default NetworkAlert;
