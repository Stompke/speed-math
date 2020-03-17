//ACTIONS
import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';




export const test = () => {
    return { type: 'TEST_CALL'};
}

// export const fetchData = () => {
//     return dispatch => {
//         dispatch({type: 'FETCHING_DATA_START'});
//         axios
//         .get('http://localhost:3333/smurfs')
//         .then(res => {
//             dispatch({type: 'FETCHING_DATA_SUCCESS', payload: res.data})
//         })
//         .catch(err => {
//             console.log('didnt work', err)
//         })
//     }
// }

// export const postData = (newName,newAge,newHeight) => {
//     return dispatch => {
//         dispatch({ type: 'POSTING_DATA_START'});
//         axios
//         .post('http://localhost:3333/smurfs',
//             {
//              name: newName,
//              age: newAge,
//              height: newHeight,
//              id: Date.now()
//             }
//         )
//         .then(res => {
//             dispatch({type: 'FETCHING_DATA_SUCCESS', payload: res.data})
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     }
// }

// export const changeData = (id, newName, age, height)=>  {
//     return dispatch => {
//         dispatch({type: 'POSTING_DATA_START'});
//         axios
//         .put(`http://localhost:3333/smurfs/${id}`,
//             {
//             id: id,
//             name: newName,
//             age: age,
//             height: height
//             }
//         )
//         .then(res => {
//             dispatch({type: 'FETCHING_DATA_SUCCESS', payload: res.data})
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     }
// }

// export const selectSmurf = id => {
//     return dispatch => {
//         dispatch({type: 'SELECT_SMURF', payload: id})
//     }
// }

// export const deleteSmurf = id => {
//     return dispatch => {
//         // dispatch({type: 'POSTING_DATA_START'});
//         axios
//         .delete(`http://localhost:3333/smurfs/${id}`)
//         .then(res => {
//             alert('it worked')
//             dispatch({type: 'FETCHING_DATA_SUCCESS', payload: res.data})
//         })
//         .catch(err => {
//             alert(err)
//         })
//     }
// }

export const setPostGame = (stats, gameType) => {
    return dispatch => {
        dispatch({type: 'SET_POST_GAME_STATS', payload: stats})
        let addLeaderboard = {};
        addLeaderboard.score = stats;
        addLeaderboard.game_type = gameType;

        axiosWithAuth()
            .post('/api/games/leaderboard', addLeaderboard)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const closePostGame = () => {
    return dispatch => {
        dispatch({type: 'CLOSE_POST_GAME'})
    }
}


export const setGameId = gameId => {
    return dispatch => {
        dispatch({type: 'SET_GAME_ID', payload: gameId})
    }
}
