import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useGetCategoriesQuery } from "../slices/apiSlice";

const FeatureOne = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
      >
        <i className="ph ph-caret-right" />
      </button>
    );
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
      >
        <i className="ph ph-caret-left" />
      </button>
    );
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 10,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1699, settings: { slidesToShow: 9 } },
      { breakpoint: 1599, settings: { slidesToShow: 8 } },
      { breakpoint: 1399, settings: { slidesToShow: 6 } },
      { breakpoint: 992, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 575, settings: { slidesToShow: 3 } },
      { breakpoint: 424, settings: { slidesToShow: 2 } },
      { breakpoint: 359, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="feature" id="featureSection">
      <div className="container container-lg">
        <div className="position-relative arrow-center">
          {/* Optional: remove buttons here if you're using the custom ones in settings */}
          <div className="feature-item-wrapper">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Failed to load categories</p>
            ) : (
              <Slider {...settings}>
                {categories?.categories?.slice(0, 10).map((category) => (
                  <div className="feature-item text-center" key={category.id}>
                    <div className="feature-item__thumb rounded-circle">
                      <Link
                        to={`/shop/${category.id}`}
                        className="w-100 h-100 flex-center"
                      >
                        <img
                          src={`/assets/images/thumbs/${
                            category.image || "default.png"
                          }`}
                          alt={category.name}
                        />
                      </Link>
                    </div>
                    <div className="feature-item__content mt-16">
                      <h6 className="text-lg mb-8">
                        <Link
                          to={`/shop/${category.id}`}
                          className="text-inherit"
                        >
                          {category.name}
                        </Link>
                      </h6>
                      <span className="text-sm text-gray-400">
                        {category.product_count || 0}+ Products
                      </span>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureOne;
