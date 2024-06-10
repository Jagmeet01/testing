import React, { Fragment, useEffect } from "react";
import heroSectionImg from ".././assests/images/heroSectionImg.jpg";
import ProductCard from "./ProductCard";
import { Helmet } from "react-helmet";
import { clearErrors, getProduct } from "../Redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
        dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [error, alert, dispatch]);



  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>One Store</title>
          </Helmet>

          <section>
            <div>
              <img src={heroSectionImg} alt="Hero Section Image" />
            </div>
          </section>

          <section>
            <div className="flex justify-center">
              <div className="text-center w-1/3 mt-16">
                <h2 className="text-slate-600 font-medium text-2xl border-b-2 border-black pb-2 mb-2">
                  Featured Products
                </h2>
              </div>
            </div>

            <div>
              <div className="container">
                <div className="flex justify-center w-4/5 flex-wrap	gap-4 my-6">
                  {products?.map((product) => (
                    <ProductCard product={product} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </Fragment>
  );
};

export default Home;
