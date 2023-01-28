
import React, { useState } from "react";
import { useEffect } from "react";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./items.css";


export default function Testimonal() {
  const q = query(collection(db, "Testimonial"));

  const [totalProducts, settotalProducts] = useState([]);

  const data = [];

  const getAllProducts = async () => {
    const querySnapshot = await getDocs(q);
    // [{}] | {{}}
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });
    settotalProducts(data)
  };

  var value = 0;

  useEffect(() => {
    if (value === 0) {
      getAllProducts();
    }
    ++value;
    return
  }, []);

  // useEffect(() => {
  //   console.log(totalProducts);
  // }, [totalProducts]);

  return (

    <div>
      <div className="landing p-3 mb-2  text-white">
        <div className="container </div>">
          <h1 className="first-hd">Testimonials</h1>
          <div className="d-flex hy-4 customFlex">

            {totalProducts.length > 0 &&
              totalProducts?.map((v, i) => {
                return (
                  <div key={i} className="mainCard">
                    <div className="my-4 card1 ">
                      <img src={v.image} className="card-img-top" alt="..." />
                      <div className="card-body1">
                        <h5 className="card-title fw-bold">{v.Fname}</h5>
                        <p className="card-text">{v.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

