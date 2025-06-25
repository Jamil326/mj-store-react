import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const Dashboard = () => {
  const { logged, setLogged } = useContext(UserContext);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleLogin = () => {
    if (logged) {
      setLogged(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user-info");
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  useEffect(() => {
    try {
      const rawData = localStorage.getItem("user-info");
      const person = rawData ? JSON.parse(rawData) : null;

      if (!person || typeof person !== "object") {
        throw new Error("User information is missing or invalid.");
      }

      setUser({ ...person, ...person.address });
    } catch (error) {
      toast.error(`Failed to load user data: ${error.message}`);
    }
  }, []);

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }
  }, [logged, navigate]);

  return (
    <Container className="my-5">
      {/* Header */}
      <Row>
        <Col className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <MdDashboard size="2.2rem" className="me-3 text-success" />
            <h1 className="fs-4 fw-bold text-dark">Dashboard</h1>
          </div>
          {logged && (
            <Button
              variant="success"
              className="fw-bold px-4 py-2"
              onClick={handleLogin}
            >
              Logout
            </Button>
          )}
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
                {Object.entries(user).map(([key, value]) => (
                  <ListGroup.Item key={key} className="bg-light">
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                    {value || "N/A"}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
