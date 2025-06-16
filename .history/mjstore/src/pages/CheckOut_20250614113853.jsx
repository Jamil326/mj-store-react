import { useLocation } from 'react';

const CheckOut = () => {
    const location = useLocation();
    const { item , user } = location.state
    return (
        <div className='conatiner'>
          <div className='row'>
              <div className='col border text-center'>
                  <h1 className='mt-3 py-2 '>Order Summary</h1>
                  
              </div>
          </div>
            
        </div>
    )
}



export default CheckOut;