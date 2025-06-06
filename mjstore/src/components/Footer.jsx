import React from 'react';
import { FaCartShopping } from "react-icons/fa6";

import { Container ,Row ,Col , Badge } from 'react-bootstrap';


const Footer = () => {
  const item =10;
  return (

<Container>
<Row>
<Col className='d-flex justify-content-end ' style={{cursor:'pointer'}}>
<Badge ><FaCartShopping size='1.5rem' />{item}
</Badge>
  
</Col>
</Row>
</Container>   

    

  );
};

export default Footer;
