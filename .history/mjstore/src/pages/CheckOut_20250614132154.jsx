import { useLocation ,useNavigate} from 'react-router-dom';
import { Card,  Button ,Image, Container ,Row ,Col ,ListGroup} from 'react-bootstrap';
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
    const user = JSON.parse(localStorage.getItem('user-info')||"{}");
    const {city ,stat} 
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
       <span className='ms-5 me-5'>Name :</span>
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
           <div>

               <Card>
               <Card.Body>
               <ListGroup>
            
               </ListGroup>

            
               </Card.Body>
               </Card>   
 
           </div>
       ):( <div className='text-center mt-3'>
           <Button variant='dark px-5 '>Add Address</Button>
       </div>)}
       </Row>
      
       </Container>
        
        
    )
}



export default CheckOut;