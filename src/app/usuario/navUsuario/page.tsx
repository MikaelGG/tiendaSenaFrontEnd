'use client'
import styles from "../usuario.module.css"
export default function NavUsuario(){
    return(
        <>
        
        <div className={`${styles.nav_usuario} row`}>
                <div className="col-6 py-2 ps-4">
                    <a href="/usuario/inicio"><img src="/iconoSVG.svg" ></img></a>
                    <a href="/usuario/inicio"><img src="/tiendadelcafeCoursive.svg" ></img></a>
                </div>
                <div className={`${styles.nav} ${styles.text_nav} ${styles.paddingR} col-6 text-center my-2`}>
                    { 
                        <li className={ `${styles.item_nav} ms-4`}>
                            <a className={`${styles.texto} ms-4` }  href="../usuario/inicio"> Inicio</a>
                            <a className={`${styles.texto} ms-4`}  href="../usuario/eventos"> Eventos </a>
                            <a className={`${styles.texto} ms-4`}  href="../usuario/carta"> Carta</a>
                            <a className={`${styles.texto} ms-4`}  href="../usuario/sesion"> Iniciar sesión</a>
                        </li> 
                    }      
                </div>
        </div>
        
        </>
    )
}