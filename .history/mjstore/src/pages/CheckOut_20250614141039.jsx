import { useLocation ,useNavigate} from 'react-router-dom';
import { Card,  Button ,Image, Container ,Row ,Col ,ListGroup ,Form} from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';


const CheckOut = () => {
    const red = useNavigate();
    const { logged , setLogged } = useContext(UserContext);
    const handleDir = () => {
        red('/signup');
    }
    if( !logged ) {
        return <div className='text-center mt-5'>
            <Button className='bg-success py-2 ' onClick={()=> handleDir()}>Please goto sign up page</Button>
        </div>
    }

    const Address=(_id)=>{
           return   <Form>
           <Form.Group>
           </Form.Group>
           </Form>  
    }
    const user = JSON.parse(localStorage.getItem('user-info')||"{}");
    const {city ,state ,pin ,landmark ,street} =user?.address || {}; 
    const location = useLocation();
    const { item } = location?.state|| {};
  
   
    
    return (
        
       <Container sm={ 12 }>
       
       <Row>
       <div className='w-75 mx-auto mt-5'>
           <Image fluid src ={item.image[0].url}/>
       </div>
       </Row>
      
       <Row className='text-center mt-3'>

       <ListGroup>
       <ListGroup.Item>
       <span className='ms-3 me-5'>Name :</span>
       {item.name}
       </ListGroup.Item>
       <ListGroup.Item>
       <span className='me-5'>Quantity :</span>
       <span>1</span>
       </ListGroup.Item>
       <ListGroup.Item>
       <span className='fw-bold me-5'>Price: </span>
      <span className='fw-bold'>{item.price}</span> 
       </ListGroup.Item>
       </ListGroup>
           
       
       </Row>
       <Row>
       {user.address?(
           <div className='mt-5'>

               <Card>
               <Card.Body>
                      <h4 className='text-center py-2'>Address Details</h4>

               <ListGroup>
                <ListGroup.Item>
                <span className='me-5'>Street</span>
                <span>{street}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                <span className='me-4'>Landmark</span>
                <span>{landmark}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                <span className='me-5'>City</span>
                <span>{city}</span>
                </ListGroup.Item>          
                <ListGroup.Item>
                <span className='me-5'>Pin</span>
                <span>{pin}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                <span className='me-5'>State</span>
                <span>{state}</span>
                </ListGroup.Item>
               </ListGroup>

            
               </Card.Body>
               </Card>   

               <div >
                   <Button variant = 'success w-100 p-2 mt-3'  >Place Order</Button>
               </div>
 
           </div>
       ):( <div className='text-center mt-3'>
           <Button onClick={()=> Address()} variant='dark px-5 '>Add Address</Button>
       </div>)}
       </Row>
      
       </Container>
        
        
    )
}



export default CheckOut;