import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import RegisterProducts from './Productos/RegisterProducts';
import DeleteProducts from './Productos/DeleteProducts';
import ConsultarProducts from './Productos/ConsultarProducts';
import AgregarUsuario from './Usuarios/AgregarUsuario';
import UsersUpdate from './RegistroUsuarios/UsersUpdate';
import UsersDelete from './RegistroUsuarios/UserDelete';
import UsersInfo from './RegistroUsuarios/UsersInfo';
import NavbarComponent from './shared/components/navbar/NavbarComponent';
import ActualizarProductos from './Productos/ActualizarProductos';
import FooterComponent from './shared/components/Footer/Footer';
import ActualizarVentas from './Ventas/ActualizarVentas';
import ConsultaVentas from './Ventas/ConsultaVentas';
import RegisterVentas from './Ventas/RegistroVentas';
import Home from './Home/Home';


import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const {isAuthenticated } = useAuth0();

  return (
    <Router>
      <NavbarComponent title="Control de ventas" />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <h1></h1>
        </Route>
       
        <Route path="/registerProducts" exact>
          <RegisterProducts />
        </Route>
        <Route path="/deleteProducts" exact>
          <DeleteProducts />
        </Route>
        <Route path="/consultarProducts" exact>
          <ConsultarProducts />
        </Route>
        <Route path="/actualizarProductos" exact>
          <ActualizarProductos/>
        </Route>
        <Route path="/agregarUsuario" exact>
          <AgregarUsuario/>
        </Route>
        <Route path="/usersUpdate" exact>
          <UsersUpdate />
        </Route>
        <Route path="/usersInfo" exact>
          <UsersInfo />
        </Route>
        <Route path="/ActualizarVentas" exact>
          <ActualizarVentas/>
        </Route>
        <Route path="/ConsultaVentas" exact>
          <ConsultaVentas/>
        </Route>
        <Route path="/usersDelete" exact>
          <UsersDelete />
        </Route>
        <Route path="/RegisterVentas" exact>
          {isAuthenticated ? <RegisterVentas /> : <Home />} 
        </Route>
      </Switch>
      <FooterComponent/>
    </Router>
  );
}

export default App;

