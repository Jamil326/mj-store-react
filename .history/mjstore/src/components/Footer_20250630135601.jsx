import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { IoHomeSharp, IoBagSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Footer = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  // Fetch cart count from the API
  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
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
      console.log(data);
      setCartItemCount(data?.count || 0);
    } catch (error) {
      console.error("Error fetching cart count:", error.message);
      setCartItemCount(0); // Reset to 0 if an error occurs
    }
  };

  useEffect(() => {
    
  }, []);

  return (
    <footer className="bg-light border-top shadow-lg fixed-bottom">
      <Container fluid>
        <Row className="text-center py-2">
          {/* Home */}
          <Col xs={3}>
            <NavLink
              to="/"
              className="text-dark d-block"
              style={{ textDecoration: "none" }}
            >
              <IoHomeSharp size="1.5rem" />
              <span className="d-block small">Home</span>
            </NavLink>
          </Col>

          {/* Orders */}
          <Col xs={3}>
            <NavLink
              to="/orders"
              className="text-dark d-block"
              style={{ textDecoration: "none" }}
            >
              <IoBagSharp size="1.5rem" />
              <span className="d-block small">Orders</span>
            </NavLink>
          </Col>

          {/* Cart */}
          <Col xs={3}>
            <NavLink
              to="/cart"
              className="text-dark d-block position-relative"
              style={{ textDecoration: "none" }}
            >
              <FaShoppingCart size="1.5rem" />
              {cartItemCount > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItemCount}
                </Badge>
              )}
              <span className="d-block small">Cart</span>
            </NavLink>
          </Col>

          {/* Account */}
          <Col xs={3}>
            <NavLink
              to="/dashboard"
              className="text-dark d-block"
              style={{ textDecoration: "none" }}
            >
              <CgProfile size="1.5rem" />
              <span className="d-block small">Account</span>
            </NavLink>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
