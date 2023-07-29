import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
import Orderd from '../components/Orderd';
import { useParams } from 'react-router-dom';

function Orderdetail() {
  const navigate = useNavigate();
  // Firebase Context Hook
  const firebase = useFirebase();

  // State Hooks
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false); // New state variable

  // Param hook
  const params = useParams();
  const productId = params.productId;

  // useEffect Hook
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await firebase.fetchOrders(productId);
        setOrders(ordersData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [firebase, productId]);

  // Function to handle delete button click
  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        setIsDeleting(true); // Set isDeleting to true when deletion begins

        // Delete product from Firestore
        await firebase.deleteProduct(productId);
        // Remove the deleted product from the state
        setOrders(orders.filter(order => order.id !== productId));
        alert('Product deleted');
        navigate('/Orders');
      } catch (error) {
        alert.error('Error deleting product:', error);
      } finally {
        setIsDeleting(false); // Set isDeleting back to false after deletion is complete
      }
    }
  };

  return (
    <div className="container mt-3" id="header">
      {isLoading ? (
        <div className="loading-spinner">
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
        <>
          <div className="text-center mt-5 mb-5">
            <h1>Your Orders</h1>
          </div>
          <div className="row d-flex mt-2 g-4">
            {orders.length > 0 ? (
              orders.map(order => <Orderd key={order.id} orderId={order.id} {...order} />)
            ) : (
              <div className="d-flex align-items-center justify-content-center mt-5 mb-5">
                <div className="text-center text-danger">
                  <div className="container mt-3" id="header">
                    <div className="row">
                      <div className="col-md-12 col-12 mx-auto">
                        <div className="mb-5 p-2 sign-box">
                          <div className="p-2 mt-2 mb-1 col-md-12 col-lg-12 col-xl-12 order-box d-flex justify-content-between">
                            <div>
                              <h2 className="mt-2 ms-2">There Is No Order</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="col-12 d-flex justify-content-center mt-5 mb-5">
              {isDeleting ? ( // Display loading text if isDeleting is true
                <button className="btn btn-danger" disabled>
                  Deleting...
                </button>
              ) : (
                <button className="btn btn-danger" onClick={handleDeleteProduct}>
                  Delete Product
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Orderdetail;
