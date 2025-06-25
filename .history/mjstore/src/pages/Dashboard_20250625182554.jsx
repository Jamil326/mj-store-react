import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const Dashboard = () => {
  const { logged, setLogged } = useContext(UserContext);
  const [user, setUser] = useState(null); // Use null to signify "loading" or "no data"
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

        const response = await fetch("https://mj-store.onrender.com/api/userv1/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            handleLogout(); // Logout if unauthorized
          }
          throw new Error("Failed to fetch user data.");
        }

        const { status, message, data } = await response.json();

        if (status !== "success") {
          throw new Error(message || "Unexpected API response.");
        }

        // Flatten address details for easier rendering
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
      {/* Header */}
      <Row>
        <Col className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <MdDashboard size="2.2rem" className="me-3 text-success" />
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

      {/* User Info */}
      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="shadow-lg border-0" style={{ width: "25rem" }}>
            <div className="mx-auto mt-4 text-center">
              <CgProfile size="4rem" className="text-dark mb-3" />
              <h2 className="text-success">{user.name || "N/A"}</h2>
            </div>
            <Card.Body className="bg-light">
              <ListGroup className="list-group-flush">
                <ListGroup.Item className="bg-light">
                  <strong>Name:</strong> {user.name || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <strong>Mobile:</strong> {user.mobile || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <strong>Email:</strong> {user.email || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <strong>Street:</strong> {user.street}
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <strong>Landmark:</strong> {user.landmark}
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <strong>City:</strong> {user.city}
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <strong>Pin:</strong> {user.pin}
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <strong>State:</strong> {user.state}
                </ListGroup.Item>
                <ListGroup.Item className="bg-light">
                  <strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}
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
