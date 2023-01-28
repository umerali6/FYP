import { useFormik } from "formik";
import React, { useState } from 'react'
import { basicSchema } from "../Schemas";
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from '../firebase';
import Navbar from "../Components/Navbar";

import "../App.css"

const Forgotpassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
 // const [email , setEmail] = useState("");

  const submitHandler = (values) => {
    console.log(values);
    formik.resetForm()
  };

  const formik = useFormik({
    initialValues: {
     email:"",
    },
    validationSchema: basicSchema,
    onSubmit: (values) => {
      submitHandler(values)
    },
  });

  const Forgotpassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth , formik.values.email)
      .then((auth) => {navigate("/login")})
      console.log("Link send Succesffully")
      .catch((error) => setError(error.message));
  };

  return (
<div>
 <Navbar/>

  <div className="landing">
<div className="container py-5  ">
      <div className="row justify-content-center">
        <div className="col-md-7">
        {/* <div className="card">
            <div className="card-header"> */}
              <div className="h4 text-center">
                <h4>Forgot Password</h4><br />
              </div>
{/*              
              <label>Name</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter Your Name" value={email} ></input>
              <br /> 
                 */}

                    <div className="form-group-md-3">
                    <br />
                    <label>Password Reset</label>
                    <input
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      id="email"
                      type="email"
                      placeholder="Enter your Email"
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.email && formik.touched.email
                          ? "form-control input-error"
                          : "form-control"
                      }
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className="error">{formik.errors.email}</p>
                    )}
                  </div>
                  </div>
  
                  <button onClick={Forgotpassword}
                    disabled={formik.isSubmitting}
                    type="button "
                    className="btn1234"
                  >
                   Send Email
                    <br />
                  </button>      
              </div>
            </div>
          </div>
        </div>
        // </div>
        // </div>
 
    
  );
};

export default Forgotpassword;

