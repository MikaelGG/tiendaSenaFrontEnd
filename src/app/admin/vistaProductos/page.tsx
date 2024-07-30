'use client'
import styles from "@/app/usuario/usuario.module.css"
import style from "@/app/admin/admin.module.css"
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import {formatNumberCOP, formatNumber } from '@/app/componentes/formatNumber';


export default function Carta() {
    const [productosList, setProductos] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [botonSeleccionado, setBotonSeleccionado] = useState('');

    useEffect(() => {
        axios.get("https://backendtdc.vercel.app/api/products",).then((response) => {
            setProductos(response.data);
            console.log(response.data)
            setInitialState(response.data);
        });
    }, [])

    const setInitialState = (data: any) => {
        const cafesProducts = data.filter((product: any) => product.tipo === 'cafes');
        setFilteredProducts(cafesProducts);
        setBotonSeleccionado('cafes');
    };

    const eliminar = (codigo: any) => {
        // Mostrar un diálogo de confirmación usando SweetAlert 2
        Swal.fire({
            title: "¿Estás segur@ de que quieres eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, realiza la llamada a la API para eliminar el elemento
                axios.delete(`https://backendtdc.vercel.app/api/products/${codigo}`).then(() => {
                    // Mostrar un mensaje de éxito usando SweetAlert 2
                    Swal.fire("Producto eliminado", "", "success").then(() => {
                        location.reload();
                    });
                });
            }
        });
    };

    const filterProducts = (tipo: any) => {
        const filtered = productosList.filter(product => (product as any).tipo === tipo);
        setFilteredProducts(filtered);
        setBotonSeleccionado(tipo);
    }

    return (<>
        <div className="row my-4">
            <div className="text_nav text-center"><a className="tittle">Carta</a></div>
        </div>
        <div className="row justify-content-center">
            <button className={`${styles.ingresar} col-3 text-center align-items-center p-1 `} type="submit"><a href="/admin/registroProducto" className={`${styles.text_form}`}>Adicionar producto</a></button>
        </div>
        <div className="row justify-content-center mb-3 mt-5">
            <button className={`${styles.ingresar} col-2 text-center align-items-center p-1 mx-3 ${botonSeleccionado === 'cafes' ? `${style.botonCafe} seleccionado` : ''}`} onClick={() => filterProducts('cafes')} >Cafés</button>
            <button className={`${styles.ingresar} col-2 text-center align-items-center p-1 mx-3 ${botonSeleccionado === 'panaderia' ? `${style.botonCafe} seleccionado` : ''}`} onClick={() => filterProducts('panaderia')}>Panadería</button>
            <button className={`${styles.ingresar} col-2 text-center align-items-center p-1 mx-3 ${botonSeleccionado === 'cocteleria' ? `${style.botonCafe} seleccionado` : ''}`} onClick={() => filterProducts('cocteleria')}>Coctelería</button>
        </div>
        <div className="row pt-2 mx-3 justify-content-center">
            {filteredProducts.map((val, key) => {
                return <>
                    <div className={`${style.carta} col-5 mt-2 mx-2`} key={key}>
                        <div key={key}></div>
                        <div className="col-12 text-center my-3 fs-5"><b>{(val as any).nombre}</b></div>
                        <div className={`${styles.img_inicio} col-12 text-center`}>
                            <img className={`${style.img_product} `} src={(val as any).imagen} alt="" />
                        </div><br></br>
                        <div className="col-12 text-center">{(val as any).descripcion}</div><br></br>
                        <div className="col-12 text-center fs-5"><b>Precio </b>{formatNumberCOP((val as any).precio)}</div>
                        <div className="col-12 justify-content-center">
                            <Link href={`/admin/vistaProductos/editarProducto?codigo=${(val as any).codigo}`} className={`${styles.text_form}`}>
                                <button className={`${styles.ingresar} col-5 text-center align-items-center m-3 p-1 `}
                                    type="submit">Editar</button>
                            </Link>
                            <button className={`${styles.ingresar} col-5 text-center align-items-center p-1 `} onClick={() => {
                                eliminar((val as any).codigo);
                            }} type="submit"><a className={`${styles.text_form}`}>Dar de baja</a></button>
                        </div>
                    </div>
                </>
            })
            }
        </div>
    </>)
}