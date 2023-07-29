import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useFirebase} from '../context/Firebase'
import img from "./../Images/Google.png";

const Signin=()=>{

// Firebase use context Hook 
const firebase=useFirebase();

// useNavigate Hook
const navigate=useNavigate()

// state Hooks
const [email,setemail]=useState(''); 
const [password,setpassword]=useState('');
const [show ,setshow]=useState();
const [loading,setLoading]=useState()

// use Effect Hook For Show page 
useEffect(()=>{
 if(firebase.logedin){
  navigate('/Log_in')
 }
},[firebase,navigate]); 

// For Firebase Sign-in Function
const Click=()=>{
  setLoading(true)
  firebase.Signin(email,password).finally
  (()=>{setLoading(false)})
    
  
}

// For show and Hide Password
const Hide=()=>{
  setshow(!show)
}

// For Signin with Google
const Google =()=>{
  firebase.google()
}
  return (
<>
      {/* main hedding   */}
       <div className="mt-5 text-center">
       <h1>Sign-in Here</h1>
       </div>

     {/* Container box  */}
<div className="container mt-3 "id='header'>
<div className="row">
 <div className="col-md-6 col-10 mx-auto">

    {/* Input Form  */}
   <form  className='mb-5 p-2 sign-box'>

    {/* For Email Input Field */}
        <div className="mb-3 text-left">
        <label htmlFor="exampleFormControlInput3" className="form-label">Email address</label>
        <input onChange={e=>setemail(e.target.value)} value={email} type="email" className="form-control" id="exampleFormControlInput3" placeholder="Enter your E-mail"/>
        </div>

    {/* For Password Input Field */}
        <div className="mb-3 text-left">
        <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
        <input onChange={e=>setpassword(e.target.value)} value={password} type={show? 'text' : 'password'} className="form-control" id="exampleFormControlInput1" placeholder="Enter your Password"/>   
        </div>
         
    {/* For show and Hide Password */}
       <div className='ms-3 '>
       <label>
       <input type='checkbox' onChange={Hide}/>
            Show Password
       </label>
       </div>

    {/* For Sign in Button */}
       <div className='text-center'>
       <button  className="btn btn-primary mb-3" type="button" onClick={Click} disabled={loading}>
       {loading? "Loading...":"Sign-In"}</button>
       </div>
        
    {/* For or Text and Lines  */}
       <div className="text-center d-flex">
       <hr className="line" />
       <h1 className="text">or</h1>
       <hr className="line" />
       </div>
    {/* For Google Signin Button */}
      <div className="mt-2 google-box d-flex" onClick={Google}>
      <img className="google-img" src={img} alt="img" />
      <div className="text-center w-100">
      <h4 className="h4 d-inline-block mx-auto">Sign-in with Google</h4>
      </div>
      </div>

   </form>
            
</div>
</div>
</div> 
    </>
  )
}

export default Signin
