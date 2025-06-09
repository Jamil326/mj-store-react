import { useState , useEffect } from 'react';
import { Col , Row , Button , Carousel ,CarouselItem  ,Image , Card ,ListGroup} from 'react-bootstrap';

const ProductDetailCard = ({ Product }) => {
    
    if(!Product) {
        return <p>no product</p>
    }
    
    const {
            _id, price , title,
            brand, category , color,
            description ,material, name ,
            power, power_supply ,usage , warranty ,
            image=[] ,size={} 
          } = Product;

          const  { length, width, height } = size;

          return (
              
              <Col xs = { 12 } sm = { 6 } md = { 4 } >
               <Carousel>
               { image.map(( img , index )=>(
                    
                  <Carousel.Item className='text-center' key= { index }>
                    <Image 
                    src= {img.url}
                    fluid
                    thumbnail
                    className=' p-1'

                    />
                  </Carousel.Item> 
               ))}
               </Carousel>

               <div className='mt-0 p-2'>
                   <Card className=' lh-1 p-3 border-0'>
                   <Card.Body>
                   <Card.Title className='mb-5  py-3'>
                   {name}
                   </Card.Title>
                   <Card.Subtitle className='mt-1 mb-3'>
                   {title}
                   </Card.Subtitle>
                   <Card.Text className='mb-5'>
                   {description}
                   </Card.Text>
                  
                  
                   <Card.Text className='text-dark fs-3 fw-bold '>
                   <span className=''>₹ </span>{price}
                   </Card.Text>
                    <Card.Text>
                   Free Delivery
                   </Card.Text>
                    <Card.Title>
                   Cash On Delivery
                   </Card.Title>
                   </Card.Body>
                   </Card>
               </div>

               <div className='mt-3'>
                  <ListGroup as='ul'>
                  <listGroup.Item>{color}</listGroup.Item>
                  <ListGroup.Item>{power}</ListGroup.Item>
                  <ListGroup.Item>{power_supply}</ListGroup.Item>
                  <ListGroup.Item>{category}</ListGroup.Item>
                  <listGroup.Item>{warranty}</ListGroup.Item>
                  <ListGroup.Item>{usage}</ListGroup.Item>
                  <ListGroup.Item>{warranty}</ListGroup.Item>
                  <ListGroup.Item>{description}</l.Item>


                  </ListGroup.Item>
               </div>

             
              </Col>    
              
          )

}

export default ProductDetailCard;