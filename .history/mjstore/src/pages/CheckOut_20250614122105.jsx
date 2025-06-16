import { useLocation } from 'react-router-dom';
import { Button ,Image, con} from 'react-bootstrap';


const CheckOut = () => {
    const user = JSON.parse(localStorage.getItem('user-info')||"{}"); 
    const location = useLocation();
    const { item } = location?.state|| {};
   
    
    return (
       <
    )
}



export default CheckOut;