"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Registrar from "@/app/componentes/botones/registrar";
import Swal from "sweetalert2";

function EditProveedor() {
  const [proveedorList, setProveedor] = useState({
    nit: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
  });
  const [nit, setNit] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const nitParam = searchParams.get("nit");
    setNit(nitParam);
  }, [searchParams]);

  useEffect(() => {
    if (nit) {
      // Obtener datos del proveedor usando fetch
      fetch(`https://backendtdc.vercel.app/api/supplier/${nit}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error al obtener proveedor: ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.length > 0) {
            const product = data[0];
            setProveedor(product);
          }
        })
        .catch((error) => console.error("Error al obtener proveedor:", error));
    }
  }, [nit]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProveedor((prevProveedorList) => ({
      ...prevProveedorList,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nit) return;

    // Enviar los datos actualizados usando fetch
    fetch(`https://backendtdc.vercel.app/api/supplier/${nit}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proveedorList),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al editar proveedor: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        Swal.fire("Proveedor editado correctamente", "", "success").then(() => {
          router.push("/admin/vistaProveedores");
        });
      })
      .catch((error) => {
        console.error("Error al editar el proveedor:", error);
        Swal.fire("Error al editar el proveedor", "", "error");
      });
  };

  return (
    <>
      <div className="row my-4">
        <div className="text_nav text-center">
          <a className="tittle">Editar Proveedor</a>
        </div>
      </div>
      <div className="row justify-content-center">
        <form className="form col-5 py-4" onSubmit={handleSubmit}>
          <label className="texto_menu col-4">NIT/Documento</label>
          <input
            name="nit"
            value={proveedorList.nit || ""}
            onChange={handleChange}
            type="number"
            className="col-7 m-2 input_form"
            readOnly // Mantén este campo como de solo lectura si no deseas que se edite
          />
          <label className="texto_menu col-4">Nombre</label>
          <input
            name="nombre"
            value={proveedorList.nombre || ""}
            onChange={handleChange}
            type="text"
            className="col-7 m-2 input_form"
          />
          <label className="texto_menu col-4">Apellidos</label>
          <input
            name="apellido"
            value={proveedorList.apellido || ""}
            onChange={handleChange}
            type="text"
            className="col-7 m-2 input_form"
          />
          <label className="texto_menu col-4">Dirección</label>
          <input
            name="direccion"
            value={proveedorList.direccion || ""}
            onChange={handleChange}
            type="text"
            className="col-7 m-2 input_form"
          />
          <label className="texto_menu col-4">Teléfono</label>
          <input
            name="telefono"
            value={proveedorList.telefono || ""}
            onChange={handleChange}
            type="number"
            className="col-7 m-2 input_form"
          />
          <div className="row text-center my-3">
            <div className="btn">
              <Registrar />
            </div>
            <br />
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProveedor;
