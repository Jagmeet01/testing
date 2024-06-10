import React from "react";
import { Link } from "react-router-dom";
import { Rating } from '@mui/material';

const productCard = ({ product }) => {
  const deafaultImg =
    "https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

    const options = {
      value: product.ratings,
      readOnly: true,
      precision: 0.5,
    };

  return (
    <>
      <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product?.images[0]?.url || deafaultImg} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <Rating {...options} />{" "}
          <span className="productCardSpan"> ({product.numOfReviews} Reviews) </span>
        </div>
        <span>{`₹${product.price}`}</span>
      </Link>
    </>
  );
};

export default productCard;
