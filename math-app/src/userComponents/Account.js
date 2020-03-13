import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { connect } from 'react-redux';


const Account = props => {
    const [ userInfo, setUserInfo ] = useState({});

    useEffect(() => {
        axiosWithAuth()
        .get('/api/users')
        .then(res => {
            setUserInfo(res.data)
        })
        .catch( err => {
            console.log(err)
        })
    },[])


    return (
        <>
            <h1>Welcome {userInfo.username}</h1>
            <h2>User Id: {userInfo.id}</h2>
            <h2>Username: {userInfo.username}</h2>
            <h2>Email: {userInfo.email}</h2>
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
