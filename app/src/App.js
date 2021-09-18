import React, {useState} from 'react';
import './App.css';
import Canvas from './Canvas';
import ClearButton from './ClearButton';
import TranslateButton from './TranslateButton';

const App = () => {
  const [resetCanvas, setResetCanvas] = useState(false);
  const [translateCanvas, setTranslateCanvas] = useState(false);
  return (
    <div className="App">
        <Canvas translateCanvas={translateCanvas} setTranslateCanvas={setTranslateCanvas} 
          resetCanvas={resetCanvas} setResetCanvas={setResetCanvas}></Canvas>
        <ClearButton setResetCanvas={setResetCanvas}></ClearButton>
        <TranslateButton setTranslateCanvas={setTranslateCanvas}></TranslateButton>
    </div>
  );
}

export default App;
