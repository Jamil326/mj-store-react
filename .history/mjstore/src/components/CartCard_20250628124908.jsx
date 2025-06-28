import { Col, Button, ListGroup, Card } from "react-bootstrap";

const CartCard = ({ product, onIncrease, onDecrease, onRemove }) => {
  if (!product || !product.product) {
    return (
      <Col xs={12}>
        <p>No item data available</p>
      </Col>
    );
  }

  const { name, price, _id, image = [] } = product.product;
  const quantity = product.quantity || 1;

  return (
    <Col xs={12} sm={10} md={4}>
      <Card className="mb-4">
        <Card.Img
          className="p-5"
          src={image[0]?.url || "/placeholder.jpg"}
          alt={name || "Product"}
        />
        <Card.Body>
          <Card.Title className="text-center">{name || "Unnamed Product"}</Card.Title>
          <ListGroup className="mb-3">
            <ListGroup.Item>
              <span className="me-5">Price:</span>
              <span>₹{price}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="me-5">Quantity:</span>
              <div className="d-inline-flex align-items-center ms-3">
                <Button
                  variant="outline-primary"
                  onClick={() => onDecrease(_id)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="mx-3 fs-5">{quantity}</span>
                <Button variant="outline-primary" onClick={() => onIncrease(_id)}>
                  +
                </Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="fw-bold">
              <span className="me-5">Total:</span>
              <span>₹{price * quantity}</span>
            </ListGroup.Item>
          </ListGroup>
          <div className="d-flex justify-content-between">
            <Button variant="danger" onClick={() => onRemove(_id)}>
              Remove
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CartCard;
