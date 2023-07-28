/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
//import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faArrowUp91,
  faCircleUp,
  faMountainSun,
  faBullhorn,
  faArrowsTurnToDots,
  faArrowDownShortWide,
  faVolumeXmark,
  faRoad,
  faTruckMedical,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ListaUnidades.css";
import db from "../db";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ListaUnidades({
  unidades,
  onDeleteUnidad,
  onMoveUp,
  onMoveUpRuta,
  onAssignTacopan,
  onMoveUnidadToEnd,
}) {
  // eslint-disable-next-line no-unused-vars
  const [timerColor, setTimerColor] = useState("#0FB5EF");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);
  const synthesis = window.speechSynthesis;

  //-------------Audio Audio Audio Audio Audio Audio Audio Audio Audio Audio Audio Audio Audio Audio
  const replacePlaceholder = (text, variable1, value1, variable2, value2) => {
    const placeholder1 = `{${variable1}}`;
    const placeholder2 = `{${variable2}}`;
    let replacedText = text.replace(new RegExp(placeholder1, "g"), value1);
    replacedText = replacedText.replace(new RegExp(placeholder2, "g"), value2);
    return replacedText;
  };

  const handleSpeech = () => {
    if (unidades.length > 0) {
      const numeroUnidad = unidades[0].numeroUnidad;
      const rutaUnidad = unidades[0].ruta;
      const message = unidades[0].mensaje;
      const messageWithVariable = replacePlaceholder(
        message,
        "numeroUnidad",
        numeroUnidad,
        "rutaUnidad",
        rutaUnidad
      );

      console.log(messageWithVariable);
      setIsSpeaking(true);

      const utterance = new SpeechSynthesisUtterance(messageWithVariable);
      utterance.onend = () => setIsSpeaking(false);

      synthesis.speak(utterance);
      utteranceRef.current = utterance; // Guardar la referencia al objeto utterance
    }
  };

  const handleSpeechHuapaltepec = () => {
    if (unidades.length > 0) {
      const rutaUnidad = unidades[0].ruta.toLowerCase(); // Convertir a minúsculas para evitar distinción de mayúsculas
      const numeroUnidad = unidades[0].numeroUnidad;
      const message =
        "Chignautla, Sosa escuela y Huapaltépec, Unidad {numeroUnidad}. Chignautla, Sosa escuela y Huapaltépec, Unidad {numeroUnidad}. Pasa por. INE. Chedraui, Minera, Puente peatonal del Fresnillo, Clínica mi rrufi, El Capulín, Boima, Los arcos, Pollos el Indio, Linda Tarde. Chignautla, Sosa escuela y Huapaltépec, Unidad {numeroUnidad}. Chignautla, Sosa escuela y Huapaltépec, Unidad {numeroUnidad}.";
      const messageWithVariable = replacePlaceholder(
        message,
        "numeroUnidad",
        numeroUnidad,
        "rutaUnidad",
        rutaUnidad
      );

      console.log(messageWithVariable);

      const isSosaEscuela = rutaUnidad.includes("sosa escuela");

      if (isSosaEscuela) {
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(messageWithVariable);
        utterance.onend = () => setIsSpeaking(false);

        synthesis.speak(utterance);
        utteranceRef.current = utterance; // Guardar la referencia al objeto utterance
      } else {
        toast.error("La ruta actual no es 'Sosa Escuela'");
      }
    }
  };

  const handleSpeechProximaSalida = () => {
    if (unidades.length > 0) {
      const numeroUnidad = unidades[1].numeroUnidad;
      const rutaUnidad = unidades[1].ruta;
      const message =
        "Urbanos rojos anuncia su próxima salida: {rutaUnidad}, Unidad {numeroUnidad}. En un momento se formará.";
      const messageWithVariable = replacePlaceholder(
        message,
        "numeroUnidad",
        numeroUnidad,
        "rutaUnidad",
        rutaUnidad
      );

      console.log(messageWithVariable);
      setIsSpeaking(true);

      const utterance = new SpeechSynthesisUtterance(messageWithVariable);
      utterance.onend = () => setIsSpeaking(false);

      synthesis.speak(utterance);
      utteranceRef.current = utterance; // Guardar la referencia al objeto utterance
    }
  };

  const handleSpeechHospital = () => {
    if (unidades.length > 0) {
      const numeroUnidad = unidades[0].numeroUnidad;
      const rutaUnidad = unidades[0].ruta;
      const message =
        "Chignautla y {rutaUnidad}, unidad {numeroUnidad}. Tambien pasa al Hospital General y al Centro de Servicios Integrales, CIS";
      const messageWithVariable = replacePlaceholder(
        message,
        "numeroUnidad",
        numeroUnidad,
        "rutaUnidad",
        rutaUnidad
      );

      console.log(messageWithVariable);
      setIsSpeaking(true);

      const utterance = new SpeechSynthesisUtterance(messageWithVariable);
      utterance.onend = () => setIsSpeaking(false);

      synthesis.speak(utterance);
      utteranceRef.current = utterance; // Guardar la referencia al objeto utterance
    }
  };

  const handleCancelSpeech = () => {
    if (utteranceRef.current) {
      synthesis.cancel();
      setIsSpeaking(false);
    }
  };

  //-------------Audio Audio Audio Audio Audio Audio Audio Audio Audio Audio Audio Audio Audio Audio

  const handleDelete = (numeroUnidad) => {
    onDeleteUnidad(numeroUnidad);
  };

  const handleMoveUp = (numeroUnidad) => {
    onMoveUp(numeroUnidad);
  };

  const handleMoveUpRuta = (numeroUnidad) => {
    onMoveUpRuta(numeroUnidad);
  };

  const handleMoveUnidadToEnd = (numeroUnidad) => {
    onMoveUnidadToEnd(numeroUnidad);
  };

  //------------------timer timer timer timer timer timer timer timer timer timer timer timer timer timer timer

  const calculateElapsedTime = (horaInicio) => {
    if (!horaInicio) return 0;
    const now = new Date().getTime() / 1000; // Obtener la marca de tiempo UNIX en segundos
    const startTime = new Date(horaInicio).getTime() / 1000; // Convertir horaInicio a marca de tiempo UNIX en segundos
    const elapsedTimeInSeconds = Math.floor(now - startTime);
    return elapsedTimeInSeconds;
  };

  useEffect(() => {
    if (!unidades.length) {
      // Detener el temporizador si no hay unidades
      setElapsedTime(0);
      return;
    }

    const horaInicio = unidades[0].horainicio;
    const elapsedTimeInSeconds = calculateElapsedTime(horaInicio);
    setElapsedTime(elapsedTimeInSeconds);

    if (elapsedTimeInSeconds >= 90) {
      setTimerColor("#FF0000");
    } else {
      setTimerColor("#0FB5EF");
    }
  }, [unidades]);

  const handleStartTimer = async () => {
    if (unidades.length > 0 && !unidades[0].horainicio) {
      // Obtener la hora de inicio actual
      const horaInicio = new Date();

      // Actualizar la hora de inicio en la primera unidad de la lista
      await db.unidades.update(unidades[0].id, { horainicio: horaInicio });

      // Si el temporizador no está corriendo, iniciarlo
      if (!intervalId) {
        const newIntervalId = setInterval(() => {
          setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        }, 1000);
        setIntervalId(newIntervalId);
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  //------------------timer timer timer timer timer timer timer timer timer timer timer timer timer timer timer

  const handleExit = async () => {
    const fechaHoraActual = new Date(); // Obtener la fecha y hora actual
    const horaActual = fechaHoraActual.toLocaleTimeString(); // Convertir la hora actual a formato de cadena

    try {
      const unidadesCopy = await db.unidades.toArray();
      if (unidadesCopy.length > 0) {
        // Obtener la hora de inicio actual
        if (unidadesCopy.length > 1) {
          const horaInicio = new Date();
          // Actualizar la hora de inicio en la primera unidad de la lista
          await db.unidades.update(unidades[1].id, { horainicio: horaInicio });
        }

        const unidadToCopy = {
          ...unidadesCopy[0],
          salida: horaActual,
          tiempo: formatTime(elapsedTime),
        };
        await db.reporte.add(unidadToCopy);
        await db.unidades.delete(unidadToCopy.id);
        toast.success("Salida correcta");
      }
    } catch (error) {
      toast.error("Error al dar salida");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="timer-container">
        {unidades.length > 0 && (
          <button
            className="button-timer"
            style={{ backgroundColor: timerColor }}
            onClick={handleStartTimer}
          >
            {formatTime(elapsedTime)}
            <p className="small-text">Tiempo</p>
          </button>
        )}{" "}
        {unidades.length > 0 && (
          <button className="button-exit" onClick={handleExit}>
            <FontAwesomeIcon icon={faRoad} />
            <p className="small-text">Dar salida</p>
          </button>
        )}
        {unidades.length > 0 && (
          <button
            className="button-anunciar"
            onClick={handleSpeech}
            disabled={isSpeaking}
          >
            <FontAwesomeIcon icon={faBullhorn} />
            <p className="small-text">Anunciar</p>
          </button>
        )}
        {unidades.length > 1 && (
          <button
            className="button-proxima"
            onClick={handleSpeechProximaSalida}
            disabled={isSpeaking}
          >
            <FontAwesomeIcon icon={faArrowsTurnToDots} />
            <p className="small-text">Proxima</p>
          </button>
        )}
        {unidades.length > 0 && (
          <button
            className="button-hospital"
            onClick={handleSpeechHospital}
            disabled={isSpeaking}
          >
            <FontAwesomeIcon icon={faTruckMedical} />
            <p className="small-text">Hospital</p>
          </button>
        )}
        {unidades.length > 0 && (
          <button
            className="button-huapaltepec"
            onClick={handleSpeechHuapaltepec}
            disabled={isSpeaking}
          >
            <FontAwesomeIcon icon={faTree} />
            <p className="small-text">Huapaltepec</p>
          </button>
        )}
        {unidades.length > 0 && (
          <button
            className="button-silencio"
            onClick={handleCancelSpeech}
            disabled={!isSpeaking}
          >
            <FontAwesomeIcon icon={faVolumeXmark} />
            <p className="small-text">Silencio</p>
          </button>
        )}
      </div>
      <hr></hr>
      <table className="unit-table">
        <tbody>
          {unidades.map((unidad, index) => (
            <tr
              className="unit-row"
              key={index}
              style={{ backgroundColor: unidad.color }}
            >
              <td className="unit-cell" style={{ backgroundColor: "#98F7EF" }}>
                {index + 1}
              </td>
              <td className="unit-cell">
                <button className="button-unidad">{unidad.numeroUnidad}</button>
                <p className="small-text">{unidad.ruta}</p>
              </td>
              <td className="unit-cell">
                <button
                  className="button-delete"
                  onClick={() => handleDelete(unidad.numeroUnidad)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  className="button-move-up"
                  onClick={() => handleMoveUp(unidad.numeroUnidad)}
                >
                  <FontAwesomeIcon icon={faArrowUp91} />
                </button>
                <button
                  className="button-move-up"
                  onClick={() => handleMoveUpRuta(unidad.numeroUnidad)}
                >
                  R <FontAwesomeIcon icon={faCircleUp} />
                </button>
                <button
                  className="button-assign-tacopan"
                  onClick={() => {
                    const confirmed = window.confirm("¿Asignar a Tacopan?");
                    if (confirmed) {
                      onAssignTacopan(unidad.numeroUnidad);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faMountainSun} />
                </button>
                <button
                  className="button-move-up"
                  onClick={() => handleMoveUnidadToEnd(unidad.numeroUnidad)}
                >
                  <FontAwesomeIcon icon={faArrowDownShortWide} />
                </button>
                <br></br>
                {unidad.salidas &&
                  unidad.salidas.map((salida, salidaIndex) => (
                    <div
                      key={salidaIndex}
                      className="salidas"
                      style={{
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        backgroundColor: salida.color,
                        display: "inline-block", //inline-block
                        margin: "1px",
                        border: "1px solid black", // Agregar borde negro
                        //padding: "1px",
                        textAlign: "center", // Centrar el contenido dentro del círculo
                        lineHeight: "15px", // Alinear verticalmente el contenido
                        fontSize: "10px", // Tamaño de la fuente para que quepa dentro del círculo
                      }}
                    >
                      {salidaIndex + 1}
                    </div>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUnidades;
