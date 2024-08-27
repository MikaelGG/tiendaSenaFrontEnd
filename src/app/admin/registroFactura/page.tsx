"use client";
import Registrar from "@/app/componentes/botones/registrar";
import { useState, useEffect } from "react";
import axios from "axios";
import Adicionar from "@/app/componentes/botones/adicionar";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function PageFactura() {
  const router = useRouter();
  const [fecha, setFecha] = useState("");
  const [total, setTotal] = useState(0);
  const [consumidor, setConsumidor] = useState(0);
  const [consumidoresList, setConsumidoresList] = useState([]);
  const [productosList, setProductosList] = useState([]);
  const [filas, setFilas] = useState([
    { id_producto: 0, codigo: 0, cantidad: 0, precio: 0, subtotal: 0 },
  ]);

  useEffect(() => {
    // Calcular el total sumando todos los subtotales
    let totalCalculado = 0;
    filas.forEach((fila) => {
      totalCalculado += fila.subtotal;
    });
    // Establecer el total calculado en el estado
    setTotal(totalCalculado);
  }, [filas]);

  useEffect(() => {
    axios.get("https://backendtdc.vercel.app/api/consumer").then((response) => {
      setConsumidoresList(response.data);
    });
    axios.get("https://backendtdc.vercel.app/api/products").then((response) => {
      setProductosList(response.data);
    });
  }, []);

  const agregarFila = () => {
    setFilas([
      ...filas,
      { id_producto: 0, codigo: 0, cantidad: 0, precio: 0, subtotal: 0 },
    ]);
  };

  const handleProductoChange = (index: any, value: any) => {
    const newFilas = [...filas];
    newFilas[index].codigo = value;
    setFilas(newFilas);
  };

  const handleCantidadChange = (index: any, value: any) => {
    const newFilas = [...filas];
    newFilas[index].cantidad = parseInt(value);
    newFilas[index].subtotal = parseInt(value) * newFilas[index].precio;
    setFilas(newFilas);
  };

  const handlePrecioChange = (index: any, value: any) => {
    const newFilas = [...filas];
    newFilas[index].precio = parseInt(value);
    newFilas[index].subtotal = parseInt(value) * newFilas[index].cantidad;
    setFilas(newFilas);
  };

  const add = async () => {
    // Luego, envía el subtotal general junto con los demás datos al backend
    await axios
      .post("https://backendtdc.vercel.app/api/invoice", {
        fecha: fecha,
        total: total,
        consumidor: consumidor,
      })
      .then((res) => {
        addProduct(res.data);
        Swal.fire("Factura registrada con éxito", "", "success").then(() => {
          router.push("/admin/vistaFactura");
        });
      })
      .catch((error) => {
        console.error("Error al enviar la factura:", error);
        Swal.fire("Consulta la consola para mas detalles", "", "error");
      });
  };

  const addProduct = (id_fact: any) => {
    filas.forEach((fila) => {
      axios
        .post("https://backendtdc.vercel.app/api/invoiceProd", {
          id_producto: fila.codigo,
          id_factura: id_fact,
          precio_u: fila.precio,
          cantidad: fila.cantidad,
        })
        .catch((error) => {
          console.error("Error al enviar la factura:", error);
          Swal.fire("Consulta la consola para mas detalles", "", "error");
        });
    });
  };

  return (
    <>
      <div className="row my-4">
        <div className="text_nav text-center">
          <a className="tittle">Registrar factura</a>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="form col-5 py-4">
          <label className="texto_menu col-4">Consumidor</label>
          <select
            onChange={(event) => {
              setConsumidor(parseInt(event.target.value));
            }}
            className="col-7 m-3 input_form"
          >
            {consumidoresList && consumidoresList.length > 0 ? (
              consumidoresList.map((val, key) => (
                <option key={key} value={(val as any).cedula}>
                  {(val as any).nombre} {(val as any).apellido}
                </option>
              ))
            ) : (
              <option value="">Cargando...</option>
            )}
          </select>
          <label className="texto_menu col-4">Fecha de factura</label>
          <input
            onChange={(event) => {
              setFecha(event.target.value);
            }}
            type="date"
            className="col-7 m-3 input_form"
          ></input>
          <div className="row container my-3">
            <div className="texto_menu text-center my-1 mx-3 row table">
              <div className="col-3 my-1">Producto</div>
              <div className="col-2 my-1 me-3">Cantidad</div>
              <div className="col-3 my-1">Precio/U</div>
              <div className="col-3 my-1">Subtotal</div>
            </div>
            {filas.map((fila, index) => (
              <div key={index} className="row my-1">
                <div className="row mx-4">
                  <select
                    id="selectProducto"
                    onChange={(event) =>
                      handleProductoChange(index, event.target.value)
                    }
                    className="col-3 texto_drop"
                  >
                    <option>Selecciona el producto</option>
                    {productosList.map((val, key) => {
                      return (
                        <option key={key} value={(val as any).codigo}>
                          {(val as any).nombre}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    onChange={(event) =>
                      handleCantidadChange(index, event.target.value)
                    }
                    type="number"
                    className="col-3 texto_drop"
                    value={fila.cantidad}
                  ></input>
                  <input
                    onChange={(event) =>
                      handlePrecioChange(index, event.target.value)
                    }
                    type="number"
                    className="col-3 texto_drop"
                    value={fila.precio}
                  ></input>
                  <input
                    type="number"
                    className="col-3 texto_drop"
                    readOnly
                    value={fila.subtotal}
                  ></input>
                </div>
              </div>
            ))}
            <div className="text-center mx-3 my-3" onClick={agregarFila}>
              <Adicionar />
            </div>
          </div>
          <div className="row my-3">
            <label className="texto_menu col-4">Total</label>
            <div className="col-5 d-flex align-items-center">
              <span className="ms-2">$</span>
              <input
                value={total}
                type="number"
                className="form-control"
                readOnly
              />
            </div>
          </div>

          <div onClick={add} className="text-center my-3">
            <Registrar />
          </div>
        </div>
      </div>
    </>
  );
}
