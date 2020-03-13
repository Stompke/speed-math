import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';





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
    scoreBoard: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '100%',
        padding: 50,
        background: '#ffffff99',
    },
    columns: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center'
    }
  }),
);


const Stats = () => {
    const [ stats, setStats ] = useState([]);
    const classes = useStyles();


    useEffect(() => {
        axiosWithAuth()
        .get('http://localhost:5000/api/games/leaderboard/filter')
        .then(res => {
            console.log(res.data)
            setStats(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    const sortBy = () => {
        console.log('clicked')
        setStats(stats.sort((a, b) => (a.score > b.score) ? 1 : -1))
        console.log(stats)
    }
    
    return (
        <>
        <h1>Stats</h1>
        <Paper className={classes.scoreBoard}>
            <div className={classes.columns}>
                <div>GameType</div>
                <div><Button onClick={() => sortBy()} variant='contained' color="primary">Score</Button></div>
                <div>Date</div>
                <div>Post to Leaderboard</div>
            </div>



        {stats.map(item => 
            <div className={classes.columns} key={item.id}>
                <h3>{item.name}</h3>
                <div>{item.score}</div>
                <div>{item.posted_on}</div>
                <div>{item.share ? <h3>Yes</h3> :  <h3>No</h3>}</div>
            </div>
        
        )}
        </Paper>

        </>
    )
}

export default Stats;