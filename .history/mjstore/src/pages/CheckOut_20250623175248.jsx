import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { logged } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user-info") || "{}");
  const { city, state, pin, landmark, street } = user?.address || {};
  const { item, quantity = 1 } = location?.state || {};
  const [noItem, setNoItem] = useState(quantity);

  // Handlers for incrementing and decrementing quantity
  const handleAdd = () => setNoItem((prev) => prev + 1);
  const handleSub = () => setNoItem((prev) => Math.max(prev - 1, 1));

  const toggleAddressForm = () => setVisible((prev) => !prev);

  // Redirects user to login if not logged in
  const redirectToLogin = () => navigate("/login");

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warn("Authorization token required.");
        return;
      }

      const orderPayload = {
        paymentMethod: "Cash On Delivery",
        directBuy: true, // Direct purchase flag
        product: { _id: item._id },
        quantity: noItem,
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

      if (!response.ok) {
        throw new Error(result.message || "Failed to place the order.");
      }

      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error(error.message || "An error occurred while placing the order.");
    }
  };

  // If the user is not logged in, prompt login
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
            alt={item?.name || "Product Image"}
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
              <div className="d-inline-flex align-items-center ms-3">
                <Button onClick={handleSub} variant="success py-1">-</Button>
                <span className="mx-3 fs-4 border px-3">{noItem}</span>
                <Button onClick={handleAdd} variant="success py-1">+</Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price:</strong> ₹{item?.price || 0}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Total:</strong> ₹{(item?.price || 0) * noItem}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      {/* Address Section */}
      <Row>
        {user.address ? (
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
            </Card>
            <Button variant="success" className="w-100 py-2" onClick={placeOrder}>
              Place Order
            </Button>
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
      {visible && (
        <Row className="mt-4">
          <Col>
            <AddressForm />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OrderPage;
