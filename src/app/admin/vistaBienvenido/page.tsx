"use client";
import { useEffect, useState } from "react";
import styles from "../admin.module.css";
import axios from "axios";

export default function InicioA() {
  const [countUsers, setCountUsers] = useState([]);
  const [countFactura, setCountFactura] = useState([]);
  const [totalFactura, setTotal] = useState([]);
  const [vencimientoList, setVencimiento] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/expiration",).then((response) => {
            setVencimiento(response.data);
            console.log(response.data)
        });
    }, [])


  useEffect(() => {
    axios.get("http://localhost:4000/api/user").then((response) => {
      setCountUsers(response.data.length);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/api/invoice").then((response) => {
      setTotal(response.data);
      setCountFactura(response.data.length);
    });
  }, []);

  const total = () => {
    let countFac = 0;
    totalFactura.map((val) => {
      countFac = val.total + countFac;
    });
    return countFac;
  };
  console.log(totalFactura);
  console.log(total);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
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
          <div className={`${styles.list} col-3 ms-4`}></div>
          <div className={`${styles.list} col-4 ms-3`}></div>
          <div className={`${styles.list} col-4 ms-3`}></div>
        </div>
        <div className="row">
          <div className={`${styles.list_data} col-3 ms-4`}>
            <div className="row mt-2 mx-3 fs-5">
              Usuarios registrados: <b className="text-center fs-2">{countUsers}</b>{" "}
            </div>
            <div className={`${styles.img_inicio} row `}>
              <img className="col-4" src="/User_Circle.svg" alt=""></img>
            </div>
          </div>
          <div className={`${styles.list_data} col-4 ms-3`}>
            <div className="row mt-2 mx-3 fs-5">
              Facturas registradas:{" "}
              <b className="text-center fs-2">{countFactura}</b>
            </div>
            <div className={`${styles.img_inicio} row `}>
              <img className="col-3" src="/factura.svg" alt=""></img>
            </div>
          </div>
          <div className={`${styles.list_data} col-4 ms-3`}>
            <div className="row mt-2 mx-3 fs-5">
              Total: <b className="text-center fs-2">{total()}</b>
            </div>
            <div className={`${styles.img_inicio} row`}>
              <img className="col-3" src="/total.svg" alt=""></img>
            </div>
          </div>
        </div>
        <div className="col-8 text-center my-3 container">
          <div className={`${styles.subtit} row mt-4 ms-3`}>
            Proximos a vencer
          </div>
          <div className="texto_menu mx-2 my-1 row table">
            <div className="col-3">ID</div>
            <div className="col-3">Imagen</div>
            <div className="col-3">Nombre</div>
            <div className="col-3">F. vencimiento</div>
          </div>
          {vencimientoList.map((val, key) => {
            return <>
                <div className="row mx-2 my-1 texto_drop">
                  <div className="col-3 my-4">{val.codigo}</div>
                  <div className="col-3">
                    <img className={`${styles.img_invent}`} style={{ width: '100px', height: '100px'}} src={val.imagen} alt="" />
                  </div>
                  <div className="col-3 my-4">{val.nombre}</div>
                  <div className="col-3 my-4">{formatDate(val.f_vencimiento)}</div>
              </div>
            </>})
          }
        </div>
      </div>
    </>
  );
}
