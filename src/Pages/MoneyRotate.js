import React from 'react';
import { useNavigate } from 'react-router-dom';

import money from '../img/IMG.jpg'
import '../styles/rotate.css'

const MoneyRotate = () => {
    const navigate = useNavigate();

    const handleToGo = () => {
        navigate('/workspace'); // Navigate to the '/about' route
    };

    return (
        <>
            <div className="image-cropper">
                <img src={money} onClick={handleToGo} alt="MONEY" />
            </div>
            <div className="text">
                <h1>Hollow World!</h1>
                <p>cat spinning...</p>
            </div>
        </>
    )
}

export default MoneyRotate;