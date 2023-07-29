import React from 'react'
import { useNavigate } from 'react-router-dom';

function OrderBox(props) {
const navigate=useNavigate() 



    const Click = () => {
      navigate(`/Orders/detail/${props.id}`);
    };
  
  return (
    <div>   
    <div className="container mt-3" id="header" onClick={Click}>
    <div className="row">
      <div className="col-md-6 col-10 mx-auto">
        <div className="mb-5 p-2 sign-box">
          <div className='mt-2 mb-1 col-md-12 col-lg-12 col-xl-12 order-box d-flex justify-content-between'>
            <div>
              <h6 className='mt-2 ms-2'>{props.productName}</h6>
            </div>
            <div className=''>
              <button className='btn btn-primary mt-2 me-2 mb-1' onClick={Click}>
              Orders <span className="badge bg-danger">0</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default OrderBox