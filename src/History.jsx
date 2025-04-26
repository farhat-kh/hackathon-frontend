import React, { useState, useEffect} from "react";
import { getPredictions, clearPredictions } from "./utils/storage";

function History() {
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        const storedPredictions = getPredictions();
        setPredictions(storedPredictions);
    }, []);

    const handleClearHistory = () => {
        clearPredictions();
        setPredictions([]);
    };

    return (
        <div style={{ padding: "20px" , marginTop: "20px"}}>
        <h2>Historique des Prédictions</h2>
  
        <button onClick={handleClearHistory} style={{ marginBottom: "20px", marginTop: "20px" }}>
          Vider l'historique
        </button>
  
        {predictions.length === 0 ? (
          <p>Aucune prédiction enregistrée pour l'instant.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {predictions.map((prediction, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "200px",
                }}
              >
                {prediction.image && (
                  <img
                    src={prediction.image}
                    alt={prediction.label}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                )}
                <p><strong>Objet :</strong> {prediction.label}</p>
                <p><strong>Date :</strong> {prediction.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default History;