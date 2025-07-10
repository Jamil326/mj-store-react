import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";
import { Button, ListGroup, Spinner } from "react-bootstrap";
import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Only fetch token once
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // Memoized total value
  const totalValue = useMemo(() => {
    return cartData.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartData]);

  // Update cart state
  const updateCart = useCallback((items) => {
    setCartData(items);
  }, []);

  // Fetch cart items from API
  const fetchCartItems = useCallback(async () => {
    if (!token) return;
    const controller = new AbortController();
    setLoading(true);
    try {
      const response = await fetch("https://mj-store.onrender.com/api/v1/user/cart/fetch", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch cart items.");
      updateCart(result.data.items || []);
    } catch (error) {
      if (error.name !== "AbortError") {
        toast.error(error.message || "An error occurred while fetching cart items.");
        updateCart([]);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [token, updateCart]);

  // Clear cart
  const handleClearCart = useCallback(async () => {
    if (!token) {
      toast.error("Invalid token. Please log in.");
      return;
    }

    try {
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
  }, [token, fetchCartItems]);

  // Navigate to checkout
  const handleCheckout = useCallback(() => {
    if (cartData.length === 0) {
      toast.warn("No items to checkout.");
      return;
    }
    navigate("/checkout2", { state: { items: cartData } });
  }, [cartData, navigate]);

  useEffect(() => {
    if (token) fetchCartItems();
  }, [token, fetchCartItems]);

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Add My Cart Heading */}
      <div className="text-center py-3">
        <h1 className="text-dark fw-bold">
          <HiOutlineShoppingCart className="me-2" />
          My Cart
        </h1>
      </div>

      {cartData.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center p-2">
            <Button onClick={handleClearCart} variant="outline-danger" className="d-flex align-items-center gap-2">
              <FaTrashAlt />
              Clear Cart
            </Button>
          </div>

          <div className="d-flex flex-wrap gap-3">
            {cartData.map((item) => (
              <CartCard
                key={item.product._id}
                product={{ product: item.product, quantity: item.quantity }}
                onCartUpdate={fetchCartItems}
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

          <div className="d-flex flex-column text-center gap-2 mt-3 mb-3 p-3">
            <Button
              onClick={handleCheckout}
              variant="success"
              className="w-100 d-flex align-items-center justify-content-center gap-2"
            >
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
