import React, {useState, useEffect, createContext} from 'react'
import LogIn from './LogIn'
import { Switch, Route } from 'react-router-dom'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import {getBusinesses, getReviews, getImages} from '../services/api-helper'
import BusinessDetail from './BusinessDetail'
import CreateBusiness from './CreateBusiness'
import SearchResultsPage from './SearchResultsPage'

function Main() {
	const [user, setUser] = useState(() => {
		const result = localStorage.getItem('user')
		return result ? JSON.parse(result) : []
	})
	const [verified, setVerified] = useState(false)
	const [businesses, setBusinesses] = useState([])
	const [reviews, setReviews] = useState([])
	const [images, setImages] = useState([])
	const [searchResults, setSearchResults] = useState([])

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
				<SearchContext.Provider value={{setSearchResults, setUser, setVerified}}>
				<Switch>
					<Route exact path='/'><LogIn setUser={setUser} setVerified={setVerified} verified={verified} /></Route>
					<Route exact path='/signup'><SignUp /></Route>
					<Route exact path='/dashboard'><Dashboard businesses={businesses} /></Route>
					<Route exact path='/business/:name' render={props => <BusinessDetail {...props} businesses={businesses} reviews={reviews} setReviews={setReviews} images={images} setImages={setImages} setBusinesses={setBusinesses} user={user} />} />
					<Route exact path='/createbusiness'><CreateBusiness setBusinesses={setBusinesses} user={user} /></Route>
					<Route exact path='/searchresults'><SearchResultsPage searchResults={searchResults} /></Route>
				</Switch>
				</SearchContext.Provider>
			</div>
    )
}

export default Main
export const SearchContext = createContext()