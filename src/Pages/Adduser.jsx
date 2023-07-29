
import React from 'react';
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom';


const Adduser = () => {
// Firebase Auth
 
// Use Navigate Hook 
  const navigate=useNavigate()

  // Sign-up Button Function 
  const Click1= () => {
    
        navigate('/Signup')
      
  };

  // Sign-in Button Function
  const Click2= () => {
   
        navigate('/Log-in')
      
  };

  return (
    <>
      <section id="header" className="d-flex align-items-center">
        <div className="container-fluid nav-bg">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="col-12 text-center mt ">
              <div>
                <h1>Please Sign-up/Log-in First with
                <pre><h1>Shopy-Fi</h1>
                <img src={logo} alt='logo' className='lo_pic'/>
                </pre></h1>
              </div>
                
                <div className='d-flex text-center mx-auto justify-content-center mt-5 mb-3' >
                  <button
                    onClick={Click1}
                    style={{ width: '200px' }}
                    className="btn btn-primary "
                  >
                    Sign-up
                  </button>
                  <button
                    onClick={Click2}
                    style={{ width: '200px' }}
                    className="btn btn-primary ms-1"> 
                    Log-in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default Adduser;
