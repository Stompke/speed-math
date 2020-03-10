import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';


const GameCounter = (props) => {
    const [ seconds, setSeconds ] = useState(20);
    const [ minutes, setMinutes ] = useState(0);
    useEffect(() => {
    const myInterval = setInterval(() => {
    if (seconds > 0) {
        setSeconds((seconds) => seconds-1);
    }
    if (seconds === 0) {
    if (minutes === 0) {
    clearInterval(myInterval);
    alert(`times up! Your score: ${props.score}`)
    } else {
    setMinutes((minutes) => minutes-1);
    setSeconds(59);
    }
    }
    }, 1000);
    return () => {
    clearInterval(myInterval);
    };
    },[seconds, minutes]);

    

    const restartTimer = () => {
        setSeconds(5);
    }



    
    return (
        <div>
            {/* <h1>Timer</h1>
            <h3>{timer.seconds}</h3> */}
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            <Button variant='contained' color='primary'  onClick={restartTimer}>Restart</Button>
        </div>

    )
}

export default GameCounter;