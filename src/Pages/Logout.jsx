
import React from 'react';
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom';
import { App } from '../context/Firebase';
import { getAuth } from 'firebase/auth';


const Logout = () => {

  const Auth = getAuth(App);
  const navigate=useNavigate()

  const Click= () => {
    Auth.signOut()
      .then(() => {
        alert('You Are Loged-out.Please Sign-in Again !');
        navigate('/Log-in')
      })
      
  };

  return (
    <>
      <section id="header" className="d-flex align-items-center">
        <div className="container-fluid nav-bg">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="col-12 text-center mt ">
              <div>
                <h1> You are already login with 
                <pre><h1>Shopy-Fi</h1>
                <img src={logo} alt='logo' className='lo_pic'/>
                </pre></h1>
              </div>
                
                <div>
                  <button
                    onClick={Click}
                    style={{ width: '200px' }}
                    className="btn btn-lg btn-primary mt-3 mb-5"
                  >
                    Log-Out
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


export default Logout;
