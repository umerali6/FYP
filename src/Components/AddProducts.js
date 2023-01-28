import React, { useState } from "react";
import { storage, db } from "../firebase";
import Navbar from "./Navbar";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

import { collection, addDoc } from "firebase/firestore";

export const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
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
    const storageRef = ref(storage, `Product-Images/${image.name}`);
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
            const docRef = addDoc(collection(db, "Products"), {
              title,
              description,
              price: Number(price),
              image: downloadURL,
            });
          } catch (err) {
              console.error("Error adding document: ", e);
          }
          alert("Product Added ");
        });
      }
    );
  };

  return (
    <div>
      <Navbar />
      <div className="landing3">
        <div className="container2 py-5 ">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <br></br>
              <br></br>
              <h1>Add Products</h1>
              <hr></hr>
              <form
                autoComplete="off"
                className="form-group"
                onSubmit={handleAddProducts}
              >
                <label>Product Title</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                ></input>
                <br></br>
                <label>Product Description</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></input>
                <br></br>
                <label>Product Price</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                ></input>
                <br></br>
                <label>Upload Product Image</label>
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
