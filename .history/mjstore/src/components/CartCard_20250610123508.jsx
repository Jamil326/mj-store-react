import { Col ,Row ,Button ,ListGroup ,Card } from 'react-bootstrap';

const CartCard = ({product}) => {
    const {name , price , _id , image=[]} = product;
    return(
       <Col xs={12} sm={10} md={4}>
       <Card>
       <Card.Img  src={image[0].url} />
       </Card>

       <ListGroup>
       <ListGroup.Item>
       </ListGroup.Item>
       </ListGroup>
       </Col>
    )
}

export default CartCard;