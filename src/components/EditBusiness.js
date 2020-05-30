import React, {useState} from 'react'
import {MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn} from 'mdbreact'
import Navbar from './Navbar'
import {updateBusiness, getBusinesses} from '../services/api-helper'
import {Redirect} from 'react-router-dom'
import ScrollToTop from '../ScrollToTop'

function EditBusiness(props) {
	const [businessInfo, setBusinessInfo] = useState({
		name: props.currentBusiness.name,
		categories: props.currentBusiness.categories,
		price: props.currentBusiness.price,
		website: props.currentBusiness.website,
		location_address: props.currentBusiness.location_address,
		location_city: props.currentBusiness.location_city,
		location_state: props.currentBusiness.location_state,
		phone: props.currentBusiness.phone
	})
	const [success, setSuccess] = useState(false)
	const [errors, setErrors] = useState({})
	const [displayErrors, setDisplayErrors] = useState(false)


	const handleBusinessChange = e => {
		const value = e.target.value
		setBusinessInfo({...businessInfo, [e.target.name]: value})
	}

	console.log('EditBusiness - props', props)

	const handleBusinessSubmit = async (e) => {
		e.preventDefault()
		setErrors({})
		setDisplayErrors(false)
		await updateBusiness(props.currentBusiness.id, businessInfo, props.user.token).then(res => {
			if(res.status === 200) {
				alert('Business successfully updated!')
				renderBusiness()
				setSuccess(true)
			} else {
				console.log(res.response.data)
				setErrors(res.response.data)
				setDisplayErrors(true)
			}
		})
	}

	const renderBusiness = async () => {
		const res = await getBusinesses(props.user.token)
		props.setBusinesses(res.data)
	}

	console.log('EditBusiness - errors', errors)

	console.log('EditBusiness - businessInfo', businessInfo)
	return(
		<div className='add-business-page'>
			<Navbar />
			<MDBRow>
				<MDBCol>
					<MDBCard>
						<MDBCardBody>
							<p className='text-center'>Edit Business</p>
							{(displayErrors && errors.name) ? <p className='text-center create-business-error'>name error: {errors.name[0]}</p> : ''}
							{(displayErrors && errors.categories) ? <p className='text-center create-business-error'>categories error: {errors.categories[0]}</p> : ''}
							{(displayErrors && errors.price) ? <p className='text-center create-business-error'>price error: {errors.price[0]}</p> : ''}
							{(displayErrors && errors.website) ? <p className='text-center create-business-error'>website error: {errors.website[0]}</p> : ''}
							{(displayErrors && errors.location_address) ? <p className='text-center create-business-error'>street address error: {errors.location_address[0]}</p> : ''}
							{(displayErrors && errors.location_city) ? <p className='text-center create-business-error'>city error: {errors.location_city[0]}</p> : ''}
							{(displayErrors && errors.location_state) ? <p className='text-center create-business-error'>state error: {errors.location_state[0]}</p> : ''}
							{(displayErrors && errors.phone) ? <p className='text-center create-business-error'>phone error: {errors.categories[0]}</p> : ''}
							<form onSubmit={handleBusinessSubmit}>
								<MDBInput
									label='Name'
									icon='store-alt'
									group
									type='text'
									validate
									error='wrong'
									success='right'
									onChange={handleBusinessChange}
									name='name'
									valueDefault={props.currentBusiness.name}
								/>
								<MDBInput
									label='Categories'
									icon='th-large'
									group
									type='text'
									validate
									error='wrong'
									success='right'
									onChange={handleBusinessChange}
									name='categories'
									valueDefault={props.currentBusiness.categories}
								/>
								<MDBInput
									label='How pricey is it? ($ - $$$$)'
									icon='dollar-sign'
									group
									type='text'
									validate
									error='wrong'
									success='right'
									onChange={handleBusinessChange}
									name='price'
									valueDefault={props.currentBusiness.price}
								/>
								<MDBInput
									label='Website'
									icon='external-link-square-alt'
									group
									type='url'
									validate
									error='wrong'
									success='right'
									onChange={handleBusinessChange}
									name='website'
									valueDefault={props.currentBusiness.website}
								/>
								<MDBInput
									label='Street Address'
									icon='address-card'
									group
									type='text'
									validate
									error='wrong'
									success='right'
									onChange={handleBusinessChange}
									name='location_address'
									valueDefault={props.currentBusiness.location_address}
								/>
								<MDBInput
									label='City'
									icon='address-card'
									group
									type='text'
									validate
									onChange={handleBusinessChange}
									name='location_city'
									valueDefault={props.currentBusiness.location_city}
								/>
								<MDBInput
									label='State Abbreviation'
									icon='address-card'
									group
									type='text'
									validate
									name='location_state'
									onChange={handleBusinessChange}
									valueDefault={props.currentBusiness.location_state}
								/>
								<MDBInput
									label='Phone Number (##########)'
									icon='phone-square-alt'
									group
									type='text'
									validate
									error='wrong'
									success='right'
									onChange={handleBusinessChange}
									name='phone'
									valueDefault={props.currentBusiness.phone}
								/>
								<MDBBtn id='login-btn' color='indigo' type='submit'>Submit</MDBBtn>
							</form>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
			{success && <Redirect to={`/business/${props.currentBusiness.name}`} />}
			{displayErrors && <ScrollToTop />}
		</div>
	)

}

export default EditBusiness