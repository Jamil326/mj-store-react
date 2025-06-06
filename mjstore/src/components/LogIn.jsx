import { FaShoppingCart } from "react-icons/fa";
import { Badge , Button} from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';



const LogIn = () => {

    const navigateTo = useNavigate();
    const handleClick = () => {
        console.log(' login clicked ');
        navigateTo('/login');
    }
    
    return (
      <div>
          <Button onClick={()=> handleClick()} variant='outline-primary'>
          <strong>Log In</strong>
          </Button>
      </div>
    )
}

export default LogIn;