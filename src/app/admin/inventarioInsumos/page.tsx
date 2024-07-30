'use client'
import styles from "@/app/usuario/usuario.module.css"
import style from "@/app/admin/admin.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { formatNumber, formatNumberCOP } from '@/app/componentes/formatNumber';


export default function Insumos() {
  const [insumosList, setInsumos] = useState([])
  useEffect(() => {
    axios.get("https://backendtdc.vercel.app/api/rawMaterial",).then((response) => {
      setInsumos(response.data);
    });
  }, [])
  console.log(insumosList)

  const eliminar = (codigo: any) => {
    // Mostrar un diálogo de confirmación usando SweetAlert 2
    Swal.fire({
        title: "¿Estás segur@ de que quieres eliminar este insumo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, realiza la llamada a la API para eliminar el elemento
            axios.delete(`https://backendtdc.vercel.app/api/rawMaterial/${codigo}`).then(() => {
                // Mostrar un mensaje de éxito usando SweetAlert 2
                Swal.fire("Insumo eliminado", "", "success").then(() => {
                  location.reload();
                });
            });
        }
    });
  };

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (<>
    <div className="row my-4">
      <div className={"text_nav text-center"}><a className="tittle">Inventario de Insumos</a></div>
    </div>
    <div className="row justify-content-center">
      <div className="col-sm-6 col-md-4 col-lg-3 text-center p-1">
        <button className={`${styles.ingresar} w-100`} type="submit">
          <a href="/admin/registroInsumos" className={`${styles.text_form}`}>
            Adicionar
          </a>
        </button>
      </div>
    </div>
    <div className="container justify-content-center">
      {insumosList.map((val, key) => {
        return <>
          <div className="row my-2" key={key}>
            <div className="col-sm-6 col-md-4 col-lg-2">
              <img className={`${style.img_invent} w-100`} src={(val as any).imagen} alt="" />
            </div>
            <div className="col-sm-12 col-md-8 col-lg-6">
              <span className={`${style.tittle_small}`}>Código: </span>
              <span className={`${style.venc_txt}`}>{(val as any).codigo}</span>
              <br />
              <span className={`${style.tittle_small}`}>Nombre: </span>
              <span className={`${style.venc_txt}`}>{(val as any).nombre}</span>
              <br />
              <span className={`${style.tittle_small}`}>Fecha de Ingreso: </span>
              <span className={`${style.venc_txt}`}>{formatDate((val as any).f_ingreso)}</span>
              <br />
              <span className={`${style.tittle_small}`}>Fecha de Vencimiento: </span>
              <span className={`${style.venc_txt}`}>{formatDate((val as any).f_vencimiento)}</span>
              <br />
              <span className={`${style.tittle_small}`}>Cantidad: </span>
              <span className={`${style.venc_txt}`}>{formatNumber((val as any).cantidad)}</span>
              <br />
              <span className={`${style.tittle_small}`}>Costo: </span>
              <span className={`${style.venc_txt}`}>{formatNumberCOP((val as any).costo)}</span>
              <br />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <Link href={`/admin/inventarioInsumos/editarInsumo?codigo=${(val as any).codigo}`} className={`${styles.text_form}`}>
                <button className={`${style.edit} w-100 my-2 text-center align-items-center p-1 `}
                  type="submit">Editar</button>
              </Link>
              <br />
              <button className={`${style.edit} w-100 my-2 text-center align-items-center p-1 `} onClick={() => {
                eliminar((val as any).codigo);
              }} type="submit">
                <a href="#" className={`${styles.text_form}`}>Dar de baja</a>
              </button>
            </div>
          </div>
        </>
      })
      }
      
    </div>
  </>
  )
  
}