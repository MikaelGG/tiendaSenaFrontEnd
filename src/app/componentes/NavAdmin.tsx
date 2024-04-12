'use client'
import { FaRightFromBracket } from "react-icons/fa6";
export default function NavAdmin(){
    return(
        <>
        
        <div className="row nav_admin">
                <div className="col-3 py-2 ps-5">
                    <a href="/admin/vistaBienvenido"><img src="/iconoSVG.svg" ></img></a>
                    <a href="admin/vistaBienvenido"><img src="/tiendadelcafeCoursive.svg" ></img></a>
                </div>
                <div className="nav col-7 col-md text-center pt-3 pe-5" >
                    <a href="/usuario/sesion"><FaRightFromBracket style={{color: "#cc3366", fontSize: '40px'}}   /></a>  
                </div>
        </div>
        
        </>
    )
}