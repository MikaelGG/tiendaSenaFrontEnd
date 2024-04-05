'use client'
import Registrar from "@/app/componentes/botones/registrar"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RegistroConsumidor(){
    const router = useRouter();
    const [cedula, setCedula] = useState(0);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState(0);

    const add = ()=>{
        axios.post("http://localhost:4000/api/consumer",{
            cedula:cedula,    
            nombre:nombre,
            apellido:apellido,
            telefono:telefono
        }).then(()=>{
            Swal.fire("Consumidor registrado", "", "success").then(() => {
                router.push("/admin/vistaConsumidores");
            })
        });
    }
    return(<>
        <div className="row my-4">
            <div className="text_nav text-center"><a className="tittle">Registrar Consumidor</a></div>
        </div>
        <div className="row justify-content-center">
            <div className="form col-5 py-4">
                <label className="texto_menu col-4">ID/NIT</label>
                <input onChange={(event) => { setCedula(parseInt(event.target.value)); }}type="number" className="col-7 m-2 input_form" ></input>
                <label className="texto_menu col-4">Nombres</label>
                <input onChange={(event) => { setNombre(event.target.value); }}type="text" className="col-7 m-2 input_form" ></input>
                <label className="texto_menu col-4">Apellidos</label>
                <input onChange={(event) => { setApellido(event.target.value); }}type="text" className="col-7 m-2 input_form" ></input>
                <label className="texto_menu col-4">Telefono</label>
                <input onChange={(event) => { setTelefono(parseInt(event.target.value)); }}type="number" className="col-7 m-2 input_form" ></input>
                <div className="row text-center my-3">
                <div className="" onClick={add}><Registrar/></div><br></br>
            </div>
            </div>
        </div>
    </>)
}