import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiBaseUrl from "../shared/utils/Api";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router';


function ListVentas() {
    const { isAuthenticated } = useAuth0();

    const [inputIDVenta, setinputIDVenta] = useState ("");
    const [inputValorVenta, setinputValorVenta] = useState ("");
    const [inputFechaVenta, setnputFechaVenta] = useState ("");
    const [inputVendedor, setinputVendedor] = useState ("");
    const [datos, setDatos] = useState("");
    const [users, setUsers] = useState("");

    const enviarActualizar = () => {
        let datosForm = {
            'IDventa': inputIDVenta,
            'ValorVenta': inputValorVenta,
            'FechaVenta': inputFechaVenta,
            'Vendedor': inputVendedor
        }
        setDatos(datosForm);
        const updateVentas = () => {
            fetch(`${apiBaseUrl}/update-ventas`, {
                method: 'PUT', // or 'PUT'
                body: JSON.stringify(datosForm), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        updateVentas();
        alert("Venta actualizada correctamente.")
    }


    if ((localStorage.getItem("state") == 'Administrador' || localStorage.getItem("state") == 'Vendedor') && isAuthenticated) {
        return (
            <Fragment>
                <section className="container">
                <h1 className="text-center">ACTUALIZAR PRODUCTO</h1>
                    <div className="row">
                        <form>
                            <div className="col">
                                <label>Id venta: </label>
                                <input type="text" className="form-control" name="IdProducto" onChange={(e) => setinputIDVenta(e.target.value)} />
                            </div>
                            <div className="col">
                                <label>Precio venta: </label>
                                <input type="text" className="form-control" name="Precio" onChange={(e) => setinputValorVenta(e.target.value)} />
                            </div>
                            <div className="col">
                                <label>fecha: </label>
                                <input type="date" className="form-control" name="Stock" onChange={(e) => setnputFechaVenta(e.target.value)} />
                            </div>
                            <div className="col">
                                <label>vendedor: </label>
                                <input type="text" className="form-control" name="FechaIngreso" onChange={(e) => setinputVendedor(e.target.value)} />
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


export default ListVentas;
