"use client";
import styles from "../usuario.module.css";
import React, { useState } from "react";

export default function NavUsuario() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <div className={`${styles.nav_usuario} row`}>
        <div className="col-6 py-2 ps-4">
          <a href="/usuario/inicio">
            <img src="/iconoSVG.svg"></img>
          </a>
          <a className={`${styles.txtlogo}`} href="/usuario/inicio">
            <img src="/tiendadelcafeCoursive.svg"></img>
          </a>
        </div>
        <div
          className={`${styles.nav} ${styles.text_nav} ${styles.paddingR} col-6 text-center my-2`}
        >
          {
            <li
              className={`${styles.item_nav} ${styles.links} ${
                clicked ? styles.active : ""
              }   ms-4`}
            >
              <a className={`${styles.texto} ms-4`} href="../usuario/inicio">
                {" "}
                Inicio
              </a>
              <a className={`${styles.texto} ms-4`} href="../usuario/eventos">
                {" "}
                Eventos{" "}
              </a>
              <a className={`${styles.texto} ms-4`} href="../usuario/carta">
                {" "}
                Carta
              </a>
              <a
                className={`${styles.texto} ${styles.iniciars} ms-4`}
                href="../usuario/sesion"
              >
                {" "}
                Iniciar sesión
              </a>
            </li>
          }
          <div
            className={`${styles.nav_icon_8} ${styles.burguer} ${
              clicked ? styles.open : ""
            } icon`}
            onClick={handleClick}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div
        className={`${styles.initial} ${clicked ? styles.active : 0}  ${
          clicked ? styles.bgdiv : 0
        }`}
      ></div>
    </>
  );
}
