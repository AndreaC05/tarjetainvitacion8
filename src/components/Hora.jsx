import React, { useEffect, useState } from "react";
import "../style/Hora.css";

export default function Hora() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  // Estado para forzar la recarga del contenedor
  const [key, setKey] = useState(0);
  
  // Estado para guardar el tiempo anterior y detectar cambios
  const [prevTime, setPrevTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  // Define la fecha objetivo una sola vez
  const targetDate = new Date("2025-09-22T18:00:00");

  useEffect(() => {
    // Función para calcular el tiempo restante
    const calcularTiempoRestante = () => {
      const ahora = new Date();
      const diferencia = targetDate - ahora;
      
      if (diferencia <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      // Convertir la diferencia a segundos totales
      const totalSeconds = Math.floor(diferencia / 1000);
      
      // Calcular cada unidad de tiempo
      const days = Math.floor(totalSeconds / 86400); // 86400 segundos en un día
      const hours = Math.floor((totalSeconds % 86400) / 3600); // 3600 segundos en una hora
      const minutes = Math.floor((totalSeconds % 3600) / 60); // 60 segundos en un minuto
      const seconds = totalSeconds % 60; // segundos restantes
      
      return { days, hours, minutes, seconds };
    };

    // Calcular inmediatamente al montar
    const tiempoInicial = calcularTiempoRestante();
    setTimeLeft(tiempoInicial);
    setPrevTime(tiempoInicial);

    // Configurar el intervalo
    const intervalo = setInterval(() => {
      const nuevoTiempo = calcularTiempoRestante();
      
      // Verificar si alguna unidad de tiempo ha cambiado
      const hayCambio = 
        nuevoTiempo.days !== prevTime.days ||
        nuevoTiempo.hours !== prevTime.hours ||
        nuevoTiempo.minutes !== prevTime.minutes ||
        nuevoTiempo.seconds !== prevTime.seconds;
      
      if (hayCambio) {
        // Forzar recarga del contenedor al cambiar cualquier unidad de tiempo
        setKey(prevKey => prevKey + 1);
        setPrevTime(nuevoTiempo);
      }
      
      setTimeLeft(nuevoTiempo);
      
      // Si llegamos a 0, limpiar el intervalo
      if (
        nuevoTiempo.days === 0 &&
        nuevoTiempo.hours === 0 &&
        nuevoTiempo.minutes === 0 &&
        nuevoTiempo.seconds === 0
      ) {
        clearInterval(intervalo);
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, []); // Sin dependencias porque solo queremos que se ejecute una vez

  return (
    <div className="container_hora" key={key}>
      <div className="contador">
        <div className="dia_tiempo">
          <span>{String(timeLeft.days).padStart(2, "0")} :</span>
          <span>Días</span>
        </div>
        <div className="hora_tiempo">
          <span>{String(timeLeft.hours).padStart(2, "0")} :</span>
          <span>Horas</span>
        </div>
        <div className="minutos_tiempo">
          <span>{String(timeLeft.minutes).padStart(2, "0")} :</span>
          <span>Minutos</span>
        </div>
        <div className="segundos_tiempo">
          <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
          <span>Segundos</span>
        </div>
      </div>
    </div>
  );
}