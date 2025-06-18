import { Col, Row, Card, ListGroup } from "react-bootstrap";

const OrderCard = ({ details }) => {
  if (!details) {
    return <p className="text-center my-4">Order details are empty</p>;
  }

  const {
    items = [],
    orderDate,
    orderStatus,
    paymentMethod,
    paymentStatus,
    shippingAddress = {},
    totalAmount,
  } = details;

  const { city, street, pin, landmark, state } = shippingAddress;

  return (
    <div>
      <Row>
        {items.length > 0 ? (
          items.map((item, index) => (
            <Col key={index} xs={12} className="mb-4">
              <Card className="shadow-sm">
                <Card.Header className="bg-success text-white fw-bold">
                  Order ID: {item.product}
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Quantity:</strong> {item.quantity}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Order Date:</strong> {new Date(orderDate).toLocaleDateString()}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Order Status:</strong> {orderStatus}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Payment Method:</strong> {paymentMethod}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Payment Status:</strong> {paymentStatus}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Street:</strong> {street || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Landmark:</strong> {landmark || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>City:</strong> {city || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Pin Code:</strong> {pin || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>State:</strong> {state || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Total Amount:</strong> ₹{item.totalValue || "0.00"}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <span className="text-muted">No items found</span>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default OrderCard;
