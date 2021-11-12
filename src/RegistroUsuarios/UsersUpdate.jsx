import React, { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import apiBaseUrl from "../shared/utils/Api";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router';


export function UsersUpdate() {
    const { isAuthenticated } = useAuth0();
    const [inputidentificacionUser, setInputidentificacionUser] = useState('');
    const [inputEstado, setInputEstado] = useState('');
    const [inputRol, setInputRol] = useState('');
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
    const enviarActualizar = () => {
        let datosForm = {
            'identificacionUser': inputidentificacionUser,
            'Estado': inputEstado,
            'Rol': inputRol
        }
        setDatos(datosForm);
        const updateUsers = () => {
            fetch(`${apiBaseUrl}/put-usuario`, {
                method: 'PUT', // or 'PUT'
                body: JSON.stringify(datosForm), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        updateUsers();
        alert("Usuario actualizado correctamente")
    }

    if ((localStorage.getItem("state") == 'Administrador' || localStorage.getItem("state") == 'Vendedor') && isAuthenticated) {

        return (
            <Fragment>
                <center>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <form className="style_form_2">
                                    <h1 className="title_form">
                                        Actualizar Usuario
                                    </h1>
                                    <div className="">
                                        <input type="text" name="identificacionUser" className="form-control" placeholder="Ingrese el número de identificación" onChange={(e) => setInputidentificacionUser(e.target.value)} />
                                    </div>
                                    <div className="style_form_2_1">
                                        <label htmlFor="Estado" className="form-label">
                                            Elija el nuevo Estado
                                        </label>
                                        <select name="Estado" className="form-select" aria-label="Default select example" onChange={(e) => setInputEstado(e.target.value)} >
                                            <option selected>Elija una opción</option>
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="No Autorizado">No Autorizado</option>
                                            <option value="Autorizado">Autorizado</option>
                                        </select>
                                    </div>
                                    <div className="style_form_2_1">
                                        <label htmlFor="Rol" className="form-label">
                                            Elija el nuevo Rol
                                        </label>
                                        <select name="Rol" aria-label="Default select example" className="form-select" onChange={(e) => setInputRol(e.target.value)}>
                                            <option selected>Elija una opción</option>
                                            <option value="Administrador">Administrador</option>
                                            <option value="Vendedor">Vendedor</option>
                                        </select>
                                    </div>
                                    <br />
                                    <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-lx-3 col-xxl-3">
                                        <button id="btnEnviarFormulario" className="btn btn-primary" type="submit" onClick={enviarActualizar}>ENVIAR</button>
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

export default UsersUpdate;