import React, {useEffect} from 'react'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBRow } from 'mdbreact'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
import {getBusinesses, getReviews, getImages} from '../services/api-helper'

function Dashboard(props) {

	console.log('Dashboard - props', props)

	useEffect(() => {
		const makeApiCall = async () => {
			const res1 = await getBusinesses(props.user.token)
			const res2 = await getReviews(props.user.token)
			const res3 = await getImages(props.user.token)
			props.setBusinesses(res1.data)
			props.setReviews(res2.data)
			props.setImages(res3.data)
		}
		makeApiCall()
	}, [props.images])

	if(props.businesses) {
		const allBusinesses = props.businesses.map((business, i) => {
			let ratingSum = 0
			for(let i = 0; i < business.reviews.length; i++) {
				ratingSum += business.reviews[i].rating
			}
			let avgRating = Math.round(ratingSum / business.reviews.length)
			console.log('Dashboard - avgRating', business.name, avgRating)
			return(
				<MDBCol md='6' lg='4' key={i} style={{padding: "10px"}}>
					<MDBCard className='dashboard-card'>
						<Link to={`/business/${business.name}`}>
						<MDBCardImage
							top
							src={business.images[0] ? business.images[0].image_url : 'https://res.cloudinary.com/do6tcpizk/image/upload/c_scale,h_700,w_700/v1585845946/Project%202%20React%20App/product_image_not_available_otx8jx.png'}
							overlay='white-slight'
							hover
							waves
							alt={business.images[0] ? business.images[0].description : 'no images'}
							style={{height: '300px'}}
						/>
						</Link>
						<MDBCardBody>
							<MDBCardTitle>{business.name}</MDBCardTitle>
							<hr />
							<MDBCardText>
								{business.price} ・ {business.categories}
								<br/>
								{business.location_city}, {business.location_state}
								<br/>
								{Number.isNaN(avgRating) && <><MDBIcon size='2x' far icon='star' className='black-text dashboard-rating' /><MDBIcon size='2x' far icon='star' className='black-text dashboard-rating' /><MDBIcon size='2x' far icon='star' className='black-text dashboard-rating' /><MDBIcon size='2x' far icon='star' className='black-text dashboard-rating' /><MDBIcon size='2x' far icon='star' className='black-text dashboard-rating' /></>}
								{avgRating === 1 && <><MDBIcon size ='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size ='2x' far icon='star' className='red-text dashboard-rating'/><MDBIcon size ='2x' far icon='star' className='red-text dashboard-rating'/><MDBIcon size ='2x' far icon='star' className='red-text dashboard-rating'/><MDBIcon size ='2x' far icon='star' className='red-text dashboard-rating'/></>}
								{avgRating === 2 && <><MDBIcon size ='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size ='2x' far icon='star' className='red-text dashboard-rating'/><MDBIcon size ='2x' far icon='star' className='red-text dashboard-rating'/><MDBIcon size ='2x' far icon='star' className='red-text dashboard-rating'/></>}
								{avgRating === 3 && <><MDBIcon size ='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size ='2x' far icon='star' className='red-text dashboard-rating'/><MDBIcon size ='2x' far icon='star' className='red-text dashboard-rating'/></>}
								{avgRating === 4 && <><MDBIcon size ='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size ='2x' far icon='star' className='red-text dashboard-rating'/></>}
								{avgRating === 5 && <><MDBIcon size ='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size='2x' icon='star' className='red-text dashboard-rating'/><MDBIcon size='2x' icon='star' className='red-text dashboard-rating'/></>}
							</MDBCardText>
							<Link to={`/business/${business.name}`} className='black-text d-flex justify-content-end'>
								<h6>
									More info
									<MDBIcon icon='angle-double-right' className='ml-2' />
								</h6>
							</Link>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			)
		})
	
		return(
			<>
				<Navbar />
				<MDBRow style={{margin: "15px", paddingTop: "90px"}}>
					{allBusinesses}
				</MDBRow>
			</>
		)
	} else {
		return(
			<></>
		)
	}
}

export default Dashboard