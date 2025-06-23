import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { logged } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user-info") || "{}");
  const token = localStorage.getItem("token");

  const [cartItems, setCartItems] = useState([]);
  const [noItem, setNoItem] = useState(1);
  const [directBuy, setDirectBuy] = useState(false);
  const [visible, setVisible] = useState(false);

  const { item, quantity = 1, fromCart = false } = location?.state || {};
  const { city, state, pin, landmark, street } = user?.address || {};

  // Fetch cart items for checkout if coming from cart
  useEffect(() => {
    if (fromCart && token) {
      fetchCartItems();
    } else if (item) {
      setDirectBuy(true);
      setNoItem(quantity);
    }
  }, [fromCart, token, item, quantity]);

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
        setCartItems(result.data.items);
      } else {
        toast.warn(result.message || "Failed to fetch cart items.");
      }
    } catch (error) {
      toast.error("Error fetching cart items.");
    }
  };

  // Adjust quantity for direct buy
  const handleAdd = () => setNoItem((prev) => prev + 1);
  const handleSub = () => setNoItem((prev) => Math.max(prev - 1, 1));
  const toggleAddressForm = () => setVisible((prev) => !prev);

  const placeOrder = async () => {
    try {
      if (!token) {
        toast.warn("Authorization token required.");
        return;
      }

      const orderPayload = directBuy
        ? {
            paymentMethod: "Cash On Delivery",
            items: [{ product: { _id: item._id }, quantity: noItem }],
          }
        : {
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
        navigate("/orders");
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
        <Button variant="success" onClick={() => navigate("/login")} className="py-2 px-4">
          Please Login to Continue
        </Button>
      </div>
    );
  }

  return (
    <Container fluid className="px-3 py-3">
      <Row>
        {/* Product or Cart Items */}
        {directBuy && item ? (
          <Col>
            <Card className="shadow-sm mb-4">
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
        ) : (
          <Col>
            {cartItems.map((cartItem, idx) => (
              <Card key={idx} className="shadow-sm mb-4">
                <Row className="g-0">
                  <Col md={4}>
                    <Image
                      src={cartItem.product?.image?.[0]?.url || "/placeholder.jpg"}
                      alt={cartItem.product?.name || "Product Image"}
                      fluid
                      className="rounded"
                    />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>{cartItem.product?.name}</Card.Title>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Price:</strong> ₹{cartItem.product?.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Quantity:</strong> {cartItem.quantity}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Total:</strong> ₹{cartItem.totalValue}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>
        )}
      </Row>

      {/* Address Section */}
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

      {/* Place Order Button */}
      <Row className="mt-3">
        <Col>
          <Button variant="success" className="w-100 py-2" onClick={placeOrder}>
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

export default OrderPage;
