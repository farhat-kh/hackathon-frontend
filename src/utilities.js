export const drawRect = (detections, ctx) =>{
  console.log("drawRect appelé avec :", detections);

    detections.forEach(prediction => {
  
      const [x, y, width, height] = prediction['bbox']; 
      const text = prediction['class']; 
      const color = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      ctx.strokeStyle =  color
      ctx.font = '18px Arial';
      ctx.beginPath();   
      ctx.fillStyle = '#' + color
      ctx.fillText(text, x, y > 10 ? y - 5 : 10);
      ctx.rect(x, y, width, height); 
      ctx.stroke();
    });
  }