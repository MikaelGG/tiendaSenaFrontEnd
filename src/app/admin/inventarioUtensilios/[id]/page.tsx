'use client'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Registrar from "@/app/componentes/botones/registrar";
import style from "@/app/admin/admin.module.css";


export default function editUtensilios(){
    const [producto, setProducto] = useState([{}]);
    const router = useParams();
    const route = useRouter();
    const { id } = router;

    useEffect(() => {
        axios.get(`http://localhost:4000/api/utensil/${id}`).then((response) => {
            const product = response.data;
            setProducto(product);
            console.log(producto)
        }).catch(error => {
            console.error('Error al obtener el producto:', error);
        });
    }, [id]);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setProducto((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        axios.put(`http://localhost:4000/api/utensil/${id}`, producto)
        .then(() => {
            alert("Producto editado correctamente");
            route.push("/admin/inventarioUtensilios");
        })
        .catch(error => {
            console.error('Error al editar el producto:', error);
        });
    };
    
    return(
        <>
            <div className="row my-4">
                <div className="text_nav text-center"><a className="tittle">Editar Utensilio</a></div>
            </div>
            <div className="row justify-content-center">
                <img className={`${style.img_invent} col-3`} src={producto[0].imagen} alt=""/>
            </div>
            <div className="row my-3 justify-content-center">
                <form className="form col-5 py-4" onSubmit={handleSubmit}>
                    <label className="texto_menu col-4">Imagen</label>
                    <input type="text" className="col-7 m-2 input_form" onChange={handleChange} name='imagen' value={producto.imagen}></input>
                    <label className="texto_menu col-4">Nombre</label>
                    <input type="text" className="col-7 m-2 input_form" onChange={handleChange} name='nombre' value={producto[0].nombre || ''}></input>
                    <label className="texto_menu col-4">Cantidad</label>
                    <input type="number" className="col-7 m-2 input_form" onChange={handleChange} name='cantidad' value={producto[0].cantidad || ''}></input>
                    <div className="row text-center my-3">
                        <div className="btn"><Registrar/></div><br></br>
                    </div>
                </form>
            </div>
        </>
    );
}
