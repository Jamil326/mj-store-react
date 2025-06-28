import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";

const OrderPage2 = () => {
  const { logged } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user-info") || "{}");
  const token = localStorage.getItem("token");
  const [visible, setVisible] = useState(false);

  const { itemIds = [] } = location?.state || {};
  const { city, state, pin, landmark, street } = user?.address || {};

  const toggleAddressForm = () => setVisible((prev) => !prev);
  const redirectToLogin = () => navigate("/login");

  const placeOrder = async () => {
    try {
      if (!token) {
        return toast.warn("Authorization token required.");
      }

      if (!itemIds.length) {
        return toast.warn("No items specified for the order.");
      }

      const orderUrl = "https://mj-store.onrender.com/api/v1/user/order";
      const orderPayload = {
        paymentMethod: "Cash On Delivery",
        itemIds, // Use the array of item IDs
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
      toast.error(error.message || "An error occurred while placing the order.");
    }
  };

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
      <Row>
        <Col>
          {itemIds.length ? (
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <Card.Title className="text-center">Order Summary</Card.Title>
                <ListGroup variant="flush">
                  {itemIds.map((id, idx) => (
                    <ListGroup.Item key={idx}>
                      <strong>Item ID:</strong> {id}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          ) : (
            <p className="text-center">No items in the order.</p>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          {user.address ? (
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <Card.Title className="text-center">Shipping Address</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Street:</strong> {street || "N/A"}</ListGroup.Item>
                  <ListGroup.Item><strong>Landmark:</strong> {landmark || "N/A"}</ListGroup.Item>
                  <ListGroup.Item><strong>City:</strong> {city || "N/A"}</ListGroup.Item>
                  <ListGroup.Item><strong>Pin:</strong> {pin || "N/A"}</ListGroup.Item>
                  <ListGroup.Item><strong>State:</strong> {state || "N/A"}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          ) : (
            <Button variant="dark" onClick={toggleAddressForm} className="w-100 py-2">
              Add Address
            </Button>
          )}
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Button variant="success" className="w-100 py-2" onClick={placeOrder}>
            Place Order
          </Button>
        </Col>
      </Row>

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

export default OrderPage2;
