import ProductDetailCard from '../components/ProductDetailCard';
import { useLocation} from 'react-router-dom';


const ProductDetails = ({view}) => {
return (
    <div>
        <ProductDetailCard Product={view}/>
    </div>
)
}


export default ProductDetails;