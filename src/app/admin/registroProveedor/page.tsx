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
    const [telefono, setTelefono] = useState(0);
    const router = useRouter();
    const add = ()=>{
        axios.post("http://localhost:4000/api/supplier",{
            nit:nit,    
            nombre:nombre,
            apellido:apellido,
            direccion:direccion,
            telefono:telefono
        }).then(()=>{
            Swal.fire("Proveedor registrado", "", "success").then(() => {
                router.push("/admin/proveedores");
            })
        });
    }
    
 return(<>
    <div className="row my-4">
        <div className="text_nav text-center"><a className="tittle">Registrar Proveedor</a></div>
    </div>
    <div className="row justify-content-center">
        <div className="form col-5 py-4">
            <label className="texto_menu col-4">Nit/Documento</label>
            <input onChange={(event) => { setNit(parseInt(event.target.value)); }}type="number" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Nombre</label>
            <input onChange={(event) => { setNombre(event.target.value); }}type="text" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Apellidos</label>
            <input onChange={(event) => { setApellido(event.target.value); }}type="text" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Direccion</label>
            <input onChange={(event) => { setDireccion(event.target.value); }}type="text" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Telefono</label>
            <input onChange={(event) => { setTelefono(parseInt(event.target.value)); }}type="number" className="col-7 m-2 input_form" ></input>
            <div className="row text-center my-3">
            <div className=""onClick={add}><Registrar/></div><br></br>
        </div>
        </div>
    </div>
 </>)
}