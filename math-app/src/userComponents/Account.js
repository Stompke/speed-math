import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { connect } from 'react-redux';

import { loadingAnimation } from './loadingAnimation';



const Account = props => {
    const [ userInfo, setUserInfo ] = useState({});
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get('/api/users')
        .then(res => {
            setUserInfo(res.data)
            setLoading(false)
        })
        .catch( err => {
            console.log(err)
            setLoading(false)
        })
    },[])



    return (
        <>
        {loading ?
            loadingAnimation :
        <>
        <h1>Welcome {userInfo.username}</h1>
        <h2>User Id: {userInfo.id}</h2>
        <h2>Username: {userInfo.username}</h2>
        <h2>Email: {userInfo.email}</h2>
        </>
        }
        </>
    )
}

const mapStateToProps = state => {
    return {
        title: state.title
    }
}

export default connect(
    mapStateToProps
)(Account);
