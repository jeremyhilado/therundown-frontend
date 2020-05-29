import React, {useState, useEffect} from 'react'
import {MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn} from 'mdbreact'
import Navbar from './Navbar'
import {createBusiness} from '../services/api-helper'
import {Redirect} from 'react-router-dom'
import ScrollToTop from '../ScrollToTop'

function CreateBusiness() {
	const [businessInfo, setBusinessInfo] = useState({
		name: '',
		categories: '',
		price: '',
		website: '',
		location_address: '',
		location_city: '',
		location_state: '',
		phone: ''
	})
	const [success, setSuccess] = useState(false)
	const [errors, setErrors] = useState({})
	const [displayErrors, setDisplayErrors] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [displayErrors])

	return(
		<div className='add-business-page'>
			<Navbar />
			<MDBRow>
				<MDBCol>
					<MDBCard>
						<MDBCardBody>
							<p className='text-center'>Add Business</p>
							<form>
								<MDBInput
									label='Name'
									icon='store-alt'
									group
									type='text'
									validate
									error='wrong'
									success='right'
			
									name='name'
								/>
								<MDBInput
									label='Categories'
									icon='th-large'
									group
									type='text'
									validate
									error='wrong'
									success='right'
									
									name='categories'
								/>
								<MDBInput
									label='How pricey is it? ($ - $$$$)'
									icon='dollar-sign'
									group
									type='text'
									validate
									error='wrong'
									success='right'
									
									name='price'
								/>
								<MDBInput
									label='Website'
									icon='external-link-square-alt'
									group
									type='url'
									validate
									error='wrong'
									success='right'
									
									name='website'
								/>
								<MDBInput
									label='Street Address'
									icon='address-card'
									group
									type='text'
									validate
									error='wrong'
									success='right'
									
									name='location_address'
								/>
								<MDBInput
									label='City'
									icon='address-card'
									group
									type='text'
									validate
									
									name='location_city'
								/>
								<MDBInput
									label='State Abbreviation'
									icon='address-card'
									group
									type='text'
									validate
									name='location_state'
									
								/>
								<MDBInput
									label='Phone Number (##########)'
									icon='phone-square-alt'
									group
									type='text'
									validate
									error='wrong'
									success='right'
									
									name='phone'
								/>
								<MDBBtn id='login-btn' color='indigo' type='submit'>Submit</MDBBtn>
							</form>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
	
		</div>
	)
}

export default CreateBusiness