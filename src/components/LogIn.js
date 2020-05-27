import React, {useState} from 'react';
import '../scss/App.scss';
import {Link, Redirect} from 'react-router-dom'
import {MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBBtn} from 'mdbreact'
import {login} from '../services/api-helper'


function LogIn(props) {

  console.log('LogIn - props', props)
 
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  })
  const [verified, setVerified] = useState(false)
  const [alert, setAlert] = useState(false)

  const handleLoginChange = e => {
    const value = e.target.value
    setLoginInfo({...loginInfo, [e.target.name]: value})
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    await login(loginInfo).then(res => {
      if(res.status === 200) {
        props.setUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        setVerified(true)
      } else {
        setAlert(true)
      }
    })
  }

  return (
    <div className='home-page'>
      <MDBRow>
        <MDBCol>
          <h1 id='home-title'>The Rundown</h1>
          <MDBCard>
            <MDBCardBody>
              <p className='text-center'>Log In</p>
              {alert && <p className='text-center' style={{color: 'red'}}>A user with that username and password was not found.</p>}
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
              <p style={{textAlign: 'center'}}>Not a member? <Link to='/projects/jhilado/the-rundown/signup' style={{textDecoration: 'underline'}}>Sign Up</Link></p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      {verified && <Redirect to='/projects/jhilado/the-rundown/dashboard' />}
    </div>
  );
}

export default LogIn;