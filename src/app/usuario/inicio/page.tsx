'use client'
import styles from "../usuario.module.css"
import AutomaticGalleryPage from "@/app/componentes/Galeria"
const backgroundStylesU: React.CSSProperties = {
    backgroundImage: `url('/userp.svg/')`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
};
export default function Inicio(){
    return(
        <>
        <div className="container-fluid " style={backgroundStylesU}>
            <div className="row text-center mt-5 mb-3">
                <AutomaticGalleryPage/>
            </div>
            <div className= "row m-3 p-0 text-center ">
                    <span className={`${styles.text_carta} mt-5 mb-3 fs-1`}><b>Bienvenidos a La Tienda del Café</b></span><br></br>
                    <span className={`${styles.text_form} px-5`}> <b>Explora el sabor del aprendizaje con cada sorbo.</b><br />
                        En <b>La tienda del Café </b>, cada grano es una historia, cada taza una nueva oportunidad. Sumérgete en la experiencia de café más auténtica,<br />
                        cultivada por las manos talentosas de nuestros aprendices.
                        <br />
                        <br />
                        <b>Aprende con nosotros</b> - Descubre el viaje del café, desde la semilla hasta la taza.
                        <br />
                        <b>Saborea la calidad</b> - Disfruta de selecciones exclusivas, tostadas a la perfección.
                        <br />
                        <b>Únete a la comunidad</b> - Conecta con amantes del café y expertos por igual.
                        <br />
                        <br />
                        <b>Inicia tu viaje cafetero aquí y ahora.</b> ¡Tu próxima taza de inspiración te espera!</span>
            </div> 
            <div className="row text-center justify-content-center my-5 mx-2 p-0">
                <div className={`${styles.form_car} col-4 mx-3`}>
                    <span className={`${styles.text_carta} `}><b>Horario</b></span><br></br>
                    <span className={`${styles.text_form} px-5`}> Lunes a viernes</span><br />
                    <span className={`${styles.text_form} px-5`}> 8:00 am - 5:00 pm</span>
                </div>
                <div className={`${styles.form_car} col-4 mx-3`}>
                    <span className={`${styles.text_carta} `}><b>Ubicación</b></span><br></br>
                    <span className={`${styles.text_form} px-5`}> SENA sede comercio</span><br />
                    <span className={`${styles.text_form} px-5`}> Centro histórico, Cra. 48 #49-62 </span><br />
                    <span className={`${styles.text_form} px-5`}> Rionegro, Antioquia </span>
                </div> 
                <div className={`${styles.form_car} col-4 mx-3`}>
                    <span className={`${styles.text_carta} `}><b>Contacto</b></span><br></br>
                    <span className={`${styles.text_form} px-5`}> Silvio de Jesús Baena</span><br />
                    <span className={`${styles.text_form} px-5`}> sjbaena@sena.edu.co</span>
                </div> 
            </div>   
        </div>
        </>
    )
}