import React, { useEffect, useState } from 'react';
import { useFirebase } from "../context/Firebase";
import Card from "../components/Card";

function Home() {
  // firebase Context Hook 
  const firebase = useFirebase();
  // State Hooks 
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  // useEffect Hook 
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
      setIsLoading(true);
      firebase.allProducts().then((products) => {
        setProducts(products.docs);
        setIsLoading(false);
      });
    }
  }, [isOnline, firebase]);

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
          <div className='row d-flex mt-2 g-4'>
            {products && products.map((product) => (
              <Card key={product.id} id={product.id} {...product.data()} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
