import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './UsersRegisterStyles.css';
import apiBaseUrl from "../shared/utils/Api";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router';

function UsersInfo() {

    const [users, setUsers] = useState([]);
    const { isAuthenticated } = useAuth0();


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


    if ((localStorage.getItem("state") == 'Administrador' || localStorage.getItem("state") == 'Vendedor') && isAuthenticated) {


        return (
            <div className="container-fluid">
                <center>
                    <h1>Lista de usuarios</h1>
                    <table className="table print_form" style={{ margin: 20 }}>
                        <thead>
                            <tr>
                                <th id="id" scope="col">identificación</th>
                                <th scope="col">Nombres</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Telefono Fijo</th>
                                <th scope="col">Email</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users}
                        </tbody>

                    </table>
                </center>

            </div>
        )
    } else {
        return <Redirect to="/"></Redirect>
    }
}

export default UsersInfo;