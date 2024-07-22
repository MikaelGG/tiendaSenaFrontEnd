'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../usuario.module.css";
import event from "@/app/admin/event.module.css";

const backgroundStylesU: React.CSSProperties = {
  backgroundImage: `url('/userp.svg/')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
};

const Eventos = () => {
  const [eventosList, setEventos] = useState([]);

  useEffect(() => {
    axios.get("https://backend-sand-omega.vercel.app/api/event").then((response) => {
      setEventos(response.data);
    });
  }, []);

  

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  

  return (
    <>
      <div className="container-fluid" style={backgroundStylesU}>
        <div className="row">
          <div className="col-12 text-center mt-5 mb-3 ">
            <span className={`${styles.text_p_form} col-10 text-center ms-4`}>
              Eventos
            </span>
          </div>
        </div>
        {eventosList.map((val, key) => {
          return (<>
            <article className={`${event.postcard} ${event.light} ${event.blue} `} key={key}>
                <a className={`${event.postcard__img_link} `}>
                    <img className={`${event.postcard__img}`} src={(val as any).imagen} alt="Image Title" />
                </a>
                <div className={`${event.postcard__text} ${event.tdark}`}>
                    <h1 className={`${event.postcard__title}  ${event.blue} ${event.text_nav} `}>{(val as any).titulo}</h1>
                    <div className={`${event.postcard__bar}`}></div>
                    <div className={`${event.postcard__previewtxt}`}>{(val as any).descripcion}</div>
                    <ul className={`${event.postcard__tagbox}`}>
                        <li className={`${event.tag__item}`}><i className={`fas fa-users ${event.mr_2}`}></i>{(val as any).cupo}</li>
                        <li className={`${event.tag__item}`}><i className={`fas fa-clock ${event.mr_2}`}></i>{(val as any).hora_inicio} - {(val as any).hora_fin}</li>
                        <li className={`${event.tag__item} `}><i className={`fas fa-calendar ${event.mr_2}`}></i>{formatDate((val as any).fecha)}</li>
                    </ul>
                </div>
            </article>
        </>)
          })}
      </div>
    </>
  );
};

export default Eventos;
