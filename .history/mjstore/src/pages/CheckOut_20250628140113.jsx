import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { logged } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userAddress, setUserAddress] = useState(
    JSON.parse(localStorage.getItem("user-info") || "{}")?.address || {}
  );
  const location = useLocation();
  const navigate = useNavigate();

  const { city, state, pin, landmark, street } = userAddress || {};
  const { item, quantity = 1 } = location?.state || {};
  const [noItem, setNoItem] = useState(quantity);

  const handleAdd = () => setNoItem((prev) => prev + 1);
  const handleSub = () => setNoItem((prev) => Math.max(prev - 1, 1));
  const toggleAddressForm = () => setVisible((prev) => !prev);
  const redirectToLogin = () => navigate("/login");

  const handleAddressAdded = (newAddress) => {
    // Update localStorage and component state with the new address
    const updatedUser = JSON.parse(localStorage.getItem("user-info") || "{}");
    updatedUser.address = newAddress;
    localStorage.setItem("user-info", JSON.stringify(updatedUser));
    setUserAddress(newAddress); // Update state
    toast.success("Address added successfully.");
    setVisible(false); // Hide the form
  };

  const placeOrder = async () => {
    if (isSubmitting) return; // Prevent double submission
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
            <ListGroup.Item className='text-su'>
              <strong>Quantity:</strong>
              <Button onClick={handleSub} variant="text-success ms-3 py-1">
                -
              </Button>
              <span className="mx-2 fs-3 border text-center px-3 pb-2">{noItem}</span>
              <Button onClick={handleAdd} variant="text-success py-1">
                +
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
            </Card>
            <Button
              variant="success"
              className="w-100 py-2"
              onClick={placeOrder}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
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
            <AddressForm onAddressAdded={handleAddressAdded} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OrderPage;
