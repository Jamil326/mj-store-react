import { Card , Button , Container , Row ,Col } from 'react-bootstrap';

const ProductCard = ({product}) => {
    const {_id ,name , price , title , image } = product;
    
    
    return(


<Col xs={12} sm={6} md={4} id={_id} >
<Card  className=' p-1 shadow-sm  '  >
<Card.Img  className='  object-fit-cover img-thumbnail h-25'  variant='top' src={image[0]?.url} alt={name}   fluid />
<Card.Body>
<Card.Title>{name}</Card.Title>
<Card.Subtitle>{title}</Card.Subtitle>
<Card.Title className='mt-2 text-success'><span className=''>₹</span>{price}</Card.Title>
<Card.Text className='fw-bold'>Free Delivery</Card.Text>
<div className=' d-md-flex justify-content-start '>
    <Button className='m-1 w-100' variant='success' size='sm'>Add To Cart</Button>
    <Button className='m-1 w-100' variant='secondary' size='sm'>Buy Now</Button>
</div>

</Card.Body>
</Card>
</Col>

    )
}






export default ProductCard;