'use client'
import styles from "@/app/usuario/usuario.module.css"
import style from "@/app/admin/admin.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Carta() {
    const [productosList, setProductos] = useState([])
    useEffect(() => {
        axios.get("http://localhost:4000/api/products",).then((response) => {
            setProductos(response.data);
            console.log(response.data)
        });
    }, [])

    const eliminar = (codigo: any) => {
        // Mostrar un diálogo de confirmación usando SweetAlert 2
        Swal.fire({
            title: "¿Estás seguro de que quieres eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, realiza la llamada a la API para eliminar el elemento
                axios.delete(`http://localhost:4000/api/products/${codigo}`).then(() => {
                    // Mostrar un mensaje de éxito usando SweetAlert 2
                    Swal.fire("Producto eliminado", "", "success").then(() => {
                        location.reload();
                    });
                });
            }
        });
      };

    return (<>
        <div className="row my-4">
            <div className="text_nav text-center"><a className="tittle">Carta</a></div>
        </div>
        <div className="row justify-content-center">
            <button className={`${styles.ingresar} col-2 text-center align-items-center p-1 `} type="submit"><a href="/admin/registroProducto" className={`${styles.text_form}`}>Adicionar</a></button>
        </div>
        <div className="row pt-2 mx-3 justify-content-center">
            {productosList.map((val, key) => {
                return <>
                    <div className={`${style.carta} col-5 mt-2 mx-2`}>
                        <div key={key}></div>
                        <div className="col-12 text-center my-3 fs-5"><b>{val.nombre}</b></div>
                        <div className={`${styles.img_inicio} col-12 text-center`}>
                            <img className={`${style.img_invent} `} src={val.imagen} alt="" />
                        </div><br></br>
                        <div className="col-12 text-center">{val.descripcion}</div><br></br>
                        <div className="col-12 text-center"><b>Precio </b>{val.precio}</div>
                        <div className="col-12 text-center"><b>Cantidad </b>{val.cantidad}</div>
                        <div className="col-12 justify-content-center">
                            <Link href={`/admin/vistaProductos/${val.codigo}`} className={`${styles.text_form}`}>
                                <button className={`${styles.ingresar} col-5 text-center align-items-center m-3 p-1 `}
                                    type="submit">Editar</button>
                            </Link>
                            <button className={`${styles.ingresar} col-5 text-center align-items-center p-1 `} onClick={() => {
                                eliminar(val.codigo);
                            }} type="submit"><a className={`${styles.text_form}`}>Dar de baja</a></button>
                        </div>
                    </div>
                </>
            })
            }
        </div>
    </>)
}