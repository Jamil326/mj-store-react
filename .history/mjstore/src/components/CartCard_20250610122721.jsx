import { Col ,Row ,Button ,ListGroup ,Card } from 'react-bootstrap';

const CartCard = ({product}) => {
    const {name , price , _id , image=[]} = product;
    return(
       <Col>
       <Card>
       <Card.Img src={image[.url} />
       </Card>

       <ListGroup>
       <ListGroup.Item>
       </ListGroup.Item>
       </ListGroup>
       </Col>
    )
}