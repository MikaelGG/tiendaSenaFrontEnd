'use client'
import { useState } from "react";
import styles from "../usuario.module.css"
import axios from "axios";
import { useRouter } from "next/navigation";
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
    const handleSubmit = () => {
        axios.post("http://localhost:4000/api/signIn", {
            correo: user,
            cedula: password
        }).then(() => {
            router.push("/admin")
        }).catch(err =>{
            console.log(err.response.data.error);
            alert(err.response.data.error)
        })
    }
    return (
        <>
            <div className="container-fluid" style={backgroundStyles}>
                <div className="row mt-5 ">
                    <div className={`${styles.form} col-3 text-center justify-content-center mt-5`}>
                        <div className={`${styles.text_p_form} col-10 text-center mt-5 ms-4`}>Bienvenidos</div><br></br>
                        <input type="text" className={`${styles.input_form} col-9 mb-3 py-1`} placeholder="Email" onChange={e => setUser(e.target.value)} ></input><br></br>
                        <input type="text" className={`${styles.input_form} col-9 my-3 py-1`} placeholder="Cedula" onChange={e => setPassword(parseInt(e.target.value))}></input><br></br>
                        <button type="submit" className={`${styles.ingresar} py-1 px-4 mt-3 mb-5`} onClick={handleSubmit}><span className={`${styles.text_form}`}>INGRESAR</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}