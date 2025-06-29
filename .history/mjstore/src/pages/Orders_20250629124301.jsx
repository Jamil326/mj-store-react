import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  FaTruck,
  FaBox,
  FaRupeeSign,
  FaClipboardList,
  FaFingerprint,
  FaSortAmountUp,
  FaShoppingCart,
  FaMoneyBill,
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

  // Cancel Order
  const cancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token required.");

      const res = await fetch(`https://mj-store.onrender.com/api/v1/user/order/cancel/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(result.message || "Order canceled successfully.");
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      toast.error(error.message || "An error occurred while canceling the order.");
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

  // Calculate Delivery Date
  const calculateDeliveryDate = (orderDate) => {
    const orderDateTime = new Date(orderDate);
    const deliveryDate = new Date(orderDateTime);
    deliveryDate.setDate(orderDateTime.getDate() + 1); // Next day
    deliveryDate.setHours(10); // Set time to 10:00 AM

    return formatDate(deliveryDate.toISOString());
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container fluid className="py-4">
      <h1 className="text-center text-success mb-4" style={{ fontWeight: "600", color: "#FF5675" }}>
        My Orders
      </h1>

      {/* Total Orders Summary */}
      <Card className="mb-4 shadow-sm border-0 text-center">
        <Card.Body>
          <h6 className="mb-0 d-flex justify-content-center align-items-center" style={{ fontWeight: "600" }}>
            <FaShoppingCart style={{ marginRight: "8px", color: "#28a745" }} />
            Total Orders: <span className='text-' style={{ marginLeft: "8px", color: "#007bff" }}>{orders.length}</span>
          </h6>
        </Card.Body>
      </Card>

      {orders.length > 0 ? (
        orders.map((order) => (
          <Card key={order._id} className="mb-4 shadow-sm border-0">
            <Card.Body>
              {/* Order Details */}
              <h6 className="mb-2 d-flex align-items-center" style={{ fontWeight: "600" }}>
                <FaFingerprint style={{ marginRight: "8px", color: "#007bff" }} />
                Order ID: {order._id}
              </h6>
              <p className="mb-2">
                <FaClipboardList style={{ marginRight: "8px", color: "#ffc107" }} />
                Status:{" "}
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
              <p className="mb-2">
                <FaTruck style={{ marginRight: "8px", color: "#28a745" }} />
                Expected Delivery:{" "}
                {order.deliveryDate
                  ? formatDate(order.deliveryDate)
                  : calculateDeliveryDate(order.orderDate)}
              </p>

              {/* Payment Details */}
              <Card className="shadow-sm border-0 my-3">
                <Card.Body>
                  <h6 className="d-flex align-items-center" style={{ fontWeight: "600" }}>
                    <FaMoneyBill style={{ marginRight: "8px", color: "#17a2b8" }} />
                    Payment Method: {order.paymentMethod || "N/A"}
                  </h6>
                  <p className="d-flex align-items-center">
                    <FaRupeeSign style={{ marginRight: "8px", color: "#28a745" }} />
                    Total Amount: ₹{order.totalAmount}
                  </p>
                </Card.Body>
              </Card>

              {/* Cart Items */}
              <ListGroup>
                {order.items.map((item, idx) => (
                  <ListGroup.Item key={idx} className="d-flex align-items-center">
                    <img
                      src={item.product?.image[0]?.url || "/placeholder.jpg"}
                      alt={item.product?.name || "Product Image"}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "4px",
                        objectFit: "cover",
                        marginRight: "16px",
                      }}
                    />
                    <div>
                      <h6 className="mb-1">{item.product?.name || "Product Name"}</h6>
                      <p className="mb-0">
                        <FaSortAmountUp style={{ marginRight: "8px", color: "#ffc107" }} />
                        Quantity: {item.quantity || 1}
                      </p>
                      <p className="mb-0">
                        <FaRupeeSign style={{ marginRight: "8px", color: "#28a745" }} />
                        Total: ₹{item.totalValue || 0}
                      </p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {/* Cancel Order Button */}
              <div className="d-flex justify-content-end mt-3">
                {order.orderStatus !== "Delivered" && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded-pill"
                    onClick={() => cancelOrder(order._id)}
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
            </Card.Body>
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
