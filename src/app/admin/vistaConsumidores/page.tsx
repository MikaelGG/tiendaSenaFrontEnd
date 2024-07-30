'use client'
import styles from "@/app/usuario/usuario.module.css"
import Registrar from "@/app/componentes/botones/registrar"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Consumidores(){
    const [consumidoresList,setConsumidores] = useState([])
    useEffect(() =>{
        axios.get("https://backendtdc.vercel.app/api/consumer",).then((response)=>{
            setConsumidores(response.data);
        });
    }, [])



    return(<>
        <div className="row my-4">
            <div className="text_nav text-center"><a className="tittle">Consumidores Registrados</a></div>
        </div>
        <div className="row justify-content-center">
            <a href="/admin/registroConsumidor" className="text-center col-6"><Registrar/></a> 
        </div>
        <div className="col-10 text-center my-3 container">
            <div className="texto_menu mx-2 my-1 row table">
                <div className="col-3">Documento/NIT</div>
                <div className="col-3">Nombre</div>
                <div className="col-3">Apellido</div>
                <div className="col-3">Teléfono</div>
            </div>
            
            {consumidoresList.map((val,key)=>{
                return <>
                <div className="row mx-2 my-1 my-3 texto_drop" key={key}>
                    <div className="col-3 mb-3">{(val as any).cedula}</div>
                    <div className="col-3 mb-3">{(val as any).nombre}</div>
                    <div className="col-3 mb-3">{(val as any).apellido}</div>
                    <div className="col-3 mb-3">{(val as any).telefono}</div>
                    <hr />
                </div>
                </>})
            }
        </div>
    </>)
}