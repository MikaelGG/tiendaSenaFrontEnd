'use client'
import NavUsuarioItems from "../navItems/page"
import styles from "../usuario.module.css"
const navU = [
    {name: "Inicio", url: "../usuario/inicio", id: 1},
    {name: "Eventos", url: "../usuario/eventos", id: 2},
    {name: "Menú", url: "../usuario/carta", id: 3},
    {name: "Iniciar sesión", url: "../usuario/sesion", id: 4},
];
export default function NavUsuario({name}:{name:string}){
    return(
        <>
        
        <div className={`${styles.nav_usuario} row`}>
                <div className="col-4 py-2 ps-5">
                    <a href="/usuario/inicio"><img src="/iconoSVG.svg" ></img></a>
                    <a href="/usuario/inicio"><img src="/tiendadelcafeCoursive.svg" ></img></a>
                </div>
                <div className={`${styles.nav} ${styles.text_nav} col-7 text-center my-2`}>
                {
                    navU.map((nav) =>
                    <NavUsuarioItems key={crypto.randomUUID()} name={nav.name} url={nav.url} isActive={nav.name == name}/>
                    )
                }
                </div>
        </div>
        
        </>
    )
}