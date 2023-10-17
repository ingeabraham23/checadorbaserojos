// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import db from "../db";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SeleccionarRol.css";

function SeleccionarRol() {
  const [roles, setRoles] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  useEffect(() => {
    // Verificar si ya existe un rol en la tabla 'rol'
    db.rol.get(1).then((rolExistente) => {
      if (rolExistente) {
        toast.info(`Rol Seleccionado Actualmente: "${rolExistente.nombre}"`);
        setRolSeleccionado(rolExistente); // Establecer el rol seleccionado
      }
    });
    // Obtener los roles de la base de datos
    db.roles.toArray().then((roles) => {
      setRoles(roles);
      if (roles.length === 0) {
        toast.error("No hay roles disponibles.");
      }
    });


  }, []);

  const handleChange = (event) => {
    const idRolSeleccionado = parseInt(event.target.value);
    // Buscar el rol seleccionado por su id y asignarlo al estado
    const rol = roles.find((r) => r.id === idRolSeleccionado);
    setRolSeleccionado(rol);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rolSeleccionado) {
      // Borrar todos los registros de la tabla 'rol'
      db.rol
        .clear()
        .then(() => {
          // Guardar el rol seleccionado en la base de datos
          db.rol
            .add(rolSeleccionado)
            .then(() => {
              toast.success(
                `Rol: ${rolSeleccionado.nombre}. Guardado Exitosamente.`
              );
            
            })
            .catch((error) => {
              toast.error(
                `Error al guardar el rol seleccionado en la base de datos. ${error}`
              );
            });
        })
        .catch((error) => {
          toast.error(
            `Error al borrar los registros de la tabla rol. ${error}`
          );
        });
        
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="formulario">
        <label>
          Selecciona un rol:
          <select
            value={rolSeleccionado ? rolSeleccionado.id : ""}
            onChange={handleChange}
          >
            <option value="">-- Seleccione un rol --</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.nombre}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Guardar rol seleccionado</button>
      </form>
    </div>
  );
}

export default SeleccionarRol;
