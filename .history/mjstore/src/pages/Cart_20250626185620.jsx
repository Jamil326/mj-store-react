import { useState, useEffect } from "react";
import { Button, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import CartCard from "./CartCard";

const Cart = () => {
  const [cartData, setCartData] = useState([]); // State for cart items
  const [totalValue, setTotalValue] = useState(0);

  // Fetch cart data
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
        setCartData(result.data.items); // Update cart items
        setTotalValue(result.data.totalCartValue); // Update total cart value
      } else {
        throw new Error(result.message || "Failed to fetch cart data.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching cart data.");
    }
  };

  // Handle cart update from child
  const handleCartUpdate = (updatedItems) => {
    setCartData(updatedItems);

    // Update total value
    const newTotal = updatedItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalValue(newTotal);
  };

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
                onCartUpdate={handleCartUpdate} // Pass the handler
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
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
