import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";

const AddressDisplay = ({ address, onPlaceOrder, isSubmitting }) => {
  const { street, landmark, city, pin, state } = address;

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="text-center">Shipping Address</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Street:</strong> {street || "N/A"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Landmark:</strong> {landmark || "N/A"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>City:</strong> {city || "N/A"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Pin:</strong> {pin || "N/A"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>State:</strong> {state || "N/A"}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Button
          variant="success"
          className="w-100 py-2"
          onClick={onPlaceOrder}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default AddressDisplay;
