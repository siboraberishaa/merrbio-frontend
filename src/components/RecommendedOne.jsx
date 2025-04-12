import React from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../slices/apiSlice";
const RecommendedOne = ({}) => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <section className="recommended">
      <div className="container container-lg">
        <div className="section-heading flex-between flex-wrap gap-16">
          <h5 className="mb-0">Recommended for you</h5>
        </div>
        <div className="row g-12">
          {products?.products.map((product) => {
            const isInactive = product.status !== "active";

            return (
              <div
                key={product.id}
                className="col-xxl-2 col-lg-3 col-sm-4 col-6"
              >
                <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                  <Link
                    to="/product-details-two"
                    className="product-card__thumb flex-center rounded-8 position-relative"
                  >
                    <img
                      src="assets/images/thumbs/product-two-img1.png"
                      alt=""
                      className="w-auto max-w-unset"
                    />
                    <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                      Best Sale{" "}
                    </span>
                  </Link>
                  <div className="product-card__content p-sm-2">
                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                      {product.name}
                    </h6>
                    <p className="text-sm text-gray-500 mb-8">{product.body}</p>
                    <div className="product-card__price mb-8">
                      <span className="text-heading text-md fw-semibold">
                        ${parseFloat(product.price).toFixed(2)}{" "}
                        <span className="text-gray-500 fw-normal">/Qty</span>
                      </span>
                    </div>
                    <div className="product-card__status mb-8">
                      <span
                        className={`badge text-xs fw-bold px-8 py-4 rounded-pill ${
                          isInactive
                            ? "bg-danger-100 text-danger-600"
                            : "bg-success-100 text-success-600"
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>
                    <Link
                      to={isInactive ? "#" : "/cart"}
                      className={`product-card__cart btn py-11 px-24 rounded-pill flex-align gap-8 mt-12 w-100 justify-content-center ${
                        isInactive
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                          : "bg-main-50 text-main-600 hover-bg-main-600 hover-text-white"
                      }`}
                    >
                      {isInactive ? "Unavailable" : "Add To Cart"}{" "}
                      <i className="ph ph-shopping-cart" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecommendedOne;
