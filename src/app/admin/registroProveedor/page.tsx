'use client'
import Registrar from "@/app/componentes/botones/registrar"
import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";

export default function RegistroProveedor(){
    const [nit, setNit] = useState(0);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const router = useRouter();
    const add = ()=>{
        if (nombre.trim() === '' || nombre.length < 3) {
            Swal.fire("Completa correctamente el nombre.", "", "error")
            return;           
        }else if (nit.toString().length < 16) {
            Swal.fire("Completa correctamente el NIT/Documento", "", "error")
            return;
        } else if (apellido.trim() === "" || apellido.length < 3) {
            Swal.fire("Completa correctamente los apellidos", "", "error")
            return;
        } else if (!direccion){
            Swal.fire("Completa correctamente la dirección", "", "error")
            return;
        } else if (telefono.length > 8){
            Swal.fire("Completa correctamente el teléfono", "", "error")
            return;
        } 
        axios.post(`http://localhost:4000/api/supplier`,{
            nit:nit,    
            nombre:nombre,
            apellido:apellido,
            direccion:direccion,
            telefono:telefono
        }).then(()=>{
            Swal.fire("Proveedor registrado", "", "success").then(() => {
                router.push("/admin/vistaProveedores");
            })
        });
    }
    
 return(<>
    <div className="row my-4">
        <div className="text_nav text-center"><a className="tittle">Registrar Proveedor</a></div>
    </div>
    <div className="row justify-content-center">
        <div className="form col-5 py-4">
            <label className="texto_menu col-4">NIT/Documento</label>
            <input onChange={(event) => { setNit(parseInt(event.target.value)); }}type="number" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Nombre</label>
            <input onChange={(event) => { setNombre(event.target.value); }}type="text" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Apellidos</label>
            <input onChange={(event) => { setApellido(event.target.value); }}type="text" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Dirección</label>
            <input onChange={(event) => { setDireccion(event.target.value); }}type="text" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Teléfono</label>
            <input onChange={(event) => { setTelefono(event.target.value); }}type="number" className="col-7 m-2 input_form" ></input>
            <div className="row text-center my-3">
            <div className=""onClick={add}><Registrar/></div><br></br>
        </div>
        </div>
    </div>
 </>)
}