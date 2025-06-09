import ProductDetailCard from '../components/ProductDetailCard';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';



const ProductDetails = () => {
    
    const location = useLocation();
const { product } = location.state || {};
return (
    <div>
        <ProductDetailCard Product={ product }/>
        <div>
            <Button>Add To Cart</Button>
            <Button>Buy No</Button>
        </div>

    </div>
)
}


export default ProductDetails;