import ProductDetailCard from '../components/ProductDetailCard';
import { useLocation } from 'react-router-dom';
import { Butt } from 'react-bootstrap';



const ProductDetails = () => {
    
    const location = useLocation();
const { product } = location.state || {};
return (
    <div>
        <ProductDetailCard Product={ product }/>

    </div>
)
}


export default ProductDetails;