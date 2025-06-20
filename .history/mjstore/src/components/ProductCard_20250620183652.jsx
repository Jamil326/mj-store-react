import React from "react";
import { Card, Button, Col } from "react-bootstrap";

const ProductCard = ({ product }) => {
  const { _id, name, price, title, image } = product;

  return (
    <Col xs={12} sm={6}  lg={} id={_id} className="mb-4">
      <Card className="shadow-sm rounded h-100 border-0">
        {/* Product Image */}
        <Card.Img
          variant="top"
          src={image[0]?.url || "/placeholder-image.png"}
          alt={name}
          className="img-fluid rounded-top object-fit-cover"
          style={{ height: "200px", objectFit: "cover" }}
        />
        {/* Product Details */}
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate">{name}</Card.Title>
          <Card.Subtitle className="text-muted text-truncate">
            {title}
          </Card.Subtitle>
          <Card.Text className="mt-2 text-success fw-bold">
            ₹{price} <span className="text-muted fs-6">(Free Delivery)</span>
          </Card.Text>
          {/* Action Buttons */}
          <div className="mt-auto d-grid gap-2">
            <Button variant="dark " size="sm">
              Add To Cart
            </Button>
            <Button variant="success" size="sm">
              Buy Now
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
