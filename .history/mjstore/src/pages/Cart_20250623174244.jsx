import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import CartCard from "../components/CartCard";

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Cart Data
  const fetchCartData = async () => {
    const url = "https://mj-store.onrender.com/api/v1/user/cart/fetch";
    const token = localStorage.getItem("token");

    try {
      if (!token) {
        throw new Error("Authentication token is missing. Please log in.");
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        setItems(result.data.items || []);
        setLoading(false);
      } else {
        toast.warn(result.message || "Failed to fetch cart data.");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching the cart.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // Remove Item from Cart
  const handleRemove = async (itemId) => {
    const url = `https://mj-store.onrender.com/api/v1/user/cart/remove/${itemId}`;
    const token = localStorage.getItem("token");

    try {
      if (!token) {
        throw new Error("Authentication token is missing. Please log in.");
      }

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      clg

      if (res.ok) {
        toast.success("Item removed successfully.");
        setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      } else {
        toast.warn(result.message || "Failed to remove item.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while removing the item.");
    }
  };

  // Checkout Handler
  const handleCheckout = () => {
    const itemIds = items.map((item) => item._id);
    if (itemIds.length === 0) {
      toast.warn("Your cart is empty.");
      return;
    }

    navigate("/checkout", { state: { itemIds } });
  };

  return (
    <div className="container py-4">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <span>Loading...</span>
        </div>
      ) : items.length > 0 ? (
        <div className="row">
          {items.map((item) => (
            <div key={item._id} className="col-12 col-md-6 col-lg-4 mb-4">
              <CartCard product={item.product} quantity={item.quantity} />
              <div className="d-flex justify-content-between mt-2">
                <Button variant="danger" onClick={() => handleRemove(item._id)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="col-12 text-center mt-4">
            <Button variant="success" size="lg" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column vh-100 justify-content-center align-items-center text-center">
          <HiOutlineShoppingCart className="fs-1 text-success mb-3" />
          <h4>Your Cart is Empty</h4>
          <Button variant="primary" onClick={() => navigate("/shop")}>
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
