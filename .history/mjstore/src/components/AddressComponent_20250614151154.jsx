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

    const handleSubmit= (e) => {
        e.preventDefault();
        
    }

    const handleChange =(e)=>{
        
        const {name,value} = e.target;
        setAddress((prev)=>{
           return {...prev ,[name]:value}

        })
    }
    return (
        <div>
         <form className='form-controll' onSubmit={handleSubmit}>
             <label for="Street">Street</label>
             <input 
             type="text" 
             name="street" 
             value={formdata.street}
             placeholder='street'
             onChange={handleChange}
             />
         </form>
        </div>
    )
} 



export default AddressForm;