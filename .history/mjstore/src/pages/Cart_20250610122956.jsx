import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import { Card ,ListGroup } from 'react-bootstrap';
import { useState ,useEffect} from 'react';
import CartCard from '../components/CartCard';


const Cart = () => {

    const location = useLocation();
    const { product } = location.state;
    const [items , setItems ] = useState([product]);

    useEffect(()=>{
        console.log(items);
    })
    
    return (
      <div>
          {
              items.lentgh>0/
          }
      </div>
    );
}



export default Cart;