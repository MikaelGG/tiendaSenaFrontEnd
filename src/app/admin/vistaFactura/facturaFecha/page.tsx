'use client'
import style from "@/app/admin/admin.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { formatNumber, formatNumberCOP } from '@/app/componentes/formatNumber';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { format } from 'date-fns';

export default function FacturaFecha() {
    const [facturaList, setFacturaList] = useState([]);
    const [facturasProdList, setFacturasProd] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [storedDate, setStoredDate] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const date = localStorage.getItem('selectedDate');
            setStoredDate(date as any);
        }
    }, []);

    useEffect(() => {
        if (storedDate) {
            axios.get(`https://backendtdc.vercel.app/api/invoice/${storedDate}`)
                .then((response) => {
                    setFacturaList(response.data);
                })
                .catch((error) => {
                    Swal.fire("Error al obtener los datos", "", "error");
                    console.log(error);
                });
        }
    }, [storedDate]);

    const fetchFacturaProd = async (nroFactura: any) => {
        try {
            const response = await axios.get(`https://backendtdc.vercel.app/api/invoiceProd/modal/${nroFactura}`);
            setFacturasProd(response.data);
            setModalShow(true); // Abrir el modal después de obtener los productos
        } catch (error) {
            console.error('Error al obtener los productos de la factura:', error);
        }
    };

    function formatDate(dateString: any) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = (date.getDate() + 1).toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const generarPDF = async () => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        let y = 20;
    
        const header = () => {
            doc.setFontSize(18);
            doc.text("Factura Detallada", pageWidth / 2, 10, { align: "center" });
            doc.setFontSize(12);
            doc.setTextColor(100);
            doc.text("Fecha de emisión: " + format(new Date(), 'dd/MM/yyyy'), pageWidth - 10, 10, {align: "right"});
            y += 18;
        };
    
        const footer = () => {
            doc.setFontSize(10);
            doc.text("Página " + doc.internal.pages.length, pageWidth / 2, pageHeight - 10, {align: "center"});
        };
    
        const addInvoice = async (invoice: any) => {
            if (y > pageHeight - 60) {
                doc.addPage();
                header();
                footer();
                y = 30;
            }
    
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`Consumidor(a): ${invoice.nombreConsumidor} ${invoice.apellidoConsumidor}`, 10, y);
            doc.text(`Fecha: ${formatDate(new Date(invoice.fecha))}`, pageWidth - 10, y, {align: "right"});
            y += 5;
    
            // Table Headers
            const headers = ["Nombre del producto", "Precio Unitario", "Cantidad", "Subtotal"];
            const colWidths = [70, 40, 40, 40];
            let x = 10;
    
            doc.setFontSize(10);
            doc.setFillColor(230, 230, 230);
            doc.setDrawColor(0, 0, 0); // Set border color to black
            doc.rect(x, y, 190, 10, 'F');
            headers.forEach((header, i) => {
                doc.text(header, x + 2, y + 7);
                x += colWidths[i];
            });
    
            y += 10;
    
            try {
                const response = await axios.get(`https://backendtdc.vercel.app/api/invoiceProd/modal/${invoice.nro}`);
                response.data.forEach((prod: any) => {
                    if (y > pageHeight - 30) {
                        doc.addPage();
                        header();
                        footer();
                        y = 30;
                        x = 10;
                        doc.rect(x, y, 190, 10, 'F');
                        headers.forEach((header, i) => {
                            doc.text(header, x + 2, y + 7);
                            x += colWidths[i];
                        });
                        y += 10;
                    }
    
                    x = 10;
                    doc.text(prod.nombreProducto, x + 2, y + 7);
                    x += colWidths[0];
                    doc.text(formatNumberCOP(prod.precioU), x + 4, y + 7);
                    x += colWidths[1];
                    doc.text(formatNumber(prod.cantidad), x + 7, y + 7);
                    x += colWidths[2];
                    doc.text(formatNumberCOP(prod.subTotal), x + 2, y + 7);
                    y += 10;
                });
    
                if (y > pageHeight - 30) {
                    doc.addPage();
                    header();
                    footer();
                    y = 30;
                }
    
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                doc.setFillColor(230, 230, 230);
    
                // Draw a rectangle for "Total"
                doc.rect(10 + colWidths[0] + colWidths[1], y, colWidths[2], 10, 'F');
                doc.text("Total:", 10 + colWidths[0] + colWidths[1] + 2, y + 7);
    
                // Draw the total price next to it
                doc.text(formatNumberCOP(invoice.total), 10 + colWidths[0] + colWidths[1] + colWidths[2] + 2, y + 7);
    
                y += 40;
            } catch (error) {
                console.error('Error al obtener los productos de la factura:', error);
            }
        };
    
        header();
        footer();
    
        for (const val of facturaList) {
            await addInvoice(val);
        }
    
        doc.save('formulario.pdf');
    };
    
    
    

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
                        {facturasProdList.map((val, key) => (
                            <div className="row mx-2 my-3" key={key}>
                                <div className="col-3 mx-2 my-1 texto_drop">{(val as any).nombreProducto}</div>
                                <div className="col-3 mx-2 my-1 texto_drop">{formatNumberCOP((val as any).precioU)}</div>
                                <div className="col-2 mx-2 my-1 texto_drop">{formatNumber((val as any).cantidad)}</div>
                                <div className="col-2 mx-3 my-1 texto_drop">{formatNumberCOP((val as any).subTotal)}</div>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className={`${style.bmodal} col-2 align-items-center p-1`} style={{ textDecoration: 'none' }}>Volver</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <>
            <div className="row text-center justify-content-center">
                <div className={`${style.generarPDF}`}>
                    <button onClick={generarPDF} className={`${style.edit} w-30 mx-1 text-center align-items-center p-1`}>Generar PDF</button>
                </div>
                <div className="col-10 text-center my-3 container">
                    <div className="texto_menu mx-2 my-1 row table">
                        <div className="col-3 mx-2 my-1">Fecha</div>
                        <div className="col-3 mx-2 my-1">Nombre y apellido</div>
                        <div className="col-2 my-1">Total</div>
                        <div className="col-3 mx-2 my-1">Acciones</div>
                    </div>
                    {facturaList.map((val, key) => (
                        <React.Fragment key={key}>
                            <div className="row mx-2 my-3">
                                <div className="col-3 mx-2 my-1 texto_drop">{formatDate((val as any).fecha)}</div>
                                <div className="col-3 mx-2 my-1 texto_drop">{(val as any).nombreConsumidor} {(val as any).apellidoConsumidor}</div>
                                <div className="col-2 mx-2 my-1 texto_drop">{formatNumberCOP((val as any).total)}</div>
                                <div className="col-3 mx-2 my-1 texto_drop d-flex flex-row">
                                    <a className={`${style.edit} w-50 mx-5 text-center align-items-center p-1`} style={{ textDecoration: 'none' }} onClick={() => fetchFacturaProd((val as any).nro)}>Ver</a>
                                </div>
                            </div>
                            <hr />
                        </React.Fragment>
                    ))}
                    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
                </div>
            </div>
        </>
    );
}
