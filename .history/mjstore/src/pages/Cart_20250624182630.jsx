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

  // Fetch cart items
  const fetchCartItems = async () => {
    const url = "https://mj-store.onrender.com/api/v1/user/cart/fetch";
    const token = localStorage.getItem("token");

    try {
      if (!token) {
        throw new Error("Invalid token. Please log in.");
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        updateCart(result.data.items || []);
        fetchCartItems();
      } else {
        toast.warn(result.message || "Failed to fetch cart items.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching cart items.");
    }
  };

  // Update cart items and total value
  const updateCart = (cartItems) => {
    setItems(cartItems);
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setTotalValue(total);
  };

  // Clear all items from cart
  const handleClearCart = async () => {
    const url = "https://mj-store.onrender.com/api/v1/user/cart/clear";
    const token = localStorage.getItem("token");

    try {
      if (!token) {
        throw new Error("Invalid token. Please log in.");
      }

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Cart cleared successfully.");
        updateCart([]); // Clear the cart in the UI
      } else {
        toast.warn(result.message || "Failed to clear cart.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while clearing the cart.");
    }
  };

  const handleRemoveFromCart = async (productId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://mj-store.onrender.com/api/v1/user/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Item removed from cart.");
        updateCart(items.filter((item) => item.product._id !== productId));
      } else {
        toast.warn(result.message || "Failed to remove item.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while removing the item.");
    }
  };

  // Checkout items
  const handleCheckout = () => {
    const itemIds = items.map((item) => item.product._id);

    if (!itemIds.length) {
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
          {/* Refresh and Clear Cart Buttons */}
          <div className="d-flex justify-content-between align-items-center p-3">
           
            <Button onClick={handleClearCart} variant="danger">
              Clear Cart
            </Button>
          </div>

          {items.map((item) => (
            <CartCard
              key={item.product._id}
              product={{ product: item.product, quantity: item.quantity }}
              onRemoveSuccess={() => handleRemoveFromCart(item.product._id)}
            />
          ))}

          {/* Cart Total */}
          <div className="d-flex justify-content-end align-items-center p-3 border-top">
            <ListGroup>
              <ListGroup.Item className="text-end">
                <strong>Total Value: ₹{totalValue}</strong>
              </ListGroup.Item>
            </ListGroup>
          </div>

          <div className="d-flex flex-column gap-1 mt-3 mb-3 p-3">
            <Button onClick={handleCheckout} variant="success" className="col-12">
              Check Out
            </Button>
          </div>
        </>
      ) : (
        <div className="d-flex flex-column vh-100 justify-content-center align-items-center text-center">
          <HiOutlineShoppingCart className="fs-1 text-success w-50 h-25" />
          <span className="text-dark fw-bold">Cart is Empty</span>
        </div>
      )}
    </div>
  );
};

export default Cart;
