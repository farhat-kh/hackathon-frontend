import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import Webcam from 'react-webcam';
import { drawRect } from './utilities';

// Import du modèle TensorFlow
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';

// Import de la gestion localStorage
import { savePrediction } from './utils/storage';

// Import de l'historique
import History from './History';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [lastSaveTime, setLastSaveTime] = useState(0); 

  const runCoco = async () => {
    console.log("Chargement du modèle COCO-SSD...");
    const net = await cocossd.load();
    setInterval(() => {
      detect(net);
    }, 500); 
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.width = videoWidth;
      webcamRef.current.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);

      if (obj.length > 0) {
        const now = Date.now();
        if (now - lastSaveTime > 5000) { 
          const imageSrc = webcamRef.current.getScreenshot();
          const label = obj[0].class;
          const date = new Date().toLocaleString();

          const prediction = {
            image: imageSrc,
            label: label,
            date: date,
          };

          console.log("Prediction sauvegardée :", prediction);
          savePrediction(prediction);
          setLastSaveTime(now); 
        }
      }
    }
  };

  useEffect(() => { runCoco(); }, []);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        console.log('Permission webcam accordée.');
      })
      .catch((err) => {
        console.error('Erreur webcam :', err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header" style={{ position: 'relative', width: "640px", height: "480px", margin: "auto" }}>
        <Webcam
          ref={webcamRef}
          muted={true}
          screenshotFormat="image/jpeg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            textAlign: "center",
            zIndex: 8,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            margin: "auto",
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
      <History />
    </div>
  );
}

export default App;
