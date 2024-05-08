'use client'
import styles from "@/app/usuario/usuario.module.css"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Provedores(){
    const [proveedoresList,setProveedores] = useState([])

    useEffect(() =>{
        axios.get("http://localhost:4000/api/supplier",).then((response)=>{
            setProveedores(response.data);
        });
    }, [])


    return(<>
        <div className="row my-4">
            <div className="text_nav text-center"><a className="tittle">Proveedores Registrados</a></div>
        </div>
        <div className="row justify-content-center">
        <button className={`${styles.ingresar} col-2 text-center align-items-center p-1 `} type="submit"><a href="/admin/registroProveedor" className={`${styles.text_form}`}>Adicionar</a></button>      
        </div>
        <div className="col-10 text-center my-3 container">
            <div className="texto_menu mx-2 my-1 row table">
                <div className="col-2">Documento</div>
                <div className="col-2">Nombres</div>
                <div className="col-2">Apellidos</div>
                <div className="col-3">Direccion</div>
                <div className="col-2">Telefono</div>
            </div>
            <div className="row mx-2 texto_drop my-3">
                {proveedoresList.map((val,key)=>{
                    return <>
                    <div className="col-2 mb-3">{val.nit}</div>
                    <div className="col-2 mb-3">{val.nombre}</div>
                    <div className="col-2 mb-3">{val.apellido}</div>
                    <div className="col-3 mb-3">{val.direccion}</div>
                    <div className="col-2 mb-3">{val.telefono}</div>
                    </>})
                }
            </div>
        </div>
    </>)
}