import { FaShoppingCart } from "react-icons/fa";
import { Badge , Button} from 'react-bootstrap';
import { useContext } from 'react';




const LogOut = () => {

    const handleClick = () => {
      localStorage.clear('token');
    }
    
    return (
      <div >
          <Button onClick = {()=>handleClick()}  variant='outline-danger'>
          <strong>Log Out</strong>
          </Button>
      </div>
    )
}

export default LogOut;