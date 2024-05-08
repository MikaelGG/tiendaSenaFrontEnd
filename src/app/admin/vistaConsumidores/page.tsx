'use client'
import styles from "@/app/usuario/usuario.module.css"
import Registrar from "@/app/componentes/botones/registrar"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Consumidores(){
    const [consumidoresList,setConsumidores] = useState([])
    useEffect(() =>{
        axios.get("http://localhost:4000/api/consumer",).then((response)=>{
            setConsumidores(response.data);
        });
    }, [])



    return(<>
        <div className="row my-4">
            <div className="text_nav text-center"><a className="tittle">Consumidores Registrados</a></div>
        </div>
        <div className="row justify-content-center">
            <a href="/admin/registroConsumidor" className="text-center"><Registrar/></a> 
        </div>
        <div className="col-10 text-center my-3 container">
        <div className="texto_menu mx-2 my-1 row table">
                <div className="col-3">nombre</div>
                <div className="col-3">apellido</div>
                <div className="col-3">ID/NIT</div>
                <div className="col-3">Telefono</div>
            </div>
            <div className="row mx-2 my-1 my-3 texto_drop">
            {consumidoresList.map((val,key)=>{
                return <>
                <div className="col-3 mb-3">{val.nombre}</div>
                <div className="col-3 mb-3">{val.apellido}</div>
                <div className="col-3 mb-3">{val.cedula}</div>
                <div className="col-3 mb-3">{val.telefono}</div>
                </>})
            }
            </div>
        </div>
    </>)
}