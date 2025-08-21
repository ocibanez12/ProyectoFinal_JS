import React from "react";
import { Link } from "react-router-dom";

const MensajeInfo = ({ emoji, mensaje, botonTexto, botonLink, color }) => {
  return (
    <div className="mensaje-info-container">
      <div className="mensaje-info-card">
        <div 
          className="mensaje-info-emoji" 
          style={{ color: color || "red" }}
          aria-label="emoji"
        >
          {emoji}
        </div>
        <div className="mensaje-info-mensaje">{mensaje}</div>
        <Link className="mensaje-info-boton" to={botonLink}>
          {botonTexto}
        </Link>
      </div>
    </div>
  );
};

export default MensajeInfo;
