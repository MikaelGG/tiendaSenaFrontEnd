'use client'
import styles from "@/app/usuario/usuario.module.css"
import { usePathname } from "next/navigation";

function Footer() {
  const pathName = usePathname();

  function getComponentByRoute() {
    if (pathName.startsWith('/usuario')) {
      return (
        <>
          <div className={`${styles.footer_height} container-fluid foot d-flex flex-column justify-content-between`}>
            <div className={`${styles.footer_height} ${styles.padding_left} row`}>
              <div className={`${styles.footer_height} col-5`}>
                <img src="/lemaSaboreaElAprendizaje.svg" alt="" className="col-5 my-1"></img>
              </div>
              <div className={`${styles.footer_height} col-6 sena_footer mx-5 d-flex align-items-center`}>
                <span className="text_footer col-10 my-5 ps-5 fs-6">Centro de la innovación, la agroindustria y la aviación </span>
                <img src="/Vector.svg" alt="" className="col-1"></img>
              </div>
            </div>
          </div>
        </>
      );
    } else if (pathName.startsWith('/admin')) {
      return (
        <>
          <div className={`${styles.footer_height} container-fluid foot d-flex flex-column justify-between`}>
            <div className={`${styles.footer_height} ${styles.padding_left} row`}>
              <div className={`${styles.footer_height} col-5`}>
                <img src="/lemaSaboreaElAprendizaje.svg" alt="" className="col-6"></img>
              </div>
              <div className={`${styles.footer_height} ${styles.padding_left} col-6 sena_footer d-flex align-items-center align-items-end justify-content-end`}>
                <span className="text_footer col-12 my-5 ps-5 fs-6">Centro de la innovación, la agroindustria y la aviación </span>
                <img src="/Vector.svg" alt="" className="col-1"></img>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      {getComponentByRoute()}
    </>
  )
}

export default Footer;