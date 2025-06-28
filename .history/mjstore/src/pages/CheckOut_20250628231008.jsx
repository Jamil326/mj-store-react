import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import AddressForm from "../components/AddressComponent";
import { toast } from "react-toastify";
import { FaPlus, FaMinus, FaMapMarkerAlt } from "react-icons/fa";

const OrderPage = () => {
  const { logged } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userAddress, setUserAddress] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const { item, quantity = 1 } = location.state || {};
  const [noItem, setNoItem] = useState(quantity);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info") || "{}");
    if (userInfo?.address) setUserAddress(userInfo.address);
    console.log("Loaded user address:", userInfo.address);
  }, []);

  const handleAdd = () => setNoItem((prev) => prev + 1);
  const handleSub = () => setNoItem((prev) => Math.max(prev - 1, 1));
  const toggleAddressForm = () => setVisible((prev) => !prev);
  const redirectToLogin = () => navigate("/login");

  const handleAddressAdded = (newAddress) => {
    const updatedUser = JSON.parse(localStorage.getItem("user-info") || "{}");
    updatedUser.address = newAddress;
    localStorage.setItem("user-info", JSON.stringify(updatedUser));
    setUserAddress(newAddress);
    toast.success("Address added successfully.");
    setVisible(false);
  };

  const placeOrder = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Authorization token required.");
      return navigate("/login");
    }

    const orderPayload = {
      paymentMethod: "Cash On Delivery",
      directBuy: true,
      product: { _id: ite },
      quantity: noItem,
    };

    try {
      console.log("Placing order with payload:", orderPayload);
      const response = await fetch("https://mj-store.onrender.com/api/v1/user/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to place order.");

      toast.success("Order placed successfully.");
      navigate("/orders");
    } catch (error) {
      console.error("Order placement error:", error);
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
      <Row>
        {/* Product Details */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Image
                src={item?.image?.[0]?.url || "/placeholder.jpg"}
                alt="Product"
                fluid
                className="rounded mb-4"
              />
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>{item?.name || "Product Name"}</h5>
                  <p>{item?.description || "No description available."}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price:</strong> ₹{item?.price || 0}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center gap-3">
                  <strong>Quantity:</strong>
                  <Button variant="outline-secondary" onClick={handleSub}>
                    <FaMinus />
                  </Button>
                  <span>{noItem}</span>
                  <Button variant="outline-secondary" onClick={handleAdd}>
                    <FaPlus />
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Total:</strong> ₹{item?.price * noItem || 0}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Address Section */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FaMapMarkerAlt className="me-2" />
                Shipping Address
              </Card.Title>
              {userAddress.street ? (
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Street:</strong> {userAddress.street}</ListGroup.Item>
                  <ListGroup.Item><strong>Landmark:</strong> {userAddress.landmark}</ListGroup.Item>
                  <ListGroup.Item><strong>City:</strong> {userAddress.city}</ListGroup.Item>
                  <ListGroup.Item><strong>Pin Code:</strong> {userAddress.pin}</ListGroup.Item>
                  <ListGroup.Item><strong>State:</strong> {userAddress.state}</ListGroup.Item>
                </ListGroup>
              ) : (
                <p className="text-muted">No address provided. Please add one.</p>
              )}
            </Card.Body>
            <Button
              variant="success"
              className="w-100"
              onClick={userAddress.street ? placeOrder : toggleAddressForm}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : userAddress.street ? "Place Order" : "Add Address"}
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Address Form */}
      {visible && (
        <Row className="mt-4">
          <Col>
            <AddressForm onAddressAdded={handleAddressAdded} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OrderPage;
