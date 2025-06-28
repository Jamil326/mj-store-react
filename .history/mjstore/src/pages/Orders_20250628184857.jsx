import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";

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

      setOrders(result.data.filter((order) => order.orderStatus !== "Cancelled"));
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

  return (
    <Container fluid className="py-4">
      <h1 className="text-center mb-4" style={{ fontWeight: "600", color: "#FF5675" }}>
        My Orders
      </h1>

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
              <Col md={4} className="p-2">
                <img
                  src={order.items[0]?.product?.image[0]?.url || "/placeholder.jpg"}
                  alt={order.items[0]?.product?.name || "Product Image"}
                  style={{ width: "100%", height: "100%", borderRadius: "8px", objectFit: "cover" }}
                />
              </Col>
              <Col md={8} className="d-flex flex-column justify-content-between p-3">
                <div>
                  <h6 className="mb-1" style={{ fontWeight: "600" }}>
                    {order.items[0]?.product?.name || "Product Name"}
                  </h6>
                  <p className="mb-1" style={{ fontSize: "14px", color: "#666" }}>
                    Total: ₹{order.totalAmount}
                  </p>
                  <p className="mb-1" style={{ fontSize: "14px", color: "#666" }}>
                    Order Status: {order.orderStatus}
                  </p>
                  <p className="mb-1" style={{ fontSize: "14px", color: "#666" }}>
                    Delivery Address: {order.shippingAddress.street}, {order.shippingAddress.city}
                  </p>
                </div>
                <div className="d-flex justify-content-end mt-2">
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
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <img
            src="/no-orders.svg"
            alt="No Orders"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <p className="text-center" style={{ fontSize: "16px", color: "#999" }}>
            You don’t have any orders yet. Start shopping now!
          </p>
        </div>
      )}
    </Container>
  );
};

export default Orders;
