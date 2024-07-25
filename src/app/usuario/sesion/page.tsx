'use client'
import { useState, useEffect } from "react";
import styles from "../usuario.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import Swal from "sweetalert2";

const backgroundStyles: React.CSSProperties = {
    backgroundImage: `url('/IMAGE.png/')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
};
export default function PageInicio() {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState(0)
    const router = useRouter()
    const handleSubmit = async () => {
        try {
            const response = await axios.post("https://backtdc.vercel.app/api/signIn", {
                correo: user,
                cedula: password
            });
            const token = response.data.token;
            localStorage.setItem('item', token);
            router.push("/admin/vistaBienvenido");
        } catch (err: any) {
            Swal.fire("Correo o contraseña incorrecta", "", "error")
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('item');
        if (!token) {
            // Si no hay token en el almacenamiento local, redirigir al usuario a la página de inicio de sesión
            router.push("/usuario/sesion");
            return;
        }

        // Verificar si el token está expirado
        const decodedToken: any = jwt.decode(token);
        if (decodedToken && decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
            // Si el token ha expirado, redirigir al usuario a la página de inicio de sesión
            console.log("Token expirado");
            Swal.fire("Su sesion ha expirado, inicie sesion", "", "success");
            localStorage.removeItem('token'); // Eliminar el token expirado del almacenamiento local
        }
    }, []);

    return (
        <>
            <div className="container-fluid" style={backgroundStyles}>
                <div className="row mt-5 ">
                    <div className={`${styles.form} col-3 text-center justify-content-center mt-5`}>
                        <div className={`${styles.text_p_form} col-10 text-center mt-5 ms-4`}>Bienvenidos</div><br></br>
                        <input type="text" className={`${styles.input_form} col-9 mb-3 py-1`} placeholder="Email" onChange={e => setUser(e.target.value)} ></input><br></br>
                        <input type="password" className={`${styles.input_form} col-9 my-3 py-1`} placeholder="Cedula" onChange={e => setPassword(parseInt(e.target.value))}></input><br></br>
                        <button type="submit" className={`${styles.ingresar} py-1 px-4 mt-3 mb-5`} onClick={handleSubmit}><span className={`${styles.text_form}`}>INGRESAR</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}