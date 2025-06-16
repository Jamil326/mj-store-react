import { useLocation } from 'react-router-dom';
import { Button ,Image, Container ,Row ,Col} from 'react-bootstrap';


const CheckOut = () => {
    const user = JSON.parse(localStorage.getItem('user-info')||"{}"); 
    const location = useLocation();
    const { item } = location?.state|| {};
   
    
    return (
       <Container>
       <Row>
       <div className=''>
           <Image src ={item.image[0]}/>
       </div>
       </Row>
       </Container>
    )
}



export default CheckOut;