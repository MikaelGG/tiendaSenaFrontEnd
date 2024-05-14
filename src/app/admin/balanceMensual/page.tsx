'use client'
import styles from "@/app/admin/admin.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { formatNumber, formatNumberCOP } from '@/app/componentes/formatNumber';


export default function BalanceMensual(){
    const [MensualList, setMensual] = useState([]);
    const [ingresosList, setIngresos] = useState([]);
    const [egresosList, setEgresos] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:4000/api/monthlyBalance").then((response) => {
        setMensual(response.data);
        console.log(response.data);
      });
    }, []);

    useEffect(() => {
      axios.get("http://localhost:4000/api/monthlyBalance/in").then((response) => {
        setIngresos(response.data[0].Ingresos)
      })
    })

    useEffect(() => {
      axios.get("http://localhost:4000/api/monthlyBalance/eg").then((response) => {
        setEgresos(response.data[0].Egresos)
      })
    })

    function formatDate(dateString: any) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

 return(<>
    <div className="row my-4">
        <div className="text_nav text-center"><a className="tittle">Balance Mensual</a></div>
    </div>
    <div className="col-9 text-center my-3 container">
        <div className="texto_menu my-1 row table">
          <div className="col-4">Fecha</div>
          <div className="col-4">Consumidor</div>
          <div className="col-4">Total</div>
        </div>
        {MensualList.map((val, key) => {
          return <>
            <div className="row my-1 texto_drop my-3 ">
              <div className="col-4 mb-3">{formatDate(val.fecha)}</div>
              <div className="col-4 mb-3">{val.nombreConsumidor} {val.apellidoConsumidor}</div>
              <div className="col-4 mb-3">{formatNumberCOP(val.total)}</div>
            </div>
            <hr />
          </>
        })}
    </div>
    <div className="container mx-5 my-3">
        <div className="row">
          <div className={`${styles.list} col-5 ms-4`}></div>
          <div className={`${styles.list} col-5 ms-4`}></div>
        </div>
        <div className="row">
          <div className={`${styles.list_data} col-5 ms-4`}>
              <div className="row mt-2 fs-2 mx-5 col-8">
                <h2><b>Ingresos: </b></h2> 
              </div>
            <div className={`${styles.img_inicio} row `}>
              <b className={`${styles.ingresos_egresos} fs-1 mx-5 col-5`}> {formatNumberCOP(ingresosList)}</b>
              <img className="col-4" src="/incremento.svg" alt=""></img>
            </div>
          </div>
          <div className={`${styles.list_data} col-5 ms-4`}>
            <div className="row mt-2 fs-2 mx-5 col-8">
              <h2><b>Egresos: </b></h2>
            </div>
            <div className={`${styles.img_inicio} row `}>
              <b className={`${styles.ingresos_egresos} fs-1 mx-5 col-5`}>{formatNumberCOP(egresosList)}</b>
              <img className="col-3 pt-4 mx-4 mt-3" src="/decremento.svg" alt=""></img>
            </div>
          </div>
        </div>
      </div>
 </>)
}