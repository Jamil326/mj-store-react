import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Image, Container, ListGroup, Row, Col } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";

const CheckOut = () => {
  const { logged } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user-info") || "{}");
  const { city, state, pin, landmark, street } = user?.address || {};
  const { item, quantity = 1 } = location?.state || {};

  const toggleAddressForm = () => setVisible((prev) => !prev);

  const redirectToLogin = () => navigate("/login");

  const createOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return toast.warn("Authorization token required.");
      }

      const url = "https://mj-store.onrender.com/api/v1/user/cart/add";
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: item._id }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      if (res.status === 200) {
        toast.success(result.message);
        navigate("/orders");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!logged) {
    return (
      <div className="text-center mt-5">
        <Button variant="success" className="py-2" onClick={redirectToLogin}>
          Please Login to Continue
        </Button>
      </div>
    );
  }

  return (
    <Container fluid className="px-3 py-3">
      <Row>
        <Col className="text-center">
          <Image
            src={item?.image?.[0]?.url || "/placeholder.jpg"}
            alt="Product"
            fluid
            className="rounded shadow"
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <ListGroup>
            <ListGroup.Item>
              <strong>Product Name:</strong> {item?.name || "N/A"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Quantity:</strong> {quantity}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price:</strong> ₹{item?.price || 0}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Total:</strong> ₹{item?.price * quantity || 0}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <Row className="mt-4">
        {user.address ? (
          <Col>
            <Card className="shadow-sm">
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
            </Card>
            <Button variant="success" className="w-100 mt-3 py-2" onClick={createOrder}>
              Place Order
            </Button>
          </Col>
        ) : (
          <Col className="text-center">
            <Button variant="dark" className="px-4" onClick={toggleAddressForm}>
              Add Address
            </Button>
          </Col>
        )}
      </Row>

      {visible && (
        <Row className="mt-4">
          <Col>
            <AddressForm />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CheckOut;
