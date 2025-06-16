import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import { Card ,ListGroup } from 'react-bootstrap';
import { useState } from 'react';


const Cart = () => {

    const location = useLocation();
    const { product } = location.state;
    const []
    
    console.log(product);
    return (
       <div className='container'>
       <div className='row'>
           <div className='col'>
              <Card>
              <Card.Img src={product.image[0].url}
              className='p-5'
               />
              </Card>
           </div>
       </div>


       <div className='row mt-5  '>
           <div className='col '>
               <h4 className='text-center'>Cart Summary</h4>
               <ListGroup>
               <ListGroup.Item>
               Name
               </ListGroup.Item>
               <ListGroup.Item className=''>
               Price
               </ListGroup.Item>
               <ListGroup.Item>
               Quantity
               </ListGroup.Item>
               </ListGroup>
           </div>
       </div>
           
       </div>
    );
}



export default Cart;