import ProductDetailCard from '../components/ProductDetailCard';
import { useLocation } from 'react-router-dom';


const ProductDetails = () => {
    const location = useLocation()
return (
    <div>
        <ProductDetailCard Product={view}/>
    </div>
)
}


export default ProductDetails;