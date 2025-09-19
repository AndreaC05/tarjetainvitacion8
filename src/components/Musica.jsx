import { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import Music from "../assets/music/perla.mp3";
import "../style/Musica.css";

export default function Musica() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const musicFile = Music;

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    // Puedes mostrar progreso si lo necesitas
  };

  const handleLoadedMetadata = () => {
    // Puedes capturar duración si lo necesitas
  };

  const handleEnded = () => {
    setIsPlaying(false);
    audioRef.current.currentTime = 0;
  };

  // 🔁 Reproducción automática tras 5 segundos
  useEffect(() => {
    const handleUserInteraction = () => {
      setTimeout(() => {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn("No se pudo reproducir:", error);
          });
      }, 1000);

      window.removeEventListener("click", handleUserInteraction);
    };

    // Espera el primer clic del usuario
    window.addEventListener("click", handleUserInteraction);

    return () => window.removeEventListener("click", handleUserInteraction);
  }, []);

  return (
    <div className="container_reproductor">
      <audio
        ref={audioRef}
        src={musicFile}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <Button
        icon="pi pi-refresh"
        className="control-icon"
        text
        onClick={() => {
          // Shuffle no implementado
        }}
      />

      <Button
        icon="pi pi-step-backward-alt"
        className="control-icon"
        text
        onClick={() => {
          audioRef.current.currentTime -= 10;
        }}
      />

      <Button
        icon={isPlaying ? "pi pi-pause" : "pi pi-play"}
        className="play-button"
        onClick={togglePlayPause}
      />

      <Button
        icon="pi pi-step-forward-alt"
        className="control-icon"
        text
        onClick={() => {
          audioRef.current.currentTime += 10;
        }}
      />

      <Button
        icon="pi pi-replay"
        className="control-icon"
        text
        onClick={() => {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
          setIsPlaying(true);
        }}
      />
    </div>
  );
}