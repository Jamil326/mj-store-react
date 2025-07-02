import React, { useMemo } from "react";
import { Card, Col } from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { _id, name, price, title, image } = product;

  // Generate a random rating once using useMemo
  const randomRating = useMemo(() => {
    const min = 3.8;
    const max = 4.8;
    return +(Math.random() * (max - min) + min).toFixed(1);
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }, (_, i) => (
          <FaStar key={`full-${i}`} className="text-warning" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-warning" />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-warning" />
        ))}
      </>
    );
  };

  return (
    <Col xs={12} sm={6} lg={9} id={_id} className="mx-auto mb-4">
      <Card className="shadow-sm rounded h-100 border-0">
        <Card.Img
          variant="top"
          src={image[0]?.url || "/placeholder-image.png"}
          alt={name}
          className="img-fluid rounded-top"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate fw-bold">{name}</Card.Title>
          <Card.Subtitle className="text-muted text-truncate">{title}</Card.Subtitle>
          <div className="d-flex align-items-center mt-2">
            <span className="me-2">{renderStars(randomRating)}</span>
            <span className="fw-bold text-dark fs-6">({randomRating})</span>
          </div>
          <Card.Text className="mt-2 text-success fw-bold">
            ₹{price}
            <span className="text-muted fs-6 d-block">(Free Delivery)</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
