import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';


const Cart = () => {
    const location = useLocation();
    const { product } = location.state;
    console.log(product);
    return (
       <div className='container'>
       <div className='row'>
           <div className=>
               
           </div>
       </div>
           
       </div>
    );
}



export default Cart;