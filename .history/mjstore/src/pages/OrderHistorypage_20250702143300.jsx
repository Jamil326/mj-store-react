import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner, Alert, Button, Badge } from "react-bootstrap";
import { FaRupeeSign, FaCalendarAlt, FaBoxOpen } from "react-icons/fa";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your API call
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch("https");
        const data = await res.json();
        setOrders(data.orders || []);
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
                    {order.orderItems.length} item{order.orderItems.length > 1 ? "s" : ""}
                  </Card.Text>
                  <Card.Text>
                    <FaRupeeSign className="me-2 text-warning" />
                    <strong>{order.totalPrice}</strong>
                  </Card.Text>
                  <div className="mt-3">
                    <Badge bg={order.isDelivered ? "success" : "warning"} className="me-2">
                      {order.isDelivered ? "Delivered" : "Processing"}
                    </Badge>
                    <Badge bg={order.isPaid ? "info" : "secondary"}>
                      {order.isPaid ? "Paid" : "Pending"}
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
