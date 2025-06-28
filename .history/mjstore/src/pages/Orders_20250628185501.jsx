import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  FaTruck,
  FaMapMarkerAlt,
  FaBox,
  FaRupeeSign,
  FaClipboardList,
  FaFingerprint,
} from "react-icons/fa";

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

  // Calculate Delivery Date
  const calculateDeliveryDate = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 1);
    return {
      date: date.toLocaleDateString(),
      timeWindow: "9:00 AM to 6:00 PM",
    };
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
        orders.map((order) => {
          const deliveryInfo = order.deliveryDate
            ? {
                date: new Date(order.deliveryDate).toLocaleDateString(),
                timeWindow: "9:00 AM to 6:00 PM",
              }
            : calculateDeliveryDate(order.orderDate);

          return (
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
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col md={8} className="d-flex flex-column justify-content-between p-3">
                  <div>
                    <h6 className="mb-1 d-flex align-items-center" style={{ fontWeight: "600" }}>
                      <FaFingerprint style={{ marginRight: "8px", color: "#007bff" }} />
                      Order ID: {order._id}
                    </h6>
                    <h6 className="mb-1 d-flex align-items-center" style={{ fontWeight: "600" }}>
                      <FaBox style={{ marginRight: "8px", color: "#007bff" }} />
                      {order.items[0]?.product?.name || "Product Name"}
                    </h6>
                    <p className="mb-1 d-flex align-items-center" style={{ fontSize: "14px", color: "#666" }}>
                      <FaRupeeSign style={{ marginRight: "8px", color: "#28a745" }} />
                      Total: ₹{order.totalAmount}
                    </p>
                    <p className="mb-1 d-flex align-items-center" style={{ fontSize: "14px", color: "#666" }}>
                      <FaClipboardList style={{ marginRight: "8px", color: "#ffc107" }} />
                      Order Status: {order.orderStatus}
                    </p>
                    <p className="mb-1 d-flex align-items-center" style={{ fontSize: "14px", color: "#666" }}>
                      <FaMapMarkerAlt style={{ marginRight: "8px", color: "#dc3545" }} />
                      Address: {order.shippingAddress.street}, {order.shippingAddress.city}
                    </p>
                    <p className="mt-3 d-flex align-items-center">
                      <FaTruck style={{ color: "#28a745", marginRight: "8px" }} />
                      <span style={{ fontWeight: "500", color: "#333" }}>
                        Delivery Date: {deliveryInfo.date} ({deliveryInfo.timeWindow})
                      </span>
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
          );
        })
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
