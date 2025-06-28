import { Col, Button, ListGroup, Card } from "react-bootstrap";
import { useState } from "react";
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
  const [isUpdating, setIsUpdating] = useState(false);

  const handleApiRequest = async (endpoint, body) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warn("Authorization token required.");
        return null;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "API request failed.");
      return result;
    } catch (error) {
      toast.error(error.message || "An error occurred.");
      return null;
    }
  };

  const updateQuantity = async (type) => {
    if (isUpdating) return;

    setIsUpdating(true);
    const endpoint =
      type === "increase"
        ? "https://mj-store.onrender.com/api/v1/user/cart/increase"
        : "https://mj-store.onrender.com/api/v1/user/cart/decrease";

    const result = await handleApiRequest(endpoint, { productId: _id });
    if (result && result.status === "success") {
      const updatedItem = result.data.items.find((item) => item.product === _id);
      if (updatedItem) {
        setQuantity(updatedItem.quantity);
        onCartUpdate(result.data.items);
        toast.success(`Quantity ${type}d successfully.`);
      } else {
        toast.error("Updated product not found in response.");
      }
    }

    setIsUpdating(false);
  };

  const handleIncrease = () => updateQuantity("increase");
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity("decrease");
    } else {
      toast.warn("Quantity cannot be less than 1. Use remove to delete the item.");
    }
  };

  const handleRemove = async () => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token required.");

      const res = await fetch("https://mj-store.onrender.com/api/v1/user/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: _id }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to remove item from cart.");

      toast.success("Item removed from cart.");
      onCartUpdate(result.data.items);
    } catch (error) {
      toast.error(error.message || "An error occurred while removing the item.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Col xs={12} sm={10} md={4}>
      <Card className="mb-4">
        <Card.Img
          className="p-5"
          src={image[0]?.url || "/placeholder.jpg"}
          alt={name || "Product"}
        />
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
                  variant="outline-primary"
                  onClick={handleDecrease}
                  disabled={isUpdating || quantity <= 1}
                >
                  -
                </Button>
                <span className="mx-3 fs-5">{quantity}</span>
                <Button
                  variant="outline-primary"
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
