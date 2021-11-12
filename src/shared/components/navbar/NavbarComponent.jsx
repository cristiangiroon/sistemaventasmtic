
import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './NavbarComponentStyle.css';
function NavbarComponent(props) {
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    const { user, isAuthenticated } = useAuth0();
    let title = props.title;
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark styledark">
                <div className="container-fluid">
                    <a className="nav-link active">Control de ventas</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <Link to="/" className="nav-link active" aria-current="page" >Página Principal</Link>
                            <li class="nav-item dropdown">
                                <a class="nav-link active" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Usuarios
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><Link to="/UsersInfo" className="dropdown-item" >Ver usuarios</Link></li>
                                    <li><Link to="/agregarUsuario" className="dropdown-item" >Ingresar usuarios</Link></li>
                                    <li><Link to="/usersUpdate" className="dropdown-item" >Actualizar Usuarios</Link></li>
                                    <li><Link to="/usersDelete" className="dropdown-item" >Eliminar usuarios</Link></li>

                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link active" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Productos
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><Link to="/registerProducts" className="dropdown-item" >Ingresar productos</Link></li>
                                    <li><Link to="/actualizarProductos" className="dropdown-item" >Actualizar productos</Link></li>
                                    <li><Link to="/deleteProducts" className="dropdown-item" >Eliminar productos</Link></li>
                                    <li><Link to="/consultarProducts" className="dropdown-item" >Buscar productos</Link></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link active" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Ventas
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><Link to="/RegisterVentas" className="dropdown-item" >Ingresar ventas</Link></li>
                                    <li><Link to="/ActualizarVentas" className="dropdown-item" >Actualizar ventas</Link></li>
                                    <li><Link to="/ConsultaVentas" className="dropdown-item" >Buscar ventas</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    {isAuthenticated ? null : <a className="btn btn-primary btn-log" onClick={() => loginWithRedirect()}>Iniciar Sesión</a>}
                        {isAuthenticated ?<a className="btn btn-primary btn-log" onClick={() => logout({ returnTo: window.location.origin })}>Cerrar Sesión</a> : null}                
                </div>
            </nav>
        </Fragment>
    )
}
export default NavbarComponent;