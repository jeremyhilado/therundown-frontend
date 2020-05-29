import React, {useState, useEffect} from 'react'
import LogIn from './LogIn'
import { Switch, Route } from 'react-router-dom'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import {getBusinesses, getReviews, getImages} from '../services/api-helper'
import BusinessDetail from './BusinessDetail'
import CreateBusiness from './CreateBusiness'

function Main() {
	const [user, setUser] = useState(() => {
		const result = localStorage.getItem('user')
		return result ? JSON.parse(result) : []
	})
	const [verified, setVerified] = useState(false)
	const [businesses, setBusinesses] = useState([])
	const [reviews, setReviews] = useState([])
	const [images, setImages] = useState([])

	useEffect(() => {
		const makeApiCall = async () => {
			const res1 = await getBusinesses(user.token)
			const res2 = await getReviews(user.token)
			const res3 = await getImages(user.token)
			setBusinesses(res1.data)
			setReviews(res2.data)
			setImages(res3.data)
		}
		makeApiCall()
	}, [])


    return(
			<div>
				<Switch>
					<Route exact path='/projects/jhilado/the-rundown'><LogIn setUser={setUser} setVerified={setVerified} verified={verified} /></Route>
					<Route exact path='/projects/jhilado/the-rundown/signup'><SignUp /></Route>
					<Route exact path='/projects/jhilado/the-rundown/dashboard'><Dashboard businesses={businesses} images={images} /></Route>
					<Route exact path='/projects/jhilado/the-rundown/business/:name' render={props => <BusinessDetail {...props} businesses={businesses} reviews={reviews} setReviews={setReviews} images={images} setImages={setImages} setBusinesses={setBusinesses} user={user} />} />
					<Route exact path='/projects/jhilado/the-rundown/createbusiness'><CreateBusiness setBusinesses={setBusinesses} user={user} /></Route>
				</Switch>
			</div>
    )
}

export default Main