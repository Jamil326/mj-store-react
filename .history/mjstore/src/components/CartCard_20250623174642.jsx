import React, { useState } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const CartCard = ({ product, onRemove }) => {
  const {
    product: { name, price, image, _id } = {},
    quantity,
    totalValue,
  } = product || {};

  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const updateQuantity = async (newQuantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization token missing.");
      return;
    }

    try {
      const response = await fetch("https://mj-store.onrender.com/api/v1/user/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: _id, quantity: newQuantity }),
      });

      const result = await response.json();

      if (response.ok) {
        setCurrentQuantity(newQuantity);
        toast.success("Quantity updated successfully.");
      } else {
        toast.error(result.message || "Failed to update quantity.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while updating quantity.");
    }
  };

  const handleRemove = async () => {
    if (onRemove) onRemove();
  };

  const handleIncrease = () => updateQuantity(currentQuantity + 1);
  const handleDecrease = () => {
    if (currentQuantity > 1) updateQuantity(currentQuantity - 1);
  };

  return (
    <Card className="shadow-sm">
      <Card.Img
        variant="top"
        src={image && image.length > 0 ? image[0].url : "/placeholder.jpg"}
        alt={name}
        className="p-3"
      />
      <Card.Body>
        <Card.Title>{name || "Unknown Product"}</Card.Title>
        <ListGroup className="mb-3">
          <ListGroup.Item>
            <strong>Price:</strong> ₹{price || 0}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Quantity:</strong> {currentQuantity}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Total:</strong> ₹{totalValue || 0}
          </ListGroup.Item>
        </ListGroup>
        <div className="d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={handleDecrease} disabled={currentQuantity === 1}>
            -
          </Button>
          <Button variant="outline-secondary" onClick={handleIncrease}>
            +
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Remove
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartCard;
