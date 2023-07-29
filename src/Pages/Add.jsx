import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const Add = () => {
  // Firebase context Hook
  const firebase = useFirebase();

  // useNavigate Hook
  const navigate = useNavigate();
  // use Effect Hook for show page
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      navigate('/Add-user');
    }
  }, [navigate]);

  // State Hooks
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [productName, setproductName] = useState('');
  const [productNameError, setproductNameError] = useState('');

  const [isbn, setIsbn] = useState('');
  const [isbnError, setIsbnError] = useState('');

  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');

  const [pic, setPic] = useState('');
  const [picError, setPicError] = useState('');

  const [detail, setDetail] = useState('');
  const [detailError, setDetailError] = useState('');

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

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

  // Firebase function for adding data of a product
  const submit = async (e) => {
    e.preventDefault();

    // Reset previous validation errors
    setUsernameError('');
    setPhoneError('');
    setproductNameError('');
    setIsbnError('');
    setPriceError('');
    setPicError('');
    setDetailError('');

    // Perform form validation
    let isValid = true;

    if (username.trim() === '') {
      setUsernameError('Please enter your Name');
      isValid = false;
    }
    if (phone.trim() === '') {
      setPhoneError('Please enter your Phone No');
      isValid = false;
    }
    if (productName.trim() === '') {
      setproductNameError('Please enter product`s name');
      isValid = false;
    }

    if (isbn.trim() === '') {
      setIsbnError('Please enter product`s ISBN no');
      isValid = false;
    }

    if (price.trim() === '') {
      setPriceError('Please enter product`s price');
      isValid = false;
    }
    if (typeof pic === 'string' && pic.trim() === '') {
      setPicError('Please choose a product picture');
      isValid = false;
    }

    if (detail.trim() === '') {
      setDetailError('Please enter product`s detail');
      isValid = false;
    }

    if (isValid) {
      if (isOnline) {
        setIsLoading(true); // Start loading state
        await firebase.Add(productName, isbn, price, pic, detail, username, phone);
        setIsLoading(false); // End loading state
        window.location.reload(); // Reload the page
      }
    }
  };

  return (
    <div>
      <div className="container" id="header">
        {!isOnline && (
          <div className='alert alert-danger mt-1 text-center' role='alert'>
            Something Went Wrong. Check your internet.
          </div>
        )}
        <div className="text-center mt-2">
          <h1>Add your Products</h1>
        </div>
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form className="mb-5 p-2 sign-box">
              <div className="text-center">
                <h2>User-info</h2>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <label className="form-label">Name</label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    className="form-control"
                    id="inputCity1"
                    placeholder="Enter your Full Name"
                  />
                  {usernameError && <div className="text-danger">{usernameError}</div>}
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <label className="form-label">Phone</label>
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="tell"
                    pattern="03[0-9]{2}-[0-9]{7}"
                    className="form-control"
                    id="inputCity"
                    placeholder="Enter your Contact Number"
                  />
                  {phoneError && <div className="text-danger">{phoneError}</div>}
                </div>
              </div>
              <div className="text-center">
                <h2 className="mt-2">Product-info</h2>
              </div>
              <div className="mb-3 text-left">
                <label htmlFor="exampleFormControlInput3" className="form-label">
                  Product Name
                </label>
                <input
                  onChange={(e) => setproductName(e.target.value)}
                  value={productName}
                  type="text"
                  className="form-control input"
                  id="exampleFormControlInput3"
                  placeholder="Enter your Product Name"
                />
                {productNameError && <div className="text-danger">{productNameError}</div>}
              </div>
              <div className="mb-3 text-left">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  ISBN Number
                </label>
                <input
                  onChange={(e) => setIsbn(e.target.value)}
                  value={isbn}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter ISBN Number"
                />
                {isbnError && <div className="text-danger">{isbnError}</div>}
              </div>
              <div className="mb-3 text-left">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Product Price
                </label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="number"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter your Product Price"
                />
                {priceError && <div className="text-danger">{priceError}</div>}
              </div>
              <div className="mb-3 text-left">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Product Pic
                </label>
                <input
                  type="file"
                  onChange={(e) => setPic(e.target.files[0])}
                  className="form-control"
                  id="exampleFormControlInput1"
                />
                {picError && <div className="text-danger">{picError}</div>}
              </div>
              <div className="mb-3 text-left">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                  More Details
                </label>
                <textarea
                  onChange={(e) => setDetail(e.target.value)}
                  value={detail}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Color:...
                  Brand name:...
                  Model:..."
                  name="message"
                ></textarea>
                {detailError && <div className="text-danger">{detailError}</div>}
              </div>
              <div className="text-center">
                <button className="btn btn-primary mb-3" type="submit" onClick={submit}>
                  {isLoading ? (
                    <>
                      <span>Loading  </span>
                      <div className="spinner-border spinner-border-sm text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </>
                  ) : (
                      'Add Now'
                    )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
