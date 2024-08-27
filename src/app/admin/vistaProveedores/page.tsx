"use client";
import styles from "@/app/usuario/usuario.module.css";
import Registrar from "@/app/componentes/botones/registrar";
import Swal from "sweetalert2";
import style from "@/app/admin/admin.module.css";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Provedores() {
  const [proveedoresList, setProveedores] = useState([]);

  useEffect(() => {
    axios.get("https://backendtdc.vercel.app/api/supplier").then((response) => {
      setProveedores(response.data);
    });
  }, []);

  const eliminar = async (nit: any) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás segur@ de que quieres eliminar este proveedor?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        try {
          console.log(`Eliminando proveedor con NIT: ${nit}`);
          const response = await axios.delete(
            `https://backendtdc.vercel.app/api/supplier/${nit}`
          );
          console.log("Respuesta del servidor:", response);
          await Swal.fire("Proveedor eliminado", "", "success");
          location.reload();
        } catch (axiosError) {
          console.error("Error eliminando el proveedor:", axiosError);
          Swal.fire("No se pudo eliminar el proveedor", "", "error");
        }
      }
    } catch (err) {
      console.error("Error en el proceso de eliminación:", err);
      Swal.fire("No se pudo completar la acción", "", "error");
    }
  };

  return (
    <>
      <div className="row my-4">
        <div className="text_nav text-center">
          <a className="tittle">Proveedores Registrados</a>
        </div>
      </div>
      <div className="row justify-content-center">
        <a href="/admin/registroProveedor" className="text-center col-6">
          <Registrar />
        </a>
      </div>
      <div className="col-11 text-center my-3 container">
        <div className="texto_menu mx-1 my-1 row table">
          <div className="col-2">Documento</div>
          <div className="col-3">Nombres y apellidos</div>
          <div className="col-3">Dirección</div>
          <div className="col-2">Teléfono</div>
          <div className="col-1"></div>
        </div>
        {proveedoresList.map((val, key) => {
          return (
            <>
              <div className="row mx-2 texto_drop my-3" key={key}>
                <div className="col-2 mb-3">{(val as any).nit}</div>
                <div className="col-3 mb-3">
                  {(val as any).nombre} {(val as any).apellido}
                </div>
                <div className="col-3 mb-3">{(val as any).direccion}</div>
                <div className="col-2 mb-3">{(val as any).telefono}</div>
                {/* <Link
                  href={`/admin/registroProveedor/editarProveedor?nit=${
                    (val as any).nit
                  }`}
                  className={`${styles.text_form}`}
                >
                  <button
                    className={`${style.edit} col-1 mx-1 mb-3 text-center align-items-center p-1 `}
                    type="submit"
                  >
                    Editar
                  </button>
                </Link> */}
                <button
                  onClick={() => eliminar((val as any).nit)}
                  className={`${style.edit} col-1 mx-1 mb-3 text-center align-items-center p-1 `}
                  type="submit"
                >
                  Eliminar
                </button>
                <hr />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
