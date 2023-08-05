// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import db from "../db";
import ListaUnidades from "./ListaUnidades";
import "./Unidades.css";

import {
  faCross,
  faMountainSun,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Unidades() {
  const [showForm, setShowForm] = useState(false);
  const [numeroUnidad, setNumeroUnidad] = useState("");
  const [selectedRutas, setSelectedRutas] = useState([]);
  const [selectedRuta, setSelectedRuta] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [rutaChange, setRutaChange] = useState(false);

  const [isAlarmTepepanActive, setisAlarmTepepanActive] = useState(false);
  const [isAlarmTacopanActive, setisAlarmTacopanActive] = useState(false);
  const [isAlarmHuapaltepecActive, setisAlarmHuapaltepecActive] =
    useState(false);

  const numeroInputRef = useRef(null);

  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  useEffect(() => {
    const checkAlarmTepepan = () => {
      const currentDate = new Date();
      const currentHours = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();

      const isAlarmTime1 =
        (currentHours === 8 && currentMinutes >= 55 && currentMinutes <= 59) || //9:00
        (currentHours === 9 && currentMinutes >= 55 && currentMinutes <= 59) || //10:00
        (currentHours === 10 && currentMinutes >= 45 && currentMinutes <= 50) || //10:50
        (currentHours === 11 && currentMinutes >= 35 && currentMinutes <= 40) || //11:40
        (currentHours === 12 && currentMinutes >= 10 && currentMinutes <= 15) || //12:15
        (currentHours === 12 && currentMinutes >= 55 && currentMinutes <= 59) || //1:00
        (currentHours === 13 && currentMinutes >= 45 && currentMinutes <= 50) || //1:50
        (currentHours === 14 && currentMinutes >= 35 && currentMinutes <= 40) || //2:40
        (currentHours === 15 && currentMinutes >= 10 && currentMinutes <= 15) || //3:15
        (currentHours === 15 && currentMinutes >= 55 && currentMinutes <= 59) || //4:00
        (currentHours === 16 && currentMinutes >= 45 && currentMinutes <= 50) || //4:50
        (currentHours === 17 && currentMinutes >= 35 && currentMinutes <= 40) || //5:40
        (currentHours === 18 && currentMinutes >= 35 && currentMinutes <= 40) || //6:40
        (currentHours === 19 && currentMinutes >= 10 && currentMinutes <= 15) || //7:15
        (currentHours === 19 && currentMinutes >= 55 && currentMinutes <= 59) || //8:00
        (currentHours === 20 && currentMinutes >= 30 && currentMinutes <= 35); //8:35

      setisAlarmTepepanActive(isAlarmTime1);
    };

    const checkAlarmHuapaltepec = () => {
      const currentDate = new Date();
      const currentHours = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();

      const isAlarmTime1 =
        (currentHours === 8 && currentMinutes >= 10 && currentMinutes <= 15) || //8:15
        (currentHours === 10 && currentMinutes >= 25 && currentMinutes <= 34) || //10:30
        (currentHours === 12 && currentMinutes >= 25 && currentMinutes <= 34) || //12:30
        (currentHours === 14 && currentMinutes >= 25 && currentMinutes <= 34) || //2:30
        (currentHours === 16 && currentMinutes >= 25 && currentMinutes <= 34) || //4:30
        (currentHours === 18 && currentMinutes >= 55 && currentMinutes <= 59) || //7:00
        (currentHours === 19 && currentMinutes >= 0 && currentMinutes <= 4); //7:00

      setisAlarmHuapaltepecActive(isAlarmTime1);
    };

    const checkAlarmTacopan = () => {
      const currentDate = new Date();
      const currentMinutes = currentDate.getMinutes();

      const isAlarmTime1 = currentMinutes >= 5 && currentMinutes <= 10;

      const isAlarmTime2 = currentMinutes >= 35 && currentMinutes <= 40;

      setisAlarmTacopanActive(isAlarmTime1 || isAlarmTime2);
    };

    // Verificar las alarmas cada segundo
    const intervalTepepan = setInterval(checkAlarmTepepan, 1000);
    const intervalTacopan = setInterval(checkAlarmTacopan, 1000);
    const intervalHuapaltepec = setInterval(checkAlarmHuapaltepec, 1000);

    // Limpiar los intervalos al desmontar el componente
    return () => {
      clearInterval(intervalTepepan);
      clearInterval(intervalTacopan);
      clearInterval(intervalHuapaltepec);
    };
  }, []);

  const handleAlarmClickTepepan = () => {
    // Desactivar manualmente la alarma
    setisAlarmTepepanActive(false);
  };
  const handleAlarmClickTacopan = () => {
    // Desactivar manualmente la alarma
    setisAlarmTacopanActive(false);
  };
  const handleAlarmClickHuapaltepec = () => {
    // Desactivar manualmente la alarma
    setisAlarmTacopanActive(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const roles = await db.rol.toArray();
      const unidades = await db.unidades.toArray();
      const reporte = await db.reporte.toArray();
      const countTacopan = await db.reporte
        .where("ruta")
        .equals("Tacopan")
        .count();

      const countTepepan = await db.reporte
        .where("ruta")
        .equals("Tepepan")
        .count();

      let countTacopanTepepan = countTacopan + countTepepan;

      //const rolUnico = roles.length > 0 ? roles[0] : null;
      let rolUnico = null;
      if (roles.length > 0) {
        rolUnico = roles[0];
      }

      const rutasPredeterminadas =
        rolUnico && rolUnico.rutas ? rolUnico.rutas : [];
      //const rutasPredeterminadas = rolUnico ? rolUnico.rutas : [];

      let numeroUnidades;
      let existeTacopanTepepan = 0;

      const existeTepepan = unidades.some(
        (unidad) => unidad.ruta === "Tepepan"
      );
      if (existeTepepan) existeTacopanTepepan++;

      const existeTacopan = unidades.some(
        (unidad) => unidad.ruta === "Tacopan"
      );

      if (existeTacopan) existeTacopanTepepan++;

      numeroUnidades =
        unidades.length +
        reporte.length -
        countTacopanTepepan -
        existeTacopanTepepan;

      const indiceRutaPredeterminada =
        numeroUnidades % rutasPredeterminadas.length;

      const rutasRotadas = [
        ...rolUnico.rutas.slice(indiceRutaPredeterminada),
        ...rolUnico.rutas.slice(0, indiceRutaPredeterminada),
      ];

      setSelectedRutas(rutasRotadas);
      setUnidades(unidades); // Actualizar el estado 'unidades' con los datos obtenidos
    };
    fetchData();
  }, [unidades]);

  //Autoenfocar para gregar unidad
  useEffect(() => {
    if (showForm) {
      numeroInputRef.current.focus();
    }
  }, [showForm]);

  const handleAddUnidad = () => {
    setShowForm(true);
    setNumeroUnidad("");
  };

  const handleCancel = () => {
    setShowForm(false);
    setNumeroUnidad("");
  };

  const handleRutaChange = (e) => {
    setRutaChange(true);
    const rutaSeleccionada = selectedRutas.find(
      (ruta) => ruta.ruta === e.target.value
    );
    setSelectedRuta(rutaSeleccionada);
  };

  //******************************************Guardar Unidad****************************************

  const handleSaveUnidad = async () => {
    let rutaSeleccionada;

    rutaChange
      ? (rutaSeleccionada = selectedRuta)
      : (rutaSeleccionada = selectedRutas[0]);

    const fechaHoraActual = new Date(); // Obtener la fecha y hora actual
    const horaActual = fechaHoraActual.toLocaleTimeString(); // Convertir la hora actual a formato de cadena

    // Verificar si el número de unidad ya existe
    const unidadExistente = unidades.find(
      (unidad) => unidad.numeroUnidad === numeroUnidad
    );

    if (unidadExistente) {
      toast.error(
        "El número de unidad ya existe. Por favor, elija otro número."
      );
      return; // Salir de la función sin agregar la unidad si ya existe
    }
    const coincidencias = await db.reporte
      .where("numeroUnidad")
      .equals(numeroUnidad)
      .toArray();

    let ultimaPrediccion = new Date();
    const ultimaUnidad = await db.unidades.toCollection().reverse().first(); // Obtener el último registro de la colección unidades en orden descendente

    if (ultimaUnidad && ultimaUnidad.prediccion) {
      ultimaPrediccion = new Date(ultimaUnidad.prediccion);
      ultimaPrediccion.setMinutes(ultimaPrediccion.getMinutes() + 2);
    }

    const newUnidad = {
      numeroUnidad,
      horaRegistro: horaActual, // Usar la hora actual como el valor de horaRegistro
      ruta: rutaSeleccionada ? rutaSeleccionada.ruta : "", // Verificar si rutaSeleccionada está definida
      color: rutaSeleccionada ? rutaSeleccionada.color : "", // Verificar si rutaSeleccionada está definida
      mensaje: rutaSeleccionada ? rutaSeleccionada.mensaje : "", // Verificar si rutaSeleccionada está definida
      salidas: coincidencias,
      prediccion: ultimaPrediccion,
    };

    await db.unidades.add(newUnidad);
    toast.success("La Unidad se agrego correctamente.");
    setShowForm(false);
    setNumeroUnidad("");

    const unidadesActualizadas = await db.unidades.toArray(); // Obtener la lista actualizada de unidades
    setUnidades(unidadesActualizadas); // Actualizar el estado 'unidades' con la lista actualizada
    setRutaChange(false);
  };

  //*********************************************Eliminar Unidad********************************************

  const handleDeleteUnidad = async (numeroUnidad) => {
    const unidadEliminada = unidades.find(
      (unidad) => unidad.numeroUnidad === numeroUnidad
    );

    if (unidadEliminada) {
      const indexEliminada = unidades.indexOf(unidadEliminada);
      const unidadesActualizadas = [...unidades];

      // Recorrer las unidades a partir del índice de la unidad eliminada
      for (let i = indexEliminada; i < unidadesActualizadas.length - 1; i++) {
        unidadesActualizadas[i].numeroUnidad =
          unidadesActualizadas[i + 1].numeroUnidad;
        unidadesActualizadas[i].horaRegistro =
          unidadesActualizadas[i + 1].horaRegistro;
        unidadesActualizadas[i].salidas = unidadesActualizadas[i + 1].salidas;
      }

      unidadesActualizadas.pop(); // Eliminar la última unidad del array
      setUnidades(unidadesActualizadas);

      // Guardar las unidades actualizadas en la base de datos
      await db.unidades.clear();
      await db.unidades.bulkAdd(unidadesActualizadas);
      toast.success("La unidad se elimino correctamente");
    }
  };

  const handleMoveUnidadToEnd = async (numeroUnidad) => {
    const unidadEliminada = unidades.find(
      (unidad) => unidad.numeroUnidad === numeroUnidad
    );

    if (unidadEliminada) {
      const indexEliminada = unidades.indexOf(unidadEliminada);
      const unidadesActualizadas = [...unidades];
      const numeroUnidadEliminada = unidadEliminada.numeroUnidad;
      const horaRegistroUnidadEliminada = unidadEliminada.horaRegistro;
      const salidasUnidadEliminada = unidadEliminada.salidas;
      // Recorrer las unidades a partir del índice de la unidad eliminada
      for (let i = indexEliminada; i < unidadesActualizadas.length - 1; i++) {
        unidadesActualizadas[i].numeroUnidad =
          unidadesActualizadas[i + 1].numeroUnidad;
        unidadesActualizadas[i].horaRegistro =
          unidadesActualizadas[i + 1].horaRegistro;
          unidadesActualizadas[i].salidas =
          unidadesActualizadas[i + 1].salidas;
      }

      unidadesActualizadas[unidadesActualizadas.length - 1].numeroUnidad =
        numeroUnidadEliminada;
      unidadesActualizadas[unidadesActualizadas.length - 1].horaRegistro =
        horaRegistroUnidadEliminada;
        unidadesActualizadas[unidadesActualizadas.length - 1].salidas =
        salidasUnidadEliminada;
      setUnidades(unidadesActualizadas);

      // Guardar las unidades actualizadas en la base de datos
      await db.unidades.clear();
      await db.unidades.bulkAdd(unidadesActualizadas);
      toast.success("La unidad se movio al fondo correctamente");
    }
  };

  const handleMoveUp = async (numeroUnidad) => {
    const indexUnidadSeleccionada = unidades.findIndex(
      (unidad) => unidad.numeroUnidad === numeroUnidad
    );

    if (indexUnidadSeleccionada > 0) {
      const unidadesActualizadas = [...unidades];
      const numeroUnidadActual =
        unidadesActualizadas[indexUnidadSeleccionada].numeroUnidad;
      const horaRegistroUnidadActual =
        unidadesActualizadas[indexUnidadSeleccionada].horaRegistro;
        const salidasUnidadActual =
        unidadesActualizadas[indexUnidadSeleccionada].salidas;

      const numeroUnidadAnterior =
        unidadesActualizadas[indexUnidadSeleccionada - 1].numeroUnidad;
      const horaRegistroUnidadAnterior =
        unidadesActualizadas[indexUnidadSeleccionada - 1].horaRegistro;
        const salidasUnidadAnterior =
        unidadesActualizadas[indexUnidadSeleccionada - 1].salidas;

      unidadesActualizadas[indexUnidadSeleccionada].numeroUnidad =
        numeroUnidadAnterior;
      unidadesActualizadas[indexUnidadSeleccionada].horaRegistro =
        horaRegistroUnidadAnterior;
        unidadesActualizadas[indexUnidadSeleccionada].salidas =
        salidasUnidadAnterior;

      unidadesActualizadas[indexUnidadSeleccionada - 1].numeroUnidad =
        numeroUnidadActual;
      unidadesActualizadas[indexUnidadSeleccionada - 1].horaRegistro =
        horaRegistroUnidadActual;
        unidadesActualizadas[indexUnidadSeleccionada - 1].salidas =
        salidasUnidadActual;

      setUnidades(unidadesActualizadas);

      // Guardar las unidades actualizadas en la base de datos
      await db.unidades.clear();
      await db.unidades.bulkPut(unidadesActualizadas);
      toast.success("La Unidad Subio Correctamente");
    } else {
      toast.warn("La Unidad ya se encuentra hasta Arriba");
    }
  };

  const handleMoveUpRuta = async (numeroUnidad) => {
    const indexUnidadSeleccionada = unidades.findIndex(
      (unidad) => unidad.numeroUnidad === numeroUnidad
    );

    if (indexUnidadSeleccionada > 0) {
      const unidadesActualizadas = [...unidades];
      const rutaUnidadActual =
        unidadesActualizadas[indexUnidadSeleccionada].ruta;
      const colorUnidadActual =
        unidadesActualizadas[indexUnidadSeleccionada].color;
      const mensajeUnidadActual =
        unidadesActualizadas[indexUnidadSeleccionada].mensaje;

      const rutaUnidadAnterior =
        unidadesActualizadas[indexUnidadSeleccionada - 1].ruta;
      const colorUnidadAnterior =
        unidadesActualizadas[indexUnidadSeleccionada - 1].color;
      const mensajeUnidadAnterior =
        unidadesActualizadas[indexUnidadSeleccionada - 1].mensaje;

      unidadesActualizadas[indexUnidadSeleccionada].ruta = rutaUnidadAnterior;
      unidadesActualizadas[indexUnidadSeleccionada].color = colorUnidadAnterior;
      unidadesActualizadas[indexUnidadSeleccionada].mensaje =
        mensajeUnidadAnterior;

      unidadesActualizadas[indexUnidadSeleccionada - 1].ruta = rutaUnidadActual;
      unidadesActualizadas[indexUnidadSeleccionada - 1].color =
        colorUnidadActual;
      unidadesActualizadas[indexUnidadSeleccionada - 1].mensaje =
        mensajeUnidadActual;

      setUnidades(unidadesActualizadas);

      // Guardar las unidades actualizadas en la base de datos
      await db.unidades.clear();
      await db.unidades.bulkPut(unidadesActualizadas);
      toast.success("La Ruta Subio Correctamente");
    } else {
      toast.warn("La Ruta ya se encuentra hasta Arriba");
    }
  };

  const handleAssignTacopan = async (numeroUnidad) => {
    const unidadSeleccionada = unidades.find(
      (unidad) => unidad.numeroUnidad === numeroUnidad
    );

    if (unidadSeleccionada) {
      const rutaTacopanExistente = unidades.some(
        (unidad) => unidad.ruta === "Tacopan"
      );

      if (!rutaTacopanExistente) {
        const indexUnidadSeleccionada = unidades.indexOf(unidadSeleccionada);
        // Guardar la ruta y el color actual de la unidad seleccionada
        let rutaActual = unidadSeleccionada.ruta;
        let colorActual = unidadSeleccionada.color;
        // Asignar "Tacopan" y su color a la unidad seleccionada
        unidadSeleccionada.ruta = "Tacopan";
        unidadSeleccionada.color = "#FEF304";
        unidadSeleccionada.mensaje =
          "Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde, Caseta de Coahuixco, El Puerto, Rancho 3 hermanos, El cerrito. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}. Chignautla y {rutaUnidad}, Unidad {numeroUnidad}.";
        // Heredar las rutas y los colores anteriores a las unidades siguientes
        for (let i = indexUnidadSeleccionada + 1; i < unidades.length; i++) {
          const rutaAnterior = unidades[i].ruta;
          const colorAnterior = unidades[i].color;
          unidades[i].ruta = rutaActual;
          unidades[i].color = colorActual;
          rutaActual = rutaAnterior;
          colorActual = colorAnterior;
        }
        setUnidades([...unidades]);
        // Guardar las unidades actualizadas en la base de datos
        await db.unidades.clear();
        await db.unidades.bulkPut(unidades);
        toast.success("La ruta Tacopan se asigno correctamente.");
      } else {
        toast.warn("La ruta Tacopan ya está asignada a otra unidad.");
      }
    }
  };

  const handleAddTepepan = async () => {
    const numeroUnidadIngresado = prompt(
      "Ingresa el número de la nueva unidad:"
    );
    if (numeroUnidadIngresado) {
      // Verificar si el número de unidad ya existe
      const unidadExistente = unidades.find(
        (unidad) => unidad.numeroUnidad === numeroUnidadIngresado
      );

      if (unidadExistente) {
        toast.error(
          "El número de unidad ya existe. Por favor, elige otro número."
        );
        return;
      }

      if (unidades.length === 0) {
        toast.error("Debes tener al menos una unidad para agregar una nueva.");
        return;
      }

      let prediccionTepepan = new Date();
      prediccionTepepan.setMinutes(prediccionTepepan.getMinutes() + 2);

      if (unidades.length === 1) {
        // Si hay una sola unidad, agregamos la nueva unidad en index[1]
        const fechaHoraActual = new Date();
        const horaActual = fechaHoraActual.toLocaleTimeString();
        const coincidencias = await db.reporte
          .where("numeroUnidad")
          .equals(numeroUnidadIngresado)
          .toArray();

        const nuevaUnidad = {
          numeroUnidad: numeroUnidadIngresado,
          horaRegistro: horaActual,
          ruta: "Tepepan",
          color: "#FF0000",
          mensaje:
            "Pasajeros con destino a Tequimila, yopi y tepepan favor de abordar la Unidad {numeroUnidad}. Tequimila, yopi y tepepan, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Monumento a la madre. Tequimila, yopi y tepepan, Unidad {numeroUnidad}. Tequimila, yopi y tepepan, Unidad {numeroUnidad}.",
          salidas: coincidencias,
          prediccion: prediccionTepepan,
        };

        const unidadesActualizadas = [...unidades, nuevaUnidad];
        setUnidades(unidadesActualizadas);

        // Guardar las unidades actualizadas en la base de datos (si es necesario)
        await db.unidades.clear();
        await db.unidades.bulkPut(unidadesActualizadas);

        toast.success(
          "La unidad se agregó con la ruta 'Tepepan' correctamente."
        );
      } else {
        // Si hay más de una unidad, realizamos la inserción en el índice 1 como lo hacía antes
        const unidadesHastaIndice1 = unidades.slice(0, 1);
        const unidadesDesdeIndice2 = unidades.slice(1);

        const fechaHoraActual = new Date();
        const horaActual = fechaHoraActual.toLocaleTimeString();
        const coincidencias = await db.reporte
          .where("numeroUnidad")
          .equals(numeroUnidadIngresado)
          .toArray();

        const nuevaUnidad = {
          numeroUnidad: numeroUnidadIngresado,
          horaRegistro: horaActual,
          ruta: "Tepepan",
          color: "#FF0000",
          mensaje:
            "Pasajeros con destino a Tequimila, yopi y tepepan favor de abordar la Unidad {numeroUnidad}. Tequimila, yopi y tepepan, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Monumento a la madre. Tequimila, yopi y tepepan, Unidad {numeroUnidad}. Tequimila, yopi y tepepan, Unidad {numeroUnidad}.",
          salidas: coincidencias,
          prediccion: prediccionTepepan,
        };

        const unidadesActualizadas = [
          ...unidadesHastaIndice1,
          nuevaUnidad,
          ...unidadesDesdeIndice2,
        ];

        const idUnidadIndice1 = unidades[1].id;
        const unidadesActualizadasConID = unidadesActualizadas.map(
          (unidad, index) => {
            if (index > 0) {
              return {
                ...unidad,
                id: parseInt(idUnidadIndice1) + (index - 1),
              };
            }
            return unidad;
          }
        );

        setUnidades(unidadesActualizadasConID);

        // Guardar las unidades actualizadas en la base de datos (si es necesario)
        await db.unidades.clear();
        await db.unidades.bulkPut(unidadesActualizadasConID);

        toast.success(
          "La unidad se agregó con la ruta 'Tepepan' correctamente."
        );
      }
    }
  };

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  return (
    <div className="unidades-container">
      {isReadyForInstall && (
        <button onClick={downloadApp}>Descarga la App</button>
      )}
      {!showForm && (
        <div className="add-button-container">
          <button className="add-button" onClick={handleAddUnidad}>
            Unidad
          </button>
          <button className="add-button" onClick={handleAddTepepan}>
            Tepepan
          </button>
          {isAlarmTacopanActive && (
            <button
              className={`alarm-button-tacopan ${
                isAlarmTacopanActive ? "blinking" : ""
              }`}
              onClick={handleAlarmClickTacopan}
            >
              <FontAwesomeIcon icon={faMountainSun} />
              <p className="small-text">Tacopan</p>
            </button>
          )}
          {isAlarmTepepanActive && (
            <button
              className={`alarm-button-tepepan ${
                isAlarmTepepanActive ? "blinking" : ""
              }`}
              onClick={handleAlarmClickTepepan}
            >
              <FontAwesomeIcon icon={faCross} />
              <p className="small-text">Tepepan</p>
            </button>
          )}
          {isAlarmHuapaltepecActive && (
            <button
              className={`alarm-button-huapaltepec ${
                isAlarmHuapaltepecActive ? "blinking" : ""
              }`}
              onClick={handleAlarmClickHuapaltepec}
            >
              <FontAwesomeIcon icon={faTree} />
              <p className="small-text">Huapaltepec</p>
            </button>
          )}
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <form className="unidad-form">
            <div className="form-group">
              {/*<label htmlFor="numeroUnidad">Número de Unidad:</label>*/}
              <input
                ref={numeroInputRef} // Asignar la referencia al input número
                name="numeroUnidad"
                type="text"
                id="numeroUnidad"
                placeholder="Número de Unidad"
                value={numeroUnidad}
                onChange={(e) => setNumeroUnidad(e.target.value)}
                inputMode="numeric" // Establecer el modo de entrada como numérico
              />
            </div>
            <div className="form-group">
              {/*<label>Rutas:</label>*/}
              <select id="ruta" name="ruta" onChange={handleRutaChange}>
                {/* <option value={rutaPredeterminada.ruta}>
                {rutaPredeterminada.ruta}
              </option> */}
                {selectedRutas.map((ruta, index) => (
                  <option key={index} value={ruta.ruta} data-color={ruta.color}>
                    {ruta.ruta}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-buttons">
              <button
                className="cancel-button"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                className="save-button"
                type="button"
                onClick={handleSaveUnidad}
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="unidad-table">
        <ListaUnidades
          unidades={unidades}
          onDeleteUnidad={handleDeleteUnidad}
          onMoveUp={handleMoveUp}
          onMoveUpRuta={handleMoveUpRuta}
          onAssignTacopan={handleAssignTacopan}
          onMoveUnidadToEnd={handleMoveUnidadToEnd}
        ></ListaUnidades>
      </div>
    </div>
  );
}

export default Unidades;
