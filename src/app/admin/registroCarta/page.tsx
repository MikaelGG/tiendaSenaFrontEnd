'use client'
import Registrar from "@/app/componentes/botones/registrar"
import { useState } from "react";
import axios from "axios";
export default function RegistroCarta(){

    const [imagen, setImagen] = useState({});
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    console.log(imagen);
    
    const add = ()=>{
        axios.post("http://localhost:3001/createProductos",{
            imagen:imagen,    
            nombre:nombre,
            descripcion:descripcion,
            precio:precio,
            cantidad:cantidad,
        }).then(()=>{
            alert("Producto registrado");
        });
    }
 return(<>
    <div className="row my-4">
        <div className="text_nav text-center"><a className="tittle">Agregar Producto a la Carta</a></div>
    </div>
    <div className="row justify-content-center">
        <div className="form col-5 py-4">
            <label className="texto_menu col-4">Imagen</label>
            <input  onChange={(event) => { setImagen(event.target.files[0]); }} name="imagen"  type="file" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Nombre</label>
            <input  onChange={(event) => { setNombre(event.target.value); }} value={nombre} type="text" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Descripción</label>
            <input  onChange={(event) => { setDescripcion(event.target.value); }} value={descripcion} type="textarea" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Precio</label>
            <input onChange={(event) => { setPrecio(parseInt(event.target.value)); }} value={precio} type="number" className="col-7 m-2 input_form" ></input>
            <label className="texto_menu col-4">Cantidad</label>
            <input onChange={(event) => { setCantidad(parseInt(event.target.value)); }} value={cantidad} type="number" className="col-7 m-2 input_form" ></input>
            <div className="row text-center my-3">
            <div className=""onClick={add}><Registrar/></div><br></br>
        </div>
        </div>
    </div>
 </>)
}