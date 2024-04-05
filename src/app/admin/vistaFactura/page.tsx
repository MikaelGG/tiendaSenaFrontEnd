'use client'
import styles from "../../usuario/usuario.module.css"
import Registrar from "@/app/componentes/botones/registrar";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';

export default function VistaFactura(){
    const [facturasList, setFacturas] = useState([])
  useEffect(() =>{
    axios.get("http://localhost:4000/api/invoice",).then((response)=>{
        setFacturas(response.data);
    });
  }, [])
    console.log(facturasList)

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
 return(<>
    <div className="row my-4">
        <div className="text_nav text-center"><a className="tittle">facturas</a></div>
    </div>
    <div className="row text-center justify-content-center">
        <div className="col-6">
            <Link href={`/admin/registroFactura`} className={`${styles.text_form}`}>
                <div className="div"><Registrar/></div><br></br>
            </Link>
        </div>
        <div className="col-8 text-center my-3 container">
            <div className="texto_menu mx-2 my-1 row table">
                <div className="col-2 mx-2 my-1">Codigo</div>
                <div className="col-3 mx-2 my-1">Fecha</div>
                <div className="col-2 mx-2 my-1">Total</div>
            </div>
        {facturasList.map((val,key)=>{
            return <>
            <div className="row mx-2 my-1 ">
                <div className="col-2 mx-2 my-1 texto_drop">{val.nro}</div>
                <div className="col-3 mx-2 my-1 texto_drop">{formatDate(val.fecha)}</div>
                <div className="col-2 mx-2 my-1 texto_drop">{val.total}</div>
            </div>
            </>})
        }
        </div>
    </div>
 </>)
}