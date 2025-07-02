import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Badge,
  Image,
} from "react-bootstrap";
import {
  FaRupeeSign,
  FaCalendarAlt,
  FaBoxOpen,
  FaCreditCard,
} from "react-icons/fa";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        const res = await fetch(
          "https://mj-store.onrender.com/api/v1/user/order/history",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        console.log(data.data);
        setOrders(data.data || []);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center text-success fw-bold">Your Orders</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="success" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : orders.length === 0 ? (
        <Alert variant="info">No orders found.</Alert>
      ) : (
        <Row>
          {orders.map((order) => (
            <Col md={6} lg={4} className="mb-4" key={order._id}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <Card.Title className="fw-bold text-primary">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </Card.Title>

                  <Card.Subtitle className="mb-2 text-muted">
                    <FaCalendarAlt className="me-2" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Card.Subtitle>

                  <Card.Text>
                    <FaBoxOpen className="me-2 text-success" />
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </Card.Text>

                  <Card.Text>
                    <FaRupeeSign className="me-2 text-warning" />
                    <strong>{order.totalAmount}</strong>
                  </Card.Text>

                  <Card.Text>
                    <FaCreditCard className="me-2 text-info" />
                    {order.paymentMethod || "N/A"}
                  </Card.Text>

                  {order.items[0]?.product?.image?.[0]?.url && (
                    <Image
                      src={order.items[0].product.image[0].url}
                      alt="Product Thumbnail"
                      fluid
                      rounded
                      className="mt-3 border"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  )}

                  <div className="mt-3">
                    <Badge
                      bg={order.orderStatus === "Cancelled" ? "s" : "warning"}
                      className="me-2"
                    >
                      {order.orderStatus || "Processing"}
                    </Badge>
                    <Badge
                      bg={
                        order.paymentMethod === "Cash On Delivery"
                          ? "secondary"
                          : "info"
                      }
                    >
                      {order.paymentMethod}
                    </Badge>
                  </div>
                </Card.Body>

                <Card.Footer className="text-center">
                  <Button variant="outline-primary" size="sm">
                    View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default OrderHistoryPage;
