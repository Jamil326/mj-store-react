import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, ListGroup, Card, Button, Modal } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";

const OrderPage2 = () => {
  const { logged } = useContext(UserContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userAddress, setUserAddress] = useState(
    JSON.parse(localStorage.getItem("user-info") || "{}")?.address || null
  );
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { itemIds = [] } = location?.state || {};
  const { street, landmark, city, pin, state } = userAddress || {};

  const fetchAddress = async () => {
    try {
      const response = await fetch("https://mj-store.onrender.com/api/v1/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setUserAddress(result.data.address);

      const userInfo = JSON.parse(localStorage.getItem("user-info") || "{}");
      userInfo.address = result.data.address;
      localStorage.setItem("user-info", JSON.stringify(userInfo));
    } catch (error) {
      toast.error("Failed to fetch address: " + error.message);
    }
  };

  useEffect(() => {
    if (!userAddress || !street) {
      fetchAddress();
    }
  }, [userAddress]);

  const toggleModal = () => setModalVisible((prev) => !prev);

  const handleAddressAddedOrUpdated = async () => {
    toggleModal();
    await fetchAddress();
    toast.success("Address updated successfully.");
  };

  const placeOrder = async () => {
    try {
      if (!token) throw new Error("Authorization token required.");
      if (!itemIds.length) throw new Error("No items specified for the order.");

      const orderPayload = { paymentMethod: "Cash On Delivery", itemIds };
      const response = await fetch("https://mj-store.onrender.com/api/v1/user/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      toast.success("Order placed successfully.");
      navigate("/orders");
    } catch (error) {
      toast.error(error.message || "An error occurred while placing the order.");
    }
  };

  if (!logged) {
    return (
      <div className="text-center mt-5">
        <Button variant="success" onClick={() => navigate("/login")} className="py-2 px-4">
          Please Login to Continue
        </Button>
      </div>
    );
  }

  return (
    <Container fluid className="px-3 py-3">
      <Row>
        <Col>
          {itemIds.length > 0 ? (
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <Card.Title className="text-center">Order Summary</Card.Title>
                <ListGroup variant="flush">
                  {itemIds.map((id, idx) => (
                    <ListGroup.Item key={idx}>
                      <strong>Item ID:</strong> {id}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          ) : (
            <p className="text-center">No items in the order.</p>
          )}
        </Col>
      </Row>

      <Row>
        {userAddress ? (
          <Col>
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
                  variant="primary"
                  className="w-100 mb-2"
                  onClick={toggleModal}
                >
                  Edit Address
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ) : (
          <Col className="text-center">
            <Button variant="dark" onClick={toggleModal} className="px-4">
              Add Address
            </Button>
          </Col>
        )}
      </Row>

      {userAddress && (
        <Row className="mt-3">
          <Col>
            <Button
              variant="success"
              className="w-100 py-2"
              onClick={placeOrder}
            >
              Place Order
            </Button>
          </Col>
        </Row>
      )}

      <Modal show={isModalVisible} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{street ? "Edit Address" : "Add Address"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddressForm
            onAddressAdded={handleAddressAddedOrUpdated}
            onAddressUpdated={handleAddressAddedOrUpdated}
            initialAddress={userAddress}
            isEditable={!!street}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OrderPage2;
