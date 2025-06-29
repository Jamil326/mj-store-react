import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { IoHomeSharp, IoBagSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Footer = () => {
  return (
    <footer className="bg-white border-top shadow-lg fixed-bottom">
      <Container fluid>
        <Row className="text-center py-2">
          {/* Home */}
          <Col xs={3}>
            <NavLink to="/" className="text-success d-block">
              <IoHomeSharp size="1.5rem" />
              <span className="d-block small">Home</span>
            </NavLink>
          </Col>

          {/* Orders */}
          <Col xs={3}>
            <NavLink to="/orders" className="text-success d-block">
              <IoBagSharp size="1.5rem" />
              <span className="d-block small">Orders</span>
            </NavLink>
          </Col>

          {/* Cart */}
          <Col xs={3}>
            <NavLink to="/cart" className="text-success d-block">
              <FaShoppingCart size="1.5rem" />
              <span className="d-block small">Cart</span>
            </NavLink>
          </Col>

          {/* Account */}
          <Col xs={3}>
            <NavLink to="/dashboard" className="text-success d-block">
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
