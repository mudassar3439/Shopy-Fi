import React, { useEffect,useState } from 'react';
import logo from '../Images/logo.png';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const [show,setshow]=useState()

  const click = () => {
    navigate('/Log-in');
  };
  const Show=()=> {
    setshow(!show)
  }

  const handleScrollAnimation = () => {
    const boxes = document.querySelectorAll('.about-box');

    boxes.forEach((box) => {
      const boxPosition = box.getBoundingClientRect().top;
      const windowPosition = window.innerHeight / 1.1;

      if (boxPosition < windowPosition) {
        box.classList.add('animate');
      } else {
        box.classList.remove('animate');
      }
    });
  };

  useEffect(() => {
    handleScrollAnimation();

    window.addEventListener('scroll', handleScrollAnimation);

    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, []);

  useEffect(() => {
    handleScrollAnimation();
  }, []);

  return (
    <>
      <div className="container mt-1 mb-2 rounded sign-box p-2">
        <div className="col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
          <div className='text-center d-flex justify-content-center mt-3'>
            <h1 className='text-center'>Shopy-Fi</h1>
            <img src={logo} alt='logo' className='ab_pic' />
          </div>
          <br />
          <div className='about-box p-2 mt-5'>
            <h3>Welcome to Shopy-Fi!</h3>
            <p>
              At Shopy-Fi, we believe that buying and selling should be an effortless and enjoyable experience. Our platform provides a convenient online marketplace where users can connect, trade, and discover a wide range of products.
            </p>
            <p>
              Whether you're a seller looking to showcase your merchandise or a buyer in search of the perfect item, Shopy-Fi is here to meet your needs. We strive to create a user-friendly environment that fosters trust, transparency, and seamless transactions.
            </p>
          </div>
          <div className='about-box p-2 mt-5'>
            <h4>For Sellers:</h4>
            <p>
              Are you looking to turn your unwanted items into cash or showcase your unique creations? Shopy-Fi provides a hassle-free platform for you to list your products and reach a vast community of potential buyers. Our intuitive interface allows you to effortlessly manage your inventory, set prices, and communicate with interested customers. Join us and start turning your passions into profits.
            </p>
          </div>
          <div className='about-box p-2 mt-5'>
            <h4>For Buyers:</h4>
            <p>
              Searching for that special something or simply exploring the marketplace? Shopy-Fi offers an extensive catalog of products across various categories. Whether you're looking for trendy fashion, electronics, home decor, or more, our platform connects you with reputable sellers offering quality items. Enjoy a seamless browsing experience, easy communication with sellers, and secure payment options, ensuring your satisfaction every step of the way.
            </p>
            <br />
          </div>
          <div className='about-box p-2 mt-5'>
            <h4>Why Choose Shopy-Fi?</h4>
            <p>
              <b>Secure and Trustworthy:</b> We prioritize the safety of our users and implement robust security measures to protect your transactions and personal information. Shop with confidence, knowing that we've got your back.
            </p>
            <p>
              <b>User-Friendly Interface:</b> Our website is designed to be intuitive and easy to navigate, making it simple for both buyers and sellers to find what they're looking for and manage their transactions.
            </p>
            <p>
              <b>Community-Driven:</b> Shopy-Fi is built on the principles of fostering a vibrant community of buyers and sellers. We encourage open communication, feedback, and collaboration, ensuring a positive and engaging experience for all.
            </p>
          </div>
          <div className='about-box p-2 mt-5 mb-2'>
            <p>
              Join us today and experience the convenience, variety, and excitement of Shopy-Fi. Together, let's create a thriving marketplace where everyone can find what they love and sell what they're passionate about.
            </p>
            <div className='text-center d-flex justify-content-between'>
              <button className='btn btn-primary buton' onClick={click}>Join-us</button>
              <button className='btn btn-primary ' onClick={Show}>About Developer</button>
            </div>
          </div>
         {show&&(
          <div className='about-box p-2 mt-5 mb-2'>
            <h5>Name: Mudassar Mobeen</h5>
            <h5>Edu:BS Software Engineering</h5>
            <h5>Dasignation: Front-End Developer</h5>
            <pre style={{marginTop:'0px'}}><h5>Email:mudassar3434ml@gmail.com</h5></pre>
          </div>
         )}
          

        </div>
      </div>
    </>
  );
};

export default About;
