import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // Go back to the previous page
    } else {
      navigate("/"); // Navigate to home if no history exists
    }
  };

  return (
    <Button
      variant="light"
      onClick={handleBack}
      className="d-flex align-items-center px-3 py-2"
      style={{ borderRadius: "50px" }}
    >
      <IoArrowBack size="1.2rem" className="me-2" />
      Back
    </Button>
  );
};

export default BackButton;
