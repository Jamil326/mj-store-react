import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import {
  IoBagSharp,
  IoHomeSharp,
  IoLogInSharp,
} from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import {
  MdDashboard,
  MdOutlineShoppingBag,
} from "react-icons/md";
import logo from "../assets/brand-removebg-preview.png";
import { UserContext } from "../context/userContext";

const Header = () => {
  const { logged } = useContext(UserContext);

  const navLinks = [
    { path: "", label: "Home", icon: <IoHomeSharp /> },
    { path: "products", label: "Products", icon: <MdOutlineShoppingBag /> },
    { path: "about", label: "About", icon: <FcAbout /> },
    { path: "contact", label: "Contact", icon: <BiSolidContact /> },
    { path: "signup", label: "Sign Up", icon: <SiGnuprivacyguard />, condition: !logged },
    { path: "login", label: "Login", icon: <IoLogInSharp />, condition: !logged },
    { path: "cart", label: "Cart", icon: <FaShoppingCart />, condition: logged },
    { path: "dashboard", label: "Account", icon: <MdDashboard />, condition: logged },
    { path: "orders", label: "My Orders", icon: <IoBagSharp />, condition: logged },
    { path: "orderhistorypage", label: "Order History", icon: <IoBagSharp />, condition: logged },
  ];

  const filteredLinks = navLinks.filter(
    (link) => link.condition === undefined || link.condition
  );

  return (
    <Navbar expand="lg" className="bg-white shadow-sm sticky-top py-2">
      <Container fluid className="px-3">
        {/* Logo */}
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-2">
          <img src={logo} alt="MJ Store Logo" style={{ width: "45px" }} />
          <span className="fw-bold fs-5 text-success">MJ Store</span>
        </Navbar.Brand>

        {/* Toggle for Mobile */}
        <Navbar.Toggle aria-controls="main-navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto w-100">
            {/* Mobile View */}
            <Row className="d-lg-none w-100 g-2 text-center mt-3">
              {filteredLinks.map((link, idx) => (
                <Col xs={6} key={idx}>
                  <Nav.Link
                    as={NavLink}
                    to={`/${link.path}`}
                    className="d-flex flex-column align-items-center text-dark fw-semibold"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <span className="fs-4 text-success">{link.icon}</span>
                    {link.label}
                  </Nav.Link>
                </Col>
              ))}
            </Row>

            {/* Desktop View */}
            <div className="d-none d-lg-flex align-items-center gap-3 ms-auto">
              {filteredLinks.map((link, idx) => (
                <Nav.Link
                  key={idx}
                  as={NavLink}
                  to={`/${link.path}`}
                  className={({ isActive }) =>
                    `d-flex align-items-center gap-2 px-3 py-2 rounded fw-semibold ${
                      isActive
                        ? "bg-light border border-success text-success"
                        : "text-dark"
                    }`
                  }
                  style={{
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <span className="fs-5">{link.icon}</span>
                  {link.label}
                </Nav.Link>
              ))}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
