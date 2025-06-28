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
  FaMoneyBillAlt,
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

  // Format Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const suffix = ["th", "st", "nd", "rd"][
      (day % 10 > 3 || Math.floor((day % 100) / 10) === 1) ? 0 : day % 10
    ];

    return `${day}${suffix} of ${month} ${year}`;
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
                    Order Status:{" "}
                    <span
                      className={
                        order.orderStatus === "Pending"
                          ? "text-warning"
                          : order.orderStatus === "Shipped"
                          ? "text-primary"
                          : order.orderStatus === "Out for Delivery"
                          ? "text-info"
                          : "text-success"
                      }
                    >
                      {order.orderStatus}
                    </span>
                  </p>
                  <p className="mb-1 d-flex align-items-center" style={{ fontSize: "14px", color: "#666" }}>
                    <FaMoneyBillAlt style={{ marginRight: "8px", color: "#17a2b8" }} />
                    Payment Method: {order.paymentMethod || "N/A"}
                  </p>
                  <p className="mt-3 d-flex align-items-center">
                    <FaTruck style={{ color: "#28a745", marginRight: "8px" }} />
                    <span style={{ fontWeight: "500", color: "#333" }}>
                      Expected Delivery: {formatDate(order.deliveryDate || order.orderDate)}
                    </span>
                  </p>
                </div>
                <div className="d-flex justify-content-end mt-2">
                  {order.orderStatus !== "Delivered" && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="rounded-pill"
                    >
                      Cancel Order
                    </Button>
                  )}
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
