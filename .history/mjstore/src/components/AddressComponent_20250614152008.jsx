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
        console.log(FormData);
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
             <label for="street">Street</label>
             <input 
             type="text" 
             name="street" 
             value={address.street}
             placeholder='street'
             onChange={handleChange}
             />

             <label for="landmark">landmark</label>
             <input  
             type="text" 
             name="landmark" 
             value={address.landmark}
             placeholder='landmark'
             onChange={handleChange}
             />

             <label for="city">City</label>
             <input  
             type="text" 
             name="city" 
             value={address.landmark}
             placeholder='landmark'
             onChange={handleChange}
             />
         </form>
        </div>
    )
} 



export default AddressForm;