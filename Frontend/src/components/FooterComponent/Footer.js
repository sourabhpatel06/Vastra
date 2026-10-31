 import React from 'react';
import { Link } from 'react-router-dom';
 import './Footer.css'

 function Footer()
 {
    return(
        <>
            <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
      <div className="row px-xl-5 pt-5">
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
          <a href="" className="text-decoration-none">
            <h1 className="mb-4 display-5 font-weight-semi-bold">
              <span
                className="text-primary font-weight-bold border border-white px-3 mr-1"
                >V</span
              >VASTRA
            </h1>
          </a>

          <p className="mb-2">
            <i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street,
            BHAVARKUA , INDORE
          </p>
          <p className="mb-2">
            <i className="fa fa-envelope text-primary mr-3"></i>vastra@gmail.com.com
          </p>
          <p className="mb-0">
            <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890
          </p>
        </div>
        

              
            </div>
          
        
      
      <div className="row border-top border-light mx-xl-5 py-4">
        <div className="col-md-6 px-xl-0">
          <p className="mb-md-0 text-center text-md-left text-dark">
            &copy;
            <a className="text-dark font-weight-semi-bold" href="#"
              >VASTRA.com</a
            >. All Rights Reserved.

           
          </p>
        </div>
        <div className="col-md-6 px-xl-0 text-center text-md-right">
          <img className="img-fluid" src="./assets/img/payments.png" alt="" />
        </div>
      </div>
    </div>
        </>
    )
}
export default Footer;