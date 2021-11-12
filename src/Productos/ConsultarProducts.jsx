import React, { Fragment, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router';
import apiBaseUrl from "../shared/utils/Api";

function ConsultarProducts(props) {
    const { isAuthenticated } = useAuth0();
    const [valueOpcion, setValueOpcion] = useState("");
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/buscar-products?id=${valueOpcion}`);
            const jsonResponse = await response.json();
            const responseProducts = jsonResponse.data;
            const listProducts = responseProducts.map((product) =>
                <tr>
                    <th scope="row">{product.Id}</th>
                    <td>{product.Nproducto}</td>
                    <td>{product.Precio}</td>
                    <td>{product.Descripcion}</td>
                    <td>{product.Fecha}</td>
                    <td>{product.Referencia}</td>
                </tr>
            );
            setProducts(listProducts)
        }
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getProducts();
    }, [valueOpcion]);


    if ((localStorage.getItem("state") == 'Administrador' || localStorage.getItem("state") == 'Vendedor') && isAuthenticated) {
        return (
            <Fragment>
                <section className="container">
                    <center>
                        <h1 style={{ margin: 10 }}>BUSCAR PRODUCTOS</h1>
                    </center>
                    <div className="row">
                        <div>
                            <form>
                                <div className="col" style={{ margin: 20 }}>
                                    <center>
                                        <label style={{ margin: 30 }}>Ingrese ID de producto: </label>
                                        <input placeholder="ingrese un ID" type="text" onChange={(e) => setValueOpcion(e.target.value)} />
                                    </center>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Nombre producto</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Descripcion</th>
                                            <th scope="col">Fecha </th>
                                            <th scope="col">Referencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products}
                                    </tbody>
                                </table>
                            </form>

                        </div>
                    </div>
                </section>
            </Fragment>
        );
    } else {
        return <Redirect to="/"></Redirect>
    }
}

export default ConsultarProducts;
