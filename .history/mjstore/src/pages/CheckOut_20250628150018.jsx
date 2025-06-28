import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Card, Button, Modal } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { logged } = useContext(UserContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userAddress, setUserAddress] = useState(
    JSON.parse(localStorage.getItem("user-info") || "{}")?.address || null
  );
  const location = useLocation();
  const navigate = useNavigate();

  const {  city, state, pin, landmark, street } = userAddress || {};
  const [name ,]
  const { item, quantity = 1 } = location?.state || {};
  const [noItem, setNoItem] = useState(quantity);

  const fetchAddressFromBackend = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token required.");

      const response = await fetch("https://mj-store.onrender.com/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log('address',result.data.address);
      if (!response.ok) throw new Error(result.message);

      setUserAddress(result.data.address);

      // Optionally update local storage for future use
      const userInfo = JSON.parse(localStorage.getItem("user-info") || "{}");
      userInfo.address = result.data;
      localStorage.setItem("user-info", JSON.stringify(userInfo));
    } catch (error) {
      toast.error("Failed to fetch address: " + error.message);
    }
  };

  useEffect(() => {
    if (!userAddress || !userAddress.street) {
      fetchAddressFromBackend();
    }
  }, [userAddress]);

  const toggleModal = () => setModalVisible((prev) => !prev);

  const redirectToLogin = () => navigate("/login");

  const handleAddressAddedOrUpdated = async () => {
    toggleModal();
    await fetchAddressFromBackend(); // Re-fetch address from the backend
    toast.success(
      street ? "Address updated successfully." : "Address added successfully."
    );
  };

  const placeOrder = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warn("Authorization token required.");
        return;
      }

      const orderUrl = "https://mj-store.onrender.com/api/v1/user/order";
      const orderPayload = {
        paymentMethod: "Cash On Delivery",
        directBuy: true,
        product: { _id: item._id },
        quantity: noItem,
      };

      const response = await fetch(orderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to place order.");
      }

      toast.success("Order placed successfully.");
      navigate("/orders");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!logged) {
    return (
      <div className="text-center mt-5">
        <Button variant="success" onClick={redirectToLogin} className="py-2 px-4">
          Please Login to Continue
        </Button>
      </div>
    );
  }

  return (
    <Container fluid className="px-3 py-3">
      <Row className="text-center">
        <Col>
          <Image
            src={item?.image?.[0]?.url || "/placeholder.jpg"}
            alt="Product"
            fluid
            className="rounded shadow mb-4"
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <ListGroup>
            <ListGroup.Item>
              <strong>Product Name:</strong> {item?.name || "N/A"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Quantity:</strong>
              <Button
                onClick={() => setNoItem((prev) => Math.max(prev - 1, 1))}
                variant="border border-success ms-3 py-1"
              >
                <span className="text-success">-</span>
              </Button>
              <span className="mx-2 fs-3 text-center px-2 pb-2">{noItem}</span>
              <Button
                onClick={() => setNoItem((prev) => prev + 1)}
                variant="border border-success py-1"
              >
                <span className="text-success">+</span>
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price:</strong> ₹{item?.price || 0}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Total:</strong> ₹{item?.price * noItem || 0}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <Row>
        {street ? (
          <Col>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <Card.Title className="text-center">Shipping Address</Card.Title>
                
                {/* Display User Name and Mobile */}
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Name:</strong> {name || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Mobile:</strong> {mobile || "N/A"}
                  </ListGroup.Item>
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
                <Button
                  variant="success"
                  className="w-100"
                  onClick={placeOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
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

export default OrderPage;
