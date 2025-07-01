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
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Col xs={12} className="mx-auto">
      {/* Carousel Section */}
      {image.length > 0 && (
        <>
          <Carousel
            activeIndex={currentIndex}
            onSelect={setCurrentIndex}
            className="shadow rounded mb-4"
            onClick={openModal}
          >
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
          <h5 className="text-success text-center fw-bold my-3">Images</h5>
          <Row className="mb-4">
            <Col xs={12} className="d-flex flex-row overflow-auto gap-1">
              {image.map((img, index) => (
                <Image
                  key={index}
                  src={img.url || "/placeholder.jpg"}
                  alt={`Thumbnail ${index + 1}`}
                  fluid
                  className={`rounded shadow-sm ${currentIndex === index ? "border border-primary" : ""}`}
                  style={{
                    width: "px",
                    height: "65px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </Col>
          </Row>
        </>
      )}

      {/* Modal for Viewing Images */}
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        dialogClassName="custom-modal"
        contentClassName="w-100 h-100"
      >
        <Modal.Body className="p-0 d-flex align-items-center justify-content-center">
          <Image
            src={image[currentIndex]?.url || "/placeholder.jpg"}
            fluid
            className="rounded shadow"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
          />
        </Modal.Body>
        <Button
          variant="light"
          className="position-absolute top-0 end-0 m-2"
          onClick={closeModal}
        >
          Close
        </Button>
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
