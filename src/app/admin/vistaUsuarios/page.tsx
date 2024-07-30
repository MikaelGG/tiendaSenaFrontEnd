'use client'
import styles from "@/app/usuario/usuario.module.css";
import Registrar from "@/app/componentes/botones/registrar";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Usuarios(){
  const [usuariosList, setUsuarios] = useState([]);
  useEffect(() =>{
    axios.get("https://backendtdc.vercel.app/api/user",).then((response)=>{
        setUsuarios(response.data);
    });
  }, [])

    console.log(usuariosList)
  
  return(<>
    <div className="row my-4">
      <div className="text_nav text-center"><a className="tittle">Usuarios registrados</a></div>
    </div>
    <div className="row justify-content-center">
      <a href="/admin/registroUsuario" className="text-center col-6"><Registrar/></a> 
    </div>

    <div className="col-10 col-md-10 col-lg-10 text-center my-3 container">
      <div className="texto_menu mx-2 my-1 row table">
        <div className="col-3 ">Documento</div>
        <div className="col-3 ">Nombres</div>
        <div className="col-3 ">Apellidos</div>
        <div className="col-3 ">Correo</div>       
      </div>
      
        {usuariosList.map((val,key)=>{
          return <>
          <div className="row mx-2 texto_drop my-3" key={key}>
            <div className="col-3 mb-3">{(val as any).cedula}</div>
            <div className="col-3 mb-3">{(val as any).nombre}</div>
            <div className="col-3 mb-3">{(val as any).apellido}</div>
            <div className="col-3 mb-3">{(val as any).correo}</div>
            <hr  />
          </div>
          </>})
        }
      
    </div>
  </>)
}