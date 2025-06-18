import { Container, Col, Row, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <Row>
          <Col className="text-center border-bottom mb-4">
            <h2>Welcome to Sign Up Page</h2>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center">
            <Form
              className="w-100 p-4 border rounded shadow-lg"
              style={{ maxWidth: "400px" }}
              onSubmit={handleSubmit}
            >
              <h3 className="mb-4 text-center">Sign Up</h3>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  aria-label="Name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  aria-label="Email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile"
                  aria-label="Mobile"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  aria-label="Password"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  aria-label="Confirm Password"
                  required
                />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100">
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
