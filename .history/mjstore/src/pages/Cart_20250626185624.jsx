import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { HiOutlineShoppingCart } from "react-icons/hi2";

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  // Fetch cart items from API
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Invalid token. Please log in.");

      const res = await fetch("https://mj-store.onrender.com/api/v1/user/cart/fetch", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to fetch cart items.");

      updateCart(result.data.items || []);
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching cart items.");
    }
  };

  // Update cart state
  const updateCart = (cartItems) => {
    setItems(cartItems);
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setTotalValue(total);
  };

  // Clear the entire cart
  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Invalid token. Please log in.");

      const res = await fetch("https://mj-store.onrender.com/api/v1/user/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to clear cart.");

      toast.success(result.message || "Cart cleared successfully.");
      updateCart([]); // Clear UI state
    } catch (error) {
      toast.error(error.message || "An error occurred while clearing the cart.");
    }
  };

  // Remove a single item from the cart
  const handleRemoveFromCart = (productId) => {
    updateCart(items.filter((item) => item.product._id !== productId));
  };

  // Navigate to the checkout page
  const handleCheckout = () => {
    const itemIds = items.map((item) => item.product._id);

    if (itemIds.length === 0) {
      toast.warn("No items to checkout.");
      return;
    }

    navigate("/checkout2", { state: { itemIds } });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div>
      {items.length > 0 ? (
        <>
          {/* Clear Cart Button */}
          <div className="d-flex justify-content-between align-items-center p-3">
            <Button onClick={handleClearCart} variant="danger">
              Clear Cart
            </Button>
          </div>

          {/* Render Cart Items */}
          <div className="d-flex flex-wrap gap-3">
            {items.map((item) => (
              <CartCard
                key={item.product._id}
                product={{ product: item.product, quantity: item.quantity }}
                onRemoveSuccess={() => handleRemoveFromCart(item.product._id)}
                onCartUpdate={(updatedCart) => setCartData(updatedCart)}

              />
            ))}
          </div>

          {/* Cart Total and Checkout */}
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <ListGroup className="w-100">
              <ListGroup.Item className="text-end">
                <strong>Total Value: ₹{totalValue}</strong>
              </ListGroup.Item>
            </ListGroup>
          </div>

          <div className="d-flex flex-column gap-2 mt-3 mb-3 p-3">
            <Button onClick={handleCheckout} variant="success" className="w-100">
              Check Out
            </Button>
          </div>
        </>
      ) : (
        <div className="d-flex flex-column vh-100 justify-content-center align-items-center text-center">
          <HiOutlineShoppingCart className="fs-1 text-success w-50 h-25" />
          <span className="text-dark fw-bold">Your Cart is Empty</span>
        </div>
      )}
    </div>
  );
};

export default Cart;
