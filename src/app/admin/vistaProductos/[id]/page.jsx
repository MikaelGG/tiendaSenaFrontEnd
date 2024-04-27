'use client'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Registrar from "@/app/componentes/botones/registrar";
import Swal from "sweetalert2";

const EditarProducto = () => {
    const [producto, setProducto] = useState({});
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/api/products/${id}`).then((response) => {
            const product = response.data;
            setProducto(product);
        });
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProducto((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        const { nombre, imagen, descripcion, precio, cantidad } = producto;

        if (nombre.trim() === '' || nombre.length < 3) {
            Swal.fire("Completa correctamente el nombre.", "", "error")
            return;           
        }else if (!imagen) {
            Swal.fire("Completa correctamente la url", "", "error")
            return;
        } else if (descripcion.length < 20) {
            Swal.fire("Completa correctamente la descripción. Minimo 20 carácteres", "", "error")
            return;
        } else if (!precio){
            Swal.fire("Completa correctamente el precio", "", "error")
            return;
        } else if (!cantidad){
            Swal.fire("Completa correctamente la cantidad", "", "error")
            return;
        } 

        axios.put(`http://localhost:4000/api/products/${id}`, producto).then(() => {
            Swal.fire("Producto editado correctamente", "", "success").then(() => {
                router.push("/admin/vistaProductos");
            })      
        }).catch(error => {
            console.error("Error al editar el producto:", error);
            alert("Hubo un error al editar el producto. Consulta la consola para más detalles.");
        });
    };

    return (
        <>
            <div className="row my-4">
                <div className="text_nav text-center"><a className="tittle">Editar Producto a la Carta</a></div>
            </div>
            <div className="row justify-content-center">
                <form onSubmit={handleSubmit} className="form col-5 py-4">
                    <label className="texto_menu col-4">Imagen</label>
                    <input onChange={handleChange} value={producto.imagen || ''} name="imagen" type="text" className="col-7 m-2 input_form" />
                    <label className="texto_menu col-4">Nombre</label>
                    <input onChange={handleChange} value={producto.nombre || ''} name='nombre' type="text" className="col-7 m-2 input_form" />
                    <label className="texto_menu col-4">Descripción</label>
                    <input onChange={handleChange} value={producto.descripcion || ''} name='descripcion' type="textarea" className="col-7 m-2 input_form" />
                    <label className="texto_menu col-4">Precio</label>
                    <input onChange={handleChange} value={producto.precio || ''} name='precio' type="number" className="col-7 m-2 input_form" />
                    <label className="texto_menu col-4">Cantidad</label>
                    <input onChange={handleChange} value={producto.cantidad || ''} name='cantidad' type="number" className="col-7 m-2 input_form" />
                    <div className="row text-center my-3">
                        <div><Registrar /></div><br />
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditarProducto;
