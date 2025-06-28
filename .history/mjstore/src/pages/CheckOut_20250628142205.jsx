import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { logged } = useContext(UserContext);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userAddress, setUserAddress] = useState(
    JSON.parse(localStorage.getItem("user-info") || "{}")?.address || {}
  );
  const location = useLocation();
  const navigate = useNavigate();

  const { city, state, pin, landmark, street } = userAddress || {};
  const { item, quantity = 1 } = location?.state || {};
  const [noItem, setNoItem] = useState(quantity);

  // Toggle Address Form Visibility
  const toggleAddressForm = () => setFormVisible((prev) => !prev);

  // Redirect to Login
  const redirectToLogin = () => navigate("/login");

  // Add or Update Address Handlers
  const handleAddressAdded = (newAddress) => {
    const updatedUser = JSON.parse(localStorage.getItem("user-info") || "{}");
    updatedUser.address = newAddress;
    localStorage.setItem("user-info", JSON.stringify(updatedUser));
    setUserAddress(newAddress);
    toast.success("Address added successfully.");
    setFormVisible(false);
  };

  const handleAddressUpdated = (updatedAddress) => {
    const updatedUser = JSON.parse(localStorage.getItem("user-info") || "{}");
    updatedUser.address = updatedAddress;
    localStorage.setItem("user-info", JSON.stringify(updatedUser));
    setUserAddress(updatedAddress);
    toast.success("Address updated successfully.");
    setFormVisible(false);
  };

  // Place Order Function
  const placeOrder = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return toast.warn("Authorization token required.");
      }

      const orderUrl = "https://mj-store.onrender.com/api/v1/user/order";
      const orderPayload = {
        paymentMethod: "Cash On Delivery",
        directBuy: true,
        product: { _id: item._id },
        quantity: noItem,
      };

      const orderResponse = await fetch(orderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const orderResult = await orderResponse.json();
      if (!orderResponse.ok) {
        throw new Error(orderResult.message || "Failed to place order.");
      }

      toast.success("Order placed successfully.");
      navigate("/orders");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Redirect for Unauthenticated Users
  if (!logged) {
    return (
      <div className="text-center mt-5">
        <Button variant="success" onClick={redirectToLogin} className="py-2 px-4">
          Please Login to Continue
        </Button>
      </div>
    );
  }

  return (
    <Container fluid className="px-3 py-3">
      {/* Product Image */}
      <Row className="text-center">
        <Col>
          <Image
            src={item?.image?.[0]?.url || "/placeholder.jpg"}
            alt="Product"
            fluid
            className="rounded shadow mb-4"
          />
        </Col>
      </Row>

      {/* Product Details */}
      <Row className="mb-4">
        <Col>
          <ListGroup>
            <ListGroup.Item>
              <strong>Product Name:</strong> {item?.name || "N/A"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Quantity:</strong>
              <Button
                onClick={() => setNoItem((prev) => Math.max(prev - 1, 1))}
                variant="border border-success ms-3 py-1"
              >
                <span className="text-success">-</span>
              </Button>
              <span className="mx-2 fs-3 text-center px-2 pb-2">{noItem}</span>
              <Button
                onClick={() => setNoItem((prev) => prev + 1)}
                variant="border border-success py-1"
              >
                <span className="text-success">+</span>
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price:</strong> ₹{item?.price || 0}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Total:</strong> ₹{item?.price * noItem || 0}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      {/* Address Section */}
      <Row>
        {street ? (
          <Col>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <Card.Title className="text-center">Shipping Address</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Street:</strong> {street || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Landmark:</strong> {landmark || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>City:</strong> {city || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Pin:</strong> {pin || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>State:</strong> {state || "N/A"}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="primary"
                  className="w-100 mb-2"
                  onClick={toggleAddressForm}
                >
                  Edit Address
                </Button>
                <Button
                  variant="success"
                  className="w-100"
                  onClick={placeOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ) : (
          <Col className="text-center">
            <Button variant="dark" onClick={toggleAddressForm} className="px-4">
              Add Address
            </Button>
          </Col>
        )}
      </Row>

      {/* Address Form */}
      {isFormVisible && (
        <Row className="mt-4">
          <Col>
            <AddressForm
              onAddressAdded={handleAddressAdded}
              onAddressUpdated={handleAddressUpdated}
              initialAddress={userAddress}
              isEditable={!!street}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OrderPage;
