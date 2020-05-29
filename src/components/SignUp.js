import React, {useState, useEffect} from 'react'
import {MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn} from 'mdbreact'
import {register} from '../services/api-helper'
import {Redirect} from 'react-router-dom'
import ScrollToTop from '../ScrollToTop'

function SignUp() {
	const [signupInfo, setSignupInfo] = useState({
		username: '',
		first_name: '',
		last_name: '',
		email: '',
		password:''
	})
	const [confirmPassword, setConfirmPassword] = useState('')
	const [success, setSuccess] = useState(false)
	const [errors, setErrors] = useState({})
	const [displayErrors, setDisplayErrors] = useState(false)
	const [passwordMatchError, setPasswordMatchError] = useState(false)

	const checkPassword = () => {
		if(signupInfo.password === confirmPassword) {
			return true
		} else {
			setPasswordMatchError(true)
		}
	}

	const handleSignupChange = e => {
		const value = e.target.value
		setSignupInfo({...signupInfo, [e.target.name]: value})
	}

	const handleSignupSubmit = async (e) => {
		e.preventDefault()
		setErrors({})
		setDisplayErrors(false)
		setPasswordMatchError(false)
		if(checkPassword()) {
			await register(signupInfo).then(res => {
				if(res.status === 201) {
					alert('User succsessfully created!')
					setSuccess(true)
				} else {
					console.log(res.response.data)
					setErrors(res.response.data)
					setDisplayErrors(true)
				}
			})
		}
	}

	console.log('SignUp errors', errors)

	return(
		<div className='signup-page'>
			<MDBRow>
				<MDBCol>
					<h1 id='site-title'>The Rundown</h1>
					<MDBCard>
						<MDBCardBody>
							<p className='text-center'>Sign Up</p>
							{displayErrors && <p className='text-center signup-error'>email error: {errors.email[0]}</p>}
							{(displayErrors && errors.password) ? <p className='text-center signup-error'>password error: {errors.password[0]}</p> : ''}
							{displayErrors && <p className='text-center signup-error'>username error: {errors.username[0]}</p>}
							{passwordMatchError && <p className='text-center signup-error'>passwords do not match</p>}
							<form onSubmit={handleSignupSubmit}>
								<MDBInput
									label='Username'
									icon='user'
									group
									type='text'
									validate
									error='wrong'
									success='right'
									onChange={handleSignupChange}
									name='username'
								/>
								<MDBInput
									label='First Name'
									icon='user'
									group
									type='text'
									validate
									error='wrong'
									success='right'
									onChange={handleSignupChange}
									name='first_name'
								/>
								<MDBInput
									label='Last Name'
									icon='user'
									group
									type='text'
									validate
									error='wrong'
									success='right'
									onChange={handleSignupChange}
									name='last_name'
								/>
								<MDBInput
									label='Email'
									icon='envelope'
									group
									type='email'
									validate
									error='wrong'
									success='right'
									onChange={handleSignupChange}
									name='email'
								/>
								<MDBInput
									label='Password'
									icon='lock'
									group
									type='password'
									validate
									onChange={handleSignupChange}
									name='password'
								/>
								<MDBInput
									label='Confirm Password'
									icon='lock'
									group
									type='password'
									validate
									onChange={e => setConfirmPassword(e.target.value)}
									value={confirmPassword}
								/>
								<MDBBtn id='login-btn' color='indigo' type='submit'>Submit</MDBBtn>
							</form>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
			{success && <Redirect to='/projects/jhilado/the-rundown/' />}
			{displayErrors && <ScrollToTop />}
		</div>
	)
}

export default SignUp