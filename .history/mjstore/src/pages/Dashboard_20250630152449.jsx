import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { MdDashboard, MdEdit, MdClose, MdSave } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaKey,
  FaAddressCard,
  FaStreetView,
  FaCity,
  FaBuilding,
  FaLocationArrow,
  FaLandmark,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const Dashboard = () => {
  const { logged, setLogged } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editData, setEditData] = useState({ field: "", value: "" });
  const [addressData, setAddressData] = useState({});
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogged(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  const handleEditChange = (e) => {
    const { value } = e.target;
    setEditData((prev) => ({ ...prev, value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    const { field, value } = editData;

    if (field === "password" && value.length < 6) {
      toast.warn("Password must be at least 6 characters long.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const updatedField = { [field]: value };

      const response = await fetch("https://mj-store.onrender.com/api/v1/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedField),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || "Failed to update user data.");
      }

      toast.success(`${field} updated successfully.`);
      setUser((prev) => ({ ...prev, ...updatedField }));
      setShowEditModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddressSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://mj-store.onrender.com/api/v1/user/update-address", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || "Failed to update address.");
      }

      toast.success("Address updated successfully.");
      setUser((prev) => ({
        ...prev,
        address: { ...addressData },
      }));
      setShowAddressModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("https://mj-store.onrender.com/api/v1/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const { status, message, data } = await response.json();

        if (!response.ok || status !== "success") {
          throw new Error(message || "Unexpected API response.");
        }

        setUser(data);
        setAddressData(data.address || {});
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
          <Button variant="success" className="fw-bold px-4 py-2" onClick={handleLogout}>
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
                {[
                  { label: "Name", value: user.name, icon: CgProfile, field: "name" },
                  { label: "Email", value: user.email, icon: FaEnvelope, field: "email" },
                  { label: "Mobile", value: user.mobile, icon: FaPhone, field: "mobile" },
                  { label: "Password", value: "******", icon: FaKey, field: "password" },
                ].map(({ label, value, icon: Icon, field }, idx) => (
                  <ListGroup.Item
                    className="bg-light d-flex justify-content-between align-items-center"
                    key={idx}
                  >
                    <div className="d-flex align-items-center">
                      <Icon className="text-success me-3" />
                      <span>
                        <strong>{label}:</strong> {value}
                      </span>
                    </div>
                    <Button
                      variant="link"
                      className="text-primary p-0"
                      onClick={() => {
                        setEditData({ field, value: field === "password" ? "" : value });
                        setShowEditModal(true);
                      }}
                    >
                      <MdEdit />
                    </Button>
                  </ListGroup.Item>
                ))}
                {user.address && (
                  <ListGroup.Item
                    className="bg-light d-flex flex-column align-items-start py-3"
                  >
                    <div className="mb-2">
                      <FaAddressCard className="text-success me-2" />
                      <strong>Address Details:</strong>
                    </div>
                    <div className="ms-4">
                      <p>
                        <FaStreetView className="me-2" />
                        Street: {user.address.street || "N/A"}
                      </p>
                      <p>
                        <FaLandmark className="me-2" />
                        Landmark: {user.address.landmark || "N/A"}
                      </p>
                      <p>
                        <FaCity className="me-2" />
                        City: {user.address.city || "N/A"}
                      </p>
                      <p>
                        <FaBuilding className="me-2" />
                        State: {user.address.state || "N/A"}
                      </p>
                      <p>
                        <FaLocationArrow className="me-2" />
                        Pin: {user.address.pin || "N/A"}
                      </p>
                    </div>
                    <Button
                      variant="link"
                      className="text-primary p-0 mt-2"
                      onClick={() => setShowAddressModal(true)}
                    >
                      <MdEdit />
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <MdEdit className="me-2" />
            Edit {editData.field}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editField">
              <Form.Label>New {editData.field}</Form.Label>
              <Form.Control
                type={editData.field === "password" ? "password" : "text"}
                value={editData.value}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            <MdClose className="me-2" />
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            <MdSave className="me-2" />
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Address Modal */}
      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaMapMarkerAlt className="me-2" />
            Edit Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["street", "landmark", "city", "state", "pin"].map((field, idx) => (
              <Form.Group controlId={field} key={idx} className="mb-3">
                <Form.Label>
                  <FaLocationArrow className="me-2" />
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={addressData[field] || ""}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddressModal(false)}>
            <MdClose className="me-2" />
            Close
          </Button>
          <Button variant="primary" onClick={handleAddressSubmit}>
            <MdSave className="me-2" />
            Save Address
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
