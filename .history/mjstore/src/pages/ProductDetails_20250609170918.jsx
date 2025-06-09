import ProductDetailCard from '../components/ProductDetailCard';
import moduleName from 'module';


const ProductDetails = ({view}) => {
return (
    <div>
        <ProductDetailCard Product={view}/>
    </div>
)
}


export default ProductDetails;