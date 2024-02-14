'use client'
if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap.bundle.min.js');
}
import { FaRegUserCircle } from "react-icons/fa";
export default function Drop(){
  return (
    <>
    <div>
    
        <div className="text-center mt-5 pb-5 border-bottom">
            <FaRegUserCircle  style={{color: "#663300", fontSize: '80px'}}/>
        </div>
        <a className="btn " href="/admin/" >
          <span className='texto_menu'>Inicio</span>
        </a>
      </div>
      <div className="dropdown border-top">
        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span className='texto_menu'>Usuarios</span>
        </button>
          <ul className="dropdown-menu ">
            <li><a href="/admin/registroUsuario" className='dropdown-item texto_drop'>Registrar Usuario</a></li>
            <li><a href="/admin/usuarios" className='dropdown-item texto_drop'>Ver Usuarios</a></li>
          </ul>
      </div>
      <div className="dropdown border-top">
        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span className='texto_menu'>Inventario</span>
        </button>
          <ul className="dropdown-menu ">
            <li><a href="/admin/inventarioUtensilios" className='dropdown-item texto_drop'>Inventario de Utensilios</a></li>
            <li><a href="/admin/inventarioInsumos" className='dropdown-item texto_drop'>Inventario de Insumos</a></li>
          </ul>
      </div>

      <div className="dropdown border-top">
        <a className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span className='texto_menu'>Facturación</span>
        </a>
          <div className="dropdown-menu">
            <a href="/admin/factura" className='dropdown-item texto_drop'>Registrar Facturas</a>
            <a href="/admin/vistaFactura" className='dropdown-item texto_drop'>Facturas</a>
          </div>
      </div>
      <div className="dropdown border-top">
        <a className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span className='texto_menu'>Proveedores</span>
        </a>
          <div className="dropdown-menu">
            <a href="/admin/registroProveedor" className='dropdown-item texto_drop'>Registro de Proveedores</a>
            <a href="/admin/proveedores" className='dropdown-item texto_drop'>Proveedores</a>
          </div>
      </div>
      <div className="dropdown border-top">
        <a className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span className='texto_menu'>Balances</span>
        </a>
          <div className="dropdown-menu">
            <a href="/admin/balanceDiario" className='dropdown-item texto_drop'>Balance Diario</a>
            <a href="/admin/balanceMensual" className='dropdown-item texto_drop'>Balance Mensual</a>
          </div>
      </div>
      <div className="dropdown border-top">
        <a className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span className='texto_menu'>Consumidores</span>
        </a>
          <div className="dropdown-menu">
            <a href="/admin/registroConsumidor" className='dropdown-item texto_drop'>Registrar Consumidores</a>
            <a href="/admin/consumidores" className='dropdown-item texto_drop'>Consumidores</a>
          </div>
      </div>
      <div className="dropdown border-top">
        <a className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span className='texto_menu'>Carta</span>
        </a>
          <div className="dropdown-menu">
            <a href="/admin/registroCarta" className='dropdown-item texto_drop'>Registrar productos</a>
            <a href="/admin/carta" className='dropdown-item texto_drop'>Carta</a>
          </div>
      </div>
      <div className="dropdown border-top">
        <a className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span className='texto_menu'>Eventos</span>
        </a>
          <div className="dropdown-menu">
            <a href="/admin/evento" className='dropdown-item texto_drop'>Registrar Evento</a>
            <a href="/admin/vistaEvento" className='dropdown-item texto_drop'>Eventos Programados</a>
          </div>
      </div>
      
    
    </>
  );
};


