import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import CartCard from "../components/CartCard";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const navigate = useNavigate();

  const fetchCartData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization token missing.");
      return;
    }

    try {
      const response = await fetch("https://mj-store.onrender.com/api/v1/user/cart/fetch", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setCartItems(result.data.items || []);
        setTotalCartValue(result.data.totalCartValue || 0);
      } else {
        toast.warn(result.message || "Failed to fetch cart data.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching the cart.");
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleRemove = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== itemId));
    fetchCartData(); // Refresh data from backend after removal
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warn("Cart is empty. Please add items before checking out.");
      return;
    }
    navigate("/O", { state: { items: cartItems } });
  };

  return (
    <Container>
      <h2 className="text-center my-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <Row>
            {cartItems.map((item) => (
              <Col key={item._id} xs={12} sm={6} md={4}>
                <CartCard product={item} onRemove={() => handleRemove(item._id)} />
              </Col>
            ))}
          </Row>
          <Card className="mt-4 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <h5>Total Value:</h5>
                <h5>₹{totalCartValue}</h5>
              </div>
              <Button variant="success" className="w-100 mt-3" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </>
      ) : (
        <div className="text-center py-5">
          <h4>Your cart is empty!</h4>
        </div>
      )}
    </Container>
  );
};

export default CartPage;
