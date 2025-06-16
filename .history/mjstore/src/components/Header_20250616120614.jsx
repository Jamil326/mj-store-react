import { IoBagSharp } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoLogInSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import LogOut from './LogOut';
import LogIn from './LogIn';

import { useContext } from 'react';
import { Container, Navbar ,Nav , NavDropdown } from 'react-bootstrap';
import logo from '../assets/brand-removebg-preview.png';
import { UserContext }  from '../context/userContext';


const Header = () => {
  const { logged } = useContext(UserContext);

    return (
            
            
        
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
      
          
        <Navbar.Brand className='' as={NavLink} to=''>
          <img src = {logo} style={{width:'50px', height:'auto'}} alt="logo"/>
          <span className='px-3 fw-bold border-bottom '>MJ Store</span>
           
     
           
           
        </Navbar.Brand>
       
        
              

      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

          
            <Nav.Link className='fw-bold' as={NavLink} to='products' >
             <MdOutlineShoppingBag className='d-md-none' />
            <span className='px-3'>Products</span>
            </Nav.Link>

            <Nav.Link className='fw-bold' as={NavLink} to='' >
            <IoHomeSharp className='d-md-none' />
            <span className='px-3'>Home</span>
            </Nav.Link>

            <Nav.Link className='fw-bold' as={NavLink} to='about'>
            <FcAbout className='d-md-none' />
            <span className='px-3'>About</span>
            </Nav.Link>
           {!logged &&
            <Nav.Link className='fw-bold' as={NavLink} to='signup' >
            <SiGnuprivacyguard className='d-md-none' />
            <span className='px-3'>Sign Up</span></Nav.Link>
           }
            {!logged &&
            <Nav.Link className='fw-bold ' as={NavLink} to='login' >
            <IoLogInSharp className='d-md-none' />
            <span className='px-3'>Login</span>
            </Nav.Link>
            }
            {logged &&
            <Nav.Link className='fw-bold' as={NavLink} to='cart' >
            <FaShoppingCart className='d-md-none' />
            <span className='px-3'>Cart</span>
            </Nav.Link>
            }
            <Nav.Link className='fw-bold' as={NavLink} to='contact' >
            <BiSolidContact className='d-md-none' />
            <span className='px-3'>Contact</span>
            </Nav.Link>
            {logged &&
            <Nav.Link className='fw-bold' as={NavLink} to='dashboard'>
            <MdDashboard className='d-md-none' />
            <span className='px-3'>Dashboard</span>
            </Nav.Link>
            }

             {logged &&
            <Nav.Link className='fw-bold' as={NavLink} to='orders'>
            <io className='d-md-none' />
            <span className='px-3'>Orders</span>
            </Nav.Link>
            }
            
          </Nav>
        </Navbar.Collapse>
        
      </Container>
      
    </Navbar>
    
      
  

    )
}


export default Header;