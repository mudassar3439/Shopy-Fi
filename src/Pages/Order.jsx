import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { useParams } from 'react-router-dom';

const Order = () => {
  const firebase = useFirebase();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      navigate('/Add-user');
    }
  }, [navigate]);

  const [name, setname] = useState('');
  const [nameError, setnameError] = useState('');

  const [phone, setphone] = useState('');
  const [phoneError, setphoneError] = useState('');

  const [email, setemail] = useState('');
  const [emailError, setemailError] = useState('');

  const [state, setstate] = useState('');
  const [stateError, setstateError] = useState('');

  const [city, setcity] = useState('');
  const [cityError, setcityError] = useState('');

  const [address, setaddress] = useState('');
  const [addressError, setaddressError] = useState('');

  const [loading, setloading] = useState(false);

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


  
  const Submit = async (e) => {
    e.preventDefault();
  
    setnameError('');
    setphoneError('');
    setemailError('');
    setstateError('');
    setcityError('');
    setaddressError('');
  
    let isValid = true;
  
    if (name.trim() === '') {
      setnameError('Please enter your Name');
      isValid = false;
    }
    if (phone.trim() === '') {
      setphoneError('Please enter your Phone No');
      isValid = false;
    }
    if (email.trim() === '') {
      setemailError('Please enter your Email');
      isValid = false;
    }
  
    if (state.trim() === '') {
      setstateError('Please select your State');
      isValid = false;
    }
  
    if (city.trim() === '') {
      setcityError('Please enter your city name');
      isValid = false;
    }
    if (address.trim() === '') {
      setaddressError('Please enter your full Address');
      isValid = false;
    }
  
    if (isValid) {
      if (isOnline) {
      setloading(true);
      try {
        await firebase.order(params.productId, name, phone, email, state, city, address);
        alert("Your order has been placed");
        window.location.reload();
      } catch (error) {
        console.log('Error placing order:', error);
      } finally {
        setloading(false);

      }
    }
    }

  };

  return (
    <div>
      <div className="container mt-3" id="header">
      {!isOnline && (
          <div className='alert alert-danger mt-1 text-center' role='alert'>
            Something Went Wrong.check your internet.
          </div>
        )}

        <div className="text-center mt-2">
        <h1>Order Now</h1>
      </div>

        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form className="mb-5 p-2 sign-box" onSubmit={Submit}>
              
              <div className="mb-3 text-left">
                <label htmlFor="exampleFormControlInput3" className="form-label">
                  Name
                </label>
                <input
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput3"
                  placeholder="Enter your Name"
                />
                {nameError && <div className="text-danger">{nameError}</div>}
              </div>
              <div className="mb-3 text-left">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Phone No
                </label>
                <input
                  onChange={(e) => setphone(e.target.value)}
                  value={phone}
                  type="tel"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter your Phone Number"
                />
                {phoneError && <div className="text-danger">{phoneError}</div>}
              </div>
              <div className="mb-3 text-left">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Email
                </label>
                <input
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter your Email"
                />
                {emailError && <div className="text-danger">{emailError}</div>}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">State</label>
                  <select
                    id="inputState"
                    className="form-select"
                    onChange={(e) => setstate(e.target.value)}
                    value={state}
                  >
                    <option>Choose State</option>
                    <option>Punjab</option>
                    <option>Sindh</option>
                    <option>Blochistan</option>
                    <option>KPK</option>
                  </select>
                  {stateError && <div className="text-danger">{stateError}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input
                    onChange={(e) => setcity(e.target.value)}
                    value={city}
                    type="text"
                    className="form-control"
                    id="inputCity"
                  />
                  {cityError && <div className="text-danger">{cityError}</div>}
                </div>
              </div>
              <div className="mb-3 text-left">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Address
                </label>
                <input
                  onChange={(e) => setaddress(e.target.value)}
                  value={address}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput3"
                  placeholder="Enter your Name"
                />
                {addressError && <div className="text-danger">{addressError}</div>}
              </div>
              <div className="text-center">
                <button className="btn btn-primary mb-3" type="submit" disabled={loading}>
                  {loading ? 'Please Wait...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
