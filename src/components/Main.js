import React, {useState} from 'react'
import LogIn from './LogIn'
import { Switch, Route } from 'react-router-dom'
import SignUp from './SignUp'
import Dashboard from './Dashboard'

function Main(props) {

    console.log('Main - props', props)

    const [user, setUser] = useState(() => {
        const result = localStorage.getItem('user')
        return result ? JSON.parse(result) : []
      })

    return(
        <div>
            <Switch>
                <Route exact path='/projects/jhilado/the-rundown'><LogIn setUser={setUser} /></Route>
                <Route exact path='/projects/jhilado/the-rundown/signup'><SignUp /></Route>
                <Route exact path='/projects/jhilado/the-rundown/dashboard'><Dashboard /></Route>
            </Switch>
        </div>
    )
}

export default Main