import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';


const Cart = () => {
    const location = useLocation();
    const { product } = location.state;
    console.log(product);
    return (
       <div className='container'>
       <div className='row'>
           <div className='col'>
              <Card>
              <Card.Img src=/>
              </Card>
           </div>
       </div>
           
       </div>
    );
}



export default Cart;