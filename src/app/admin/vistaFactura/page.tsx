'use client'
import styles from "../../usuario/usuario.module.css"
import style from "@/app/admin/admin.module.css"
import Registrar from "@/app/componentes/botones/registrar";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { formatNumber, formatNumberCOP } from '@/app/componentes/formatNumber';
import Swal from "sweetalert2";


export default function VistaFactura(){

    const [facturasList, setFacturas] = useState([]);
    const [facturasProdList, setFacturasProd] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    
    
    useEffect(() =>{
        axios.get("http://localhost:4000/api/invoice",).then((response)=>{
            setFacturas(response.data);
        });
    }, [])


    const fetchFacturaProd = async (nroFactura: number) => {
        try {
          const response = await axios.get(`http://localhost:4000/api/invoiceProd/modal/${nroFactura}`);
          setFacturasProd(response.data);
          setModalShow(true); // Abrir el modal después de obtener los productos
        } catch (error) {
          console.error('Error al obtener los productos de la factura:', error);
        }
    };
    
    const eliminar = async (nro: any) => {
        try {
            Swal.fire({
                title: "¿Estás segur@ de que quieres eliminar esta factura?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:4000/api/invoice/${nro}`).then(() => {
                        Swal.fire("Factura eliminada", "", "success").then(() => {
                            location.reload();
                        })
                    })   
                }
            });
        } catch (err) {
            Swal.fire("No se pudo eliminar la factura", "", "error");
        }
    }
        
    function formatDate(dateString: any) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function MyVerticallyCenteredModal(props: any) {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Vista de la factura
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-12 text-center my-3 container">
                        <div className="texto_menu mx-2 my-1 row table">
                            <div className="col-3 mx-2 my-1">Nombre del producto</div>
                            <div className="col-3 mx-2 my-1">Precio unitario</div>
                            <div className="col-2 mx-2 my-1">Cantidad</div>
                            <div className="col-2 mx-2 my-1">Sub total</div>
                        </div>
                        {facturasProdList.map((val,key)=>{
                            return <>
                                <div className="row mx-2 my-3 ">
                                    <div className="col-3 mx-2 my-1 texto_drop">{val.nombreProducto}</div>
                                    <div className="col-3 mx-2 my-1 texto_drop">{formatNumberCOP(val.precioU)}</div>
                                    <div className="col-2 mx-2 my-1 texto_drop">{formatNumber(val.cantidad)}</div>
                                    <div className="col-2 mx-3 my-1 texto_drop">{formatNumberCOP(val.subTotal)}</div>
                                </div>
                            </>})
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className={`${style.bmodal} col-2 align-items-center p-1`} style={{ textDecoration: 'none' }}>Volver</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return(<>
        <div className="row my-4">
            <div className="text_nav text-center"><a className="tittle">Facturas</a></div>
        </div>
        <div className="row text-center justify-content-center">
            <div className="col-6">
                <Link href={`/admin/registroFactura`} className={`${styles.text_form}`}>
                    <div className="div"><Registrar/></div><br></br>
                </Link>
            </div>
            <div className="col-11 text-center my-3 container">
                <div className="texto_menu mx-2 my-1 row table">
                    <div className="col-2 mx-2 my-1">Fecha</div>
                    <div className="col-3 mx-2 my-1">Nombre y apellido</div>
                    <div className="col-2 my-1">Total</div>
                    <div className="col-4 mx-2 my-1">Acciones</div>
                </div>
                {facturasList.map((val, key)=>{
                    return <>
                        <div className="row mx-2 my-3 ">
                            <div className="col-2 mx-2 my-1 texto_drop">{formatDate(val.fecha)}</div>
                            <div className="col-3 mx-2 my-1 texto_drop">{val.nombreConsumidor} {val.apellidoConsumidor}</div>
                            <div className="col-2 mx-2 my-1 texto_drop">{formatNumberCOP(val.total)}</div>
                            <div className="col-4 mx-2 my-1 texto_drop d-flex flex-row">
                                <a className={`${style.edit} w-50 mx-1 text-center align-items-center p-1`} style={{ textDecoration: 'none' }} onClick={() => fetchFacturaProd(val.nro)}>Ver</a>
                                <button className={`${style.edit} w-50 mx-1 text-center align-items-center p-1`} onClick={() => eliminar(val.nro)} type="submit">
                                    <a href="#" className={`${styles.text_form}`}>Eliminar</a>
                                </button>
                            </div>
                            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)}/>
                        </div>
                        <hr />
                    </>})
                }
            </div>
        </div>
    </>)
}