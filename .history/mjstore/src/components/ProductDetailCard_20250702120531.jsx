import React, { useState, useCallback } from "react";
import { Col, Image, Card, ListGroup, Row, Modal, Button } from "react-bootstrap";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductDetailCard = ({ Product = {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    { label: "Name", value: name, icon: <FaTag /> },
    { label: "Price", value: price, icon: <FaRupeeSign /> },
    { label: "Brand", value: brand, icon: <FaBoxOpen /> },
    { label: "Color", value: color, icon: <FaPalette /> },
    { label: "Material", value: material, icon: <FaTools /> },
    { label: "Power", value: power, icon: <FaBolt /> },
    { label: "Power Supply", value: power_supply, icon: <FaBolt /> },
    {
      label: "Dimensions",
      value: `${length || "N/A"} x ${width || "N/A"} x ${height || "N/A"} cm`,
      icon: <FaRulerCombined />,
    },
    { label: "Usage", value: usage, icon: <FaUserCheck /> },
    { label: "Warranty", value: warranty, icon: <FaTag /> },
    { label: "Category", value: category, icon: <FaBoxOpen /> },
    { label: "Product ID", value: _id, icon: <FaTag /> },
  ];

  const handleThumbnailClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);

  return (
    <Col xs={12} className="mx-auto">
      {image.length > 0 && (
        <>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            onClick={openModal}
            className="shadow rounded mb-4"
          >
            {image.map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img.url || "/placeholder.jpg"}
                  fluid
                  thumbnail
                  className="p-3"
                  style={{ maxHeight: "350px", objectFit: "contain" }}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Row className="mb-4">
            {image.map((img, index) => (
              <Image
                key={index}
                src={img.url || "/placeholder.jpg"}
                alt={`Thumbnail ${index + 1}`}
                fluid
                loading="lazy"
                className={`rounded shadow-sm ${
                  currentIndex === index ? "border border-primary" : ""
                }`}
                style={{
                  width: "70px",
                  height: "65px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </Row>
        </>
      )}

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Body className="d-flex align-items-center justify-content-center">
          <Image
            src={image[currentIndex]?.url || "/placeholder.jpg"}
            fluid
            className="rounded shadow"
            style={{ width: "100%", height: "auto", maxHeight: "90vh", objectFit: "contain" }}
            loading="lazy"
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

      <Card className="shadow-sm border-0 rounded p-3 mb-4">
        <Card.Body>
          <Card.Title className="text-center text-dark fs-4 fw-bold mb-2">
            {name || "Unnamed Product"}
          </Card.Title>
          <Card.Subtitle className="text-muted text-center mb-3">
            {title || "No Title Available"}
          </Card.Subtitle>
          <Card.Text>
            <strong>Description:</strong> {description || "No description available."}
          </Card.Text>
          <Card.Text className="text-center text-success fs-3 fw-bold">
            <FaRupeeSign /> {price || "N/A"}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0 rounded">
        <Card.Header className="text-center text-success fs-5 fw-bold">Product Details</Card.Header>
        <ListGroup className="list-group-flush">
          {productDetails.map((item, idx) => (
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
              <span className="d-flex align-items-center">
                {item.icon}
                <strong className="ms-2">{item.label}:</strong>
              </span>
              <span>{item.value || "N/A"}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Col>
  );
};

export default ProductDetailCard;
