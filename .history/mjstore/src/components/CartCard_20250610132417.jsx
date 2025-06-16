import { Col ,Row ,Button ,ListGroup ,Card } from 'react-bootstrap';
import {useState} from 'react';

const CartCard = ({product}) => {
    const { name , price , _id , image=[]} = product;
    const [ quantity , setQuantity ] = useState(1);
    return(
       <Col xs={12} sm={10} md={4} >
       <Card>
       <Card.Img 
        className='p-5'
        src={image[0].url} />
       </Card>
       <div className='conatiner'>
       <div className='row'>
        


                 <div className='col'>
             
           
           
       
       <Card className='border-0 text-center '>
       <ListGroup className=' '>
       <ListGroup.Item >
        <span>{name}</span>        

       </ListGroup.Item>
       <ListGroup.Item>
       <span className="me-5">Price :</span>
       <span>{price}</span>
       </ListGroup.Item>
       <ListGroup.Item >
       <span className='me-5'>Quantity :</span>
       <span>{quantity}</span> 
       </ListGroup.Item>
       <ListGroup.Item className='fw-bold'>
       <span className="me-5">Total :</span><span>{price*quantity}</span>
       </ListGroup.Item>
       
       </ListGroup>

       <div className='mt-3'>
           <Button variant='dark' className='me-2'>-</Button>
           <Button variant='success' >+</Button>
       
       </div>

      
       </Card>

       <div>
           <Button>Re</Button>
       </div>
                </div>

              </div>

       </div>
       </Col>
    )
}

export default CartCard;