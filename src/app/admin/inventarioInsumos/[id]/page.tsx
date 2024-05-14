'use client'
import { useParams, useRouter, } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Registrar from "@/app/componentes/botones/registrar";
import style from "@/app/admin/admin.module.css";
import Swal from "sweetalert2";

export default function editInsumos() {
    const [producto, setProducto] = useState({})
    const router = useParams();
    const route = useRouter();
    const { id } = router

    useEffect(() => {
        axios.get(`http://localhost:4000/api/rawMaterial/${id}`,).then((response) => {
            const product = response.data[0]
            setProducto(product)
            console.log(producto)
            console.log(product)
        });
    }, [id]);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setProducto((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
        console.log(producto);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        axios.put(`http://localhost:4000/api/rawMaterial/${id}`, producto
        ).then(() => {
            Swal.fire("Insumo editado correctamente", "", "success").then(() => {
                route.push("/admin/inventarioInsumos")
            })
        })
    }

    function formatDate(dateString: any) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

    return (
        <>
            <div className="row my-4">
                <div className="text_nav text-center">
                    <a className="tittle">Editar Insumo</a>
                </div>
            </div>
            <div className="row justify-content-center">
                <img
                    className={`${style.img_invent} col-3`}
                    src={producto.imagen}
                    alt=""
                ></img>
            </div>
            <div className="row my-3 justify-content-center">
                <form className="form col-5 py-4" onSubmit={e => handleSubmit(e)}>
                    <label className="texto_menu col-4">Imagen</label>
                    <input type="text" className="col-7 m-2 input_form" onChange={e => handleChange(e)} name='imagen' value={producto.imagen}></input>
                    <label className="texto_menu col-4">Nombre</label>
                    <input type="text" className="col-7 m-2 input_form" onChange={e => handleChange(e)} name='nombre' value={producto.nombre}></input>
                    <label className="texto_menu col-4">Cantidad</label>
                    <input type="number" className="col-7 m-2 input_form" onChange={e => handleChange(e)} name='cantidad' value={producto.cantidad}></input>
                    <label className="texto_menu col-4">Fecha Ingreso</label>
                    <input type="date" className="col-7 m-2 input_form" onChange={e => handleChange(e)} name='f_ingreso' value={formatDate(producto.f_ingreso)}></input>
                    <label className="texto_menu col-4">Fecha Vencimiento</label>
                    <input type="date" className="col-7 m-2 input_form" onChange={e => handleChange(e)} name='f_vencimiento' value={formatDate(producto.f_vencimiento)}></input>
                    <label className="texto_menu col-4">Costo</label>
                    <input type="number" className="col-7 m-2 input_form" onChange={e => handleChange(e)} name='costo' value={producto.costo}></input>
                    <div className="row text-center my-3">
                        <div className="">
                            <Registrar />
                        </div>
                        <br></br>
                    </div>
                </form>
            </div>
        </>
    );
}
