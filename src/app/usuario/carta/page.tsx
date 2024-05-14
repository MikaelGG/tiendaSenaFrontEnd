"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../usuario.module.css";
import style from "@/app/admin/admin.module.css";
import {formatNumberCOP, formatNumber } from '@/app/componentes/formatNumber';

const backgroundStylesU = {
  backgroundImage: `url('/userp.svg/')`, 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
};

export default function Menu() {
  const [carta, setCarta] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [botonSeleccionado, setBotonSeleccionado] = useState('');
 
  useEffect(() => {
    axios.get("http://localhost:4000/api/products").then((response) => {
      setCarta(response.data);
      setInitialState(response.data);
    });
  }, []);

  const setInitialState = (data: any) => {
    const cafesProducts = data.filter(product => product.tipo === 'cafes');
    setFilteredProducts(cafesProducts);
    setBotonSeleccionado(cafesProducts);
  };  

  const filterProducts = (tipo: any) => {
    const filtered = carta.filter(product => product.tipo === tipo);
    setFilteredProducts(filtered);
    setBotonSeleccionado(tipo);
  }

  return (
    <>
      <div className="container-fluid" style={backgroundStylesU}>
        <div className="row">
          <div className="col-12 text-center mt-5">
            <h1 className={`${styles.text_p_form} text-center `}>Carta</h1>
          </div>
        </div>
        <div className="row justify-content-center mb-3 mt-5">
            <button className={`${styles.ingresar} col-2 text-center align-items-center p-1 mx-3 ${botonSeleccionado === 'cafes' ? `${style.botonCafe} seleccionado` : ''}`} onClick={() => filterProducts('cafes')} >Cafés</button>
            <button className={`${styles.ingresar} col-2 text-center align-items-center p-1 mx-3 ${botonSeleccionado === 'panaderia' ? `${style.botonCafe} seleccionado` : ''}`} onClick={() => filterProducts('panaderia')}>Panadería</button>
            <button className={`${styles.ingresar} col-2 text-center align-items-center p-1 mx-3 ${botonSeleccionado === 'cocteleria' ? `${style.botonCafe} seleccionado` : ''}`} onClick={() => filterProducts('cocteleria')}>Coctelería</button>
        </div>
        <div className="row pt-2 mx-3 justify-content-center m-2">
            {filteredProducts.map((producto, index) => (
              <div className={`${style.carta} col-4 mt-4 mx-4 py-4`}>
                <div key={index}></div>
                <div className="col-12 text-center my-3 fs-2"><b>{producto.nombre}</b></div>
                <div className={`${styles.img_inicio} col-12 text-center`}>
                    <img className={`${style.img_invent} `} src={producto.imagen} alt="" />
                </div><br></br>
                <div className="col-12 text-center fs-5">{producto.descripcion}</div><br></br>
                <div className="col-12 text-center fs-3"><b className="fs-4">Precio  </b>{formatNumberCOP(producto.precio)}</div>
              </div>
            ))}
          </div>
        </div>
    </>
  );
}
