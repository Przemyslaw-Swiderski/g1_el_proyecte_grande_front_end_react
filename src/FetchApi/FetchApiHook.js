import React, {useEffect, useState} from 'react'

import Profile from './Profile'

const FetchApiHook = props => {

    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:39635/Profile')
            const data = await response.json()
            setData(data)
        }
        fetchData()
        // console.log(data)
    }, [])



        return (
            <div>
                {data.map((profile, index) => <Profile key={index} user={profile} />)}
              
            </div>
        )

}
export default FetchApiHook;
