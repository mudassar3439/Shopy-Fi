import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
import OrderBox from '../components/OrderBox';

function Orders() {
  const firebase = useFirebase();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  // useNavigate Hook
  const navigate = useNavigate();


  useEffect(() => {
    // Function to handle online/offline events
    const handleOnlineStatus = () => {
      setIsOnline(window.navigator.onLine);
    };

    // Add event listeners for online/offline events
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // Cleanup the event listeners when component unmounts
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/Add-user'); // Redirect to '/Add-user' if not logged in
    } else {
      const uid = firebase.user?.uid;
      if (uid) {
        firebase.Fetchproduct(uid)
          .then((products) => {
            setProducts(products.docs);
            setIsLoading(false);
            console.log(products); // Perform any operations with the updated products state here
          })
          
      }
    }
  }
  }, [isOnline,firebase, navigate]);
  
  
  return (
    <>
      <div className='container'>
      {!isOnline && (
          <div className='alert alert-danger mt-1 text-center' role='alert'>
            Something Went Wrong.check your internet.
          </div>
        )}
        {isLoading ? (
          <div className='loading-spinner'>
            <h1>
              Loading 
              <div className="spinner-grow spinner-grow-sm text-primary ms-1" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow spinner-grow-sm ms-1" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow spinner-grow-sm text-primary ms-1" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </h1>
          </div>
        ) : (
          Array.isArray(products) &&
          products.map((product) => (
            <OrderBox key={product.id} id={product.id} {...product.data()} />
          ))
        )}
      </div>
    </>
  );
  
}

export default Orders;
