'use client'
import { FaRightFromBracket } from "react-icons/fa6";
export default function NavAdmin(){
    return(
        <>
        
        <div className="row nav_admin">
                <div className="col-1 p-1"><img src="/Layer1000.svg" alt="logo"></img></div>
                <div className="text_nav col-4">La Tienda del Café</div>
                <div className="nav col-7 text-center pt-2 pe-4">
                    <FaRightFromBracket style={{color: "#cc3366", fontSize: '30px'}}  />
                    
                </div>
        </div>
        
        </>
    )
}