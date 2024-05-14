'use client'
import Registrar from "@/app/componentes/botones/registrar";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RegistroUsuario(){

    const [cedula, setCedula] = useState(0);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const router = useRouter();


    const add = async() => {

        function validarCorreo(correo: any) {
            // Expresión regular para validar el formato del correo electrónico
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regexCorreo.test(correo);
          }

        if (nombre.trim() === '' || nombre.length < 3) {
            Swal.fire("Completa correctamente el nombre.", "", "error")
            return;           
        }else if (apellido.trim() === '' || apellido.length < 3 ) {
            Swal.fire("Completa correctamente los apellidos", "", "error")
            return;
        } else if (correo.trim() === '' || !validarCorreo(correo)) {
            Swal.fire("Completa correctamente el correo electronico", "", "error")
            return;
        } else if (cedula.toString().length < 16){
            Swal.fire("Completa correctamente el documento", "", "error")
            return;
        }
          
        try {
            await axios.post(`http://localhost:4000/api/user`,{
                cedula: cedula,    
                nombre: nombre,
                apellido: apellido,
                correo: correo
            }).then(()=>{
                Swal.fire("Usuario registrado", "", "success").then(()=>{
                    router.push("/admin/vistaUsuarios");
                })
            });          
        } catch (err) {   
            console.log("Error al registrar usuario", err);
            Swal.fire("Error al registrar usuario", "", "error");        
        }
    }

    return(<>
        <div className="row my-4">
            <div className="text_nav text-center"><a className="tittle">Registrar Usuario</a></div>
        </div>
        <div className="row justify-content-center">
            <div className="form col-5 py-4">
                <label className="texto_menu col-4">Nombres</label>
                <input onChange={(event) => { setNombre(event.target.value); }} type="text" className="col-7 m-2 input_form" required></input>
                <label className="texto_menu col-4">Apellidos</label>
                <input onChange={(event) => { setApellido(event.target.value); }}type="text" className="col-7 m-2 input_form" required></input>
                <label className="texto_menu col-4">Correo electrónico</label>
                <input onChange={(event) => { setCorreo(event.target.value); }}type="email" className="col-7 m-2 input_form" required></input>
                <label className="texto_menu col-4">Número de documento</label>
                <input onChange={(event) => { setCedula(parseInt(event.target.value)); }}type="number" className="col-7 m-2 input_form" ></input>
                <div className="row text-center my-3">
                    <div className="" onClick={add}><Registrar/></div><br></br>
                </div>
            </div>
        </div>
    </>)
}