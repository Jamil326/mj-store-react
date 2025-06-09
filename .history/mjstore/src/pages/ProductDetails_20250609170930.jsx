import ProductDetailCard from '../components/ProductDetailCard';
import {} from 'react-router-dom';


const ProductDetails = ({view}) => {
return (
    <div>
        <ProductDetailCard Product={view}/>
    </div>
)
}


export default ProductDetails;