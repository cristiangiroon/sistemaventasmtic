import React, { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import apiBaseUrl from "../shared/utils/Api";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router';

export function UsersDelete() {
    const { isAuthenticated } = useAuth0();
    const [inputidentificacionUser, setInputidentificacionUser] = useState('');
    const [datos, setDatos] = useState("");
    const [users, setUsers] = useState("");

    const getUsers = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/get-usuarios`);
            const jsonResponse = await response.json();
            const responseUsers = jsonResponse.data;
            const listUsers = responseUsers.map((user) =>
                <tr>
                    <th scope="row">{user.identificacionUser}</th>
                    <td>{user.nameUser}</td>
                    <td>{user.lastnameUser}</td>
                    <td>{user.addressUser}</td>
                    <td>{user.telUser}</td>
                    <td>{user.Email}</td>
                    <td>{user.date}</td>
                    <td>{user.Estado}</td>
                    <td>{user.Rol}</td>
                </tr>
            );
            setUsers(listUsers)
        }
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getUsers();
    }, []);

    const enviarBorrar = () => {
        let datosForm = {
            'identificacionUser': inputidentificacionUser

        }
        setDatos(datosForm);
        const deleteUsers = () => {
            fetch(`${apiBaseUrl}/delete-usuario`, {
                method: 'DELETE', // or 'PUT'
                body: JSON.stringify(datosForm), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        deleteUsers();
        alert("Usuario eliminado correctamente")
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
                                        <input type="text" name="identificacionUser" className="form-control" placeholder="Ingrese el número de identificación" onChange={(e) => setInputidentificacionUser(e.target.value)} />
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

export default UsersDelete;