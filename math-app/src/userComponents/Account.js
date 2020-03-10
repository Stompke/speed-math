import React, { useState, useEffect } from 'react';

const Account = () => {
    // const [ user, setUser ] = useState({});

    // useEffect(() => {
    //     setUser(localStorage.getItem('user'))
    // },[])

    return (
        <>
            <h1>{localStorage.getItem('user')}</h1>
        </>
    )
}

export default Account;