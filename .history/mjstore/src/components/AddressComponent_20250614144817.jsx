import { useState ,useEffect } from 'react';
import { Form } from 'react-bootstrap';

const AddressForm = () => {
    const [ address,setAddress ] = useState({
        street:'',
        landmark:'',
        city:'',
        pin:'',
        state:''


    })

    const ha
    return (
        <div>
         <form className='form-controll'>
             <label for="Street">Street</label>
             <input type="" name="" value=""/>
         </form>
        </div>
    )
} 



export default AddressForm;