import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { IoHomeSharp, IoBagSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";

const Footer = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch cart count only if the user is logged in
  const fetchCartCount = async () => {
    if (!token) return; // Prevent API call if the user is not logged in

    const apiUrl = "https://mj-store.onrender.com/api/v1/user/cart/fetch";

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart count.");
      }

      const { data } = await response.json();
      setCartItemCount(data?.count || 0);
    } catch (error) {
      console.error("Error fetching cart count:", error.message);
      setCartItemCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [token]);

  const handleProtectedNavigation = (path) => {
    if (!token) {
      toast.warn("Please log in or sign up first!");
      return navigate("/login");
    }
    navigate(path);
  };

  return (
    <footer className="bg-light border-top shadow-lg fixed-bottom">
      <Container fluid>
        <Row className="text-center py-2">
          {/* Home */}
          <Col xs={3}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-success d-block text-decoration-none ${isActive ? "fw-bold text-success" : ""}`
              }
            >
              <IoHomeSharp size="1.5rem" />
              <span className="d-block small">Home</span>
            </NavLink>
          </Col>

          {/* Orders */}
          <Col xs={3}>
            <div
              className="text-success d-block text-decoration-none cursor-pointer"
              onClick={() => handleProtectedNavigation("/orders")}
            >
              <IoBagSharp size="1.5rem" />
              <span className="d-block small">Orders</span>
            </div>
          </Col>

          {/* Cart */}
          <Col xs={3} className="position-relative">
            <div
              className="text-success d-block text-decoration-none cursor-pointer"
              onClick={() => handleProtectedNavigation("/cart")}
            >
              <FaShoppingCart size="1.5rem" />
              {cartItemCount > 0 && (
                <Badge
                  pill
                  bg="success"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItemCount}
                </Badge>
              )}
              <span className="d-block small">Cart</span>
            </div>
          </Col>

          {/* Account */}
          <Col xs={3}>
            <div
              className="text-success d-block text-decoration-none cursor-pointer"
              onClick={() => handleProtectedNavigation("/dashboard")}
            >
              <CgProfile size="1.5rem" />
              <span className="d-block small">Account</span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
