import { Container, Col, Row, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaKey } from "react-icons/fa";

const SignUp = () => {
  let timeoutId;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const errorMessage = "User already exists. Please go to login page.";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.warn("Password and Confirm Password must match.");
      setFormData((prevData) => ({
        ...prevData,
        password: "",
        confirmPassword: "",
      }));
      return;
    }

    try {
      const url = "https://mj-store.onrender.com/api/v1/user/signup";
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.message.trim().toLowerCase() === errorMessage.trim().toLowerCase()) {
          timeoutId = setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
        throw new Error(result.message);
      }

      toast.success(result.message);
      timeoutId = setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
  }, []);

  return (
    <div className="mt-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4 text-dark fw-bold">Create Your Account</h2>
            <Form
              className="p-4 shadow rounded-3 bg-white border"
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3 d-flex align-items-center">
                <FaUser className="me-2 text-success" />
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  
                />
              </Form.Group>

              <Form.Group className="mb-3 d-flex align-items-center">
                <FaEnvelope className="me-2 text-success" />
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  r
                />
              </Form.Group>

              <Form.Group className="mb-3 d-flex align-items-center">
                <FaPhone className="me-2 text-success" />
                <Form.Control
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 d-flex align-items-center">
                <FaLock className="me-2 text-success" />
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4 d-flex align-items-center">
                <FaKey className="me-2 text-success" />
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </Form.Group>

              <Button type="submit" variant="success" className="w-100 fw-bold">
                Sign Up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
