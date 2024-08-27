"use client";
import Registrar from "@/app/componentes/botones/registrar";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RegistroCarta() {
  const router = useRouter();
  const [imagen, setImagen] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [tipo, setTipo] = useState("");

  const add = () => {
    if (nombre.trim() === "" || nombre.length < 3) {
      Swal.fire("Completa correctamente el nombre.", "", "error");
      return;
    } else if (!imagen) {
      Swal.fire("Completa correctamente la url", "", "error");
      return;
    } else if (descripcion.length > 205) {
      Swal.fire(
        "Completa correctamente la descripción, máximo 205 caráteres",
        "",
        "error"
      );
      return;
    } else if (!precio) {
      Swal.fire("Completa correctamente el precio", "", "error");
      return;
    } else if (!tipo) {
      Swal.fire("Completa correctamente el tipo de producto", "", "error");
      return;
    }
    axios
      .post("https://backendtdc.vercel.app/api/products", {
        imagen: imagen,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        tipo: tipo,
      })
      .then(() => {
        Swal.fire("Producto registrado", "", "success").then(() => {
          router.push("/admin/vistaProductos");
        });
      });
  };
  return (
    <>
      <div className="row my-4">
        <div className="text_nav text-center">
          <a className="tittle">Agregar Producto a la Carta</a>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="form col-5 py-4">
          <label className="texto_menu col-4">Imagen</label>
          <input
            onChange={(event) => {
              setImagen(event.target.value);
            }}
            name="imagen"
            type="text"
            className="col-7 m-2 input_form"
            multiple
          ></input>
          <label className="texto_menu col-4">Nombre</label>
          <input
            onChange={(event) => {
              setNombre(event.target.value);
            }}
            value={nombre}
            type="text"
            className="col-7 m-2 input_form"
          ></input>
          <div className="d-flex align-items-start ">
            <label className="texto_menu col-4 mt-2">Descripción</label>
            <textarea
              onChange={(event) => {
                setDescripcion(event.target.value);
              }}
              className="col-7 m-2 input_form"
              style={{ width: "60%", minHeight: "100px" }}
            />
          </div>
          <label className="texto_menu col-4">Precio</label>
          <input
            onChange={(event) => {
              setPrecio(parseInt(event.target.value));
            }}
            value={precio}
            type="number"
            className="col-7 m-2 input_form"
          ></input>
          <label className="texto_menu col-4">Tipo</label>
          <select
            name="type"
            className="col-7 m-2 input_form"
            onChange={(event) => {
              setTipo(event.target.value);
            }}
          >
            <option>Tipo de producto</option>
            <option value="bebidas">Bebidas</option>
            <option value="alimentos">Alimentos</option>
            <option value="cocteleria">Coctelería</option>
          </select>
          <div className="row text-center my-3">
            <div className="" onClick={add}>
              <Registrar />
            </div>
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
}
