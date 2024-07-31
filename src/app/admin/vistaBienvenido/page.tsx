"use client";
import { useEffect, useState } from "react";
import styles from "../admin.module.css";
import axios from "axios";
import {formatNumberCOP, formatNumber } from '@/app/componentes/formatNumber';

export default function InicioA() {
  const [countUsers, setCountUsers] = useState(0);
  const [countFactura, setCountFactura] = useState(0);
  const [totalFactura, setTotal] = useState([]);
  const [vencimientoList, setVencimiento] = useState([]);

    useEffect(() => {
      axios.get("https://backendtdc.vercel.app/api/expiration",).then((response) => {
        setVencimiento(response.data);
        console.log(response.data)
      });
    }, [])


  useEffect(() => {
    axios.get("https://backendtdc.vercel.app/api/user").then((response) => {
      setCountUsers(response.data.length);
    });
  }, []);

  useEffect(() => {
    axios.get("https://backendtdc.vercel.app/api/invoice").then((response) => {
      setTotal(response.data);
      setCountFactura(response.data.length);
    });
  }, []);

  const total = () => {
    let countFac = 0;
    totalFactura.map((val) => {
      countFac = (val as any).total + countFac;
    });
    return countFac;
  };
  console.log(totalFactura);
  console.log(total);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate() + 1).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <div className="row my-4">
        <div className="text-center">
          <a className={`${styles.text_nav_home}`}>Bienvenido</a>
        </div>
      </div>
      <div className="container  justify-content-center">
        <div className="row">
          <div className={`${styles.list} col-3 ms-3`}></div>
          <div className={`${styles.list} col-4 ms-3`}></div>
          <div className={`${styles.list} col-4 ms-4`}></div>
        </div>
        <div className="row">
          <div className={`${styles.list_data} col-3 ms-3`}>
            <div className="row mt-2 fs-3 mx-1 col-9">
              <h3><b>Usuarios registrados:</b></h3> 
            </div>
            <div className={`${styles.img_inicio} row `}>
              <b className={`${styles.usuarios_registrados} fs-1 col-5`}>{formatNumber(countUsers)}</b>
              <img className="col-5" src="/User_Circle.svg" alt=""></img>
            </div>
          </div>
          <div className={`${styles.list_data} col-4 ms-3`}>
            <div className="row mt-2 fs-3 mx-5 col-8">
            <h3><b>Facturas registradas:</b></h3> 
            </div>
            <div className={`${styles.img_inicio} row `}>
              <b className={`${styles.facturas_registradas} fs-1 col-5`}>{formatNumber(countFactura)}</b>
              <img className="col-4" src="/factura.svg" alt=""></img>
            </div>
          </div>
          <div className={`${styles.list_data} col-4 ms-4`}>
            <div className="row mt-3 fs-3 mx-5 col-3">
            <h3><b>Total: </b></h3> 
            </div>      
            <div className={`${styles.img_inicio}  row d-flex flex-wrap`}>
              <b className={`${styles.total_bienvenidos} fs-2 col-5`}>{formatNumberCOP(total())}</b>
              <img className="col-5" src="/total.svg" alt=""></img>
            </div>
          </div>
        </div>
        <div className="col-8 text-center my-3 container">
          <div className={`${styles.subtit} row mt-4 ms-3`}>
            Próximos a vencer
          </div>
          <div className="texto_menu mx-2 my-1 row table">
            <div className="col-3">ID</div>
            <div className="col-3">Imagen</div>
            <div className="col-3">Nombre</div>
            <div className="col-3">F. vencimiento</div>
          </div>
          {vencimientoList.map((val, key) => {
            return <>
                <div className="row mx-2 my-1 texto_drop" key={key}>
                  <div className="col-3 my-4">{(val as any).codigo}</div>
                  <div className="col-3">
                    <img className={`${styles.img_invent}`} style={{ width: '100px', height: '100px'}} src={(val as any).imagen} alt="" />
                  </div>
                  <div className="col-3 my-4">{(val as any).nombre}</div>
                  <div className="col-3 my-4">{formatDate((val as any).f_vencimiento)}</div>
              </div>
              <hr />
            </>})
          }
        </div>
      </div>
    </>
  );
}
