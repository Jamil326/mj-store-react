import ProductDetailCard from '../components/ProductDetailCard';
import { useLocation } from 'react-router-dom';


const ProductDetails = () => {
    console.log(Prod);
    const location = useLocation();
const { product } = location.state || {};
return (
    <div>
        <ProductDetailCard Product={ product }/>
    </div>
)
}


export default ProductDetails;