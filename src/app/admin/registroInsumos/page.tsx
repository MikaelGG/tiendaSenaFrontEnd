'use client'
import Registrar from "@/app/componentes/botones/registrar"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import moment from "moment";

export default function RegistroInsumos(){
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [imagen, setImagen] = useState("");
    const [f_ingreso, setF_ingreso] = useState(Date);
    const [f_vencimiento, setF_vencimiento] = useState(Date);
    const [costo, setCosto] = useState(0);
    const router = useRouter();

    const add = ()=>{
        function isValidDate(date: any) {
            return moment(date, 'YYYY-MM-DD', true).isValid();
        }
        if (nombre.trim() === '' || nombre.length < 3) {
            Swal.fire("Completa correctamente el nombre.", "", "error")
            return;           
        }else if (!cantidad) {
            Swal.fire("Completa correctamente la cantidad", "", "error")
            return;
        } else if (!imagen) {
            Swal.fire("Completa correctamente la url", "", "error")
            return;
        } else if (!isValidDate(f_ingreso)){
            Swal.fire("Completa correctamente la fecha de ingreso", "", "error")
            return;
        } else if (!isValidDate(f_vencimiento)){
            Swal.fire("Completa correctamente la fecha de vencimiento", "", "error")
            return;
        } else if (!costo){
            Swal.fire("Completa correctamente el costo", "", "error")
            return;
        }

        axios.post(`http://localhost:4000/api/rawMaterial`,{    
            nombre:nombre,
            cantidad:cantidad,
            imagen:imagen,
            f_ingreso:f_ingreso,
            f_vencimiento:f_vencimiento,
            costo:costo
        }).then(()=>{
            Swal.fire("Insumo registrado", "", "success").then(() => {
                router.push("/admin/inventarioInsumos");
            })
        });
    }
 return(<>
    <div className="row my-4">
        <div className="text_nav text-center"><a className="tittle">Registrar Insumos</a></div>
    </div>
    <div className="row justify-content-center">
        <div className="form col-5 py-4">
            <label className="texto_menu col-4">Nombre</label>
            <input onChange={(event) => { setNombre(event.target.value); }}type="text" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Cantidad</label>
            <input onChange={(event) => { setCantidad(parseInt(event.target.value)); }}type="number" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">imagen</label>
            <input onChange={(event) => { setImagen(event.target.value); }}type="text" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Fecha Ingreso</label>
            <input onChange={(event) => { setF_ingreso(event.target.value); }}type="date" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Fecha Vencimiento</label>
            <input onChange={(event) => { setF_vencimiento(event.target.value); }}type="date" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Costo</label>
            <input onChange={(event) => { setCosto(parseInt(event.target.value)); }}type="number" className="col-7 m-2 input_form" ></input>
            <div className="row text-center my-3">
            <div className=""onClick={add}><Registrar/></div><br></br>
        </div>
        </div>
    </div>
 </>)
}