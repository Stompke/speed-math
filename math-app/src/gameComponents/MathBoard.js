import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


//components
import GameCounter from './GameCounter';
import NavBar from '../userComponents/Navbar';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));

const Mathboard = () => {
    const { type, levelA, sign, levelB } = useParams();
    const classes = useStyles();
    const [ answer, setAnswer ] = useState({})
    const [ num, setNum ] = useState({})
    const [problem, setProblem] = useState(0)
    const [score, setScore] = useState(0)
    let newLevelA = '1';
    let newLevelB = '1';

    useEffect(() => {
      while (newLevelA.length-1 < levelA) {
        newLevelA = newLevelA + '0';
      }
      while (newLevelB.length-1 < levelB) {
        newLevelB = newLevelB + '0'
      }
    },[])


    useEffect(() => {
        const handleEsc = (event) => {
           if (event.keyCode === 32) {
            setAnswer({})
          }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);

    const handleAnswerChange = e => {
        e.preventDefault();
        setAnswer(
            Number(e.target.value)
        )
    }

    useEffect(() => {
        setNum({
            one: Math.floor(Math.random()*newLevelA),
            two: Math.floor(Math.random()*newLevelB),
        })
    },[])

    if(type == 'Addition') {
      if(num.one + num.two === answer) {
         setScore(score + 1)
         setNum({
             one: Math.floor(Math.random()*newLevelA),
             two: Math.floor(Math.random()*newLevelB),
         })
         setAnswer({})
     }
     
    } else if (type == 'Subtraction') {
       if(num.one - num.two === answer) {
          setScore(score + 1)
          setNum({
              one: Math.floor(Math.random()*newLevelA),
              two: Math.floor(Math.random()*newLevelB),
          })
          setAnswer({})
      }
      
    } else if (type == 'Multiplication') {
        if(num.one * num.two === answer) {
           setScore(score + 1)
           setNum({
               one: Math.floor(Math.random()*newLevelA),
               two: Math.floor(Math.random()*newLevelB),
           })
           setAnswer({})
       }
       
      } else if (type == 'Division') {
         if(num.one / num.two === answer) {
            setScore(score + 1)
            setNum({
                one: Math.floor(Math.random()*newLevelA),
                two: Math.floor(Math.random()*newLevelB),
            })
            setAnswer({})
        }

    }





    return (

      <>
            <h2>{type}</h2>
            <h3>Level: {levelA} by {levelB}</h3>
            <GameCounter score={score}/>
            <h4>score: {score}</h4>

            <h4>{num.one} + {num.two}</h4>

            {/* <form className={classes.root} noValidate autoComplete="off"> */}
                <TextField onChange={handleAnswerChange} type='number' value={answer} name='answer' id="standard-basic" label="Answer" />
            {/* </form> */}

      </>
    )
}

export default Mathboard;