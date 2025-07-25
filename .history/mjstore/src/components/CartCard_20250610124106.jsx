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
       </ListGroup>
       </Col>
    )
}

export default CartCard;