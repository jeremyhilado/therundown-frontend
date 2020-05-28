import React, {useState} from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon} from "mdbreact";
import {Link} from 'react-router-dom'

function Navbar() {
	const [isOpen, setIsOpen] = useState(false)

	const toggleCollapse = () => {
		setIsOpen(!isOpen)
	}

  return (
		<MDBNavbar color="indigo" dark expand="md">
			<MDBNavbarBrand>
				<MDBNavLink to='/projects/jhilado/the-rundown/dashboard'><strong className="white-text nav-title">The Rundown</strong></MDBNavLink>
			</MDBNavbarBrand>
			<MDBNavbarToggler onClick={toggleCollapse} />
			<MDBCollapse id="navbarCollapse3" navbar isOpen={isOpen} >
				<MDBNavbarNav right>
					<MDBNavItem active className='add-business-item'>
						<MDBNavLink className='add-business-link' to="#!">Add Business</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem className='search-nav-item'>
						<MDBFormInline waves>
							<div className="md-form my-0">
								<input className="form-control mr-sm-2 search-form" type="text" placeholder="Search" aria-label="Search" />
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
								<MDBDropdownItem>Log Out</MDBDropdownItem>
							</MDBDropdownMenu>
						</MDBDropdown>
					</MDBNavItem>
				</MDBNavbarNav>
			</MDBCollapse>
		</MDBNavbar>
	);
}

export default Navbar