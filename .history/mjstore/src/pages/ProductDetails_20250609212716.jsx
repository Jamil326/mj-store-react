import ProductDetailCard from '../components/ProductDetailCard';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';



const ProductDetails = () => {
    
    const location = useLocation();
const { product } = location.state || {};
return (
    <div>
        <ProductDetailCard Product={ product }/>
        <div className='d-flex position-sticky  gap-2 justify-content-center  '>
            <Button variant='outline-dark  '>Add To Cart</Button>
            <Button className='col-6'>Buy Now</Button>
        </div>

    </div>
)
}


export default ProductDetails;