import { Col, Card, ListGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartCard = ({ product, onUpdate, onRemove }) => {
  if (!product || !product.product) {
    return (
      <div className="text-center text-muted p-3">
        <p>No item data available in the cart.</p>
      </div>
    );
  }

  // Extract product details safely
  const {
    product: { name = "Unknown Product", price = 0, image = [], _id } = {},
    quantity = 1,
  } = product;

  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const updateQuantity = async (newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const res = await fetch(
        `https://mj-store.onrender.com/api/v1/user/cart/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: _id, quantity: newQuantity }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        setCurrentQuantity(newQuantity);
        toast.success("Quantity updated successfully.");
        if (onUpdate) onUpdate();
      } else {
        throw new Error(result.message || "Failed to update quantity.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while updating quantity.");
    }
  };

  const handleIncrease = () => {
    updateQuantity(currentQuantity + 1);
  };

  const handleDecrease = () => {
    if (currentQuantity > 1) {
      updateQuantity(currentQuantity - 1);
    }
  };

  const handleRemove = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const res = await fetch(
        `https://mj-store.onrender.com/api/v1/user/cart/remove/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Item removed from cart.");
        if (onRemove) onRemove();
      } else {
        throw new Error(result.message || "Failed to remove item.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while removing the item.");
    }
  };

  return (
    <Col xs={12} sm={6} lg={4} className="mb-4">
      <Card className="shadow-sm">
        <Card.Img
          variant="top"
          src={image.length > 0 ? image[0].url : "/placeholder.jpg"}
          alt={name}
          className="p-3"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.jpg";
          }}
        />
        <Card.Body>
          <Card.Title className="text-center mb-3">{name}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Price:</strong> ₹{price}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-flex justify-content-between align-items-center">
                <strong>Quantity:</strong>
                <div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleDecrease}
                    disabled={currentQuantity === 1}
                  >
                    -
                  </Button>
                  <span className="mx-2">{currentQuantity}</span>
                  <Button variant="outline-secondary" size="sm" onClick={handleIncrease}>
                    +
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Total:</strong> ₹{price * currentQuantity}
            </ListGroup.Item>
          </ListGroup>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="danger" size="sm" onClick={handleRemove}>
              Remove
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CartCard;
