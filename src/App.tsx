import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(()=> {
    const ctx = ref.current?.getContext('2d')
    if (ctx) {
      ctx.lineWidth = 30;

      // Wall
      ctx.strokeRect(75, 140, 150, 110);

      // Door
      ctx.fillRect(130, 190, 40, 60);

      // Roof
      ctx.moveTo(50, 140);
      ctx.lineTo(150, 60);
      ctx.lineTo(250, 140);

      ctx.closePath();
      ctx.stroke();
    }
  },[])

  return (
    <div className="App">
      <canvas ref={ref} width="1280" height="720" ></canvas>
    </div>
  );
}

export default App;
