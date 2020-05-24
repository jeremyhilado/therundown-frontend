import React, {useState, useEffect} from 'react';
import './scss/App.scss';
import {Route, Switch, Link} from 'react-router-dom'
import {MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody} from 'mdbreact'


function App() {
  return (
    <div className='home-page'>
      <MDBRow>
        <MDBCol>
          <h1 id='home-title'>The Rundown</h1>
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className='text-center'>Log In</p>
                <MDBInput
                  label='Username'
                  icon='user'
                  group
                  type='text'
                  validate
                  error='wrong'
                  success='right'
                />
                <MDBInput
                  label='Password'
                  icon='lock'
                  group
                  type='password'
                  validate
                />
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default App;
