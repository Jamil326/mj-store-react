import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import { IoBagSharp, IoHomeSharp, IoLogInSharp } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { MdDashboard, MdOutlineShoppingBag } from "react-icons/md";
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
    { path: "dashboard", label: "Dashboard", icon: <MdDashboard />, condition: logged },
    { path: "orders", label: "Orders", icon: <IoBagSharp />, condition: logged },
  ];

  return (
    <Navbar expand="lg" className="bg-light shadow-sm">
      <Container fluid>
        {/* Logo Section */}
        <Navbar.Brand as={NavLink} to="" className="d-flex align-items-center">
          <img src={logo} alt="logo" style={{ width: "50px", height: "auto" }} />
          <span className="px-3 fw-bold fs-5 text-success">MJ Store</span>
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Row className="w-100 text-center">
              {navLinks
                .filter((link) => link.condition === undefined || link.condition)
                .map((link, idx) => (
                  <Col xs={6} md={3} key={idx} className="my-2">
                    <Nav.Link as={NavLink} to={link.path} className="fw-bold text-dark d-flex flex-column align-items-center">
                      <div className="fs-4 text-success">{link.icon}</div>
                      <span className="mt-1">{link.label}</span>
                    </Nav.Link>
                  </Col>
                ))}
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
