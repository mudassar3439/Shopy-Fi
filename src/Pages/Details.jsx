import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Details(props) {
  const navigate=useNavigate();
  const params = useParams();
  const firebase = useFirebase();
  const [data, setdata] = useState(null);
  const [url, seturl] = useState(null);

  useEffect(() => {
    firebase.Sproduct(params.productId).then((value) => setdata(value?.data()));
  }, [firebase, params.productId]);

  useEffect(() => {
    if (data && data.imageURL) {
      firebase.getimgURL(data.imageURL).then((url) => seturl(url));
    }
  }, [firebase, data]);
  if (!url) {
    return(<>
      <div className='loading-spinner'>
         <h1>Loading 
          <div className="spinner-grow spinner-grow-sm text-primary ms-1" role="status">
         <span className="visually-hidden">Loading...</span>
         </div>
         <div className="spinner-grow spinner-grow-sm ms-1" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow spinner-grow-sm text-primary ms-1" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
          </h1></div>
    </>);
  }

  const Click = () => {
    navigate(`/order/${params.productId}`);
  };
  
  return (
    <>
      <div className="container mt-3">
        <div className="row ">
          <div className="col-12 col-md-8 col-lg-8 col-xl-7 mx-auto">
            <div className="p-2 sign-box mb-3">
              <div className="text-center">
                <img src={url} alt="" className="img-fluid img-thumbnail d-img" target='blank'/>
              </div>
              <div className="row">
                <div className="col-12 col-md-10 col-lg-10 col-xl-10 mb-3 mx-auto text-left">
                  <h2> Details</h2>
                  <h5>Product Name: {data.productName}</h5>
                  <h5>Product Price: {data.price}</h5>
                  <h5>ISBN Number: {data.isbn}</h5>
                  <pre>
                    <h5>{data.detail}</h5>
                  </pre>
                </div>
                <div className=" col-12 col-md-10 col-lg-10 col-xl-10 mb-1 mx-auto text-left">
                  <pre>
                  <h2>Owner Details</h2>
                  <h5>Name: {data.username}</h5>
                  <h5>Phone: {data.phone}</h5>
                  <h5>Email: {data.userEmail}</h5>
                  </pre>
                </div>
              </div>

              <div className="col-12 col-md-12 col-lg-6 col-xl-10 mx-auto">
                <div className="text-center mt-2 mb-3">
                  <button className="btn btn-dark button mt-2" onClick={Click}>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
