import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
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
      console.log();
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
    <Container fluid className="py-4">
      <h1 className="text-center mb-4" style={{ fontWeight: "600", color: "#FF5675" }}>
        My Orders
      </h1>

      <div className="d-flex justify-content-between align-items-center mb-3 px-3">
        <h6 className="m-0" style={{ fontWeight: "500", color: "#666" }}>
          Total Orders: {orders.length}
        </h6>
        <Button onClick={clearOrders} variant="danger" className="rounded-pill px-3 py-2">
          Clear All
        </Button>
      </div>

      {orders.length > 0 ? (
        orders.map((order) => (
          <Card
            key={order._id}
            className="mb-4 shadow-sm border-0"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <Row noGutters>
              <Col xs={4} className="p-2">
                <img
                  src={order?.image || "/placeholder.jpg"}
                  alt="Product"
                  style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                />
              </Col>
              <Col xs={8} className="d-flex flex-column justify-content-between p-3">
                <div>
                  <h6 className="mb-1" style={{ fontWeight: "600" }}>
                    Order ID: {order._id}
                  </h6>
                  <p className="mb-1" style={{ fontSize: "14px", color: "#666" }}>
                    Total Cart Value: ₹{order.totalAmount}
                  </p>
                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => cancelOrder(order._id)}
                    className="rounded-pill"
                  >
                    Cancel Order
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        ))
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <p className="text-center" style={{ fontSize: "16px", color: "#999" }}>
            You don’t have any orders yet. Start shopping now!
          </p>
        </div>
      )}
    </Container>
  );
};

export default Orders;
