'use client'
import styles from "@/app/admin/admin.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { formatNumber, formatNumberCOP } from '@/app/componentes/formatNumber';
import moment from 'moment';


export default function BalanceMensual(){
    const [MensualList, setMensual] = useState([]);
    const [ingresosList, setIngresos] = useState(0);
    const [egresosList, setEgresos] = useState(0);

    useEffect(() => {
      axios.get("https://backendtdc.vercel.app/api/monthlyBalance").then((response) => {
        setMensual(response.data);
        console.log(response.data);
      });
    }, []);

    useEffect(() => {
      axios.get("https://backendtdc.vercel.app/api/monthlyBalance/in").then((response) => {
        setIngresos(response.data[0].Ingresos)
      })
    })

    useEffect(() => {
      axios.get("https://backendtdc.vercel.app/api/monthlyBalance/eg").then((response) => {
        setEgresos(response.data[0].Egresos)
      })
    })

    function formatDate(dateString: any) {
      const date = new Date(dateString);
      const formattedDate = moment.utc(date, 'YYYY-MM-DD').format('YYYY-MM-DD')
      return formattedDate;
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
            <div className="row my-1 texto_drop my-3" key={key}>
              <div className="col-4 mb-3">{formatDate((val as any).fecha)}</div>
              <div className="col-4 mb-3">{(val as any).nombreConsumidor} {(val as any).apellidoConsumidor}</div>
              <div className="col-4 mb-3">{formatNumberCOP((val as any).total)}</div>
            </div>
            <hr />
          </>
        })}
    </div>
    <div className={` ${styles.fixed_height} container mx-5 my-3 `}>
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
              <b className={`${styles.ingresos_egresos} fs-1  col-5`}> {formatNumberCOP(ingresosList)}</b>
              <img className="col-4" src="/incremento.svg" alt="" />
            </div>
          </div>
          <div className={`${styles.list_data} col-5 ms-4`}>
            <div className="row mt-2 fs-2 mx-5 col-8">
              <h2><b>Egresos: </b></h2>
            </div>
            <div className={`${styles.img_inicio} row `}>
              <b className={`${styles.ingresos_egresos} fs-1  col-5`}>{formatNumberCOP(egresosList)}</b>
              <img className="col-3 pt-4 mx-4 mt-3" src="/decremento.svg" alt="" />
            </div>
          </div>
        </div>
    </div>
 </>)
}