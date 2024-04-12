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
                    <span className={`${styles.text_carta} mt-5 mb-3 `}>Bienvenidos</span><br></br>
                    <span className={`${styles.text_form} px-5`}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit eaque eius quibusdam fuga debitis consequuntur, assumenda nulla aliquam maiores, nemo nostrum voluptatum sint commodi! Molestias fugit error magni assumenda tempora.
                    Reiciendis dolorum, maxime iure architecto ullam eaque unde recusandae ratione deleniti necessitatibus possimus officiis fugiat excepturi accusantium nulla, non perferendis perspiciatis aspernatur et vel. Sequi reprehenderit architecto asperiores eos debitis!
                    Alias quae vel voluptate doloribus suscipit enim tenetur perferendis error commodi? Aut numquam libero, odio inventore repudiandae iure esse commodi, praesentium porro nesciunt nobis itaque quos nostrum error delectus? Enim?</span>
            </div> 
            <div className="row text-center justify-content-center my-5 mx-2 p-0">
                <div className={`${styles.form_car} col-4 mx-3`}>
                    <span className={`${styles.text_carta} `}>Horario</span><br></br>
                    <span className={`${styles.text_form} px-5`}> Lorem ipsum dolor</span>
                </div>
                <div className={`${styles.form_car} col-4 mx-3`}>
                    <span className={`${styles.text_carta} `}>Ubicación</span><br></br>
                    <span className={`${styles.text_form} px-5`}> Lorem ipsum dolor</span>
                </div> 
                <div className={`${styles.form_car} col-4 mx-3`}>
                    <span className={`${styles.text_carta} `}>Contacto</span><br></br>
                    <span className={`${styles.text_form} px-5`}> Lorem ipsum dolor</span>
                </div> 
            </div>   
        </div>
        </>
    )
}