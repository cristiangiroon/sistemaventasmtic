import React, { Fragment, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router';
import apiBaseUrl from "../shared/utils/Api";


function ListProducts(props) {
    const { isAuthenticated } = useAuth0();
    const [inputIdProducto, setInputIdProducto] = useState("");
    const [inputPrecio, setInputPrecio] = useState("");
    const [inputDescripcion, setInputDescripcion] = useState("");
    const [inputFecha, setInputFecha] = useState("");
    const [inputReferencia, setInputReferencia] = useState("");

    const [datos, setDatos] = useState("");
    const [users, setUsers] = useState("");


    const enviarActualizar = () => {
        let datosForm = {
            'Id': inputIdProducto,
            'Precio': inputPrecio,
            'Descripcion': inputDescripcion,
            'Fecha': inputFecha,
            'Referencia': inputReferencia
        }
        
        setDatos(datosForm);
        const updateUsers = () => {
            fetch(`${apiBaseUrl}/act-products`, {
                method: 'PUT', 
                body: JSON.stringify(datosForm),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        updateUsers();
        alert("Producto actualizado correctamente")
    }

    if ((localStorage.getItem("state") == 'Administrador' || localStorage.getItem("state") == 'Vendedor') && isAuthenticated) {
        return (
            <Fragment>
                <section className="container">
                <h1 className="text-center">ACTUALIZAR PRODUCTO</h1>
                    <div className="row">
                        <form>
                            <div className="col">
                                <label>Id del producto: </label>
                                <input type="text" className="form-control" name="IdProducto" onChange={(e) => setInputIdProducto(e.target.value)} />
                            </div>
                            <div className="col">
                                <label>Precio del producto: </label>
                                <input type="text" className="form-control" name="Precio" onChange={(e) => setInputPrecio(e.target.value)} />
                            </div>
                            <div className="col">
                                <label>Descripción: </label>
                                <input type="text" className="form-control" name="Stock" onChange={(e) => setInputDescripcion(e.target.value)} />
                            </div>
                            <div className="col">
                                <label>Fecha de ingreso: </label>
                                <input type="date" className="form-control" name="FechaIngreso" onChange={(e) => setInputFecha(e.target.value)} />
                            </div>
                            <div className="col">
                                <label>Referencia: </label>
                                <input type="text" className="form-control" name="NumeroRollos" onChange={(e) => setInputReferencia(e.target.value)} />
                            </div>
                            <center>
                            <div>
                                <button style={{width:"10%", margin:10}}  className="btn btn-primary" type="submit" onClick={enviarActualizar}>ENVIAR</button>
                            </div>
                            </center>
                        </form>
                    </div>
                </section>
            </Fragment>
        );
    } else {
        return <Redirect to="/"></Redirect>
    }
}

export default ListProducts;
