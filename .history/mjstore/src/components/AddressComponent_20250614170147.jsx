import { useState ,useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

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
            const token = localStorage.getItem('token')|| "";
            console.log(token);
            const { _id } =localStorage.getItem('user-info')|| "";
            const url = 'https://mj-store.onrender.com/api/v1/user/address'
        
            if(!token) {
                throw new Error('token required');
            }

            const res = await fetch(url,{
                method:'POST',
                mode:'cors',
                headers:{
                    'content-type':'application/json',
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({_id,address})
            })

            const result = await res.json();
            console.log(result);
            if(!res.ok){
                throw new Error(result.message);
            }

            toast.success(result.message);
            
        } catch (error) {
          return  toast.error(error.message)
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