import React, { useState } from "react";
import { storage, db } from "../firebase";
import Navbar from "./Navbar";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import ReactStars from "react-rating-stars-component";
// import { render } from "react-dom";
import "../App.css"

import { collection, addDoc } from "firebase/firestore";

export const Addtestimonial = () => {
  const [Fname, setFname] = useState("");
  const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const [imageError, setImageError] = useState("");

  const [progress, setProgress] = useState(0);

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];

  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError("");
      } else {
        setImage(null);
        setImageError("please select a valid image file type (png or jpg)");
      }
    } else {
      console.log("please select your file");
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `Testimonial-Images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Image Uploaded", downloadURL);
          try {
            const docRef = addDoc(collection(db, "Testimonial"), {
              Fname,
              description,
              // price: Number(price),
              image: downloadURL,
            });
          } catch (err) {
              console.error("Error adding document: ", e);
          }
          alert("Feedback Added ");
        });
      }
    );
  };


  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div>
      <Navbar />
      
      <div className="landing4">
      <div className="container py-5  ">
          <div className="row justify-content-center">
           
        
       
            <div className="col-md-7">
              <h2>Testimonial</h2>
              <hr></hr>
              <form
                autoComplete="off"
                className="form-group"
                onSubmit={handleAddProducts}
              >
                <label>Your Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setFname(e.target.value)}
                  value={Fname}
                ></input>
           
                <label>Note</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></input>
                <label>Upload Your Image</label>
                <input
                  type="file"
                  id="file"
                  className="form-control"
                  required
                  onChange={handleProductImg}
                ></input>

                {imageError && (
                  <>
                    <br></br>
                    <div className="error-msg">{imageError}</div>
                  </>
                )}
                           <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  /> 
  <h6>Please Rate your Product</h6>
                <br></br>
                <h3>Uploading % {progress}</h3>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" className="btn btn-dark btn-md">
                    {" "}
                    SUBMIT
                  </button>
        
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div> 
   
     
  );
};
