import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, ListGroup } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaEdit,
  FaShoppingCart,
  FaMapSigns,
  FaCity,
  FaLocationArrow,
  FaFlag,
  FaEnvelope,
} from "react-icons/fa";

const OrderPage2 = () => {
  const { logged } = useContext(UserContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userAddress, setUserAddress] = useState(
    JSON.parse(localStorage.getItem("user-info") || "{}")?.address || null
  );
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { items = [] } = location?.state || {};
  const { street, landmark, city, pin, state } = userAddress || {};

  const fetchAddress = async () => {
    try {
      const response = await fetch("https://mj-store.onrender.com/api/v1/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setUserAddress(result.data.address);

      const userInfo = JSON.parse(localStorage.getItem("user-info") || "{}");
      userInfo.address = result.data.address;
      localStorage.setItem("user-info", JSON.stringify(userInfo));
    } catch (error) {
      toast.error("Failed to fetch address: " + error.message);
    }
  };

  useEffect(() => {
    if (!userAddress || !street) {
      fetchAddress();
    }
  }, [userAddress]);

  const toggleModal = () => setModalVisible((prev) => !prev);

  const handleAddressUpdated = async () => {
    toggleModal();
    await fetchAddress();
    toast.success("Address updated successfully.");
  };

  const placeOrder = async () => {
    const itemIds = items.map((item) => item.product._id);
    try {
      if (!token) throw new Error("Authorization token required.");
      if (!items.length) throw new Error("No items specified for the order.");

      const orderPayload = { paymentMethod: "Cash On Delivery", itemIds };
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

      toast.success("Order placed successfully.");
      navigate("/orders");
    } catch (error) {
      toast.error(error.message || "An error occurred while placing the order.");
    }
  };

  if (!logged) {
    return (
      <div className="text-center mt-5">
        <Button variant="success" onClick={() => navigate("/login")} className="py-2 px-4">
          Please Login to Continue
        </Button>
      </div>
    );
  }

  return (
    <Container fluid className="py-4">
      <h1 className="text-center mb-4 text-dark border border-round py-2 rounded">
        <FaShoppingCart className="me-2" />
        Order Summary
      </h1>

      <Row>
        <Col>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="text-center text-success">Your Items</Card.Title>
              {items.length > 0 ? (
                <ListGroup variant="flush">
                  {items.map((item, idx) => (
                    <ListGroup.Item key={idx} className="d-flex align-items-center">
                      <img
                        src={item.product.image[0].url}
                        alt={item.product.name}
                        className="rounded me-3"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                      <div>
                        <h6 className="mb-0 fw-bold">{item.product.name}</h6>
                        <small className="text-muted">
                          Quantity: {item.quantity} | Price: ₹{item.product.price}
                        </small>
                        <br />
                        <small className="text-muted">Total: ₹{item.totalValue}</small>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-center text-muted">No items in the order.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          {userAddress ? (
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <Card.Title className="text-center text-success">
                  <FaMapMarkerAlt className="me-2" />
                  Shipping Address
                </Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <FaMapSigns className="me-2 text-success" />
                    <strong>Street:</strong> {street || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FaLocationArrow className="me-2 text-success" />
                    <strong>Landmark:</strong> {landmark || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FaCity className="me-2 text-success" />
                    <strong>City:</strong> {city || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FaEnvelope className="me-2 text-success" />
                    <strong>Pin:</strong> {pin || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FaFlag className="me-2 text-success" />
                    <strong>State:</strong> {state || "N/A"}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button variant="outline-success" onClick={toggleModal}>
                  <FaEdit className="me-1" />
                  Edit Address
                </Button>
              </Card.Footer>
            </Card>
          ) : (
            <div className="text-center">
              <Button variant="dark" onClick={toggleModal}>
                Add Address
              </Button>
            </div>
          )}
        </Col>
      </Row>

      {userAddress && (
        <Row className="mt-3">
          <Col>
            <Button
              variant="success"
              className="w-100 py-2"
              onClick={placeOrder}
              disabled={!userAddress || items.length === 0}
            >
              Place Order
            </Button>
          </Col>
        </Row>
      )}

      <Modal show={isModalVisible} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{street ? "Edit Address" : "Add Address"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddressForm
            onAddressAdded={handleAddressUpdated}
            onAddressUpdated={handleAddressUpdated}
            initialAddress={userAddress}
            isEditable={!!street}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OrderPage2;
