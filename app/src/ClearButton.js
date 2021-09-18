import React from 'react';
import "./ClearButton.css";

const ClearButton = (props) => {
    return (
        <button className="clearButton" onClick={() => props.setResetCanvas(true)}>clear</button>
    );  
};

export default ClearButton;