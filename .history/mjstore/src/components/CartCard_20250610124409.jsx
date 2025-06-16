import { Col ,Row ,Button ,ListGroup ,Card } from 'react-bootstrap';

const CartCard = ({product}) => {
    const {name , price , _id , image=[]} = product;
    return(
       <Col xs={12} sm={10} md={4} >
       <Card>
       <Card.Img 
        className='p-5'
        src={image[0].url} />
       </Card>

       <Card className='mt-4 p-2'>
       <ListGroup>
       <ListGroup.Item>
        Name
       </ListGroup.Item>
       <ListGroup.Item>
       Price
       </ListGroup.Item>
       <ListGroup.Item>
       Quantity
       </ListGroup.Item>
       <ListGroup.Item>
       Total
       </ListGroup.Item>
       </ListGroup>
       </Card>
       </Col>
    )
}

export default CartCard;