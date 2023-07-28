// eslint-disable-next-line no-unused-vars
import React from "react";
import db from "../db";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Datos.css";

import {
  faBus,
  faCircleXmark,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Datos() {
  // Función para limpiar la tabla de unidades
  const handleClearUnidades = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas limpiar la tabla de unidades? Esta acción no se puede deshacer."
    );
    if (confirmed) {
      try {
        await db.unidades.clear();
        toast("¡Tabla de unidades limpiada correctamente!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } catch (error) {
        console.error("Error al limpiar la tabla de unidades:", error);
        toast("¡Error al limpiar la tabla de unidades!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          type: "error",
        });
      }
    }
  };

  // Función para limpiar la tabla de roles
  const handleClearRoles = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas limpiar la tabla de roles? Esta acción no se puede deshacer."
    );
    if (confirmed) {
      try {
        await db.roles.clear();
        toast("¡Tabla de roles limpiada correctamente!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } catch (error) {
        console.error("Error al limpiar la tabla de roles:", error);
        toast("¡Error al limpiar la tabla de roles!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          type: "error",
        });
      }
    }
  };

  // Función para limpiar la tabla de rol
  const handleClearRol = async () => {
    const confirmed = window.confirm(
        "¿Estás seguro de que deseas eliminar el rol seleccionado? Esta acción no se puede deshacer."
      );
      if (confirmed) {
        try {
          await db.rol.clear();
          toast("¡Tabla de rol limpiada correctamente!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } catch (error) {
          console.error("Error al limpiar la tabla de rol:", error);
          toast("¡Error al limpiar la tabla de rol!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            type: "error",
          });
        }
      }
  };

  // Función para limpiar la tabla de reporte
  const handleClearReporte = async () => {
    const confirmed = window.confirm(
        "¿Estás seguro de que deseas limpiar la tabla de reporte? Esta acción no se puede deshacer."
      );
      if (confirmed) {
        try {
          await db.reporte.clear();
          toast("¡Tabla de reporte limpiada correctamente!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } catch (error) {
          console.error("Error al limpiar la tabla de reporte:", error);
          toast("¡Error al limpiar la tabla de reporte!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            type: "error",
          });
        }
      }
  };

  return (
    <div>
      <div>
        <h2>¡Advertencia: Antes de borrar datos asegurate de que ya no los necesitas. Esta acción no se puede deshacer 🤯!</h2>
        <div className="contenedor-botones">
        <button className="boton-limpiar" onClick={handleClearUnidades}>
          Limpiar Unidades
          <FontAwesomeIcon icon={faCircleXmark} />
          <FontAwesomeIcon icon={faBus} />
        </button>
        <button className="boton-limpiar" onClick={handleClearRoles}>
          Limpiar Tabla de Roles
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <button className="boton-limpiar" onClick={handleClearRol}>
          Limpiar Rol Seleccionado
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <button className="boton-limpiar" onClick={handleClearReporte}>
          Limpiar Reporte
          <FontAwesomeIcon icon={faCircleXmark} />
          <FontAwesomeIcon icon={faClipboardList} />
        </button>
        </div>
      </div>
    </div>
  );
}

export default Datos;
