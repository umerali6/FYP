import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./items.css";

export default function Items() {

  const dispatch = useDispatch()
  const [items, setItems] = useState([])

  const getAllProducts = async () => {
    const data = []
    const dataRetrieval = query(collection(db, "Products"));

    const querySnapshot = await getDocs(dataRetrieval);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setItems(data);
  };

  useEffect(() => {
    getAllProducts()
  }, [getAllProducts])

  const addItemHandler = (value) => {
    dispatch(cartActions.addItem(value))
  }

  return (
    <div>
      <div className="landing p-3 mb-2  text-white">
        <div className="container </div>">
          <h1 className="first-hd">Our Products</h1>
          <div className="d-flex hy-4 customFlex">
            {items.length > 0 &&
              items?.map((v, i) => {
                return (
                  <div key={i} className="mainCard">
                    <div className="my-4 card1 ">
                      <img src={v.image} className="card-img-top" alt="..." />
                      <div className="card-body1">
                        <h5 className="card-title fw-bold">{v.title}</h5>
                        <p className="card-text">{v.description}</p>
                        <p className="card-text">{v.price}</p>
                        <button type="button" className="btn btn-primary" onClick={() => addItemHandler(v)}>Add to Cart</button>
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
