import { Col, Row, Button, ListGroup, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartCard = ({ items, totalCartValue, onCartUpdate }) => {
  const updateQuantity = async (type, productId) => {
    try {
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
        body: JSON.stringify({ productId }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to update quantity.");
      }

      toast.success(`Quantity ${type}d successfully.`);
      onCartUpdate(result.data); // Notify parent of the updated cart state
    } catch (error) {
      toast.error(error.message || "An error occurred while updating the quantity.");
    }
  };

  const handleRemove = async (productId) => {
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
        body: JSON.stringify({ productId }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to remove item from cart.");
      }

      toast.success("Item removed from cart.");
      onCartUpdate(result.data); // Notify parent of the updated cart state
    } catch (error) {
      toast.error(error.message || "An error occurred while removing the item.");
    }
  };

  return (
    <div>
      <Row>
        {items.length > 0 ? (
          items.map((item) => (
            <Col xs={12} sm={6} md={4} key={item._id}>
              <Card className="mb-4">
                <Card.Img
                  className="p-5"
                  src={item.product.image?.[0]?.url || "/placeholder.jpg"}
                  alt={item.product.name}
                />
                <Card.Body>
                  <Card.Title className="text-center">{item.product.name}</Card.Title>
                  <ListGroup className="mb-3">
                    <ListGroup.Item>
                      <span className="me-5">Price:</span>
                      <span>₹{item.product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="me-5">Quantity:</span>
                      <div className="d-inline-flex align-items-center ms-3">
                        <Button
                          variant="outline-primary py-1 px-2"
                          onClick={() => updateQuantity("decrease", item.product._id)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="mx-3 fs-5">{item.quantity}</span>
                        <Button
                          variant="outline-primary py-1 px-2"
                          onClick={() => updateQuantity("increase", item.product._id)}
                        >
                          +
                        </Button>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="fw-bold">
                      <span className="me-5">Total:</span>
                      <span>₹{item.totalValue}</span>
                    </ListGroup.Item>
                  </ListGroup>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(item.product._id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No items in cart</p>
        )}
      </Row>
      <Card className="mt-4">
        <Card.Body className="text-end">
          <h4>Total Cart Value: ₹{totalCartValue}</h4>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartCard;
