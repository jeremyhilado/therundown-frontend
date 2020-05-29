import React, {useState} from 'react'
import Navbar from './Navbar'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput, MDBFormInline} from 'mdbreact'
import moment from 'moment'
import ScrollToTop from '../ScrollToTop'
import { createReview, getReviews, getImages, createImage, getBusinesses } from '../services/api-helper'


function BusinessDetail(props) {
	const [showReviewForm, setShowReviewForm] = useState(false)
	const [showImageForm, setShowImageForm] = useState(false)
	const [radio, setRadio] = useState()
	const [reviewInfo, setReviewInfo] = useState({
		business: '',
		rating: '',
		review: ''
	})
	const [imageInfo, setImageInfo] = useState({
		business: '',
		image_url: '',
		description: ''
	})
	const [imageAdded, setImageAdded] = useState(false)

	console.log('imageInfo', imageInfo)

	const toggleReviewForm = () => {
		if(showImageForm === true) {
			setShowImageForm(false)
			setShowReviewForm(true)
		} else {
			setShowReviewForm(!showReviewForm)
		}
	}

	const toggleImageForm = () => {
		if(showReviewForm === true) {
			setShowReviewForm(false)
			setShowImageForm(true)
		} else {
			setShowImageForm(!showImageForm)
		}
	}

	console.log('BusinessDetail - reviewInfo', reviewInfo)

	console.log('BusinessDetail - radio', radio)

	const handleReviewChange = e => {
		const value = e.target.value
		setReviewInfo({...reviewInfo, [e.target.name]: value})
		if(value > 0 && value < 6) {
			setRadio(value)
		}
	}

	const handleImageChange = e => {
		const value = e.target.value
		setImageInfo({...imageInfo, [e.target.name]: value})
	}

	const renderImage = async () => {
		const res = await getImages(props.user.token)
		props.setImages(res.data)
	}

	const renderReview = async () => {
		const res = await getReviews(props.user.token)
		props.setReviews(res.data)
	}

	const renderBusiness = async () => {
		const res = await getBusinesses(props.user.token)
		props.setBusinesses(res.data)
	}

	const handleReviewSubmit = async (e) => {
		e.preventDefault()
		await createReview(reviewInfo, props.user.token).then(res => {
			if(res.status === 201) {
				setShowReviewForm(false)
				setReviewInfo({})
				setRadio()
				renderBusiness()
				renderReview()
			} else {
				alert('An error occured while trying to create your review. Please make sure you have filled out both fields.')
				setRadio()
			}
		})
	}

	const handleImageSubmit = async (e) => {
		e.preventDefault()
		await createImage(imageInfo, props.user.token).then(res => {
			if(res.status === 201) {
				setShowImageForm(false)
				setImageInfo({})
				renderImage()
				setImageAdded(true)
				setImageAdded(false)
			} else {
				alert('An error occured while trying to post your image. Please make sure both fields are properly filled out.')
			}
		})
	}

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

		let avgRating = Math.round(ratingSum / business[0].reviews.length)

		const businessImages = props.images.filter(images => {
			return images.business === business[0].id
		})

		const images = businessImages.map((image, i) => {
			return(
				<div key={i} className='carousel-image' style={{backgroundImage: `url(${image.image_url})`}}>
				</div>
			);
		})

		const businessReviews = props.reviews.filter(reviews => {
			return reviews.business === business[0].id
		})

		console.log('BusinessDetail - businessReviews', businessReviews)

		const reviews = businessReviews.map((review, i) => {
			return(
				<div key={i} className='business-review'>
					<p>
						{review.rating === 1 && <><MDBIcon size ='lg' icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/></>}
						{review.rating === 2 && <><MDBIcon size ='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/></>}
						{review.rating === 3 && <><MDBIcon size ='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/></>}
						{review.rating === 4 && <><MDBIcon size ='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size ='lg' far icon='star' className='red-text'/></>}
						{review.rating === 5 && <><MDBIcon size ='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/><MDBIcon size='lg' icon='star' className='red-text'/></>}
						&nbsp; &nbsp;
						{moment(review.created_at).format('M/D/YYYY')}
					</p>
					<p className='review-owner'>{review.owner}</p>
					<p>{review.review}</p>
					<hr/>
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
							&nbsp; &nbsp;
							{business[0].reviews.length} Reviews
							<p className='detail-price-category'>{business[0].price} ・ {business[0].categories}</p>
							<MDBBtn color='danger' className='review-btn' onClick={toggleReviewForm}>
								<MDBIcon far icon='star' className='white-text' /> Write A Review
							</MDBBtn>
							<MDBBtn outline color='grey darken-4'  onClick={toggleImageForm}>
								<MDBIcon icon='camera' className='grey-text darken-4' /> Add A Photo
							</MDBBtn>
							<hr/>

							{showReviewForm &&
								<>Select rating:
									<MDBFormInline>
									<MDBInput
										checked={radio == 1 ? true : false}
										value='1'
										label='1'
										type='radio'
										id='radio1'
										containerClass='mr-5'
										onClick={handleReviewChange}
										name='rating'
									/>
									<MDBInput 
										checked={radio == 2 ? true : false}
										value='2'
										label='2'
										type='radio'
										id='radio2'
										containerClass='mr-5'
										onClick={handleReviewChange}
										name='rating'
									/>
									<MDBInput 
										checked={radio == 3 ? true : false}
										value='3'
										label='3'
										type='radio'
										id='radio3'
										containerClass='mr-5'
										onClick={handleReviewChange}
										name='rating'
									/>
									<MDBInput 
										checked={radio == 4 ? true : false}
										value='4'
										label='4'
										type='radio'
										id='radio4'
										containerClass='mr-5'
										onClick={handleReviewChange}
										name='rating'
									/>
									<MDBInput 
										checked={radio == 5 ? true : false}
										value='5'
										label='5'
										type='radio'
										id='radio5'
										containerClass='mr-5'
										onClick={handleReviewChange}
										name='rating'
									/>
								</MDBFormInline>
							<form onSubmit={handleReviewSubmit}>
								<MDBInput type='textarea' label='Write review here...' rows='7' onChange={handleReviewChange} name='review' />
								<MDBBtn color='danger' className='review-btn' onClick={handleReviewChange} type='submit' name='business' value={business[0].id}>
									<MDBIcon icon='pencil-alt' className='white-text' /> Post Review
								</MDBBtn>
							</form>
							</>}

							{showImageForm && <>
							<form onSubmit={handleImageSubmit}> 
								<MDBInput 
									label='Put image URL here...' 
									group 
									type='url' 
									validate
									error='wrong'
									success='right'
									onChange={handleImageChange} 
									name='image_url' 
									value={imageInfo.image_url}/>
								<MDBInput 
									label='Write image description here...' 
									group 
									type='text'
									validate
									error='wrong'
									success='right'
									onChange={handleImageChange} 
									name='description' 
									value={imageInfo.description} />
								<MDBBtn outline color='grey darken-4' onClick={handleImageChange} type='submit' name='business' value={business[0].id}>
									<MDBIcon icon='file-upload' className='grey-text darken-4' /> Upload Photo
								</MDBBtn>
							</form>
							</>}
							
							<h1 className='reviews-header'>Reviews</h1>
							{reviews.reverse()}
						</MDBCol>
						<MDBCol md='4' className='detail-contact-info-col'>
							<MDBRow className='detail-contact-info-row'>
								<MDBCol md='4' className='detail-info-col-icon detail-address-icon-border'>
									<MDBIcon icon='address-card' size='3x' />
								</MDBCol>
								<MDBCol md='8' className='detail-info-col detail-address-border'>
									<p className='detail-contact-info'>
										{business[0].location_address}
										<br/>
										{business[0].location_city}, {business[0].location_state}
									</p>
								</MDBCol>
							</MDBRow>
							<hr/>
							<MDBRow className='detail-contact-info-row'>
								<MDBCol md='4' className='detail-info-col-icon detail-website-border'>
									<MDBIcon icon='external-link-square-alt' size='3x' />
								</MDBCol>
								<MDBCol md='8' className='detail-info-col'>
									<a href={business[0].website} target='_blank' rel="noopener noreferrer">{business[0].website}</a>
								</MDBCol>
							</MDBRow>
							<hr/>
							<MDBRow className='detail-contact-info-row'>
								<MDBCol md='4' className='detail-info-col-icon detail-phone-icon-border'>
									<MDBIcon icon='phone-square-alt' size='3x' />
								</MDBCol>
								<MDBCol md='8' className='detail-info-col detail-phone-border'>
									<p className='detail-contact-info'>({business[0].phone.substring(0, 3)}) {business[0].phone.substring(3, 6)} - {business[0].phone.substring(6, 10)}</p>
								</MDBCol>
							</MDBRow>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
				<ScrollToTop />
				{imageAdded && <ScrollToTop />}
			</>
		)
	} else {
		return <></>
	}
}

export default BusinessDetail