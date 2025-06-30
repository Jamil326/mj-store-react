import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { IoHomeSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiLogIn } from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";
import { HiOutlineClipboardList } From ""react-icons/hi"


import { UserContext } from "../context/userContext"; // Assuming UserContext manages login state
import { toast } from "react-toastify";

const Footer = () => {
  const { logged } = useContext(UserContext); // Access global login state
  const [cartItemCount, setCartItemCount] = useState(0);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    const apiUrl = "https://mj-store.onrender.com/api/v1/user/cart/fetch";

    if (!token) return;

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
    if (logged) {
      fetchCartCount();
    }
  }, [logged]);

  return (
    <footer className="bg-light border-top shadow-lg fixed-bottom">
      <Container fluid>
        <Row className="text-center py-2">
          {/* Home */}
          <Col xs={3}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `d-block text-decoration-none ${
                  isActive ? "text-success fw-bold" : "text-dark"
                }`
              }
            >
              <IoHomeSharp size="1.5rem" />
              <span className="d-block small">Home</span>
            </NavLink>
          </Col>

          {/* Conditional Links */}
          {logged ? (
            <>
              {/* Orders */}
              <Col xs={3}>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `d-block text-decoration-none ${
                      isActive ? "text-success fw-bold" : "text-dark"
                    }`
                  }
                >
                  <FaShoppingCart size="1.5rem" />
                  <span className="d-block small">Orders</span>
                </NavLink>
              </Col>

              {/* Cart */}
              <Col xs={3} className="position-relative">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `d-block text-decoration-none ${
                      isActive ? "text-success fw-bold" : "text-dark"
                    }`
                  }
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
                </NavLink>
              </Col>
            </>
          ) : (
            <>
              {/* Sign Up */}
              <Col xs={3}>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `d-block text-decoration-none ${
                      isActive ? "text-success fw-bold" : "text-dark"
                    }`
                  }
                >
                  <RiUserAddLine size="1.5rem" />
                  <span className="d-block small">Sign Up</span>
                </NavLink>
              </Col>

              {/* Login */}
              <Col xs={3}>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `d-block text-decoration-none ${
                      isActive ? "text-success fw-bold" : "text-dark"
                    }`
                  }
                >
                  <FiLogIn size="1.5rem" />
                  <span className="d-block small">Login</span>
                </NavLink>
              </Col>
            </>
          )}

          {/* Account */}
          <Col xs={3}>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `d-block text-decoration-none ${
                  isActive ? "text-success fw-bold" : "text-dark"
                }`
              }
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
