import React, {useState, useEffect, useRef, useCallback} from 'react';
import "./Canvas.css";

const Canvas = (props) => {
    const canvasEl = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState([]);
    
    const handleDraw = useCallback((e) => {
        const currentCanvas = canvasEl.current;
        const bounds = currentCanvas.getBoundingClientRect();
        const newX = (e.pageX - bounds.left) / bounds.width * currentCanvas.width;
        const newY = (e.pageY - bounds.top) / bounds.height * currentCanvas.height;
        const ctx = currentCanvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#fec89a';
        ctx.lineWidth = 4;
        if(points.length === 0) {
            ctx.beginPath();
        }
        setPoints([...points, {x: newX, y: newY}]);
        if (points.length >= 2) {
            ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
            ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
            ctx.stroke();
        }
    }, [points, setPoints, canvasEl]);

    useEffect(() => {
        if (props.translateCanvas) {
            const currentCanvas = canvasEl.current;
            const dataURL = currentCanvas.toDataURL("image/jpeg", 1.0);
            //TODO: send dataURL to ML algorithm...
            props.setTranslateCanvas(false);
        }
    }, [props]);

    useEffect(() => {
        if (props.resetCanvas) {
            const currentCanvas = canvasEl.current;
            const ctx = currentCanvas.getContext('2d');
            ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
            ctx.beginPath();
            setPoints([]);
            props.setResetCanvas(false);
        }
    }, [props]);
    
    useEffect(() => {
        const currentCanvas = canvasEl.current;
        if (isDrawing) {
            currentCanvas.addEventListener("mousemove", handleDraw);
        }
        else {
            currentCanvas.removeEventListener("mousemove", handleDraw);
        }

        return () => { 
            currentCanvas.removeEventListener("mousemove", handleDraw);
        };
    }, [isDrawing, handleDraw, canvasEl]);

    return (
        <canvas ref={canvasEl} className="Canvas-container" width="1200px" height="1200px"
            onMouseDown={() => setIsDrawing(true)} 
            onMouseUp={() => { setIsDrawing(false); setPoints([]); }}></canvas>
    );  
};

export default Canvas;