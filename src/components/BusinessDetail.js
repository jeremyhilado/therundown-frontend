import React from 'react'
import Navbar from './Navbar'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCardBody} from 'mdbreact'
import moment from 'moment'


function BusinessDetail(props) {

	console.log('BusinessDetail - props', props)

	const business = props.businesses.filter(business => {
		return business.name === props.match.params.name
	})

	console.log('BusinessDetail - business', business)

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
			slidesToSlide: 1 // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 1 // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1 // optional, default to 1.
		}
	};

	if(business[0]) {
		let ratingSum = 0
		for(let i = 0; i < business[0].reviews.length; i++) {
			ratingSum += business[0].reviews[i].rating
		}
		let avgRating = Math.ceil(ratingSum / business[0].reviews.length)
		const images = business[0].images.map((image, i) => {
			return(
				<div key={i} className='carousel-image' style={{backgroundImage: `url(${image.image_url})`}}>
				</div>
			);
		})
		const reviews = business[0].reviews.map((review, i) => {
			return(
				<div key={i} className='business-review'>
					{review.rating === 1 && <><MDBIcon size ='lg' icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/></>}
					{review.rating === 2 && <><MDBIcon size ='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/></>}
					{review.rating === 3 && <><MDBIcon size ='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/></>}
					{review.rating === 4 && <><MDBIcon size ='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/></>}
					{review.rating === 5 && <><MDBIcon size ='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/></>}
					{moment(review.created_at).format('M/D/YYYY')}
					<p>{review.owner}</p>
					<p>{review.review}</p>
				</div>
			)
		})
		return(
			<>
				<Navbar />
				<Carousel
					swipeable={true}
					draggable={true}
					showDots={true}
					responsive={responsive}
					ssr={false} // means to render carousel on server-side.
					infinite={true}
					autoPlay={true}
					autoPlaySpeed={8000}
					keyBoardControl={true}
					customTransition="1000ms"
					transitionDuration={2000}
					containerClass="react-multi-carousel-list"
					removeArrowOnDeviceType={["tablet", "mobile"]}
					deviceType="desktop"
					dotListClass="react-multi-carousel-dot-list"
					className="carousel"
				>
					{images}
				</Carousel>
				<MDBContainer>
					<MDBRow className='detail-info'>
						<MDBCol md='8'>
							<h1 className='detail-business-name'>{business[0].name}</h1>
							{avgRating === 1 && <><MDBIcon size ='3x' icon='star' className='red-text'/><MDBIcon size ='3x' far icon='star' className='red-text'/><MDBIcon size ='3x' far icon='star' className='red-text'/><MDBIcon size ='3x' far icon='star' className='red-text'/><MDBIcon size ='3x' far icon='star' className='red-text'/></>}
							{avgRating === 2 && <><MDBIcon size ='3x' icon='star' className='red-text'/><MDBIcon size='3x' icon='star' className='red-text'/><MDBIcon size ='3x' far icon='star' className='red-text'/><MDBIcon size ='3x' far icon='star' className='red-text'/><MDBIcon size ='3x' far icon='star' className='red-text'/></>}
							{avgRating === 3 && <><MDBIcon size ='3x' icon='star' className='red-text'/><MDBIcon size='3x' icon='star' className='red-text'/><MDBIcon size='3x' icon='star' className='red-text'/><MDBIcon size ='3x' far icon='star' className='red-text'/><MDBIcon size ='3x' far icon='star' className='red-text'/></>}
							{avgRating === 4 && <><MDBIcon size ='3x' icon='star' className='red-text'/><MDBIcon size='3x' icon='star' className='red-text'/><MDBIcon size='3x' icon='star' className='red-text'/><MDBIcon size='3x' icon='star' className='red-text'/><MDBIcon size ='3x' far icon='star' className='red-text'/></>}
							{avgRating === 5 && <><MDBIcon size ='3x' icon='star' className='red-text'/><MDBIcon size='3x' icon='star' className='red-text'/><MDBIcon size='3x' icon='star' className='red-text'/><MDBIcon size='3x' icon='star' className='red-text'/><MDBIcon size='3x' icon='star' className='red-text'/></>}
							{business[0].reviews.length} Reviews
							<p className='detail-price-category'>{business[0].price} ・ {business[0].categories}</p>
							<MDBBtn color='danger' className='review-btn'>
								<MDBIcon far icon='star' className='white-text' /> Write A Review
							</MDBBtn>
							<MDBBtn outline color='grey darken-4'>
								<MDBIcon icon='camera' className='grey-text darken-4' /> Add A Photo
							</MDBBtn>
							<hr/>
							<h1 className='reviews-header'>Reviews</h1>
							{reviews}
						</MDBCol>
						<MDBCol md='4' className='detail-contact-info-col'>
							<MDBRow className='detail-contact-info-row'>
								<MDBCol md='4' className='detail-info-col-icon'>
									<MDBIcon icon='address-card' size='3x' />
								</MDBCol>
								<MDBCol md='8' className='detail-info-col'>
									<p className='detail-contact-info'>
										{business[0].location_address}
										<br/>
										{business[0].location_city}, {business[0].location_state}
									</p>
								</MDBCol>
							</MDBRow>
							<hr/>
							<MDBRow className='detail-contact-info-row'>
								<MDBCol md='4' className='detail-info-col-icon'>
									<MDBIcon icon='external-link-square-alt' size='3x' />
								</MDBCol>
								<MDBCol md='8' className='detail-info-col'>
									<a href={business[0].website} target='_blank'>{business[0].website}</a>
								</MDBCol>
							</MDBRow>
							<hr/>
							<MDBRow className='detail-contact-info-row'>
								<MDBCol md='4' className='detail-info-col-icon'>
									<MDBIcon icon='phone-square-alt' size='3x' />
								</MDBCol>
								<MDBCol md='8' className='detail-info-col'>
									<p className='detail-contact-info'>({business[0].phone.substring(0, 3)}) {business[0].phone.substring(3, 6)} - {business[0].phone.substring(6, 10)}</p>
								</MDBCol>
							</MDBRow>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</>
		)
	} else {
		return <></>
	}
}

export default BusinessDetail