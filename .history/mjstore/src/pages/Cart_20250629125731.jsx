import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  // Update cart state and calculate total value
  const updateCart = (items) => {
    setCartData(items);
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setTotalValue(total);
  };

  // Fetch cart items from API
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Invalid token. Please log in.");

      const response = await fetch("https://mj-store.onrender.com/api/v1/user/cart/fetch", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch cart items.");

      updateCart(result.data.items || []);
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching cart items.");
      updateCart([]);
    }
  };

  // Clear cart
  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Invalid token. Please log in.");

      const response = await fetch("https://mj-store.onrender.com/api/v1/user/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to clear cart.");

      toast.success(result.message || "Cart cleared successfully.");
      fetchCartItems(); // Refetch cart after clearing
    } catch (error) {
      toast.error(error.message || "An error occurred while clearing the cart.");
    }
  };

  // Navigate to checkout
  const handleCheckout = () => {
    if (cartData.length === 0) {
      toast.warn("No items to checkout.");
      return;
    }
    navigate("/checkout2", { state: { items: cartData } });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div>
      {cartData.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center p-3">
            <Button onClick={handleClearCart} variant="success" className="d-flex align-items-center gap-2">
              <FaTrashAlt />
              Clear Cart
            </Button>
          </div>

          <div className="d-flex flex-wrap gap-3">
            {cartData.map((item) => (
              <CartCard
                key={item.product._id}
                product={{ product: item.product, quantity: item.quantity }}
                onCartUpdate={fetchCartItems} // Callback to refetch cart
              />
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <ListGroup className="w-100">
              <ListGroup.Item className="text-end">
                <strong>Total Value: ₹{totalValue}</strong>
              </ListGroup.Item>
            </ListGroup>
          </div>

          <div className="d-flex flex-column  gap-2 mt-3 mb-3 p-3">
            <Button onClick={handleCheckout} variant="success" className="w-100 text d-flex align-items-center gap-2">
              <FaShoppingCart />
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
