import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';





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
        alignContent: 'center',
        
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }),
);


const Stats = () => {
    const [ stats, setStats ] = useState([]);
    const [ originalStats, setOriginalStats ] = useState([]);
    const classes = useStyles();

    const [state, setState] = React.useState({
        game_type: '',
      });

    const [gameType, setGameType] = useState('');
    
      const inputLabel = React.useRef(null);
      const [labelWidth, setLabelWidth] = React.useState(0);
      React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
      }, []);
    
      const handleChange = name => e => {
        setGameType(e.target.value)
        filterByName(e.target.value);
      };


    useEffect(() => {
        axiosWithAuth()
        .get('http://localhost:5000/api/games/leaderboard/filter')
        .then(res => {
            console.log(res.data)
            setStats(res.data)
            setOriginalStats(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    const sortByScore = () => {
        // console.log('clicked')
        // setStats([])
        const sortedStats = stats.sort((a, b) => (a.score < b.score) ? 1 : -1)
        setStats([...sortedStats])
    }
    const sortByDate = () => {
        // console.log('clicked')
        // setStats([])
        const sortedStats = stats.sort((a, b) => (a.posted_on < b.posted_on) ? 1 : -1)
        setStats([...sortedStats])
    }

    const sortByPostedLeaderboard = () => {
        // console.log('clicked')
        // setStats([])
        const sortedStats = stats.sort((a, b) => (a.posted_on < b.posted_on) ? 1 : -1)
        setStats([...sortedStats])
    }

    const filterByName = (gameTypeFilter) => {
        if (gameTypeFilter === '') {
            setStats(originalStats)
        } else {
            setStats(originalStats.filter(item => item.name == gameTypeFilter))
        }
    }

    
    return (
        <>
        <h1>Stats</h1>
        <Paper className={classes.scoreBoard}>
            <div className={classes.columns}>
            <FormControl  color="primary" variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                GameType
                </InputLabel>
                <Select
                native
                value={gameType}
                onChange={handleChange('game_type')}
                labelWidth={labelWidth}
                inputProps={{
                    game_type: 'age',
                    id: 'outlined-age-native-simple',
                }}
                >
                <option value="" />
                {[... new Set(originalStats.map(data => data.name))].map(item => <option key={item} value={item}>{item}</option>)}
                </Select>
            </FormControl>                
                {/* <div><Button onClick={filter} variant='contained' color="primary">GameType</Button></div> */}
                <div><Button onClick={() => sortByScore()} variant='contained' color="primary">Score</Button></div>
                <div><Button onClick={() => sortByDate()} variant='contained' color="primary">Date</Button></div>
                <div><Button onClick={() => sortByPostedLeaderboard()} variant='contained' color="primary">Posted Leadboard</Button></div>
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