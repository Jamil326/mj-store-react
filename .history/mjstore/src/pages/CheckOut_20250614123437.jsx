import { useLocation } from 'react-router-dom';
import { Button ,Image, Container ,Row ,Col ,ListGroup} from 'react-bootstrap';


const CheckOut = () => {
    const user = JSON.parse(localStorage.getItem('user-info')||"{}"); 
    const location = useLocation();
    const { item } = location?.state|| {};
   
    
    return (
       <Container sm={12}>
       <Row>
       <div className='w-75 mx-auto mt-5'>
           <Image fluid src ={item.image[0].url}/>
       </div>
       </Row>

       <Row className='text-center mt-3'>

       <ListGroup>
       <ListGroup.Item>
       <span className='ms- me-5'>Name :</span>
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
       </Container>
    )
}



export default CheckOut;