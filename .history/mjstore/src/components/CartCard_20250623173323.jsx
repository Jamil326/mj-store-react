import { Col, Card, ListGroup, Button } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";

const CartCard = ({ product, onUpdate, onRemove }) => {
  if (!product) {
    return <p>No item in cart</p>;
  }

  const { name, price, _id, image = [] } = product.product;
  const [quantity, setQuantity] = useState(product.quantity);

  // Update quantity in backend
  const updateQuantity = async (newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token is missing. Please log in.");
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
        setQuantity(newQuantity);
        toast.success("Quantity updated successfully.");
        if (onUpdate) onUpdate();
      } else {
        toast.error(result.message || "Failed to update quantity.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while updating quantity.");
    }
  };

  // Increase quantity handler
  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    updateQuantity(newQuantity);
  };

  // Decrease quantity handler
  const handleDecrease = () => {
    const newQuantity = Math.max(quantity - 1, 1);
    updateQuantity(newQuantity);
  };

  // Remove item handler
  const handleRemove = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token is missing. Please log in.");
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
        toast.error(result.message || "Failed to remove item.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while removing the item.");
    }
  };

  return (
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card className="shadow-sm">
        <Card.Img
          variant="top"
          src={image[0]?.url || "/placeholder.jpg"}
          alt={name}
          className="p-3 rounded"
        />
        <Card.Body>
          <Card.Title className="text-center">{name}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Price:</strong> ₹{price}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Quantity:</strong>
              <div className="d-flex align-items-center justify-content-center mt-2">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleDecrease}
                  disabled={quantity === 1}
                >
                  -
                </Button>
                <span className="mx-3">{quantity}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleIncrease}
                >
                  +
                </Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Total:</strong> ₹{price * quantity}
            </ListGroup.Item>
          </ListGroup>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="danger" onClick={handleRemove}>
              Remove
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CartCard;
