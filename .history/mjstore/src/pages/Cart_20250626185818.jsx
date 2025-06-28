import { useState, useEffect } from "react";
import { Button, ListGroup, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import CartCard from "./compoCartCard";

const Cart = () => {
  const [cartData, setCartData] = useState([]); // Cart items state
  const [totalValue, setTotalValue] = useState(0); // Total cart value state

  // Fetch cart data from API
  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warn("Authorization token required.");
        return;
      }

      const res = await fetch("https://mj-store.onrender.com/api/v1/user/cart/fetch", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok && result.status === "success") {
        setCartData(result.data.items); // Set cart items
        setTotalValue(result.data.totalCartValue); // Set total value
      } else {
        throw new Error(result.message || "Failed to fetch cart data.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching cart data.");
    }
  };

  // Handle cart update from child component
  const handleCartUpdate = (updatedItems) => {
    setCartData(updatedItems);

    // Calculate and set the total value
    const newTotal = updatedItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalValue(newTotal);
  };

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div>
      <h3 className="mb-4">My Cart</h3>
      {cartData.length > 0 ? (
        <>
          <Row>
            {cartData.map((item) => (
              <CartCard
                key={item.product._id}
                product={item}
                onCartUpdate={handleCartUpdate} // Pass handler to child
              />
            ))}
          </Row>
          <div className="mt-4 text-end">
            <ListGroup>
              <ListGroup.Item className="fw-bold">
                Total: ₹{totalValue}
              </ListGroup.Item>
            </ListGroup>
          </div>
        </>
      ) : (
        <Col className="text-center">
          <p>Your cart is empty.</p>
        </Col>
      )}
    </div>
  );
};

export default Cart;
