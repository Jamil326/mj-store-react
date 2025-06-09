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

               <hr/>

               <hr>

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

               <hr/>

               <div className='ms-4'>
                   <h4>Product Specification</h4>
               </div>

               <div className='mt-3 d-flex ms-3'>
                  

                  <ListGroup as='ul' >
                  <ListGroup.Item>Name</ListGroup.Item>
                  <ListGroup.Item>Price</ListGroup.Item>
                  <ListGroup.Item>Brand</ListGroup.Item>
                  <ListGroup.Item>Color</ListGroup.Item>
                  <ListGroup.Item>Material</ListGroup.Item>
                  <ListGroup.Item>Power</ListGroup.Item>
                  <ListGroup.Item>Power-Supply</ListGroup.Item>
                  <ListGroup.Item>Dimension</ListGroup.Item>
                  <ListGroup.Item>Usage</ListGroup.Item>
                  <ListGroup.Item>warranty</ListGroup.Item>
                  <ListGroup.Item>Product-ID</ListGroup.Item>
                  </ListGroup>


                  <ListGroup as='ul' >
                  <ListGroup.Item>{name || 'N/A'}</ListGroup.Item>
                  <ListGroup.Item>{price || 'N/A'}</ListGroup.Item>
                  <ListGroup.Item>{brand || 'N/A'}</ListGroup.Item>
                  <ListGroup.Item>{color || 'N/A'}</ListGroup.Item>
                  <ListGroup.Item>{material || 'N/A'}</ListGroup.Item>
                  <ListGroup.Item>{power ||'N/A'}</ListGroup.Item>
                  <ListGroup.Item>{power_supply || 'N/A'}</ListGroup.Item>
                  <ListGroup.Item>{{length } * {width} * {height} || 'N/A'} cm </ListGroup.Item>
                  <ListGroup.Item>{usage || 'N/A'}</ListGroup.Item>
                  <ListGroup.Item>{warranty || 'N/A'}</ListGroup.Item>
                  <ListGroup.Item>{_id || 'N/A'}</ListGroup.Item>
                  
                  
                  
                  
                  
                  </ListGroup>

                  
               </div>

             
              </Col>    
              
          )

}

export default ProductDetailCard;