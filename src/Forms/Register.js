// import { useFormik } from "formik";
//import React, { useState } from 'react'
// import { basicSchema } from "../Schemas";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Navbar from "../Components/Navbar";
import { db } from "../firebase";
//import {ref , uploadBytesResumable , getDownloadURL } from '@firebase/storage'

import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";

const BasicForm = () => {
  const [email, setEmail] = useState("");
  const [emailMessage, setemailMessage] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [passMessage, setpassMessage] = useState("");
  const [contactnumber, setContactnumber] = useState("");

  const navigate = useNavigate();
 

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      email,
      password,
      
    )
      .then((auth) => {
        navigate("/login");
      })
      .catch((error) => console.error(error));

    console.log(email);

    if (email.includes("@",".")) {
      console.log("valid");
      if (password !== confirmPassword) {
        setpassMessage("Password did not match!");
      } else {
        try {
          const docRef1 = addDoc(collection(db, "Users"), {
            email,
            password,
            name,
            contactnumber,
          });

          alert("Your Account has been Created ", docRef1.id1);
        } catch (e) {
          console.error("Error adding user: ", e);
        }
      }
    } else {
      setemailMessage("Please Enter Correct Email");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="overflow-hidden landing1">
        <div className="container1 py-5  ">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div className="card">
            <div className="card-header">
              <div className="h4 text-center">
                <img src="Images/register.png" alt="" />
                <h4>Registration Form</h4>
                <br />
              </div>
              <div className="card-body ">
                <div className="form-group-md-3">
                  <div className="form-group-md-3">

                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Your Name"
                      value={name}
                    ></input>
                    <br />
                  </div>

                  <label>Contact No</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    onChange={(e) => setContactnumber(e.target.value)}
                    placeholder="Enter Your Contact No"
                    value={contactnumber}
                  ></input>
                  <br />

                  <form>
                    <div className="form-group-md-3 email">
                      <label>Email</label>
                      <input
                        value={email}
                        onChange={(e) => {
                          setemailMessage("");
                          setEmail(e.target.value);
                        }}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        // onBlur={formik.handleBlur}
                        // className={
                        //   formik.errors.email && formik.touched.email
                        //     ? "form-control input-error"
                        //     : "form-control"
                        // }
                      />
                      {/* {formik.errors.email && formik.touched.email && (
                        <p className="error">{formik.errors.email}</p>
                      )} */}
                    </div>
                    {emailMessage.length > 0 && <p>{emailMessage}</p>}
                    <div className="form-group-md-3">
                      <br />
                      <label>Password</label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        type="password"
                        placeholder="Enter your Password"
                        // onBlur={formik.handleBlur}
                        // className={
                        //   formik.errors.password && formik.touched.password
                        //     ? "form-control input-error"
                        //     : "form-control"
                        // }
                      />
                      {/* {formik.errors.password && formik.touched.password && (
                        <p className="error">{formik.errors.password}</p>
                      )} */}
                    </div>
                    <br />
                    <div className="form-group-md-3">
                      <label>Confirm Password</label> <br />
                      <input
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        // onBlur={formik.handleBlur}
                        // className={
                        //   formik.errors.confirmPassword &&
                        //   formik.touched.confirmPassword
                        //     ? "  form-control input-error"
                        //     : "form-control"
                        // }
                      />
                      {/* {formik.errors.confirmPassword &&
                        formik.touched.confirmPassword && (
                          <p className="error">
                            {formik.errors.confirmPassword}
                          </p>
                        )} */}
                      {passMessage.length > 0 && <p>{passMessage}</p>}
                    </div>{" "}
                    <br />
                    <button
                      onClick={register}
                      // disabled={formik.isSubmitting}
                      type="button "
                      className="btn btn-dark mt-3"
                    >
                      Signup
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     </div>
     </div>
  );
};

export default BasicForm;
