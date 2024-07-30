'use client'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Registrar from "@/app/componentes/botones/registrar";
import style from "@/app/admin/admin.module.css";
import Swal from "sweetalert2";


function EditUtensilios(){
    const [producto, setProducto] = useState({});
    const [codigo, setCodigo] = useState<string | null>(null);
    const router = useParams();
    const route = useRouter();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const codigoParam = searchParams.get('codigo');
        setCodigo(codigoParam);
    }, []);

    useEffect(() => {
        if (codigo){
            axios.get(`https://backendtdc.vercel.app/api/utensil/${codigo}`).then((response) => {
                const product = response.data[0]
                setProducto(product);
                console.log(producto)
            }).catch(error => {
                console.error('Error al obtener el producto:', error);
            });
        }
    }, [codigo]);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setProducto((prevProduct: any) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        axios.put(`https://backendtdc.vercel.app/api/utensil/${codigo}`, producto)
        .then(() => {
            Swal.fire("Utensilio editado correctamente", "", "success").then(() =>{
                route.push("/admin/inventarioUtensilios");
            })
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
                <img className={`${style.img_product} col-3`} src={(producto as any).imagen} alt=""/>
            </div>
            <div className="row my-3 justify-content-center">
                <form className="form col-5 py-4" onSubmit={handleSubmit}>
                    <label className="texto_menu col-4">Imagen</label>
                    <input type="text" className="col-7 m-2 input_form" onChange={handleChange} name='imagen' value={(producto as any).imagen}></input>
                    <label className="texto_menu col-4">Nombre</label>
                    <input type="text" className="col-7 m-2 input_form" onChange={handleChange} name='nombre' value={(producto as any).nombre || ''}></input>
                    <label className="texto_menu col-4">Cantidad</label>
                    <input type="number" className="col-7 m-2 input_form" onChange={handleChange} name='cantidad' value={(producto as any).cantidad || ''}></input>
                    <div className="row text-center my-3">
                        <div className="btn"><Registrar/></div><br></br>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditUtensilios;