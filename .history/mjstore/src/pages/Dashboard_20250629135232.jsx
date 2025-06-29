import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const Dashboard = () => {
  const { logged, setLogged } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogged(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authorization token is missing. Please log in again.");
        }

        const response = await fetch("https://mj-store.onrender.com/api/v1/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            handleLogout();
          }
          throw new Error("Failed to fetch user data.");
        }

        const { status, message, data } = await response.json();

        if (status !== "success") {
          throw new Error(message || "Unexpected API response.");
        }

        const address = data.address || {};
        setUser({
          ...data,
          city: address.city || "N/A",
          pin: address.pin || "N/A",
          landmark: address.landmark || "N/A",
          state: address.state || "N/A",
          street: address.street || "N/A",
        });
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <h3>Loading user data...</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <MdDashboard size="2.5rem" className="me-3 text-success" />
            <h1 className="fs-4 fw-bold text-dark">Dashboard</h1>
          </div>
          <Button
            variant="success"
            className="fw-bold px-4 py-2"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="shadow-lg border-0" style={{ width: "28rem" }}>
            <div className="mx-auto mt-4 text-center">
              <CgProfile size="4rem" className="text-success mb-3" />
              <h2 className="text-success fw-bold">{user.name || "N/A"}</h2>
            </div>
            <Card.Body className="bg-light">
              <ListGroup className="list-group-flush">
                <ListGroup.Item className="bg-light d-flex align-items-center">
                  <FaMapMarkerAlt className="text-success me-3" />
                  <span><strong>Street:</strong> {user.street}</span>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light d-flex align-items-center">
                  <FaMapMarkerAlt className="text-success me-3" />
                  <span><strong>Landmark:</strong> {user.landmark}</span>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light d-flex align-items-center">
                  <FaMapMarkerAlt className="text-success me-3" />
                  <span><strong>City:</strong> {user.city}</span>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light d-flex align-items-center">
                  <FaMapMarkerAlt className="text-success me-3" />
                  <span><strong>State:</strong> {user.state}</span>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light d-flex align-items-center">
                  <FaMapMarkerAlt className="text-success me-3" />
                  <span><strong>Pin:</strong> {user.pin}</span>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light d-flex align-items-center">
                  <FaPhone className="text-success me-3" />
                  <span><strong>Mobile:</strong> {user.mobile || "N/A"}</span>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light d-flex align-items-center">
                  <FaEnvelope className="text-success me-3" />
                  <span><strong>Email:</strong> {user.email || "N/A"}</span>
                </ListGroup.Item>
                <ListGroup.Item className="bg-light d-flex align-items-center">
                  <FaCalendarAlt className="text-success me-3" />
                  <span>
                    <strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
