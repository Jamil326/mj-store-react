import React, { useState } from "react";
import { Col, Image, Carousel, Card, ListGroup, Row, Modal, Button } from "react-bootstrap";
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
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

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
    size: { length, width, height } = {},
  } = Product;

  const handleImageClick = (imgUrl) => {
    setCurrentImage(imgUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentImage(null);
  };

  const productDetails = [
    { label: "Name", value: name, icon: <FaTag className="me-2" /> },
    { label: "Price", value: price, icon: <FaRupeeSign className="me-2" /> },
    { label: "Brand", value: brand, icon: <FaBoxOpen className="me-2" /> },
    { label: "Color", value: color, icon: <FaPalette className="me-2" /> },
    { label: "Material", value: material, icon: <FaTools className="me-2" /> },
    { label: "Power", value: power, icon: <FaBolt className="me-2" /> },
    { label: "Power Supply", value: power_supply, icon: <FaBolt className="me-2" /> },
    {
      label: "Dimensions",
      value: `${length || "N/A"} x ${width || "N/A"} x ${height || "N/A"} cm`,
      icon: <FaRulerCombined className="me-2" />,
    },
    { label: "Usage", value: usage, icon: <FaUserCheck className="me-2" /> },
    { label: "Warranty", value: warranty, icon: <FaTag className="me-2" /> },
    { label: "Category", value: category, icon: <FaBoxOpen className="me-2" /> },
    { label: "Product ID", value: _id, icon: <FaTag className="me-2" /> },
  ];

  return (
    <Col xs={12} className="mx-auto">
      {/* Images Section */}
      {image.length > 0 && (
        <>
          <Carousel className="shadow rounded mb-4">
            {image.map((img, index) => (
              <Carousel.Item key={index} className="text-center">
                <Image
                  src={img.url || "/placeholder.jpg"}
                  fluid
                  thumbnail
                  className="p-3"
                  style={{ maxHeight: "350px", objectFit: "contain" }}
                  onClick={() => handleImageClick(img.url)}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <h5 className="text-success text-center fw-bold my-3">Images</h5>
          <Row className="mb-4">
            <Col xs={12} className="d-flex flex-row overflow-auto gap-3">
              {image.map((img, index) => (
                <Image
                  key={index}
                  src={img.url || "/placeholder.jpg"}
                  alt={`Thumbnail ${index + 1}`}
                  fluid
                  className="rounded shadow-sm"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(img.url)}
                />
              ))}
            </Col>
          </Row>
        </>
      )}

      {/* Modal for Viewing Images */}
      <Modal show={showModal} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image
            src={currentImage || "/placeholder.jpg"}
            fluid
            className="rounded shadow"
            style={{
              maxHeight: "100px",
              objectFit: "contain",
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
          {productDetails.map((item, idx) => (
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
