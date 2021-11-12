import React, { Fragment, useState, useEffect } from "react";
import "./RegistroVentasStyles.css";
import apiBaseUrl from "../shared/utils/Api";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router';

function RegisterVentas(props) {
  const { isAuthenticated } = useAuth0();
  const [ValorVenta, setValorVenta] = useState(0);
  const [FechaVenta, setFechaVenta] = useState(new Date());
  const [Vendedor, setVendedor] = useState("");
  const [datos, setDatos] = useState();

  const enviar = () => {
    let datosForm = {
      'valorVenta': ValorVenta,
      'fechaVenta': FechaVenta,
      'vendedor': Vendedor
    }

    setDatos(datosForm);
    const addVentas = () => {
      fetch(`${apiBaseUrl}/add-ventas`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(datosForm), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    addVentas();
    alert("Venta agregada correctamente")
  }



  //Listar las ventas
  const [ventas, setVentas] = useState([]);
  const getVentas = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/get-ventas`);
      const jsonResponse = await response.json();
      const responseVentas = jsonResponse.data;
      const listVentas = responseVentas.map((venta) =>
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
  }, []);


  if ((localStorage.getItem("state") == 'Administrador' || localStorage.getItem("state") == 'Vendedor') && isAuthenticated) {
    return (
      <Fragment>
        <section className="container">
          <center>
            <h1>AGREGAR VENTAS</h1>
          </center>
          <div className="row">
            <div className="col">
              <form>
                <div class="col">
                  <label><h5>Valor de venta</h5></label>
                  <input onChange={(e) => setValorVenta(e.target.value)} type="int" name="ValorVenta" placeholder="Valor de la venta" class="form-control" />
                </div>
                <div class="col">
                  <label><h5>Fecha</h5></label>
                  <input onChange={(e) => setFechaVenta(e.target.value)} type="date" name="FechaVenta" placeholder="Fecha de la venta" class="form-control" />
                </div>
                <div class="col">
                  <label><h5>Vendedor</h5></label>
                  <input onChange={(e) => setVendedor(e.target.value)} type="text" name="Vendedor" placeholder="Nombre de vendedor" class="form-control" />
                </div>
                <center>
                  <button onClick={enviar} type="submit" class="btn btn-primary">Agregar Venta</button>
                </center>
              </form>

            </div>
            <div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">ValorVenta</th>
                    <th scope="col">Fecha Venta</th>
                    <th scope="col">Responsable</th>
                  </tr>
                </thead>
                <tbody>
                  {ventas}
                </tbody>
              </table>
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

export default RegisterVentas;