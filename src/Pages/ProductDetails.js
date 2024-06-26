import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../Redux/actions/productAction";
import "./ProductDetails.css";

import ReviewCard from "./ReviewCard.js"
import Loader from "../component/Loader/Loader.js"
import {useAlert} from 'react-alert'
import { addItemsToCart } from "../Redux/actions/cartAction.js"
import { Dialog,DialogActions, DialogContent, DialogTitle, Button, Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from "../Redux/Constants.js";


const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const {success, error: reviewError } = useSelector((state) => state.newReview)
  const { isAuthenticated } = useSelector((state)=> state.user)

  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const increaseQuantity = () => {
    if(product.Stock <= quantity) return;
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if(1 >= quantity) return;
    setQuantity(quantity - 1)
  }


  const addToCartHandler = () =>{
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item add To Cart Success")
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true)
  }

  const reviewSubmitHandler = () =>{

    if (!rating || !comment) {
      alert.error("Please provide a rating and comment");
      return;
    }

    const myForm =  new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false)  
  }

  useEffect(() => {
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    if(reviewError){
      alert.error(reviewError);
      dispatch(clearErrors());
  }
  if(success){
    alert.success("Review Submitted Successfully");
    dispatch({type:NEW_REVIEW_RESET});
  }


    dispatch(getProductDetails(id));
  }, [id, error, alert, dispatch, reviewError, success, isAuthenticated]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
        {loading ? <Loader /> :(
        <>
      <div className="productDetails">
        <div className="carousel ">
          <Carousel>
            {product.images &&
              product.images.map((items, i) => (
               <div className="h-64" >
                 <img
                  className="carouselImage mx-auto h-full"
                  key={items.url}
                  src={items.url}
                  alt={`${i} Slide`}
                />
               </div>
              ))}
          </Carousel>
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            
          </div>
          <div className="detailsBlock-2">
            <Rating {...options} />
            <span className="detailsBlock-2-span">({product.numOfReviews} Reviews)</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
             {product.Stock > 0 &&  <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input  readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                </div>
                <button onClick={addToCartHandler}>Add to Cart</button>
            </div>}

            <p>Status :
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>

          <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
        </div>
      </div>



      <h3 className="reviewHeading">Reviews</h3>


      <Dialog 
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating 
            onChange={(e)=> setRating(e.target.value)}
            value={rating}
            size="large"
          />

          <textarea 
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e)=> setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
          <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>

      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
            {product.reviews && 
            product.reviews.map((review)=> <ReviewCard review={review} />)}
        </div>  
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )
    }
    </>)}
    </>
  );
};

export default ProductDetails;
