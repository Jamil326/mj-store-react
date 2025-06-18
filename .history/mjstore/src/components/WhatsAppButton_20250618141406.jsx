import React from "react";
import PropTypes from "prop-types";
import { BsWhatsapp } from "react-icons/bs";

const WhatsAppButton = ({ phone, message, label, style }) => {
  const handleClick = () => {
    const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="btn   d-flex align-items-center fw-bold"
      style={style}
    >
      <BsWhatsapp size="1.5rem" className="me-2" />
      {label}
    </button>
  );
};

WhatsAppButton.propTypes = {
  phone: PropTypes.string.isRequired, // WhatsApp phone number with country code
  message: PropTypes.string,          // Optional predefined message
  label: PropTypes.string,            // Button label
  style: PropTypes.object,            // Optional inline styles for button
};

WhatsAppButton.defaultProps = {
  message: "Hi, I need assistance!",
  label: "Chat on WhatsApp",
  style: {},
};

export default WhatsAppButton;
