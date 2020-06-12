import React, {useState, useEffect, createContext} from 'react'
import LogIn from './LogIn'
import { Switch, Route } from 'react-router-dom'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import {getBusinesses, getReviews, getImages} from '../services/api-helper'
import BusinessDetail from './BusinessDetail'
import CreateBusiness from './CreateBusiness'
import SearchResultsPage from './SearchResultsPage'
import EditBusiness from './EditBusiness'

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
	const [currentBusiness, setCurrentBusiness] = useState([])

	console.log('Main - user', user)

    return(
			<div>
				<SearchContext.Provider value={{setSearchResults, setUser, setVerified}}>
				<Switch>
					<Route exact path='/'><LogIn setUser={setUser} setVerified={setVerified} verified={verified} /></Route>
					<Route exact path='/signup'><SignUp /></Route>
					<Route exact path='/dashboard'><Dashboard businesses={businesses} user={user} setBusinesses={setBusinesses} setImages={setImages} setReviews={setReviews} images={images} /></Route>
					<Route exact path='/business/:name' render={props => <BusinessDetail {...props} businesses={businesses} reviews={reviews} setReviews={setReviews} images={images} setImages={setImages} setBusinesses={setBusinesses} setCurrentBusiness={setCurrentBusiness} user={user} />} />
					<Route exact path='/createbusiness'><CreateBusiness setBusinesses={setBusinesses} user={user} /></Route>
					<Route exact path='/editbusiness/:name' render={props => <EditBusiness {...props} currentBusiness={currentBusiness} setBusinesses={setBusinesses} user={user} />} />
					<Route exact path='/searchresults'><SearchResultsPage searchResults={searchResults} /></Route>
				</Switch>
				</SearchContext.Provider>
			</div>
    )
}

export default Main
export const SearchContext = createContext()