import React, { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import apiBaseUrl from "../shared/utils/Api";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router';


export function ProductsDelete() {

    const [inputIdProducto, setInputIdProducto] = useState("");
    const [datos, setDatos] = useState("");
    const [products, setProducts] = useState("");
    const { isAuthenticated } = useAuth0();

    const getProducts = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/get-products`);
            const jsonResponse = await response.json();
            const responseUsers = jsonResponse.data;
            const listUsers = responseUsers.map((product) =>
                <tr>
                    <th scope="row">{product.Id}</th>
                    <td>{product.Nproducto}</td>
                    <td>{product.Precio}</td>
                    <td>{product.Descripcion}</td>
                    <td>{product.Fecha}</td>
                    <td>{product.Referencia}</td>
                </tr>
            );
            setProducts(listUsers)
        }
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getProducts();
    }, []);

    const enviarBorrar = () => {
        let datosForm = {
            'Id': inputIdProducto,

        }
        setDatos(datosForm);
        const deleteProducts = () => {
            fetch(`${apiBaseUrl}/borrar-products`, {
                method: 'DELETE', // or 'PUT'
                body: JSON.stringify(datosForm), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        deleteProducts();
        alert("Producto eliminado correctamente")
    }


    if ((localStorage.getItem("state") == 'Administrador' || localStorage.getItem("state") == 'Vendedor') && isAuthenticated) {

        return (
            <Fragment>
                <center>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <form className="style_form_2_A">
                                    <h1 className="title_form">
                                        Eliminar Usuario
                                    </h1>
                                    <div className="">
                                        <input type="text" name="identificacionUser" className="form-control" placeholder="Ingrese el número de identificación" onChange={(e) => setInputIdProducto(e.target.value)} />
                                    </div>
                                    <br />
                                    <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-lx-3 col-xxl-3">
                                        <button id="btnEnviarFormulario" className="btn btn-primary" type="submit" onClick={enviarBorrar}>ENVIAR</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </center>
            </Fragment>

        )
    } else {
        return <Redirect to="/"></Redirect>
    }
}

export default ProductsDelete;