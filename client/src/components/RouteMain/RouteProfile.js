//AllDriver, IndexAdmin, OneDriver

import React, { lazy } from 'react'

 
const Profile = lazy(() => import('../UserPage/Profile/Profile'))
const Statistical = lazy(() => import('../UserPage/Statistical/Statistical'))
export const routesMain = [
    {
        path: '/profile',
        exact: true,
        main: ({ match, history }) => <Profile match={match} history={history} />
    },
    {
        path: '/statistical',
        exact: true,
        main: ({ match, history }) => <Statistical match={match} history={history} />
    }
     
]
