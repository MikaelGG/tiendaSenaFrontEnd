"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../usuario.module.css";
import style from "@/app/admin/admin.module.css";
import { formatNumberCOP, formatNumber } from "@/app/componentes/formatNumber";

const backgroundStylesU = {
  backgroundImage: `url('/userp.svg/')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
};

export default function Menu() {
  const [carta, setCarta] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [botonSeleccionado, setBotonSeleccionado] = useState("");

  useEffect(() => {
    axios.get("https://backendtdc.vercel.app/api/products").then((response) => {
      setCarta(response.data);
      setInitialState(response.data);
    });
  }, []);

  const setInitialState = (data: any) => {
    const cafesProducts = data.filter(
      (product: any) => product.tipo === "cafes"
    );
    setFilteredProducts(cafesProducts);
    setBotonSeleccionado("cafes");
  };

  const filterProducts = (tipo: any) => {
    const filtered = carta.filter((product) => (product as any).tipo === tipo);
    setFilteredProducts(filtered);
    setBotonSeleccionado(tipo);
  };

  return (
    <>
      <div className="container-fluid" style={backgroundStylesU}>
        <div className="row">
          <div className="col-12 text-center mt-5">
            <h1 className={`${styles.text_p_form} text-center `}>Carta</h1>
          </div>
        </div>
        <div className="row justify-content-center mb-3 mt-5">
          <button
            className={`${
              styles.ingresar
            } col-2 text-center align-items-center p-1 mx-3 ${
              botonSeleccionado === "cafes"
                ? `${style.botonCafe} seleccionado`
                : ""
            }  `}
            onClick={() => filterProducts("cafes")}
          >
            Cafés
          </button>
          <button
            className={`${
              styles.ingresar
            } col-2 text-center align-items-center p-1 mx-3 ${
              botonSeleccionado === "panaderia"
                ? `${style.botonCafe} seleccionado`
                : ""
            }  `}
            onClick={() => filterProducts("panaderia")}
          >
            Panadería
          </button>
          <button
            className={`${
              styles.ingresar
            } col-2 text-center align-items-center p-1 mx-3 ${
              botonSeleccionado === "cocteleria"
                ? `${style.botonCafe} seleccionado`
                : ""
            }  `}
            onClick={() => filterProducts("cocteleria")}
          >
            Coctelería
          </button>
        </div>
        <div className="row pt-2 mx-3 justify-content-center m-2">
          {filteredProducts.map((producto, index) => (
            <div
              className={`card ${style.carta} mx-5 my-5`}
              style={{ width: "22rem" }}
              key={index}
            >
              <div className="card-body">
                <h5 className="card-title text-center fs-3 fw-bold mb-4">
                  {(producto as any).nombre}
                </h5>
                <div className="d-flex justify-content-center mb-4">
                  <img
                    src={(producto as any).imagen}
                    className="card-img-top"
                    alt={(producto as any).nombre}
                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                  />
                </div>
                <p className="card-text text-center fs-6 mb-4">
                  {(producto as any).descripcion}
                </p>
                <div className="d-flex justify-content-center align-items-center mb-4">
                  <span className="me-2 fw-bold fs-3">Precio:</span>
                  <span className="fs-3">
                    {formatNumberCOP((producto as any).precio)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
