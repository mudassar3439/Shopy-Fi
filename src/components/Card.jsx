import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';



function Card(props) {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/detail/${props.id}`);
  };

  useEffect(() => {
    firebase.getimgURL(props.imageURL).then((url) => setUrl(url));
  }, );

  return (
    <>
      <div className="col-10 col-md-6 col-lg-4 col-xl-4 col-xxl-4 mx-auto mb-2">
      <div className="card" style={{height:"25rem"}}>
  <img src={url} className="card-img-top card_img img-fluid" alt="Pic"/>
  <div className="card-body">
    <h5 className="card-title">{props.productName}</h5>
    
    <p className="card-text"><pre>This {props.productName} sold by {props.username}</pre></p>
    <h5>Price:{props.price}</h5>
    <button className='btn btn-primary' onClick={handleClick}>More Details</button>
  </div>
</div>
      </div>

    </>
      
  )
}

export default Card;
