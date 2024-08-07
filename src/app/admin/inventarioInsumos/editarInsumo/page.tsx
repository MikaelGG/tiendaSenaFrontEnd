'use client'
import { useParams, useSearchParams, useRouter} from 'next/navigation';
import { useEffect, useState} from 'react';
import axios from 'axios';
import Registrar from "@/app/componentes/botones/registrar";
import style from "@/app/admin/admin.module.css";
import Swal from "sweetalert2";

function EditInsumos() {
    const [producto, setProducto] = useState({})
    const [codigo, setCodigo] = useState<string | null>(null);
    const router = useParams();
    const route = useRouter();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const codigoParam = searchParams.get('codigo');
        setCodigo(codigoParam);
    }, []);

    console.log(codigo, "COidgooooo");

    useEffect(() => {
        if (codigo){
            axios.get(`https://backendtdc.vercel.app/api/rawMaterial/${codigo}`,).then((response) => {
                const product = response.data[0]
                const formattedProduct = {
                    ...product,
                    f_ingreso: formatApiDate(product.f_ingreso),
                    f_vencimiento: formatApiDate(product.f_vencimiento),
                };
                setProducto(formattedProduct);
                console.log(producto)
                console.log(product)
            });
        }
    }, [codigo]);

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
        axios.put(`https://backendtdc.vercel.app/api/rawMaterial/${codigo}`, producto
        ).then(() => {
            Swal.fire("Insumo editado correctamente", "", "success").then(() => {
                route.push("/admin/inventarioInsumos")
            })
        })
    }

    function formatApiDate(dateString: any) {
        const date = new Date(dateString);
        const nextDay = new Date(date.getTime() + (24 * 60 * 60 * 1000)); // Agregar un día
        const year = nextDay.getFullYear();
        const month = (nextDay.getMonth() + 1).toString().padStart(2, '0');
        const day = nextDay.getDate().toString().padStart(2, '0');
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
                <img className={`${style.img_product} col-3`} src={(producto as any).imagen} alt=""></img>
            </div>
            <div className="row my-3 justify-content-center">
                <form className="form col-5 py-4" onSubmit={handleSubmit}>
                    <label className="texto_menu col-4">Imagen</label>
                    <input type="text" className="col-7 m-2 input_form" onChange={handleChange} name='imagen' value={(producto as any).imagen}></input>
                    <label className="texto_menu col-4">Nombre</label>
                    <input type="text" className="col-7 m-2 input_form" onChange={handleChange} name='nombre' value={(producto as any).nombre}></input>
                    <label className="texto_menu col-4">Cantidad</label>
                    <input type="number" className="col-7 m-2 input_form" onChange={handleChange} name='cantidad' value={(producto as any).cantidad}></input>
                    <label className="texto_menu col-4">Fecha Ingreso</label>
                    <input type="date" className="col-7 m-2 input_form" onChange={handleChange} name='f_ingreso' value={formatApiDate((producto as any).f_ingreso)}></input>
                    <label className="texto_menu col-4">Fecha Vencimiento</label>
                    <input type="date" className="col-7 m-2 input_form" onChange={handleChange} name='f_vencimiento' value={formatApiDate((producto as any).f_vencimiento)}></input>
                    <label className="texto_menu col-4">Costo</label>
                    <input type="number" className="col-7 m-2 input_form" onChange={handleChange} name='costo' value={(producto as any).costo}></input>
                    <div className="row text-center my-3">
                        <div className="btn">
                            <Registrar />
                        </div>
                        <br></br>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditInsumos;
