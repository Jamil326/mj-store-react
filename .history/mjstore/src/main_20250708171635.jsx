import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';


import { createBrowserRouter,
         RouterProvider } from 'react-router-dom';

import About from './pages/About';
import Home from './pages/Home';
import Cart from './pages/Cart';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import ProductPage from './pages/ProductPage';
import ProductDetails from './pages/ProductDetails';
import CheckOut from './pages/CheckOut';
import Orders from './pages/Orders';
import OrderPageBuyNow from './pages/OrderPageBuyNow';
import OrderPageCartCheckout from './pages/OrderPageCartCheckout';
import OrderPage2 from './pages/OrderPage2';
import OrderHistorypage from './pages/OrderHistorypage';



const router= createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'',
        element: <Home />,
      },

      {
       path:'Products',
       element: <ProductPage />
      },
      
      {
        path:'about',
        element: <About />,
      },

      {
        path:'cart',
        element: <Cart />,
      },

      {
        path:'signup',
        element: <SignUp />
      },

      {
        path:'dashboard',
        element: <Dashboard />
      },

      {
        path:'login',
        element: <Login />
      },

      {
        path:'contact',
        element: <Contact />
      },

      {
        path:'productDetails/:product',
        element: <ProductDetails/>
      },

      {
        path:'checkout',
        element:<CheckOut />
      },

      {
        path:'orders',
        element:<Orders />
      },

      {
        path:'OrderPageBuyNow',
        element:<OrderPageBuyNow/>
      },

      {
        path:'OrderPageCartCheckout',
        element:<OrderPageCartCheckout/>
      },

      {
        path:'checkout2',
        element:<OrderPage2 />
      },

      {
        path:'orderhistorypage',
        element:<OrderHistorypage/>
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
      <RouterProvider router = {router}/>
  
  </StrictMode>
)
