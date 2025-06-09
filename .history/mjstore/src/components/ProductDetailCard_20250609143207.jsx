import { useState , useEffect } from 'react';
import { Col , Row } from 'react-bootstrap';

const ProductDetailCard = ({ Product }) => {
    const {length ,width ,height } = Product.size
    const { _id, price , title,
            brand, category , color,
            description ,material, name ,
            power, power_supply ,}

}