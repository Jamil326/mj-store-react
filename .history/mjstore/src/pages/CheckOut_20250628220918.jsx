import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, ListGroup } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";

const OrderSummaryPage = () => {
  const { logged } = useContext(UserContext);
  const [userAddress, setUserAddress] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Assuming `item` contains the single product and its details
  const { item, totalAmount } = location.state || { item: null, totalAmount: 0 };
  console.log('checkout buy now',item);

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

  const placeOrder = () => {
    toast.success("Order placed successfully!");
    navigate("/orders");
  };

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
    <Container className="mt-4">
      <h1 className="text-center mb-4">Order Summary</h1>

      {/* Shipping Address Section */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Shipping Address</Card.Title>
              {userAddress ? (
                <>
                  <p><strong>Street:</strong> {userAddress.street}</p>
                  <p><strong>City:</strong> {userAddress.city}</p>
                  <p><strong>State:</strong> {userAddress.state}</p>
                  <p><strong>Pin Code:</strong> {userAddress.pin}</p>
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

      {/* Order Item Section */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Order Item</Card.Title>
              {item ? (
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col md={2}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded"
                        />
                      </Col>
                      <Col md={6}>
                        <h5>{item.name}</h5>
                        <p>Price: ₹{item.price}</p>
                      </Col>
                      <Col md={4} className="text-end">
                        <p>Quantity: {item.quantity}</p>
                        <p>Subtotal: ₹{item.price * item.quantity}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              ) : (
                <p>No item found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Order Summary Section */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Item Quantity</Col>
                    <Col className="text-end">{item ? item.quantity : 0}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total Amount</Col>
                    <Col className="text-end">₹{totalAmount}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <Button
                variant="success"
                className="mt-3 w-100"
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Address Modal */}
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

export default OrderSummaryPage;
