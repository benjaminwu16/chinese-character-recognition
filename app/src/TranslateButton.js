import React from 'react';
import "./TranslateButton.css";

const TranslateButton = (props) => {
    return (
        <button className="TranslateButton" onClick={() => props.setTranslateCanvas(true)}>translate</button>
    );  
};

export default TranslateButton;