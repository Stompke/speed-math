import React, { useState } from 'react';
import {NavLink, Route, Switch} from 'react-router-dom'


//card
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    cards: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        margin: '0px 100px'
    },
    card: {
        margin: 15,
        minWidth: 275,
    },
    cardButtons: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center'
    }
}),
);


//   const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     button: {
//       display: 'block',
//       marginTop: theme.spacing(2),
//     },
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//   }),
// );

const SelectGame = () => {
    const [ games, setGames ] = useState([
        {sign: '+', subject: 'Addition'},
        {sign: '-', subject: 'Subtraction'},
        {sign: '*', subject: 'Multiplication'},
        {sign: '÷', subject: 'Division'}
    ]);

    const classes = useStyles();



    const card = (subject,sign) => (
            <Card className={classes.card} variant="outlined">
            <CardContent>
            <Typography variant="h5" component="h2" >
                {subject}
            </Typography>

            </CardContent>
            <Typography className={classes.pos} color="textSecondary">
                Select Your Level:
            </Typography>
            <CardActions>
            <div className={classes.cardButtons}>
                <NavLink to={'/select-game/'+subject+'/1/'+sign+'/1'}><Button size="medium">1 X 1</Button></NavLink>
                <NavLink to={'/select-game/'+subject+'/1/'+sign+'/2'}><Button size="medium">1 X 2</Button></NavLink>
                <NavLink to={'/select-game/'+subject+'/2/'+sign+'/2'}><Button size="medium">2 X 2</Button></NavLink>
                <NavLink to={'/select-game/'+subject+'/2/'+sign+'/3'}><Button size="medium">2 X 3</Button></NavLink>
                <NavLink to={'/select-game/'+subject+'/3/'+sign+'/3'}><Button size="medium">3 X 3</Button></NavLink>
            </div>
            </CardActions>
            </Card>
    )


    return (
        <>
        <h1>Choose Your Game</h1>
        <div className={classes.cards}>
            {games.map(item => card(item.subject, item.sign))}
        </div>

            
        </>
    );
}

export default SelectGame;