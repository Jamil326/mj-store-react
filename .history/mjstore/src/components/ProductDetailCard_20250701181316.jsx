import React from "react";
import { Col, Image, Carousel, Card, ListGroup, Row } from "react-bootstrap";
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
    <Col xs={12} className="mx-auto">
      {/* Primary Carousel */}
      {image.length > 0 && (
        <Carousel className="shadow rounded mb-4">
          {image.map((img, index) => (
            <Carousel.Item key={index} className="text-center">
              <Image
                src={img.url || "/placeholder.jpg"}
                fluid
                thumbnail
                className="p-3"
                style={{ maxHeight: "350px", objectFit: "contain" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* Secondary Carousel */}
      {image.length > 0 && (
        <Carousel className="shadow-sm rounded mb-4" indicators={false} controls>
          <Carousel.Item className="d-flex justify-content-center">
            {image.slice(0, 3).map((img, index) => (
              <Image
                key={index}
                src={img.url || "/placeholder.jpg"}
                fluid
                className="rounded mx-2"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />
            ))}
          </Carousel.Item>
          {image.length > 3 && (
            <Carousel.Item className="d-flex justify-content-center">
              {image.slice(3).map((img, index) => (
                <Image
                  key={index}
                  src={img.url || "/placeholder.jpg"}
                  fluid
                  className="rounded mx-2"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </Carousel.Item>
          )}
        </Carousel>
      )}

      {/* Product Info Card */}
      <Card className="shadow-sm border-0 rounded p-3 mb-4">
        <Card.Body>
          <Card.Title className="text-center text-dark fs-4 fw-bold mb-2">
            {name || "Unnamed Product"}
          </Card.Title>
          <Card.Subtitle className="text-muted text-center mb-3">
            {title || "No Title Available"}
          </Card.Subtitle>
          <Card.Text className="text-dark mb-3 text-justify">
            <strong>Description: </strong>
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
      <Card className="shadow-sm border-0 rounded">
        <Card.Header className="text-center text-success fs-5 fw-bold">
          Product Details
        </Card.Header>
        <ListGroup className="list-group-flush">
          {[
            { label: "Name", value: name, icon: <FaTag className="me-2" /> },
            { label: "Price", value: price, icon: <FaRupeeSign className="me-2" /> },
            { label: "Brand", value: brand, icon: <FaBoxOpen className="me-2" /> },
            { label: "Color", value: color, icon: <FaPalette className="me-2" /> },
            { label: "Material", value: material, icon: <FaTools className="me-2" /> },
            { label: "Power", value: power, icon: <FaBolt className="me-2" /> },
            {
              label: "Power Supply",
              value: power_supply,
              icon: <FaBolt className="me-2" />,
            },
            {
              label: "Dimensions",
              value: `${length || "N/A"} x ${width || "N/A"} x ${
                height || "N/A"
              } cm`,
              icon: <FaRulerCombined className="me-2" />,
            },
            { label: "Usage", value: usage, icon: <FaUserCheck className="me-2" /> },
            { label: "Warranty", value: warranty, icon: <FaTag className="me-2" /> },
            { label: "Category", value: category, icon: <FaBoxOpen className="me-2" /> },
            { label: "Product ID", value: _id, icon: <FaTag className="me-2" /> },
          ].map((item, idx) => (
            <ListGroup.Item
              key={idx}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center text-success">
                {item.icon}
                <strong>{item.label}:</strong>
              </div>
              <span className="text-dark">{item.value || "N/A"}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Col>
  );
};

export default ProductDetailCard;
