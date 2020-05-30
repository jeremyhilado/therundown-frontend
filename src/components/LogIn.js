import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom'
import {MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBBtn} from 'mdbreact'
import {login} from '../services/api-helper'


function LogIn(props) {

  console.log('LogIn - props', props)
 
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  })
  
  const [errorAlert, setErrorAlert] = useState(false)

  const handleLoginChange = e => {
    const value = e.target.value
    setLoginInfo({...loginInfo, [e.target.name]: value})
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    await login(loginInfo).then(res => {
      if(res.data) {
        props.setUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        props.setVerified(true)
      } else {
        setErrorAlert(true)
      }
    })
  }

  return (
    <div className='login-page'>
      <MDBRow>
        <MDBCol>
          <h1 id='site-title'>The Rundown</h1>
          <MDBCard>
            <MDBCardBody>
              <p className='text-center'>Log In</p>
              {errorAlert && <p className='text-center' style={{color: 'red'}}>A user with that username and password was not found.</p>}
              <form onSubmit={handleLoginSubmit}>
                <MDBInput
                  label='Username'
                  icon='user'
                  group
                  type='text'
                  validate
                  error='wrong'
                  success='right'
                  onChange={handleLoginChange}
                  name='username'
                />
                <MDBInput
                  label='Password'
                  icon='lock'
                  group
                  type='password'
                  validate
                  onChange={handleLoginChange}
                  name='password'
                />
                <MDBBtn id='login-btn' color='indigo' type='submit'>Submit</MDBBtn>
              </form>
              <p style={{textAlign: 'center'}}>Not a member? <Link to='/signup' style={{textDecoration: 'underline'}}>Sign Up</Link></p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      {props.verified && <Redirect to='/dashboard' />}
    </div>
  );
}

export default LogIn;