import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import "../style/Contenido.css";
import Musica from "./Musica.jsx";
import Calendario from "./Calendario.jsx";
import Hora from "./Hora.jsx";

export default function Contenido() {
  const [displayedText, setDisplayedText] = useState("");
  const [showSecondText, setShowSecondText] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [textCompleted, setTextCompleted] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    calendario: false,
    hora: false,
    botones: false
  });

  const fullText =
    "Como una perla que brilla en el mar, hoy celebro mis 16 y quiero compartir esta luz contigo.";
  const secondText = "¡No faltes!";

  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setDisplayedText(fullText.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, 80); // Velocidad de escritura (80ms por letra)
      } else {
        // Cuando termina el primer texto, ocultar cursor y mostrar el segundo
        setTimeout(() => {
          setShowCursor(false);
          setShowSecondText(true);
          
          // Después de mostrar el segundo texto, marcar como completado
          setTimeout(() => {
            setTextCompleted(true);
          }, 1500); // Esperar 1.5 segundos después de mostrar "¡No faltes!"
        }, 1000);
      }
    };

    // Empezar a escribir después de 1 segundo
    const timer = setTimeout(typeWriter, 1000);

    return () => clearTimeout(timer);
  }, [fullText]);

  useEffect(() => {
    if (textCompleted) {
      // Mostrar secciones secuencialmente
      const showSections = async () => {
        // Mostrar calendario
        setTimeout(() => {
          setVisibleSections(prev => ({ ...prev, calendario: true }));
        }, 500);

        // Mostrar hora
        setTimeout(() => {
          setVisibleSections(prev => ({ ...prev, hora: true }));
        }, 1500);

        // Mostrar botones
        setTimeout(() => {
          setVisibleSections(prev => ({ ...prev, botones: true }));
        }, 2500);
      };

      showSections();
    }
  }, [textCompleted]);

  return (
    <>
      <div className="container_texto_invitacion">
        <div className="img_logo">
          {/* <img
            src="https://res.cloudinary.com/dnao6nouz/image/upload/v1758121564/image_28_2_m0dzha.png"
            alt=""
          /> */}
          <div className="nombre">
            <h1>Anali</h1>
            <h1>Nallely</h1>
          </div>
        </div>

        <div className="musica_reproductor">
          <Musica />
        </div>

        <div className="texto_invitacion">
          <div className="parrafo">
            <p className={`cursor ${showCursor ? "blinking-cursor" : ""}`}>
              {displayedText}
            </p>
          </div>
          {showSecondText && (
            <p className="typewriter delay fade-in">¡No faltes!</p>
          )}
        </div>

        <section className={`calendario mt-5 slide-up-section ${visibleSections.calendario ? 'visible' : ''}`}>
          <img src="https://res.cloudinary.com/dnao6nouz/image/upload/v1758296735/image_39_n6cq5d.png" alt="" />
          <h2>Reserva este día</h2>
          <img src="https://res.cloudinary.com/dnao6nouz/image/upload/v1758296735/image_39_n6cq5d.png" alt="" />
          <Calendario />
        </section>

        <section className={`Hora mb-5 slide-up-section ${visibleSections.hora ? 'visible' : ''}`}>
          <img src="https://res.cloudinary.com/dnao6nouz/image/upload/v1758296735/image_39_n6cq5d.png" alt="" />
          <h2>¡Tan solo faltan!</h2>
          <img src="https://res.cloudinary.com/dnao6nouz/image/upload/v1758296735/image_39_n6cq5d.png" alt="" />
          <Hora />
        </section>

        <section className={`container_butons mt-5 slide-up-section ${visibleSections.botones ? 'visible' : ''}`}>
          <div className="buton_direccion">
            <i className="pi pi-map-marker"></i>
            <a href="https://maps.app.goo.gl/8JVW2B5yPjbhDADKA" target="_blank">
              <Button label="Ver Dirección" />
            </a>
          </div>
          <div className="buton_whatsapp ml-5">
            <i className="pi pi-whatsapp"></i>
            <a href="https://wa.me/51950874416?text=Hola%20quiero%20confirmar%20mi%20asistencia%20a%20tu%20fiesta." target="_blank">
              <Button label="Confirmar" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}