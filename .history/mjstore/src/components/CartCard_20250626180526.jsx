import { Col, Button, ListGroup, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartCard = ({ product, onCartUpdate }) => {
  if (!product || !product.product) {
    return (
      <Col xs={12}>
        <p>No item data available</p>
      </Col>
    );
  }

  const { name, price, _id, image = [] } = product.product;
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const [isUpdating, setIsUpdating] = useState(false); // To prevent multiple clicks during update

  const updateQuantity = async (type) => {
    try {
      setIsUpdating(true); // Prevent further interactions during update

      const token = localStorage.getItem("token");
      if (!token) {
        toast.warn("Authorization token required.");
        return;
      }

      const endpoint =
        type === "increase"
          ? "https://mj-store.onrender.com/api/v1/user/cart/increase"
          : "https://mj-store.onrender.com/api/v1/user/cart/decrease";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: _id }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to update quantity.");
      }

      setQuantity(result.updatedItem.quantity); // Update the UI with the new quantity
      onCartUpdate(); // Notify parent to refresh the cart total
      toast.success(`Quantity ${type}d successfully.`);
    } catch (error) {
      toast.error(error.message || "An error occurred while updating the quantity.");
    } finally {
      setIsUpdating(false); // Re-enable interaction
    }
  };

  const handleIncrease = () => {
    if (!isUpdating) {
      updateQuantity("increase");
    }
  };

  const handleDecrease = () => {
    if (!isUpdating && quantity > 1) {
      updateQuantity("decrease");
    } else if (quantity === 1) {
      toast.warn("Quantity cannot be less than 1. Use remove to delete the item.");
    }
  };

  const handleRemove = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warn("Authorization token required.");
        return;
      }

      const res = await fetch("https://mj-store.onrender.com/api/v1/user/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: _id }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to remove item from cart.");
      }

      toast.success("Item removed from cart.");
      onCartUpdate(); // Notify parent to refresh cart
    } catch (error) {
      toast.error(error.message || "An error occurred while removing the item.");
    }
  };

  return (
    <Col xs={12} sm={10} md={4}>
      <Card className="mb-4">
        <Card.Img className="p-5" src={image[0]?.url || "/placeholder.jpg"} alt={name || "Product"} />
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
                  variant="outline-primary py-1 px-2"
                  onClick={handleDecrease}
                  disabled={isUpdating || quantity <= 1}
                >
                  -
                </Button>
                <span className="mx-3 fs-5">{quantity}</span>
                <Button
                  variant="outline-primary py-1 px-2"
                  onClick={handleIncrease}
                  disabled={isUpdating}
                >
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
            <Button variant="danger" onClick={handleRemove} disabled={isUpdating}>
              Remove
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CartCard;
