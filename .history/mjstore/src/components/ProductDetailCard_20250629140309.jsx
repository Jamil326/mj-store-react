import React from "react";
import {
  Col,
  Image,
  Carousel,
  Card,
  ListGroup,
} from "react-bootstrap";
import {
  FaRupeeSign,
  FaShippingFast,
  FaBoxOpen,
  FaTag,
  FaPalette,
  FaTools,
  FaBolt,
  FaRulerCombined,
  FaUserCheck,
} from "react-icons/fa";

const ProductDetailCard = ({ Product }) => {
  if (!Product) {
    return <p>No product available</p>;
  }

  const {
    _id,
    price,
    title,
    brand,
    category,
    color,
    description,
    material,
    name,
    power,
    power_supply,
    usage,
    warranty,
    image = [],
    size = {},
  } = Product;

  const { length, width, height } = size;

  return (
    <Col xs={12} sm={8} md={6} className="mx-auto">
      {/* Carousel Section */}
      <Carousel className="shadow rounded mb-4">
        {image.map((img, index) => (
          <Carousel.Item key={index} className="text-center">
            <Image
              src={img.url || "/placeholder.jpg"}
              fluid
              thumbnail
              className="p-3"
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Product Info Card */}
      <Card className="shadow-sm border-0 rounded p-3 mb-4">
        <Card.Body>
          <Card.Title className="text-center text-success fs-4 fw-bold">
            {name || "Unnamed Product"}
          </Card.Title>
          <Card.Subtitle className="text-muted text-center mb-3">
            {title || "No Title Available"}
          </Card.Subtitle>
          <Card.Text className="text-dark text-center mb-3">
            {description || "No description available."}
          </Card.Text>
          <Card.Text className="text-center text-success fs-3 fw-bold">
            <FaRupeeSign className="me-2" />
            {price || "N/A"}
          </Card.Text>
          <div className="text-center">
            <span className="text-muted">
              <FaShippingFast className="me-2" />
              Free Delivery
            </span>
          </div>
        </Card.Body>
      </Card>

      {/* Product Details */}
      <h4 className="text-success mb-3">Product Details</h4>
      <ListGroup className="mb-5">
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <FaTag className="me-2 text-success" />
          <strong>Name:</strong>
          <span>{name || "N/A"}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <FaRupeeSign className="me-2 text-success" />
          <strong>Price:</strong>
          <span>{price || "N/A"}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <FaBoxOpen className="me-2 text-success" />
          <strong>Brand:</strong>
          <span>{brand || "N/A"}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <FaPalette className="me-2 text-success" />
          <strong>Color:</strong>
          <span>{color || "N/A"}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <FaTools className="me-2 text-success" />
          <strong>Material:</strong>
          <span>{material || "N/A"}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <FaBolt className="me-2 text-success" />
          <strong>Power:</strong>
          <span>{power || "N/A"}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <FaBolt className="me-2 text-success" />
          <strong>Power Supply:</strong>
          <span>{power_supply || "N/A"}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <FaRulerCombined className="me-2 text-success" />
          <strong>Dimensions:</strong>
          <span>
            {length || "N/A"} x {width || "N/A"} x {height || "N/A"} cm
          </span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <FaUserCheck className="me-2 text-success" />
          <strong>Usage:</strong>
          <span>{usage || "N/A"}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <FaTag className="me-2 text-success" />
          <strong>Warranty:</strong>
          <span>{warranty || "N/A"}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <FaBoxOpen className="me-2 text-success" />
          <strong>Category:</strong>
          <span>{category || "N/A"}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <FaTag className="me-2 text-success" />
          <strong>Product ID:</strong>
          <span>{_id || "N/A"}</span>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default ProductDetailCard;
