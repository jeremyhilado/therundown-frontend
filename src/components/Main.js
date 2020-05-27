import React, {useState} from 'react'
import LogIn from './LogIn'
import { Switch, Route } from 'react-router-dom'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import Navbar from './Navbar'

function Main() {
	const [user, setUser] = useState(() => {
		const result = localStorage.getItem('user')
		return result ? JSON.parse(result) : []
	})
	const [verified, setVerified] = useState(false)

    return(
			<div>
				<Navbar />
				<Switch>
					<Route exact path='/projects/jhilado/the-rundown'><LogIn setUser={setUser} setVerified={setVerified} verified={verified} /></Route>
					<Route exact path='/projects/jhilado/the-rundown/signup'><SignUp /></Route>
					<Route exact path='/projects/jhilado/the-rundown/dashboard'><Dashboard /></Route>
				</Switch>
			</div>
    )
}

export default Main