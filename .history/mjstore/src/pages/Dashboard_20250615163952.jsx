import { useEffect, useState ,useContext} from "react";
import { useNavigate  } from 'react-router-dom';
import { Container, Col, Row, Card, ListGroup ,Button } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { toast } from "react-toastify";
import { UserContext } from '../context/userContext';

const Dashboard = () => {
    
    const { logged , setLogged } = useContext(UserContext);
  const [user, setUser] = useState({
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
      
    <Container>
      <Row>
        <Col className="d-flex justify-content-between mt-3">
          
         <div className="mt-2 d-flex align-items-center">
  <MdDashboard size="2.2rem" className="me-2" />
  <b className="fs-5 fs-md-3 fs-lg-2 fs-xl-1">Dashboard</b>
</div>

          
          {logged &&
          <div className=''>
              <Button  variant='danger px-' onClick={()=>handleLogin()}>Logout</Button>
          </div>
          }
          
        </Col>
      </Row>
      {logged?(
      <Row>
        <Col className="d-flex justify-content-center mt-5">
          <Card
            className="d-flex justify-content-center"
            style={{ width: "22rem", height: "30rem" }}
          >
            <div className="mx-auto mt-5">
              <CgProfile style={{ width: "70px", height: "65px" }} />
              <h1 className="mx-auto">{user.name || "N/A"}</h1>
            </div>
            <Card.Body className="fw-bold">
              <ListGroup>
                <ListGroup.Item>Name: { user.name || "N/A"}</ListGroup.Item>
                <ListGroup.Item>Mobile: {user.mobile || "N/A"}</ListGroup.Item>
                <ListGroup.Item>Email: {user.email || "N/A"}</ListGroup.Item>
                <ListGroup.Item>Street: {user.street || "N/A"}</ListGroup.Item>
                <ListGroup.Item>Landmark: {user.landmark || "N/A"}</ListGroup.Item>
                <ListGroup.Item>City: {user.city || "N/A"}</ListGroup.Item>
                <ListGroup.Item>Pin: {user.pin || "N/A"}</ListGroup.Item>
                <ListGroup.Item>State: {user.state || "N/A"}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>):(<p className='fs-3 text-center'>Please Goto Login/Home Page</p>)}
      </Container>
  );
};

export default Dashboard;
