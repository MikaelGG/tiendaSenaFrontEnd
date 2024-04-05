"use client";
import styles from "@/app/admin/admin.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { isTemplateExpression } from "typescript";
export default function BalanceDiario() {
  const [diarioList, setDiario] = useState([]);
  const [ingresosList, setIngresos] = useState(0);
  const [egresosList, setEgresos] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:4000/api/dailyBalance").then((response) => {
      setDiario(response.data);
      console.log(response.data);
    });

    axios.get("http://localhost:4000/api/dailyBalance/in").then((response) => {
      const ingresos  = response.data.Ingresos;
      setIngresos(ingresos);
      console.log(ingresos);
    });

    axios.get("http://localhost:4000/api/dailyBalance/eg").then((response) => {
      const egresos  = response.data.Egresos;
      setEgresos(egresos);
      console.log(egresos);
    });   
  }, []);

  return (
    <>
      <div className="row my-4">
        <div className="text_nav text-center">
          <a className="tittle">Balance Diario</a>
        </div>
      </div>
      <div className="col-8 text-center my-3 container">
        <div className="texto_menu mx-2 my-1 row table">
          <div className="col-4">Nro Factura</div>
          <div className="col-4">Consumidor</div>
          <div className="col-4">Total</div>
        </div>
        {diarioList.map((val, key) => {
          return <>
            <div className="row mx-2 my-1 texto_drop">
              <div className="col-4">{val.nroFactura}</div>
              <div className="col-4">{val.nombreConsumidor}</div>
              <div className="col-4">{val.total}</div>
            </div>
          </>
        })}
      </div>

      <div className="container justify-content-center my-3">
        <div className="row">
          <div className={`${styles.list} col-5 ms-4`}></div>
          <div className={`${styles.list} col-5 ms-3`}></div>
        </div>
        <div className="row">
          <div className={`${styles.list_data} col-5 ms-4`}>
              <div className="row mt-2">
              Ingresos: <b className="text-center"> 
              {ingresosList}</b>
            </div>
            <div className={`${styles.img_inicio} row `}>
              <img className="col-4" src="/incremento.svg" alt=""></img>
            </div>
          </div>
          <div className={`${styles.list_data} col-5 ms-3`}>
            <div className="row mt-2">
              Egresos: <b className="text-center">{egresosList}</b>
            </div>
            <div className={`${styles.img_inicio} row `}>
              <img className="col-3" src="/decremento.svg" alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
