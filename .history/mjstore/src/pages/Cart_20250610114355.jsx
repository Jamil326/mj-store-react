import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';


const Cart = () => {
    const location = useLocation();
    const { product } = location.state;
    console.log();
    return (
       <div>
           
       </div>
    );
}



export default Cart;