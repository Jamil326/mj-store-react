import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import OrderCard from "../components/OrderCard";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token required.");

      const res = await fetch("https://mj-store.onrender.com/api/v1/user/order/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      if (res.status === 200) {
        setOrders(result.data.filter((item) => item.orderStatus !== "Cancelled"));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Cancel Order
  const cancelOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token required.");

      const res = await fetch(`https://mj-store.onrender.com/api/v1/user/order/cancel/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(result.message);
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Clear All Orders
  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <Container className="py-4">
      <h1 className="text-center border-bottom pb-3">Orders Summary</h1>
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={clearOrders} variant="danger">
          Clear All
        </Button>
      </div>

      {orders.length > 0 ? (
        orders.map((order, index) => (
          <Row key={order._id} className="shadow mb-4 p-3">
            <Col>
              <h6 className="text-center mb-3">Order ID: {order._id}</h6>
              <OrderCard details={order} />
              <div className="text-center my-2">
                <strong>Total Cart Value:</strong> ₹{order.totalAmount}
              </div>
              <div className="text-center">
                <Button
                  variant="dark"
                  onClick={() => cancelOrder(order._id)}
                  className="ms-2"
                >
                  Cancel Order
                </Button>
              </div>
            </Col>
          </Row>
        ))
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <p className="text-center">No orders available.</p>
        </div>
      )}
    </Container>
  );
};

export default Orders;
