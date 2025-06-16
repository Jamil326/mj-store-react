import { useLocation } from 'react-router-dom';
import { Button ,Image, Container ,Row ,} from 'react-bootstrap';


const CheckOut = () => {
    const user = JSON.parse(localStorage.getItem('user-info')||"{}"); 
    const location = useLocation();
    const { item } = location?.state|| {};
   
    
    return (
       <Container>
       </Container>
    )
}



export default CheckOut;