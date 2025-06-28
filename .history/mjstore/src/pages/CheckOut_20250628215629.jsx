import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { logged } = useContext(UserContext);
  const [userAddress, setUserAddress] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const fetchAddressFromBackend = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token required.");

      const response = await fetch("https://mj-store.onrender.com/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setUserAddress(result.data.address);
    } catch (error) {
      toast.error("Failed to fetch address: " + error.message);
    }
  };

  const handleAddressAddedOrUpdated = (updatedAddress) => {
    setUserAddress(updatedAddress);
    toast.success("Address updated successfully!");
    setModalVisible(false);
  };

  useEffect(() => {
    if (!userAddress) {
      fetchAddressFromBackend();
    }
  }, [userAddress]);

  const toggleModal = () => setModalVisible((prev) => !prev);

  if (!logged) {
    return (
      <div className="text-center mt-5">
        <Button variant="success" onClick={() => navigate("/login")}>
          Please Login to Continue
        </Button>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Shipping Address</Card.Title>
              {userAddress ? (
                <>
                  <p>Street: {userAddress.street}</p>
                  <p>City: {userAddress.city}</p>
                  <Button variant="primary" onClick={toggleModal}>
                    Edit Address
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={toggleModal}>
                  Add Address
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={isModalVisible} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{userAddress ? "Edit Address" : "Add Address"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddressForm
            onAddressAdded={handleAddressAddedOrUpdated}
            onAddressUpdated={handleAddressAddedOrUpdated}
            initialAddress={userAddress}
            isEditable={!!userAddress}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OrderPage;
