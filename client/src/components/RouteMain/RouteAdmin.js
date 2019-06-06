//AllDriver, IndexAdmin, OneDriver

import React, {lazy} from 'react'

const AllDrivers = lazy(()=>import('../AdminPage/AllDrivers/AllDrivers'))
const Driver = lazy(()=>import('../AdminPage/Driver/Driver'))
const IndexAdmin =  lazy(()=>import('../AdminPage/IndexAdmin/Index'))
export const routesMain = [
    {
        path: '/alldrivers',
        exact: true,
        main: ({match, history}) => <AllDrivers match = {match}  history = {history}/>
    },
    {
        path: '/driver',
        exact: true,
        main: ({match, history}) => <Driver match = {match}  history = {history}/>
    },
    {
        path: '/index-admin',
        exact: true,
        main: ({match, history}) => <IndexAdmin match = {match}  history = {history}/>
    },
  
]
