import "../style/Calendario.css";
import "../style/Responsive.css";

export default function Calendario() {
  // Configuración: días especiales con tipo de ícono
  const diasEspeciales = {
    22: "perla",
  };

  // Septiembre 2025 comienza en lunes, así que el primer día es 1 (lunes)
  const primerDiaSemana = 1; // 0=domingo, 1=lunes
  const diasEnMes = 30; // Septiembre tiene 30 días

  const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // Crear array del calendario
  const calendario = [];

  // Agregar días vacíos al inicio
  for (let i = 0; i < primerDiaSemana; i++) {
    calendario.push(null);
  }

  // Agregar días reales del mes
  for (let dia = 1; dia <= diasEnMes; dia++) {
    calendario.push(dia);
  }

  return (
    <div className="container_calendario">
      <h1>Septiembre</h1>

      {/* Días de la semana */}
      <div className="calensario_dias_headers">
        <div className="calendario_headers">
          {diasSemana.map((dia, index) => (
            <div key={index} className="header_dia">
              {dia}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="calendario_dias">
          {calendario.map((dia, index) => (
            <div
              key={index}
              className={`dia ${dia ? "dia_activo" : "dia_vacio"}`}
            >
              {dia && (
                <>
                  {/* Íconos especiales detrás del número */}
                  {diasEspeciales[dia] === "perla" && (
                    <span className="icono_especial imagen_kimetsu">
                      <img src="https://res.cloudinary.com/dnao6nouz/image/upload/v1758294613/image_37_kscfw0.png" alt="" />
                    </span>
                  )}
                  <span className="numero_dia">{dia}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}