import React, {useState} from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false)

	const toggleCollapse = () => {
		setIsOpen(!isOpen)
	}

  return (
		<MDBNavbar color="indigo" dark expand="md">
			<MDBNavbarBrand>
				<strong className="white-text">The Rundown</strong>
			</MDBNavbarBrand>
			<MDBNavbarToggler onClick={toggleCollapse} />
			<MDBCollapse id="navbarCollapse3" navbar isOpen={isOpen} >
				<MDBNavbarNav left>
					<MDBNavItem>
						<MDBNavLink to="#!">Add Business</MDBNavLink>
					</MDBNavItem>
				</MDBNavbarNav>
				<MDBNavbarNav right>
					<MDBNavItem>
						<MDBFormInline waves>
							<div className="md-form my-0">
								<input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
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