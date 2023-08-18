// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import db from "../db";
import "./Roles.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rolesPredeterminados = [
  {
    nombre: "SosaTezo",
    rutas: [
      {
        ruta: "Sosa Escuela",
        color: "#EA21F4",
        mensaje:
          "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "Tezotépec",
        color: "#FD8A01",
        mensaje:
          "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "Coahuixco",
        color: "#8EF421",
        mensaje:
          "Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}.",
      },
      {
        ruta: "Calicapan",
        color: "#216BF4",
        mensaje:
          "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "San Isidro",
        color: "#9A9D9A",
        mensaje:
          "Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, El crucero, Atras de la iglesia, Los arcos. Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "Coahuixco",
        color: "#8EF421",
        mensaje:
          "Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}.",
      },
    ],
  },
  {
    nombre: "SosaSani",
    rutas: [
      {
        ruta: "Sosa Escuela",
        color: "#EA21F4",
        mensaje:
          "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "San Isidro",
        color: "#9A9D9A",
        mensaje:
          "Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, El crucero, Atras de la iglesia, Los arcos. Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "Coahuixco",
        color: "#8EF421",
        mensaje:
          "Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}.",
      },
      {
        ruta: "Calicapan",
        color: "#216BF4",
        mensaje:
          "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "Tezotépec",
        color: "#FD8A01",
        mensaje:
          "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "Coahuixco",
        color: "#8EF421",
        mensaje:
          "Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}.",
      },
    ],
  },

  {
    nombre: "CaliSani",
    rutas: [
      

      {
        ruta: "Calicapan",
        color: "#216BF4",
        mensaje:
          "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "San Isidro",
        color: "#9A9D9A",
        mensaje:
          "Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, El crucero, Atras de la iglesia, Los arcos. Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "Coahuixco",
        color: "#8EF421",
        mensaje:
          "Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}.",
      },
      {
        ruta: "Sosa Escuela",
        color: "#EA21F4",
        mensaje:
          "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "Tezotépec",
        color: "#FD8A01",
        mensaje:
          "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "Coahuixco",
        color: "#8EF421",
        mensaje:
          "Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}.",
      },
    ],
  },
  {
    nombre: "CaliTezo",
    rutas: [
      

      {
        ruta: "Calicapan",
        color: "#216BF4",
        mensaje:
          "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "Tezotépec",
        color: "#FD8A01",
        mensaje:
          "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "Coahuixco",
        color: "#8EF421",
        mensaje:
          "Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}.",
      },
      {
        ruta: "Sosa Escuela",
        color: "#EA21F4",
        mensaje:
          "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "San Isidro",
        color: "#9A9D9A",
        mensaje:
          "Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, El crucero, Atras de la iglesia, Los arcos. Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}.",
      },
      {
        ruta: "Coahuixco",
        color: "#8EF421",
        mensaje:
          "Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}.",
      },
      
    ],
  },
];

function Roles() {
  const rutas = [
    {
      ruta: "Sosa Escuela",
      color: "#EA21F4",
      mensaje:
        "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
    },
    {
      ruta: "Calicapan",
      color: "#216BF4",
      mensaje:
        "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
    },
    {
      ruta: "Coahuixco",
      color: "#8EF421",
      mensaje:
        "Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}. Chignautla, {rutaUnidad} y talzintan , Unidad {numeroUnidad}.",
    },
    {
      ruta: "Tezotépec",
      color: "#FD8A01",
      mensaje:
        "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.",
    },
    {
      ruta: "San Isidro",
      color: "#9A9D9A",
      mensaje:
        "Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, El crucero, Atras de la iglesia, Los arcos. Chignautla, 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla 5 de mayo y {rutaUnidad}, Unidad {numeroUnidad}.",
    },
  ];

  const [nombreRol, setNombreRol] = useState("");
  const [rutasSeleccionadas, setRutasSeleccionadas] = useState([]);

  const [roles, setRoles] = useState([]); //Estado para los roles existentes en la db
  useEffect(() => {
    db.roles.toArray().then((roles) => {
      setRoles(roles);
      /* if (roles.length === 0) {
        toast.info("No hay roles disponibles. Agrega uno nuevo.");
      } */
    });
  }, [roles]);

  const agregarRutaSeleccionada = (ruta) => {
    const rutaSeleccionada = rutas.find((r) => r.ruta === ruta);
    setRutasSeleccionadas([...rutasSeleccionadas, rutaSeleccionada]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que el nombre del rol no esté vacío
    if (nombreRol.trim() === "") {
      toast.error("Ingrese un nombre de rol válido.");
      return;
    }

    // Guardar el rol y las rutas seleccionadas en la base de datos
    await db.roles.add({ nombre: nombreRol, rutas: rutasSeleccionadas });
    toast.success(`¡Exito! Rol guardado: "${nombreRol}"`);
    // Limpiar el formulario
    setNombreRol("");
    setRutasSeleccionadas([]);
  };

  const cargarRolesPredeterminados = async (rolPredeterminado) => {
    const { nombre, rutas } = rolPredeterminado;
    
    // Guardar el rol y las rutas completas en la base de datos
    await db.roles.add({ nombre, rutas });
  };

  

  return (
    <div>
      <button onClick={() => cargarRolesPredeterminados(rolesPredeterminados[0])}>
  Cargar Rol: SosaTezo
</button>
<button onClick={() => cargarRolesPredeterminados(rolesPredeterminados[1])}>
  Cargar Rol: SosaSani
</button>
<button onClick={() => cargarRolesPredeterminados(rolesPredeterminados[2])}>
  Cargar Rol: CaliSani
</button>
<button onClick={() => cargarRolesPredeterminados(rolesPredeterminados[3])}>
  Cargar Rol: CaliTezo
</button>

      <form onSubmit={handleSubmit} className="formulario">
        <label>
          <input
            type="text"
            placeholder="Nombre de nuevo ROL"
            value={nombreRol}
            onChange={(event) => setNombreRol(event.target.value)}
          />
        </label>
        <label>
          <select
            id="selectRutas"
            name="selectRutas"
            onChange={(event) => agregarRutaSeleccionada(event.target.value)}
          >
            <option value="">--Seleccionar ruta--</option>
            {rutas.map((ruta, index) => (
              <option key={index} value={ruta.ruta}>
                {ruta.ruta}
              </option>
            ))}
          </select>
        </label>
      </form>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Num.</th>
              <th>Rutas</th>
            </tr>
          </thead>
          <tbody>
            {rutasSeleccionadas.map((ruta, index) => (
              <tr key={index} style={{ backgroundColor: ruta.color }}>
                <td>{index + 1}</td>
                <td>{ruta.ruta}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="container-boton-guardar">
          <button
            type="submit"
            className="boton-guardar"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th colSpan={3}>Roles existentes</th>
            </tr>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Rutas</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((rol) => (
              <tr key={rol.id}>
                <td>{rol.id}</td>
                <td>{rol.nombre}</td>
                <td>
                  {rol.rutas.map((ruta, index) => (
                    <div
                      className="rutas-rol"
                      key={index}
                      style={{ backgroundColor: ruta.color }}
                    >
                      {ruta.ruta}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Roles;
