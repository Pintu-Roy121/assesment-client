import React, { createContext, useEffect, useState } from 'react';

export const userContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [refresh, setRefresh] = useState(true);


    const id = localStorage.getItem('User');

    // Get Login user.......................
    useEffect(() => {
        fetch(`https://assesment-server.vercel.app/getuser/${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // console.log(refresh);
                // setRefresh(!refresh)
                setUser(data)
            })
    }, [id, refresh])

    const userInfo = { user, userId, setUserId, refresh, setRefresh }


    return (
        <userContext.Provider value={userInfo}>
            {children}
        </userContext.Provider>
    );
};

export default UserProvider;