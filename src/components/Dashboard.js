import React from 'react'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBRow } from 'mdbreact'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'

function Dashboard(props) {

	console.log('Dashboard - props', props)



	const allBusinesses = props.businesses.map((business, i) => {
		let ratingSum = 0
		for(let i = 0; i < business.reviews.length; i++) {
			ratingSum += business.reviews[i].rating
		}
		let avgRating = Math.ceil(ratingSum / business.reviews.length)
		console.log('Dashboard - avgRating', business.name, avgRating)
		return(
			<MDBCol md='6' lg='4' key={i} style={{padding: "10px"}}>
				<MDBCard className='dashboard-card'>
					<MDBCardImage
						top
						src={business.images[0].image_url ? business.images[0].image_url : 'https://res.cloudinary.com/do6tcpizk/image/upload/c_scale,h_700,w_700/v1585845946/Project%202%20React%20App/product_image_not_available_otx8jx.png'}
						overlay='white-slight'
						hover
						waves
						alt={business.images[0].description}
						style={{height: '300px'}}
					/>
					<MDBCardBody>
						<MDBCardTitle>{business.name}</MDBCardTitle>
						<hr />
						<MDBCardText>
							{business.price} ・ {business.categories}
							<br/>
							{business.location_city}, {business.location_state}
							<br/>
							{avgRating === 1 && <><MDBIcon icon='star' className='red-text'/></>}
							{avgRating === 2 && <><MDBIcon icon='star' className='red-text'/><MDBIcon icon='star' className='red-text'/></>}
							{avgRating === 3 && <><MDBIcon icon='star' className='red-text'/><MDBIcon icon='star' className='red-text'/><MDBIcon icon='star' className='red-text'/></>}
							{avgRating === 4 && <><MDBIcon icon='star' className='red-text'/><MDBIcon icon='star' className='red-text'/><MDBIcon icon='star' className='red-text'/><MDBIcon icon='star' className='red-text'/></>}
							{avgRating === 5 && <><MDBIcon icon='star' className='red-text'/><MDBIcon icon='star' className='red-text'/><MDBIcon icon='star' className='red-text'/><MDBIcon icon='star' className='red-text'/><MDBIcon icon='star' className='red-text'/></>}
						</MDBCardText>
						<Link to={`/projects/jhilado/the-rundown/business/${business.name}`} className='black-text d-flex justify-content-end'>
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
			<MDBRow style={{margin: "15px"}}>
				{allBusinesses}
			</MDBRow>
		</>
	)
}

export default Dashboard