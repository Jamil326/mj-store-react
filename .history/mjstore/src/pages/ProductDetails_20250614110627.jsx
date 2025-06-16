import ProductDetailCard from '../components/ProductDetailCard';
import { useLocation ,useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';



const ProductDetails = () => {
    const redi = useNavigate();
    const location = useLocation();
    const { product } = location.state || {};
    const HandleCart = () => {
       redi('/cart',{ state: { product:product } });
    }

return (
    <div className=''>
        <ProductDetailCard Product={ product }/>
        <div className='d-flex position-sticky  gap-2 justify-content-center  ' style={{bottom:"2%"}}>
            <Button variant ='dark'>Add To Cart</Button>
            <Button onClick={()=>HandleCart()} variant ='success' className='col-6 py-2 '>Buy Now</Button>
        </div>

    </div>
)
}


export default ProductDetails;