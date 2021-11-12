import React, { Fragment, useState, useEffect } from 'react';
import './AgregarUsuarioStyles.css';
import apiBaseUrl from "../shared/utils/Api";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router';

function UsersForm() {
    const { isAuthenticated } = useAuth0();
    const [inputidentificacionUser, setInputidentificacionUser] = useState('');
    const [inputnameUser, setInputnameUser] = useState('');
    const [inputlastnameUser, setInputlastnameUser] = useState('');
    const [inputaddressUser, setInputaddressUser] = useState('');
    const [inputtelUser, setInputtelUser] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputdate, setInputdate] = useState(new Date);
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

    const enviar = () => {
        let datosForm = {
            'identificacionUser': inputidentificacionUser,
            "nameUser": inputnameUser,
            "lastnameUser": inputlastnameUser,
            "addressUser": inputaddressUser,
            "telUser": inputtelUser,
            "Email": inputEmail,
            "date": inputdate,
            "Estado": inputEstado,
            "Rol": inputRol,
        }
        setDatos(datosForm);
        const addUsers = () => {
            fetch(`${apiBaseUrl}/post-usuario`, {
                method: 'POST',
                body: JSON.stringify(datosForm),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        addUsers();
        alert("Usuario agregado correctamente")
    }

    if ((localStorage.getItem("state") == 'Administrador' || localStorage.getItem("state") == 'Vendedor') && isAuthenticated) {

        return (
            <Fragment>
                <section className="container">
                    <form>
                        <h1 className="text-center">AGREGAR USUARIO</h1>

                        <div class="row">
                            <div class="col">
                                <label><h5>Numero de documento</h5></label>
                                <input required name="identificacionUser" type="text" class="form-control" placeholder="ingrese numero de identificación" onChange={(e) => setInputidentificacionUser(e.target.value)} />
                            </div>
                            <div class="col">
                                <label><h5>Nombres</h5></label>
                                <input required name="nameUser" type="text" class="form-control" placeholder="ingrese los nombres" onChange={(e) => setInputnameUser(e.target.value)} />
                            </div>
                            <div class="col">
                                <label><h5>Apellidos</h5></label>
                                <input required name="lastnameUser" type="text" class="form-control" placeholder="ingrese los apellidos" onChange={(e) => setInputlastnameUser(e.target.value)} />
                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <label><h5>Dirección</h5></label>
                                <input required name="addressUser" type="text" class="form-control" placeholder="ingrese dirección" onChange={(e) => setInputaddressUser(e.target.value)} />
                            </div>
                            <div class="col">
                                <label><h5>Telefono</h5></label>
                                <input required name="telUser" type="text" class="form-control" placeholder="ingrese número de telefono" onChange={(e) => setInputtelUser(e.target.value)} />
                            </div>

                            <div class="col">
                                <label><h5>Correo electrónico</h5></label>
                                <input required name="Email" type="text" class="form-control" placeholder="ingrese email" onChange={(e) => setInputEmail(e.target.value)} />
                            </div>

                        </div>

                        <div class="row">
                            <div class="col">
                                <label><h5>Fecha</h5></label>
                                <input required name="date" type="date" class="form-control" placeholder="seleccione fecha" onChange={(e) => setInputdate(e.target.value)} />
                            </div>
                            <div class="col">
                                <label htmlFor="Estado" className="form-label">
                                    Estado
                                </label>
                                <select name="Estado" className="form-select" aria-label="Default select example" onChange={(e) => setInputEstado(e.target.value)} >
                                    <option selected>Elija una opción</option>
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="No Autorizado">No Autorizado</option>
                                    <option value="Autorizado">Autorizado</option>
                                </select>
                            </div>
                            <div class="col">
                                <label htmlFor="Rol" className="form-label">
                                    Rol
                                </label>
                                <select name="Rol" aria-label="Default select example" className="form-select" onChange={(e) => setInputRol(e.target.value)}>
                                    <option selected>Elija una opción</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Vendedor">Vendedor</option>
                                </select>
                            </div>


                        </div>
                        <br />
                        <div class="row">
                            <div class="col text-center">
                                <button type="submit" onClick={enviar} class="btn btn-primary" style={{ padding: 15, margin: 10, width: "20%" }} >Enviar</button></div>
                        </div>

                    </form>
                </section>
            </Fragment>
        );
    } else {
        return <Redirect to="/"></Redirect>
    }
}
export default UsersForm;