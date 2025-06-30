import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import { IoLogIn } from "react-icons/io5";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setLogged, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ mobile: "", password: "" });
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    mobile: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInput = () => {
    const { mobile, password } = formData;

    if (!mobile || mobile.length !== 10) {
      toast.warn("Mobile Number should be 10 digits");
      setFormData((prev) => ({ ...prev, mobile: "" }));
      return false;
    }

    if (!password || password.length < 6) {
      toast.warn("Password should be at least 6 characters");
      setFormData((prev) => ({ ...prev, password: "" }));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    try {
      const response = await fetch("https://mj-store.onrender.com/api/v1/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res = await response.json();

      if (!response.ok) {
        const errorMessage = response.status === 401 ? "Invalid credentials" : res.message;
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const { token, existed } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user-info", JSON.stringify(existed));
      setLogged(true);
      setUser(existed);
      toast.success(res.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleForgotPassword = async () => {
    const { mobile, newPassword } = forgotPasswordData;

    if (!mobile || mobile.length !== 10) {
      toast.warn("Mobile number should be 10 digits.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      toast.warn("New password should be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch("https://mj-store.onrender.com/api/v1/user/forgot-password", {
        method: "PA",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, password: newPassword }),
      });

      const res = await response.json();

      if (response.ok) {
        toast.success("Password reset successfully. You can now log in.");
        setShowForgotPasswordModal(false);
      } else {
        toast.error(res.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Login</h2>
            <Form className="p-4 shadow-sm border rounded" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formMobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="tel"
                  name="mobile"
                  placeholder="Enter Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="text-end">
                <Button
                  variant="link"
                  className="p-0 text-danger"
                  onClick={() => setShowForgotPasswordModal(true)}
                >
                  Forgot Password?
                </Button>
              </div>

              <div className="d-grid mt-4">
                <Button type="submit" variant="dark">
                  <IoLogIn className="me-2" />
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Forgot Password Modal */}
      <Modal show={showForgotPasswordModal} onHide={() => setShowForgotPasswordModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="forgotMobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={forgotPasswordData.mobile}
                onChange={handleForgotPasswordChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="forgotNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                placeholder="Enter New Password"
                value={forgotPasswordData.newPassword}
                onChange={handleForgotPasswordChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForgotPasswordModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleForgotPassword}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
