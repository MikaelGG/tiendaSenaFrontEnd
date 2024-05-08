'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import Registrar from "@/app/componentes/botones/registrar";
import { useRouter} from "next/navigation";
import Swal from "sweetalert2";
import moment from "moment";


export default function RegEvento(){

    const router = useRouter();
    const [hora_inicio, setHora_inicio] = useState("");
    const [amPmInicio, setAmPmInicio] = useState("");
    const [hora_fin, setHora_fin] = useState("");
    const [amPmFin, setAmPmFin] = useState("");
    const [titulo, setTitulo] = useState("");
    const [imagen, setImagen] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [cupo, setCupo] = useState(0);
    const [fecha, setFecha] = useState(Date);

    const add = async ()=>{
        function isValidDate(date: any) {
            return moment(date, 'YYYY-MM-DD', true).isValid();
        }
        if (!imagen) {
            Swal.fire("Completa correctamente la imagen.", "", "error")
            return;           
        }else if (descripcion.length < 205) {
            Swal.fire("Completa correctamente la descripción", "", "error")
            return;
        } else if (!cupo) {
            Swal.fire("Completa correctamente el cupo", "", "error")
            return;
        } else if (!isValidDate(fecha)){
            Swal.fire("Completa correctamente la fecha del evento", "", "error")
            return;
        } else if (!hora_inicio) {
            Swal.fire("Completa correctamente la hora de inicio", "", "error");
            return;
        } else if (!hora_fin) {
            Swal.fire("Completa correctamente la hora de fin", "", "error");
            return;
        }

        const horaInicioCompleta = `${hora_inicio} ${amPmInicio}`.toLowerCase();
        const horaFinCompleta = `${hora_fin} ${amPmFin}`.toLowerCase();
        
        await axios.post(`http://localhost:4000/api/event`,{
            titulo:titulo,
            fecha:fecha,
            hora_inicio: horaInicioCompleta,
            hora_fin: horaFinCompleta,
            imagen:imagen,
            descripcion:descripcion,
            cupo:cupo,
        }).then(()=>{
            Swal.fire("Evento registrado", "", "success").then(() => {
                router.push("/admin/vistaEvento");
            })
        });
    }

    function getFechaActual() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return(<>
        <div className="row my-4">
            <div className="text_nav text-center"><a className="tittle">Registrar Evento</a></div>
        </div>
        <div className="row justify-content-center">
            <div className="form col-5 py-4">
                <form method="post" action="vistaEvento">
                    <label className="texto_menu col-4">Nombre del evento</label>
                    <input type="text" className="col-7 m-2 input_form" onChange={(event) => {setTitulo(event.target.value)}} />
                    <label className="texto_menu col-4">Fecha del evento</label>
                    <input onChange={(event) => { setFecha(event.target.value) }} type="date" min={getFechaActual()} className="col-7 m-2 input_form"></input>
                    <label className="texto_menu col-4">Hora de inicio</label>
                    <input onChange={(event) => { setHora_inicio(event.target.value); }} type="text" className="col-4 m-2 input_form"></input>
                    <select
                        onChange={(event) => { setAmPmInicio(event.target.value) }} className="col-2 m-2 input_form">
                        <option>Periodo</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                    <label className="texto_menu col-4">Hora de fin</label>
                    <input onChange={(event) => { setHora_fin(event.target.value) }} type="text" className="col-4 m-2 input_form"></input>
                    <select
                        onChange={(event) => { setAmPmFin(event.target.value) }} className="col-2 m-2 input_form">
                        <option>Periodo</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                    <label className="texto_menu col-4">Imagen del evento</label>
                    <input onChange={(event) => { setImagen(event.target.value); }}type="text" className="col-7 m-2 input_form"></input>
                    <label className="texto_menu col-4">Descripción del Menú</label>
                    <input onChange={(event) => { setDescripcion(event.target.value); }}type="textarea" className="col-7 m-2 input_form"></input>
                    <label className="texto_menu col-4">Cupos disponibles</label>
                    <input onChange={(event) => { setCupo(parseInt(event.target.value)); }}type="number" className="col-7 m-2 input_form"></input> 
                    <div className="text-center my-3" onClick={add}><Registrar/></div>
                </form>
            </div>
        </div>
    </>)
}