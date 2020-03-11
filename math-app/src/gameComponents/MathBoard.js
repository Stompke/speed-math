import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

//components
import PostGame from './PostGame';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';


//components
import GameCounter from './GameCounter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    backButton: {
      position: 'absolute',
      top: 100,
      left: 20,
    },
    paper: {
      padding: 50,
      background: '#ffffff90'
    }
  }),
);


const Mathboard = () => {
    let newLevelA = '1';
    let newLevelB = '1';
    const history = useHistory();
    const classes = useStyles();
    const { type, levelA, sign, levelB } = useParams();
    const [ answer, setAnswer ] = useState({})
    const [ num, setNum ] = useState({
      one: Math.floor(Math.random()*newLevelA),
      two: Math.floor(Math.random()*newLevelB),
    });
    const [score, setScore] = useState(0)


      while (newLevelA.length-1 < levelA) {
        newLevelA = newLevelA + '0';
      }
      while (newLevelB.length-1 < levelB) {
        newLevelB = newLevelB + '0'
      }



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

    // useEffect(() => {
    //     setNum({
    //         one: Math.floor(Math.random()*newLevelA),
    //         two: Math.floor(Math.random()*newLevelB),
    //     })
    // },[])

    if(type === 'Addition') {
      if(num.one + num.two === answer) {
         setScore(score + 1)
         setNum({
             one: Math.floor(Math.random()*newLevelA),
             two: Math.floor(Math.random()*newLevelB),
         })
         setAnswer({})
     }
     
    } else if (type === 'Subtraction') {
       if(num.one - num.two === answer) {
          setScore(score + 1)
          setNum({
              one: Math.floor(Math.random()*newLevelA),
              two: Math.floor(Math.random()*newLevelB),
          })
          setAnswer({})
      }
      
    } else if (type === 'Multiplication') {
        if(num.one * num.two === answer) {
           setScore(score + 1)
           setNum({
               one: Math.floor(Math.random()*newLevelA),
               two: Math.floor(Math.random()*newLevelB),
           })
           setAnswer({})
       }
       
      } else if (type === 'Division') {
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
        <Paper className={classes.paper} elevation={3}>
          <h2>{type}</h2>
          <h3>Level: {levelA} by {levelB}</h3>
          
          <GameCounter score={score}/>
          <h4>score: {score}</h4>

          <h4>{num.one} {sign} {num.two}</h4>

          {/* <form className={classes.root} noValidate autoComplete="off"> */}
              <TextField onChange={handleAnswerChange} type='number' value={answer} name='answer' id="standard-basic" label="Answer" />
          {/* </form> */}

          <Fab onClick={() => history.goBack()} className={classes.backButton} color="primary" aria-label="add"><ArrowBackIosIcon /></Fab>
          <PostGame />
        </Paper>
      </>
    )
}

export default Mathboard;