import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const Dashboard = () => {
    
    const { logged , setLogged } = useContext( UserContext );
    const [ user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    pin: "",
    landmark: "",
    state: "",
    street: "",
  });

 const handleLogin = () => {
     if( logged ){
         setLogged(false);
         localStorage.removeItem('token');
         localStorage.removeItem('user-info');
         toast.success('log out successfully');
         

     }

     
    
    
 }

  useEffect(() => {
    try {
      const person = JSON.parse(localStorage.getItem("user-info"));

      if (!person) {
        throw new Error("User information is missing in localStorage.");
      }

      setUser({
        name: person.name || "",
        mobile: person.mobile || "",
        email: person.email || "",
        city: person.address?.city || "",
        pin: person.address?.pin || "",
        landmark: person.address?.landmark || "",
        state: person.address?.state || "",
        street: person.address?.street || "",
      });
      
    } catch (error) {
      toast.error(`Failed to load user data: ${error.message}`);
      
    }
  }, []); // Empty dependency array ensures this runs only once on component mount.

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
      {logged ? (
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
                    <strong>Street:</strong> {user.street || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-light">
                    <strong>Landmark:</strong> {user.landmark || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-light">
                    <strong>City:</strong> {user.city || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-light">
                    <strong>Pin:</strong> {user.pin || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-light">
                    <strong>State:</strong> {user.state || "N/A"}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col className="text-center mt-5">
            <p className="fs-3 text-dark">
              Please navigate to the Login or Home Page.
            </p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
