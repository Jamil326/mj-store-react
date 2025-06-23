import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { logged } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user-info") || "{}");
  const { city, state, pin, landmark, street } = user?.address || {};
  const { directBuy = false, product, quantity = 1 } = location?.state || {};

  useEffect(() => {
    if (directBuy) {
      setItems([{ product, quantity }]);
    } else {
      fetchCartItems();
    }
  }, [directBuy, product, quantity]);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token required.");

      const response = await fetch("https://mj-store.onrender.com/api/v1/user/cart/fetch", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch cart items.");

      setItems(result.data.items || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token required.");

      const orderPayload = {
        paymentMethod: "Cash On Delivery",
        directBuy,
        items: items.map(({ product, quantity }) => ({ product: { _id: product._id }, quantity })),
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
      if (!response.ok) throw new Error(result.message || "Failed to place the order.");

      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAddressForm = () => setVisible((prev) => !prev);

  const redirectToLogin = () => navigate("/login");

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
      {items.map(({ product, quantity }, index) => (
        <Row key={product._id || index} className="mb-4">
          {/* Product Details */}
          <Col xs={12} md={8}>
            <Image
              src={product.image?.[0]?.url || "/placeholder.jpg"}
              alt={product.name || "Product Image"}
              fluid
              className="rounded shadow mb-3"
            />
            <ListGroup>
              <ListGroup.Item>
                <strong>Product Name:</strong> {product.name || "N/A"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price:</strong> ₹{product.price || 0}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Quantity:</strong> {quantity}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Total:</strong> ₹{product.price * quantity || 0}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      ))}

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
