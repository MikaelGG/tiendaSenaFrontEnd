'use client'
import styles from "@/app/usuario/usuario.module.css";
import Registrar from "@/app/componentes/botones/registrar";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Usuarios(){
  const [usuariosList, setUsuarios] = useState([]);
  useEffect(() =>{
    axios.get("http://localhost:4000/api/user",).then((response)=>{
        setUsuarios(response.data);
    });
  }, [])

    console.log(usuariosList)

  const eliminar = (cedula: any) => {
    // Mostrar un diálogo de confirmación usando SweetAlert 2
    Swal.fire({
        title: "¿Estás seguro de que quieres eliminar este usuario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, realiza la llamada a la API para eliminar el elemento
            axios.delete(`http://localhost:4000/api/user/${cedula}`).then(() => {
                // Mostrar un mensaje de éxito usando SweetAlert 2
                Swal.fire("Usuario eliminado", "", "success").then(() => {
                  location.reload();
                });
            });
        }
    });
  };
  
  return(<>
    <div className="row my-4">
      <div className="text_nav text-center"><a className="tittle">Usuarios registrados</a></div>
    </div>
    {/* <div className="row justify-content-center">
      <div className="col-sm-6 col-md-4 col-lg-3 text-center p-1">
      <button className={`${styles.ingresar} w-100`} type="submit">
        <a href="/admin/registroUsuario" className={`${styles.text_form}`}>
          Registrar
        </a>
      </button>        
      </div>
    </div> */}
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
      <div className="row mx-2 texto_drop my-3">
        {usuariosList.map((val,key)=>{
          return <>
          <div className="col-3 mb-3">{val.cedula}</div>
          <div className="col-3 mb-3">{val.nombre}</div>
          <div className="col-3 mb-3">{val.apellido}</div>
          <div className="col-3 mb-3">{val.correo}</div>
          <hr  />
          </>})
        }
      </div>
    </div>
  </>)
}