import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import { Card ,ListGroup ,Button} from 'react-bootstrap';
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
                  <div>
                     <CartCard product={item} key={index} />
                     <div className='d-grid mt-2 mb-2'>
                         <Button variant=''>Remove</Button>
                     </div>
  
                  </div>
                  

              )):(<h1>cart is empty</h1>)
          }
      </div>
    );
}



export default Cart;