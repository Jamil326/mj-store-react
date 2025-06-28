import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Card, Button, Modal } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaPhone, FaEdit, FaShoppingCart, FaDollarSign } from "react-icons/fa";

const OrderPage = () => {
  const { logged } = useContext(UserContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userAddress, setUserAddress] = useState(
    JSON.parse(localStorage.getItem("user-info") || "{}")?.address || null
  );
  const location = useLocation();
  const navigate = useNavigate();

  const { city, state, pin, landmark, street } = userAddress || {};
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const { item, quantity = 1 } = location?.state || {};
  const [noItem, setNoItem] = useState(quantity);

  const fetchAddressFromBackend = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token required.");

      const response = await fetch("https://mj-store.onrender.com/api/v1/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setUserAddress(result.data.address);
      setName(result.data.address.shippingName);
      setMobile(result.data.address.shippingNumber);
      const userInfo = JSON.parse(localStorage.getItem("user-info") || "{}");
      userInfo.address = result.data.address;
      localStorage.setItem("user-info", JSON.stringify(userInfo));
    } catch (error) {
      toast.error("Failed to fetch address: " + error.message);
    }
  };

  useEffect(() => {
    if (!userAddress || !userAddress.street) fetchAddressFromBackend();
  }, [userAddress]);

  const toggleModal = () => setModalVisible((prev) => !prev);

  const placeOrder = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warn("Authorization token required.");
        return;
      }

      const response = await fetch("https://mj-store.onrender.com/api/v1/user/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentMethod: "Cash On Delivery",
          directBuy: true,
          product: { _id: item._id },
          quantity: noItem,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to place order.");

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
        <Button variant="primary" onClick={() => navigate("/login")} className="py-2 px-4">
          Please Login to Continue
        </Button>
      </div>
    );
  }

  return (
    <Container fluid className="px-3 py-4">
      <Row>
        <Col>
          <Card className="shadow-lg border-0">
            <Row className="g-0">
              <Col md={5} className="text-center">
                <Image
                  src={item?.image?.[0]?.url || "/placeholder.jpg"}
                  alt="Product"
                  fluid
                  className="rounded"
                />
              </Col>
              <Col md={7} className="p-4">
                <h5 className="text-primary fw-bold mb-3">{item?.name || "Product Name"}</h5>
                <p>
                  <FaDollarSign className="me-2 text-success" />
                  Price: ₹{item?.price || 0}
                </p>
                <p>
                  <FaShoppingCart className="me-2 text-warning" />
                  Quantity:
                  <Button
                    onClick={() => setNoItem((prev) => Math.max(prev - 1, 1))}
                    variant="outline-secondary mx-2"
                  >
                    -
                  </Button>
                  <span>{noItem}</span>
                  <Button onClick={() => setNoItem((prev) => prev + 1)} variant="outline-secondary mx-2">
                    +
                  </Button>
                </p>
                <p className="fw-bold">
                  <FaDollarSign className="me-2 text-primary" />
                  Total: ₹{item?.price * noItem || 0}
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white text-center">Shipping Address</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <FaMapMarkerAlt className="me-2 text-secondary" />
                  <strong>Address:</strong> {street || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <FaPhone className="me-2 text-secondary" />
                  <strong>Mobile:</strong> {mobile || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Landmark:</strong> {landmark || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>City:</strong> {city || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>State:</strong> {state || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Pin:</strong> {pin || "N/A"}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="outline-primary" onClick={toggleModal}>
                <FaEdit className="me-2" />
                Edit Address
              </Button>
              <Button
                variant="success"
                className="ms-3"
                onClick={placeOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </Button>
            </Card.Footer>
          </Card>
        </Col>
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
