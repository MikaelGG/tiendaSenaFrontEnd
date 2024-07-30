'use client'
import styles from "@/app/usuario/usuario.module.css"
import Registrar from "@/app/componentes/botones/registrar"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Provedores(){
    const [proveedoresList,setProveedores] = useState([])

    useEffect(() =>{
        axios.get("https://backendtdc.vercel.app/api/supplier",).then((response)=>{
            setProveedores(response.data);
        });
    }, [])


    return(<>
        <div className="row my-4">
            <div className="text_nav text-center"><a className="tittle">Proveedores Registrados</a></div>
        </div>
        <div className="row justify-content-center">
            <a href="/admin/registroProveedor" className="text-center col-6"><Registrar/></a> 
        </div>
        <div className="col-10 text-center my-3 container">
            <div className="texto_menu mx-1 my-1 row table">
                <div className="col-2">Documento</div>
                <div className="col-4">Nombres y apellidos</div>
                <div className="col-3">Dirección</div>
                <div className="col-2">Teléfono</div>
            </div>
                {proveedoresList.map((val,key)=>{
                    return <>
                        <div className="row mx-2 texto_drop my-3" key={key}>
                            <div className="col-2 mb-3">{(val as any).nit}</div>
                            <div className="col-4 mb-3">{(val as any).nombre} {(val as any).apellido}</div>
                            <div className="col-3 mb-3">{(val as any).direccion}</div>
                            <div className="col-2 mb-3">{(val as any).telefono}</div>
                            <hr />
                        </div>
                    </>})
                }
        </div>
    </>)
}