import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import { Card ,ListGroup } from 'react-bootstrap';
import { useState ,useEffect} from 'react';
import { moduleName } from '../components/cart';


const Cart = () => {

    const location = useLocation();
    const { product } = location.state;
    const [items , setItems ] = useState([product]);

    useEffect(()=>{
        console.log(items);
    })
    
    return (
      <div>
          <h1>cart</h1>
      </div>
    );
}



export default Cart;