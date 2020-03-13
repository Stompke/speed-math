import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux"; //HOC
import { setPostGame } from '../actions';


const initialTimer = 1;
const GameCounter = props => {
    const [ seconds, setSeconds ] = useState(0);
    const [ minutes, setMinutes ] = useState(initialTimer);
    useEffect(() => {
    const myInterval = setInterval(() => {
    if (seconds > 0) {
        setSeconds((seconds) => seconds-1);
    }
    if (seconds === 0) {
    if (minutes === 0) {
    clearInterval(myInterval);
    props.setPostGame(props.score, props.gameId)
    } else {
    setMinutes((minutes) => minutes-1);
    setSeconds(59);
    }
    }
    }, 1000);
    return () => {
    clearInterval(myInterval);
    };
    },[seconds, minutes, props.score]);

    const restartTimer = () => {
        setSeconds(initialTimer);
    }

    return (
        <div>
            {/* <h1>Timer</h1>
            <h3>{timer.seconds}</h3> */}
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>

    )
}


const mapStateToProps = state => {
    return {
        gameId: state.gameId,
    }
}

export default connect(
    mapStateToProps,
    { setPostGame }
)(GameCounter);