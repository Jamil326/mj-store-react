import { IoBagSharp, IoHomeSharp, IoLogInSharp } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { MdDashboard, MdOutlineShoppingBag } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/brand-removebg-preview.png";
import { UserContext } from "../context/userContext";

const Header = () => {
  const { logged } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary py-2">
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand as={NavLink} to="" className="d-flex align-items-center">
          <img src={logo} alt="logo" style={{ width: "40px", height: "auto" }} />
          <span className="px-2 fw-bold">MJ Store</span>
        </Navbar.Brand>

        {/* Toggle for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center">
            {/* Common Links */}
            <Nav.Link as={NavLink} to="products" className="fw-bold d-flex flex- align-items-start">
              <MdOutlineShoppingBag size={20} />
              <span>Products</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="" className="fw-bold d-flex flex-column align-items-center">
              <IoHomeSharp size={20} />
              <span>Home</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="about" className="fw-bold d-flex flex-column align-items-center">
              <FcAbout size={20} />
              <span>About</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="contact" className="fw-bold d-flex flex-column align-items-center">
              <BiSolidContact size={20} />
              <span>Contact</span>
            </Nav.Link>

            {/* Conditional Links */}
            {!logged ? (
              <>
                <Nav.Link as={NavLink} to="signup" className="fw-bold d-flex flex-column align-items-center">
                  <SiGnuprivacyguard size={20} />
                  <span>Sign Up</span>
                </Nav.Link>
                <Nav.Link as={NavLink} to="login" className="fw-bold d-flex flex-column align-items-center">
                  <IoLogInSharp size={20} />
                  <span>Login</span>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="cart" className="fw-bold d-flex flex-column align-items-center">
                  <FaShoppingCart size={20} />
                  <span>Cart</span>
                </Nav.Link>
                <Nav.Link as={NavLink} to="dashboard" className="fw-bold d-flex flex-column align-items-center">
                  <MdDashboard size={20} />
                  <span>Dashboard</span>
                </Nav.Link>
                <Nav.Link as={NavLink} to="orders" className="fw-bold d-flex flex-column align-items-center">
                  <IoBagSharp size={20} />
                  <span>Orders</span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
