import ProductDetailCard from '../components/ProductDetailCard';
import { useLocation } from 'react-router-dom';


const ProductDetails = () => {
    const location = useLocation();
    const Product = location.state || {};
return (
    <div>
        <ProductDetailCard Product={Product}/>
    </div>
)
}


export default ProductDetails;