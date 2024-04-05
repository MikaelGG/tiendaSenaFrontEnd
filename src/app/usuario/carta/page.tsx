"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../usuario.module.css";

const backgroundStylesU = {
  backgroundImage: `url('/userp.svg/')`, 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
};

export default function Menu() {
  const [carta, setCarta] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:4000/api/products").then((response) => {
      setCarta(response.data);
    });
  }, []);

  return (
    <>
      <div className="container-fluid" style={backgroundStylesU}>
        <div className="row">
          <div className="col-12 text-center mt-5">
            <h1 className={`${styles.text_p_form} col-10 text-center ms-4`}>Carta</h1>
          </div>
        </div>

        <div className="row">
          {carta.map((producto, index) => (
            <div key={index} className="col-lg-6 mb-4">
              <div className={`card ${styles.form_carta}`} style={{ height: "100%" }}>
                <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
                <div className="card-body" style={{ height: "100%" }}>
                  <h5 className="card-title" style={{ marginBottom: "0" }}>{producto.nombre}</h5>
                  <p className="card-text" style={{ marginBottom: "0" }}>{producto.descripcion}</p>
                  <p className="card-text"><small className="text-muted">{producto.precio}</small></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
