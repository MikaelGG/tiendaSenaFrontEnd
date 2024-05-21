import NavUsuario from "./navUsuario/page";
import Main from "../componentes/Main";
import Footer from "../componentes/footer/page";

export default function LayoutUs({children}:{children: React.ReactNode}){
    return(
    <div className="container-fluid" >
        <NavUsuario/>
        <Main>{children}</Main>
        <Footer/>
    </div>)

}