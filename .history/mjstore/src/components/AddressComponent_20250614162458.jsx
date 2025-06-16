import { useState ,useEffect } from 'react';
import { Button } from 'react-bootstrap';

const AddressForm = () => {
    const [ address,setAddress ] = useState({
        street:'',
        landmark:'',
        city:'',
        pin:'',
        state:''


    })

    const handleSubmit= async (e) => {
        e.preventDefault();

        try {
            const token = JSON.parse(localStorage.getItem('token'))
            
        } catch (error) {
          return  toast.error(error)
        }
        
    }

    const handleChange =(e)=>{
        
        const {name,value} = e.target;
        setAddress((prev)=>{
           return {...prev ,[name]:value}

        })
    }
    return (
        <div className='mt-3 shadow-normal  '>
         <form className='form-control d-flex flex-column gap-3 p-5' onSubmit={handleSubmit}>
                 <h1 className='text-center'>Fill Up Address</h1>

             <input 
             type="text" 
             name="street" 
             value={address.street}
             placeholder='Street'
             onChange={handleChange}
             className='rounded p-2 border-0 border-bottom'
             />

             <input  
             type="text" 
             name="landmark" 
             value={address.landmark}
             placeholder='Landmark'
             onChange={handleChange}
             className='rounded p-2 border-0 border-bottom'
             />

             <input  
             type="text" 
             name="city" 
             value={address.city}
             placeholder='City'
             onChange={handleChange}
             className='rounded p-2 border-0 border-bottom'

             />


             <input  
             type="number" 
             name="pin" 
             value={address.pin}
             placeholder='Pin'
             onChange={handleChange}
             className='rounded p-2 border-0 border-bottom'
             
             />


             <input  
             type="text" 
             name="state" 
             value={address.state}
             placeholder='State'
             onChange={handleChange}
             className='rounded p-2 border-0 border-bottom'
             
             />
             <Button type='submit'  variant ='success mt-3 mb-3'>Add</Button>
         </form>
        </div>
    )
} 



export default AddressForm;