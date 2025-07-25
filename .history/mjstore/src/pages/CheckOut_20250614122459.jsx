import { useLocation } from 'react-router-dom';
import { Button ,Image, Container ,Row ,Col} from 'react-bootstrap';


const CheckOut = () => {
    const user = JSON.parse(localStorage.getItem('user-info')||"{}"); 
    const location = useLocation();
    const { item } = location?.state|| {};
   
    
    return (
       <Container sm={12}>
       <Row>
       <div className='w-75 d-sm-flex justify-content-center'>
           <Image fluid src ={item.image[0].url}/>
       </div>
       </Row>
       </Container>
    )
}



export default CheckOut;