import React, { Fragment, useState, useEffect } from "react";
import "./RegisterProductsStyles.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router';
import apiBaseUrl from "../shared/utils/Api";
import { Link } from 'react-router-dom';


function RegisterProducts(props) {
  const [nproducto, setNproducto] = useState("");
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState(new Date);
  const [referencia, setReferencia] = useState(0);
  const [datos, setDatos] = useState("");

  const { isAuthenticated } = useAuth0();

  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/get-products`);
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
  }, []);


  const enviar = () => {
    let datosForm = {
      'nproducto': nproducto,
      'precio': precio,
      'descripcion': descripcion,
      'fecha': fecha,
      'referencia': referencia
    }

    setDatos(datosForm);
    const addProducts = () => {
      fetch(`${apiBaseUrl}/registrar-product`, {
        method: 'POST',
        body: JSON.stringify(datosForm),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    addProducts();
    alert("Productos agregado correctamente")
  }


  if ((localStorage.getItem("state") == 'Administrador' || localStorage.getItem("state") == 'Vendedor') && isAuthenticated) {
    return (
      <Fragment>
        <div>
          <fieldset>
            <form>
              <section className="container">
                <h1 className="text-center">AGREGAR PRODUCTOS</h1>
                <div className="row">
                  <div className="col">
                    <label>Nombre producto</label>
                    <input
                      class="form-control"
                      placeholder="ingrese el nombre de producto"
                      onChange={(e) => setNproducto(e.target.value)}
                      type="text" />
                  </div>
                  <div className="col">
                    <label>Precio</label>
                    <input
                      onChange={(e) => setPrecio(e.target.value)}
                      type="text"
                      class="form-control"
                      placeholder="ingrese el precio" />
                  </div>
                  <br />
                  <div className="col">
                    <label>Numero de lote</label>
                    <input
                      onChange={(e) => setDescripcion(e.target.value)}
                      type="text"
                      class="form-control"
                      placeholder="ingrese descripción" />
                  </div>
                  <div className="col">
                    <label>Fecha ingreso</label>
                    <input
                      onChange={(e) => setFecha(e.target.value)}
                      type="date"
                      class="form-control"
                      placeholder="ingrese fecha"
                    />
                  </div>

                  <div className="col">
                    <label>Referencia</label>
                    <input
                      onChange={(e) => setReferencia(e.target.value)}
                      type="text"
                      class="form-control"
                      placeholder="ingrese # de ref"
                    />
                  </div>
                </div>
                <br />
                <div class="row" style={{ justifyContent: "space-around", alignItems: "center" }}>
                  <button type="submit" onClick={enviar} class="btn btn-primary" style={{ padding: 10, margin: 5, width: "10%" }} >Enviar</button>

                </div>
              </section>
            </form>
          </fieldset>

        </div>
        <section  >
          <center>
            <h2 style={{ margin: 10 }}>PRODUCTOS</h2>
            <div style={{ width: "80%" }}>
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

            </div>
          </center>

        </section>


      </Fragment >




    );
  }
  else {
    return <Redirect to="/"></Redirect>
  }

}

export default RegisterProducts;
