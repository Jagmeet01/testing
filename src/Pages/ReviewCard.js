import React from 'react'
import { Rating } from '@mui/material';
import profileJpg from '.././assests/images/Profile.jpg'

const ReviewCard = ({review}) => {


      const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      };

  return (
    <>
        <div className='reviewCard'>
            <img src={profileJpg} alt='User' />
            <p>{review.name}</p>
            <Rating {...options} />
            <span className='reviewCardComment'>{review.comment}</span>
        </div> 

    </>
  )
}

export default ReviewCard