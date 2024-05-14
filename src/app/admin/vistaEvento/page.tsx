'use client'
import styles from "@/app/usuario/usuario.module.css";
import style from "@/app/admin/admin.module.css";
import event from "@/app/admin/event.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const backgroundStylesU: React.CSSProperties = {
    backgroundImage: `url('/userp.svg/')`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
};

export default function Eventos(){
    const [eventosList,setEventos] = useState([]);

    useEffect(() =>{
        axios.get(`http://localhost:4000/api/event`,).then((response)=>{
            setEventos(response.data);
        });
    }, [])
    console.log(eventosList)
    
    const eliminar = (codigo: any) => {
        // Mostrar un diálogo de confirmación usando SweetAlert 2
        Swal.fire({
            title: "¿Estás segur@ de que quieres eliminar este evento?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, realiza la llamada a la API para eliminar el elemento
                axios.delete(`http://localhost:4000/api/event/${codigo}`).then(() => {
                    // Mostrar un mensaje de éxito usando SweetAlert 2
                    Swal.fire("Evento eliminado", "", "success").then(() => {
                        location.reload();
                    });
                });
            }
        });
    };

    function formatDate(dateString: any) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return(<>
        <div className=" container-fluid " style={backgroundStylesU}>
            <div className="row">
                <div className="col-12 text-center mt-5 mb-3 ">
                    <span className={`${styles.text_p_form} col-10 text-center ms-4`}>Eventos</span>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-6 col-md-4 col-lg-3 text-center p-1">
                    <button className={`${styles.ingresar}  w-100`} type="submit">
                        <a href="/admin/registroEvento" className={`${styles.text_form}`}>Agregar evento</a>
                    </button>
                </div>
            </div>
            <br />
                {eventosList.map((val,key)=>{
                    return (<>
                        <article className={`${event.postcard} ${event.light} ${event.blue}`}>
                            <a className={`${event.postcard__img_link} `}>
                                <img className={`${event.postcard__img}`} src={val.imagen} alt="Image Title" />
                            </a>
                            <div className={`${event.postcard__text} ${event.tdark}`}>
                                <h1 className={`${event.postcard__title}  ${event.blue} ${event.text_nav}`}>{val.titulo}</h1>
                                <div className={`${event.postcard__bar}`}></div>
                                <div className={`${event.postcard__previewtxt}`}>{val.descripcion}</div>
                                <ul className={`${event.postcard__tagbox}`}>
                                    <li className={`${event.tag__item}`}><i className={`fas fa-users ${event.mr_2}`}></i>{val.cupo}</li>
                                    <li className={`${event.tag__item}`}><i className={`fas fa-clock ${event.mr_2}`}></i>{val.hora_inicio} - {val.hora_fin}</li>
					                <li className={`${event.tag__item} `}><i className={`fas fa-calendar ${event.mr_2}`}></i>{formatDate(val.fecha)}</li>
                                </ul>
                                <button className={`${styles.ingresar} col-3 text-center align-items-center mt-3`} onClick={()=>{ eliminar(val.codigo)}} 
                                type="submit"><a className={`${styles.text_form}`}>Eliminar</a></button>
                            </div>
                        </article>
                    </>)
                })}
        </div>    
    </>)
}