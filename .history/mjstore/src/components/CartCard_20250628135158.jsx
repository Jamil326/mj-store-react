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
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync the quantity state with the updated props
  useEffect(() => {
    setQuantity(product.quantity || 1);
  }, [product.quantity]);

  const handleApiRequest = async (endpoint, body ,method) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warn("Authorization token required.");
        return null;
      }

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "API request failed.");
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

    const result = await handleApiRequest(endpoint, { productId: _id },);
    if (result) {
      toast.success(`Quantity ${type}d successfully.`);
      onCartUpdate(); // Refetch the cart in the parent
    }

    setIsUpdating(false);
  };

  const handleRemove = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    const endpoint = "https://mj-store.onrender.com/api/v1/user/cart/remove";
    const result = await handleApiRequest(endpoint, { productId: _id },'DELETE');

    if (result) {
      toast.success("Item removed from cart.");
      onCartUpdate(); // Refetch the cart in the parent
    }

    setIsUpdating(false);
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
                  onClick={() => updateQuantity("decrease")}
                  disabled={isUpdating || quantity <= 1}
                >
                  -
                </Button>
                <span className="mx-3 fs-5">{quantity}</span>
                <Button
                  variant="outline-primary"
                  onClick={() => updateQuantity("increase")}
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
