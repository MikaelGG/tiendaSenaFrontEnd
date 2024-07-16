'use client'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Registrar from "@/app/componentes/botones/registrar";
import Swal from "sweetalert2";

const EditarProducto = () => {
    const [producto, setProducto] = useState<Product>({} as Product);
    const [selectedType, setSelectedType] = useState('');
    const [codigo, setCodigo] = useState<string | null>(null);
    const router = useRouter();

    interface Product {
        nombre: string;
        imagen: string;
        descripcion: string;
        precio: number;
        tipo: string;
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const codigoParam = searchParams.get('codigo');
        setCodigo(codigoParam);
    }, []);

    useEffect(() => {
        if (codigo){
            axios.get<Product[]>(`http://localhost:4000/api/products/${codigo}`).then((response) => {
                const product = response.data[0];
                setProducto(product);
                setSelectedType(product.tipo);
            });
        }
    }, [codigo]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setProducto((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
        setProducto((prevProduct) => ({
            ...prevProduct,
            tipo: event.target.value,
        }));
      };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const { nombre, imagen, descripcion, precio } = producto;


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
        }

        axios.put(`http://localhost:4000/api/products/${codigo}`, producto).then(() => {
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
                    <input onChange={handleChange} value={(producto as any).imagen} name="imagen" type="text" className="col-7 m-2 input_form" />
                    <label className="texto_menu col-4">Nombre</label>
                    <input onChange={handleChange} value={(producto as any).nombre} name='nombre' type="text" className="col-7 m-2 input_form" />
                    <div className="d-flex align-items-start">
                        <label className="texto_menu col-4 mt-2">Descripción</label>
                        <textarea cols={30} rows={5} onChange={handleChange} value={(producto as any).descripcion} name="descripcion" className="col-7 m-2 input_form"
                        ></textarea>
                    </div>
                    <label className="texto_menu col-4">Precio</label>
                    <input onChange={handleChange} value={(producto as any).precio} name='precio' type="number" className="col-7 m-2 input_form" />
                    <label className="texto_menu col-4">Tipo</label>
                    <select name="type" className="col-7 m-2 input_form" value={selectedType} onChange={handleTypeChange}>
                        <option>Tipo de producto</option>
                        <option value="cafes">Cafés</option>
                        <option value="panaderia">Panadería</option>
                        <option value="cocteleria">Coctelería</option>
                    </select> 
                    <div className="row text-center my-3">
                        <div><Registrar /></div><br />
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditarProducto;
