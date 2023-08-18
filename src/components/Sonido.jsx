// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import './Sonido.css'

function Sonido() {
  const synthesis = window.speechSynthesis;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  const playAudio = (message) => {
    if (isSpeaking) {
      // Si ya se está reproduciendo un audio, detenerlo antes de reproducir el nuevo
      synthesis.cancel();
      setCurrentUtterance(null);
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message);
    synthesis.speak(utterance);
    setCurrentUtterance(utterance);
    setIsSpeaking(true);

    utterance.onend = () => {
      setCurrentUtterance(null);
      setIsSpeaking(false);
    };
  };

  const cancelAudio = () => {
    if (currentUtterance) {
      synthesis.cancel();
      setCurrentUtterance(null);
      setIsSpeaking(false);
    }
  };

  return (
    <div>
      <button onClick={() => playAudio("Cargas y té vas.")}>Cargas</button>
      <button onClick={() => playAudio("Sale compañero, porfavor.")}>Sale</button>
      <button onClick={() => playAudio("Pon tu letrero de hospital, porfavor")}>hospital</button>
      <button className="boton-cancel" onClick={cancelAudio}>Cancelar</button>
    </div>
  );
}

export default Sonido;

