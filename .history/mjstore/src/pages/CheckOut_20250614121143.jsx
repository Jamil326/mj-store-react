import { useLocation } from 'react-router-dom';
import { Button ,Image} from 'react-bootstrap';


const CheckOut = () => {
    const user = JSON.parse(localStorage.getItem('user-info')||"{}"); 
    const location = useLocation();
    const { item } = location?.state|| {};
   
    
    return (
        <div className='continer'>
          <div className='row'>
              <div className='col border text-center'>
                  <h1 className='mt-3 py-2 '>Order Summary</h1>
                  <div className='ratio ratio-' >
                      <Image fluid src={item.image[0]?.url}/>
                  </div>
                  
              </div>
          </div>
            
        </div>
    )
}



export default CheckOut;