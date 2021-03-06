import React, {useState, useContext} from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon} from "mdbreact";
import {searchDatabase} from '../services/api-helper'
import { SearchContext } from './Main';
import { Redirect, Link } from "react-router-dom";

function Navbar() {
	const searchContext = useContext(SearchContext)
	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [showSearchResults, setShowSearchResults] = useState(false)

	console.log('Navbar - searchTerm', searchTerm)

	console.log('Navbar - searchContext', searchContext)

	const toggleCollapse = () => {
		setIsOpen(!isOpen)
	}

	const handleSearchChange = e => {
		setSearchTerm(e.target.value)
	}

	const submitSearch = async (e) => {
		e.preventDefault()
		const res = await searchDatabase(searchTerm)
		console.log('submitSearch', res.data)
		searchContext.setSearchResults(res.data)
		setShowSearchResults(true)
		setSearchTerm('')
	}

  return (
		<>
		<MDBNavbar color='indigo darken-3' dark expand="md" fixed='top'>
			<MDBNavbarBrand>
				<MDBNavLink to='/dashboard'><strong className="white-text nav-title">The Rundown</strong></MDBNavLink>
			</MDBNavbarBrand>
			<MDBNavbarToggler onClick={toggleCollapse} />
			<MDBCollapse id="navbarCollapse3" navbar isOpen={isOpen} >
				<MDBNavbarNav right>
					<MDBNavItem active className='add-business-item'>
						<MDBNavLink className='add-business-link' to="/createbusiness">Add Business</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem className='search-nav-item'>
						<MDBFormInline waves onSubmit={submitSearch}>
							<div className="md-form my-0">
								<input className="form-control mr-sm-2 search-form" type="text" placeholder="Search" aria-label="Search" onChange={handleSearchChange} value={searchTerm} />
							</div>
						</MDBFormInline>
					</MDBNavItem>
					<MDBNavItem>
						<MDBDropdown>
							<MDBDropdownToggle nav caret>
								<MDBIcon icon='user-circle' size='2x' />
							</MDBDropdownToggle>
							<MDBDropdownMenu className='menu-dropdown'>
								<MDBDropdownItem>Profile</MDBDropdownItem>
								<Link to='/'><MDBDropdownItem onClick={() => {searchContext.setUser(); searchContext.setVerified(false); localStorage.setItem('user', JSON.stringify(''))}}>Log Out</MDBDropdownItem></Link> 
							</MDBDropdownMenu>
						</MDBDropdown>
					</MDBNavItem>
				</MDBNavbarNav>
			</MDBCollapse>
		</MDBNavbar>
		{showSearchResults && <Redirect to='/searchresults' />}
		</>
	);
}

export default Navbar