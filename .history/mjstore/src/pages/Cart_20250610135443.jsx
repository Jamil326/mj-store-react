import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import { Card ,ListGroup } from 'react-bootstrap';
import { useState ,useEffect} from 'react';
import CartCard from '../components/CartCard';


const Cart = () => {

    const location = useLocation();
    const { product } = location.state;
    const [ items , setItems ] = useState([product]);

    useEffect(()=>{
        console.log(items);
    })
    
    return (
      <div>
          {
              items.length>0?items.map((item,index)=>(
                  <CartCard product={item} key={index} />
              )):(<h1>cart is empty</h1>)
          }
      </div>
    );
}



export default Cart;