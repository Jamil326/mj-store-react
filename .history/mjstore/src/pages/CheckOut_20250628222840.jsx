import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, ListGroup } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";
import { FaPlus, FaMinus } from "react-icons/fa";

const OrderSummaryPage = () => {
  const { logged } = useContext(UserContext);
  const [userAddress, setUserAddress] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const { item } = location.state || { item: null };
  const totalAmount = item ? item.price * quantity : 0;

  // Fetch user address
  const fetchAddressFromBackend = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token required.");

      const response = await fetch("https://mj-store.onrender.com/api/v1/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setUserAddress(result.data.address);
    } catch (error) {
      toast.error("Failed to fetch address: " + error.message);
    }
  };

  // Update address locally
  const handleAddressAddedOrUpdated = (updatedAddress) => {
    setUserAddress(updatedAddress);
    toast.success("Address updated successfully!");
    setModalVisible(false);
  };

  // API call to place order
  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token required.");

      const orderPayload = {
        productId: item._id,
        quantity,
        paymentMethod:'cash on delivery'
      };

      const response = await fetch("https://mj-store.onrender.com/api/v1/user/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error("Failed to place order: " + error.message);
    }
  };

  // Increment and decrement quantity
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  // Toggle address modal
  const toggleModal = () => setModalVisible((prev) => !prev);

  // Fetch address on component load
  useEffect(() => {
    if (!userAddress) fetchAddressFromBackend();
  }, [userAddress]);

  // Redirect to login if not logged in
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

      {/* Product Details */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Product Details</Card.Title>
              {item ? (
                <Row>
                  <Col md={4}>
                    <img src={item.image[0].url} alt={item.name} className="img-fluid rounded" />
                  </Col>
                  <Col md={8}>
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <p><strong>Price:</strong> ₹{item.price}</p>
                    <div className="d-flex align-items-center gap-3">
                      <Button variant="outline-primary" onClick={decreaseQuantity}>
                        <FaMinus />
                      </Button>
                      <span>{quantity}</span>
                      <Button variant="outline-primary" onClick={increaseQuantity}>
                        <FaPlus />
                      </Button>
                    </div>
                    <p className="mt-3">
                      <strong>Subtotal:</strong> ₹{totalAmount}
                    </p>
                  </Col>
                </Row>
              ) : (
                <p>No product details available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Shipping Address */}
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

      {/* Order Summary */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Item Quantity</Col>
                    <Col className="text-end">{quantity}</Col>
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
