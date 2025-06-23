import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Image } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";

const OrderPageCartCheckout = () => {
  const { logged } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const [cartItems, setCartItems] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const res = await fetch("https://mj-store.onrender.com/api/v1/user/cart/fetch", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setCartItems(result.data.items || []);
      } else {
        toast.warn(result.message || "Failed to fetch cart items.");
      }
    } catch (error) {
      toast.error("Error fetching cart items.");
    }
  };

  const placeOrder = async () => {
    try {
      if (!token) {
        toast.warn("Authorization token required.");
        return;
      }

      const orderPayload = {
        paymentMethod: "Cash On Delivery",
        items: cartItems.map((cartItem) => ({
          product: { _id: cartItem.product._id },
          quantity: cartItem.quantity,
        })),
      };

      if (!orderPayload.items || orderPayload.items.length === 0) {
        toast.warn("No items specified for the order.");
        return;
      }

      const res = await fetch("https://mj-store.onrender.com/api/v1/user/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Order placed successfully!");
      } else {
        throw new Error(result.message || "Failed to place the order.");
      }
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
      <Row>
        {cartItems.map((cartItem, idx) => (
          <Col key={idx}>
            <Card className="shadow-sm mb-4">
              <Row className="g-0">
                <Col md={4}>
                  <Image
                    src={cartItem.product?.image?.[0]?.url || "/placeholder.jpg"}
                    alt={cartItem.product?.name || "Product Image"}
                    fluid
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>{cartItem.product?.name}</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item><strong>Price:</strong> ₹{cartItem.product?.price}</ListGroup.Item>
                      <ListGroup.Item><strong>Quantity:</strong> {cartItem.quantity}</ListGroup.Item>
                      <ListGroup.Item><strong>Total:</strong> ₹{cartItem.totalValue}</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        <Col>
          <Button variant="success" className="w-100" onClick={placeOrder}>
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

export default OrderPageCartCheckout;
