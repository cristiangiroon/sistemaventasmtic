import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiBaseUrl from "../shared/utils/Api";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router';

function ConsultaVentas() {
    const { isAuthenticated } = useAuth0();
    const [datos, setDatos] = useState("");
    const [users, setUsers] = useState("");
    const [valueOption, setValueOption] = useState("");

    const [ventas, setVentas] = useState([]);
    const getVentas = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/search-ventas?id=${valueOption}`);
            const jsonRes = await res.json();
            const resVentas = jsonRes.data;
            const listVentas = resVentas.map((venta) =>
                <tr>
                    <th scope="row">{venta.IDVenta}</th>
                    <td>{venta.ValorVenta}</td>
                    <td>{venta.FechaVenta}</td>
                    <td>{venta.Vendedor}</td>
                </tr>
            );
            setVentas(listVentas)
        }
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getVentas();
    }, [valueOption]);

    if ((localStorage.getItem("state") == 'Administrador' || localStorage.getItem("state") == 'Vendedor') && isAuthenticated) {
        return (
            <Fragment>
                <section className="container">
                    <div className="row">
                        <div className="col">
                            <form>
                                <center>
                                    <h1> Consulta de ventas </h1>
                                    <br />
                                </center>
                                <div className="col" style={{ margin: 20 }}>
                                    <center>
                                        <label style={{ margin: 30 }}>Ingrese ID de producto: </label>
                                        <input placeholder="ingrese un ID" type="text" onChange={(e) => setValueOption(e.target.value)} />
                                    </center>
                                </div>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID Venta</th>
                                            <th scope="col">Valor venta</th>
                                            <th scope="col">Fecha de venta</th>
                                            <th scope="col">Vendedor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ventas}
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </section>
                <hr />
            </Fragment>
        );
    } else {
        return <Redirect to="/"></Redirect>
    }
}


export default ConsultaVentas;
