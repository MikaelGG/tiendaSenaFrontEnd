'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../usuario.module.css";

const backgroundStylesU: React.CSSProperties = {
  backgroundImage: `url('/userp.svg/')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
};

const Eventos = () => {
  const [eventosList, setEventos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/event").then((response) => {
      setEventos(response.data);
    });
  }, []);

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <div className="container-fluid " style={backgroundStylesU}>
        <div className="row">
          <div className="col-12 text-center mt-5 mb-3 ">
            <span className={`${styles.text_p_form} col-10 text-center ms-4`}>
              Eventos
            </span>
          </div>
        </div>
        {eventosList.map((val, key) => {

          return (
            <div key={key} className={`${styles.form_carta} row m-4 p-4`}>
              <div className="col-4 container-fluid g-0 ">
                <img
                  className={`${styles.evento_imagen} col-8 px-0 rounded-start mx-3 `}
                  src={val.imagen}
                  alt=""
                ></img>
              </div>
              <div className="col-8">
                <span className={`${styles.text_carta} col-8`}>
                  {val.hora_inicio}-{val.hora_fin}
                </span>
                <br></br>
                <span className={`${styles.text_form} col-10`}>
                  {val.descripcion}
                </span>
                <div className="col-3 my-1">
                  <span className={`${styles.text_eventos} col-10`}>
                    {formatDate(val.fecha)}
                    <br></br>
                    Cupos: {val.cupo}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Eventos;
