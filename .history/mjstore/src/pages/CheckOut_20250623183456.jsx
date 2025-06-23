import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";

const OrderPageBuyNow = () => {
  const { logged } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user-info") || "{}");
  const token = localStorage.getItem("token");

  const { item, quantity = 1 } = location?.state || {};
  const { city, state, pin, landmark, street } = user?.address || {};

  const [noItem, setNoItem] = useState(quantity);
  const [visible, setVisible] = useState(false);

  // Handlers for adjusting quantity
  const handleAdd = () => setNoItem((prev) => prev + 1);
  const handleSub = () => setNoItem((prev) => Math.max(prev - 1, 1));
  const toggleAddressForm = () => setVisible((prev) => !prev);

  const placeOrder = async () => {
  try {
    if (!token) {
      toast.warn("Authorization token required.");
      return;
    }

    // Validate the selected product
    if (!item || !item._id) {
      toast.error("No product selected for the order.");
      return;
    }

    // Construct payload for a direct purchase
    const orderPayload = {
      paymentMethod: "Cash On Delivery",
      product: { _id: item._id },
      quantity: noItem,
    };

    const res = await fetch("https://mj-store.onrender.com/api/v1/user/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderPayload),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to place the order.");
    }

    toast.success("Order placed successfully!");
    navigate("/orders");
  } catch (error) {
    toast.error(error.message || "An error occurred while placing the order.");
  }
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
    <Container fluid className="px-3 py-3">
      {/* Product Details */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Image
              src={item?.image?.[0]?.url || "/placeholder.jpg"}
              alt={item?.name || "Product Image"}
              fluid
              className="rounded-top"
            />
            <Card.Body>
              <Card.Title>{item?.name}</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Price:</strong> ₹{item?.price}
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
                  <strong>Total:</strong> ₹{item?.price * noItem}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Address Section */}
      <Row>
        <Col>
          <Card className="shadow-sm my-4">
            <Card.Body>
              <Card.Title>Shipping Address</Card.Title>
              {user.address ? (
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Street:</strong> {street || "N/A"}</ListGroup.Item>
                  <ListGroup.Item><strong>Landmark:</strong> {landmark || "N/A"}</ListGroup.Item>
                  <ListGroup.Item><strong>City:</strong> {city || "N/A"}</ListGroup.Item>
                  <ListGroup.Item><strong>Pin:</strong> {pin || "N/A"}</ListGroup.Item>
                  <ListGroup.Item><strong>State:</strong> {state || "N/A"}</ListGroup.Item>
                </ListGroup>
              ) : (
                <Button variant="dark" onClick={toggleAddressForm}>
                  Add Address
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Place Order Button */}
      <Row className="mt-3">
        <Col>
          <Button variant="success" className="w-100" onClick={placeOrder}>
            Place Order
          </Button>
        </Col>
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

export default OrderPageBuyNow;
