import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import { moduleName } from 'module';


const Cart = () => {
    const location = useLocation();
    const { product } = location.state;
    console.log(product);
    return (
       <div className='container'>
       <div className='row'>
           <div className='col'>
               
           </div>
       </div>
           
       </div>
    );
}



export default Cart;