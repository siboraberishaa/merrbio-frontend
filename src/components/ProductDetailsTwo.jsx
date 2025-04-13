import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { useGetProductQuery } from "../slices/apiSlice";
import ContactModal from "./ContactModal";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

const ProductDetailsTwo = () => {
  const { t } = useTranslation();
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetProductQuery(productId);

  const product = data?.product;

  const productImages = [
    "/assets/images/thumbs/product-details-two-thumb1.png",
    "/assets/images/thumbs/product-details-two-thumb2.png",
    "/assets/images/thumbs/product-details-two-thumb3.png",
    "/assets/images/thumbs/product-details-two-thumb1.png",
    "/assets/images/thumbs/product-details-two-thumb2.png",
  ];

  // increment & decrement
  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prevQty) => prevQty + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQty) => prevQty - 1);
    }
  };

  const [mainImage, setMainImage] = useState(productImages[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCartHandler = () => {
    if (product && quantity > 0 && quantity <= product.stock) {
      dispatch(
        addToCart({
          ...product,
          qty: quantity,
        })
      );
      toast.success(`${product.name} added to cart`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Failed to add product to cart", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const settingsThumbs = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  };
  return (
    <section className="product-details py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xl-9">
            <div className="row gy-4">
              <div className="col-xl-6">
                <div className="product-details__left">
                  <div className="product-details__thumb-slider border border-gray-100 rounded-16">
                    <div className="">
                      <div className="product-details__thumb flex-center h-100">
                        <img src={mainImage} alt="Main Product" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-24">
                    <div className="product-details__images-slider">
                      <Slider {...settingsThumbs}>
                        {productImages.map((image, index) => (
                          <div
                            className="center max-w-120 max-h-120 h-100 flex-center border border-gray-100 rounded-16 p-8"
                            key={index}
                            onClick={() => setMainImage(image)}
                          >
                            <img
                              className="thum"
                              src={image}
                              alt={`Thumbnail ${index}`}
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="product-details__content">
                  <h5 className="mb-12">{product?.name}</h5>
                  <div className="flex-align flex-wrap gap-12">
                    <div className="flex-align gap-12 flex-wrap">
                      <div className="flex-align gap-8">
                        <span className="text-15 fw-medium text-warning-600 d-flex">
                          <i className="ph-fill ph-star" />
                        </span>
                        <span className="text-15 fw-medium text-warning-600 d-flex">
                          <i className="ph-fill ph-star" />
                        </span>
                        <span className="text-15 fw-medium text-warning-600 d-flex">
                          <i className="ph-fill ph-star" />
                        </span>
                        <span className="text-15 fw-medium text-warning-600 d-flex">
                          <i className="ph-fill ph-star" />
                        </span>
                        <span className="text-15 fw-medium text-warning-600 d-flex">
                          <i className="ph-fill ph-star" />
                        </span>
                      </div>
                      <span className="text-sm fw-medium text-neutral-600">
                        {t("product.details.starRating")}
                      </span>
                      <span className="text-sm fw-medium text-gray-500">
                        (22 {t("product.details.reviews")})
                      </span>
                    </div>
                    <span className="text-sm fw-medium text-gray-500">|</span>
                    <span className="text-gray-900">
                      <span className="text-gray-400">
                        {t("product.details.sku")}:&nbsp;
                      </span>
                      EB4DRP
                    </span>
                  </div>
                  <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                  <p className="text-gray-700">{product?.body}</p>
                  <div className="my-32 flex-align gap-16 flex-wrap">
                    <div className="flex-align gap-8">
                      <h6 className="text-xl mb-0 fw-bold">
                        {product?.price} &euro;
                      </h6>
                    </div>
                  </div>
                  <div className="my-32 flex-align flex-wrap gap-12">
                    <Link
                      to="#"
                      className="px-12 py-8 text-sm rounded-8 flex-align gap-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600"
                    >
                      {t("product.details.monthlyEmi", { amount: "15.00" })}
                      <i className="ph ph-caret-right" />
                    </Link>
                    <Link
                      to="#"
                      className="px-12 py-8 text-sm rounded-8 flex-align gap-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600"
                    >
                      {t("product.details.shippingCharge")}
                      <i className="ph ph-caret-right" />
                    </Link>
                    <Link
                      to="#"
                      className="px-12 py-8 text-sm rounded-8 flex-align gap-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600"
                    >
                      {t("product.details.securityPrivacy")}
                      <i className="ph ph-caret-right" />
                    </Link>
                  </div>

                  <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsModalOpen(true);
                    }}
                    className="btn btn-main flex-center gap-8 rounded-8 py-16"
                  >
                    <i className="ph ph-whatsapp-logo text-lg" />
                    {t("product.details.requestInfo")}
                  </Link>
                  <ContactModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    productUser={product?.user?.email} // Make sure we're accessing the nested email property correctly
                  />
                  <div className="mt-32">
                    <span className="fw-medium text-gray-900">
                      {t("product.details.safeCheckout")}
                    </span>
                    <div className="mt-10">
                      <img src="/assets/images/thumbs/gateway-img.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="product-details__sidebar py-40 px-32 border border-gray-100 rounded-16">
              <div className="mb-32">
                <label
                  htmlFor="stock"
                  className="text-lg mb-8 text-heading fw-semibold d-block"
                >
                  {t("product.details.totalStock")}: {product?.stock}
                </label>
                <span className="text-xl d-flex">
                  <i className="ph ph-location" />
                </span>
                <div className="d-flex rounded-4 overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    type="button"
                    className="quantity__minus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white"
                  >
                    <i className="ph ph-minus" />
                  </button>
                  <input
                    type="number"
                    className="quantity__input flex-grow-1 border border-gray-100 border-start-0 border-end-0 text-center w-32 px-16"
                    id="stock"
                    value={quantity}
                    readOnly
                  />
                  <button
                    onClick={incrementQuantity}
                    type="button"
                    className="quantity__plus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white"
                  >
                    <i className="ph ph-plus" />
                  </button>
                </div>
              </div>
              <div className="mb-32">
                <div className="flex-between flex-wrap gap-8 border-bottom border-gray-100 pb-16 mb-16">
                  <span className="text-gray-500">Price</span>
                  <h6 className="text-lg mb-0">{product?.price} &euro;</h6>
                </div>
                <div className="flex-between flex-wrap gap-8">
                  <span className="text-gray-500">Shipping (Standard)</span>
                  <h6 className="text-lg mb-0">
                    {product?.price < 20 ? "2.00" : "0.00"} &euro;
                  </h6>
                </div>
              </div>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  addToCartHandler();
                }}
                className={`btn btn-main flex-center gap-8 rounded-8 py-16 fw-normal mt-48 ${
                  !product?.stock ? "disabled opacity-50" : ""
                }`}
                disabled={!product?.stock}
              >
                <i className="ph ph-shopping-cart-simple text-lg" />
                {product?.stock
                  ? t("product.details.addToCart")
                  : t("recommended.unavailable")}
              </Link>

              <div className="mt-32">
                <div className="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-14">
                  <span className="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0">
                    <i className="ph-fill ph-truck" />
                  </span>
                  <span className="text-sm text-neutral-600">
                    Ship from <span className="fw-semibold">MerrBio</span>{" "}
                  </span>
                </div>
                <div className="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-0">
                  <span className="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0">
                    <i className="ph-fill ph-storefront" />
                  </span>
                  <span className="text-sm text-neutral-600">
                    Sold by:{" "}
                    <span className="fw-semibold">{product?.user?.name}</span>{" "}
                  </span>
                </div>
              </div>
              <div className="mt-32">
                <div className="px-32 py-16 rounded-8 border border-gray-100 flex-between gap-8">
                  <Link to="#" className="d-flex text-main-600 text-28">
                    <i className="ph-fill ph-chats-teardrop" />
                  </Link>
                  <span className="h-26 border border-gray-100" />
                  <div className="dropdown on-hover-item">
                    <button
                      className="d-flex text-main-600 text-28"
                      type="button"
                    >
                      <i className="ph-fill ph-share-network" />
                    </button>
                    <div className="on-hover-dropdown common-dropdown border-0 inset-inline-start-auto inset-inline-end-0">
                      <ul className="flex-align gap-16">
                        <li>
                          <Link
                            to="/https://www.facebook.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-facebook-logo" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/https://www.twitter.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-twitter-logo" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/https://www.linkedin.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-instagram-logo" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/https://www.pinterest.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-linkedin-logo" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-80">
          <div className="product-dContent border rounded-24">
            <div className="product-dContent__header border-bottom border-gray-100 flex-between flex-wrap gap-16">
              <ul
                className="nav common-tab nav-pills mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-description-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-description"
                    type="button"
                    role="tab"
                    aria-controls="pills-description"
                    aria-selected="true"
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-reviews-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-reviews"
                    type="button"
                    role="tab"
                    aria-controls="pills-reviews"
                    aria-selected="false"
                  >
                    Reviews
                  </button>
                </li>
              </ul>
              <Link
                to="#"
                className="btn bg-color-one rounded-16 flex-align gap-8 text-main-600 hover-bg-main-600 hover-text-white"
              >
                <img src="assets/images/icon/satisfaction-icon.png" alt="" />
                100% Satisfaction Guaranteed
              </Link>
            </div>
            <div className="product-dContent__box">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-description"
                  role="tabpanel"
                  aria-labelledby="pills-description-tab"
                  tabIndex={0}
                >
                  <div className="mb-40">
                    <h6 className="mb-24">Product Description</h6>
                    <p>{product?.body}</p>

                    <ul className="mt-32">
                      <li className="text-gray-400 mb-4">Made in ALBANIA</li>
                      <li className="text-gray-400 mb-4">Ready To Eat!</li>
                    </ul>
                  </div>
                  <div className="mb-40">
                    <h6 className="mb-24">Product Specifications</h6>
                    <ul className="mt-32">
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          Product Type:
                          <span className="text-gray-500"> BIO</span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          Product Name:
                          <span className="text-gray-500">
                            {" "}
                            {product?.name}{" "}
                          </span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          Brand:
                          <span className="text-gray-500"> BIO</span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          Item Code:
                          <span className="text-gray-500"> 331539</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-40">
                    <h6 className="mb-24">Nutrition Facts</h6>
                    <ul className="mt-32">
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          {" "}
                          Total Fat 10g 13%
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          {" "}
                          Saturated Fat 1.5g 7%
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          {" "}
                          Cholesterol 0mg 0%
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          {" "}
                          Sodium 170mg 7%
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i className="ph ph-check" />
                        </span>
                        <span className="text-heading fw-medium">
                          {" "}
                          Potassium 350mg 6%
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-reviews"
                  role="tabpanel"
                  aria-labelledby="pills-reviews-tab"
                  tabIndex={0}
                >
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <h6 className="mb-24">Product Description</h6>
                      <div className="d-flex align-items-start gap-24 pb-44 border-bottom border-gray-100 mb-44">
                        <img
                          src="/assets/images/thumbs/comment-img1.png"
                          alt=""
                          className="w-52 h-52 object-fit-cover rounded-circle flex-shrink-0"
                        />
                        <div className="flex-grow-1">
                          <div className="flex-between align-items-start gap-8 ">
                            <div className="">
                              <h6 className="mb-12 text-md">Nicolas cage</h6>
                              <div className="flex-align gap-8">
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                            </div>
                            <span className="text-gray-800 text-xs">
                              3 Days ago
                            </span>
                          </div>
                          <h6 className="mb-14 text-md mt-24">
                            Greate Product
                          </h6>
                          <p className="text-gray-700">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration
                            in some form, by injected humour
                          </p>
                          <div className="flex-align gap-20 mt-44">
                            <button className="flex-align gap-12 text-gray-700 hover-text-main-600">
                              <i className="ph-bold ph-thumbs-up" />
                              Like
                            </button>
                            <Link
                              to="#comment-form"
                              className="flex-align gap-12 text-gray-700 hover-text-main-600"
                            >
                              <i className="ph-bold ph-arrow-bend-up-left" />
                              Replay
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-start gap-24">
                        <img
                          src="/assets/images/thumbs/comment-img1.png"
                          alt=""
                          className="w-52 h-52 object-fit-cover rounded-circle flex-shrink-0"
                        />
                        <div className="flex-grow-1">
                          <div className="flex-between align-items-start gap-8 ">
                            <div className="">
                              <h6 className="mb-12 text-md">Nicolas cage</h6>
                              <div className="flex-align gap-8">
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                            </div>
                            <span className="text-gray-800 text-xs">
                              3 Days ago
                            </span>
                          </div>
                          <h6 className="mb-14 text-md mt-24">
                            Greate Product
                          </h6>
                          <p className="text-gray-700">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration
                            in some form, by injected humour
                          </p>
                          <div className="flex-align gap-20 mt-44">
                            <button className="flex-align gap-12 text-gray-700 hover-text-main-600">
                              <i className="ph-bold ph-thumbs-up" />
                              Like
                            </button>
                            <Link
                              to="#comment-form"
                              className="flex-align gap-12 text-gray-700 hover-text-main-600"
                            >
                              <i className="ph-bold ph-arrow-bend-up-left" />
                              Replay
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="mt-56">
                        <div className="">
                          <h6 className="mb-24">Write a Review</h6>
                          <span className="text-heading mb-8">
                            What is it like to Product?
                          </span>
                          <div className="flex-align gap-8">
                            <span className="text-15 fw-medium text-warning-600 d-flex">
                              <i className="ph-fill ph-star" />
                            </span>
                            <span className="text-15 fw-medium text-warning-600 d-flex">
                              <i className="ph-fill ph-star" />
                            </span>
                            <span className="text-15 fw-medium text-warning-600 d-flex">
                              <i className="ph-fill ph-star" />
                            </span>
                            <span className="text-15 fw-medium text-warning-600 d-flex">
                              <i className="ph-fill ph-star" />
                            </span>
                            <span className="text-15 fw-medium text-warning-600 d-flex">
                              <i className="ph-fill ph-star" />
                            </span>
                          </div>
                        </div>
                        <div className="mt-32">
                          <form action="#">
                            <div className="mb-32">
                              <label
                                htmlFor="title"
                                className="text-neutral-600 mb-8"
                              >
                                Review Title
                              </label>
                              <input
                                type="text"
                                className="common-input rounded-8"
                                id="title"
                                placeholder="Great Products"
                              />
                            </div>
                            <div className="mb-32">
                              <label
                                htmlFor="desc"
                                className="text-neutral-600 mb-8"
                              >
                                Review Content
                              </label>
                              <textarea
                                className="common-input rounded-8"
                                id="desc"
                                defaultValue={
                                  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                                }
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-main rounded-pill mt-48"
                            >
                              Submit Review
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="ms-xxl-5">
                        <h6 className="mb-24">Customers Feedback</h6>
                        <div className="d-flex flex-wrap gap-44">
                          <div className="border border-gray-100 rounded-8 px-40 py-52 flex-center flex-column flex-shrink-0 text-center">
                            <h2 className="mb-6 text-main-600">4.8</h2>
                            <div className="flex-center gap-8">
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                            </div>
                            <span className="mt-16 text-gray-500">
                              Average Product Rating
                            </span>
                          </div>
                          <div className="border border-gray-100 rounded-8 px-24 py-40 flex-grow-1">
                            <div className="flex-align gap-8 mb-20">
                              <span className="text-gray-900 flex-shrink-0">
                                5
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={70}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "70%" }}
                                />
                              </div>
                              <div className="flex-align gap-4">
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                124
                              </span>
                            </div>
                            <div className="flex-align gap-8 mb-20">
                              <span className="text-gray-900 flex-shrink-0">
                                4
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={50}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "50%" }}
                                />
                              </div>
                              <div className="flex-align gap-4">
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                52
                              </span>
                            </div>
                            <div className="flex-align gap-8 mb-20">
                              <span className="text-gray-900 flex-shrink-0">
                                3
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={35}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "35%" }}
                                />
                              </div>
                              <div className="flex-align gap-4">
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                12
                              </span>
                            </div>
                            <div className="flex-align gap-8 mb-20">
                              <span className="text-gray-900 flex-shrink-0">
                                2
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={20}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "20%" }}
                                />
                              </div>
                              <div className="flex-align gap-4">
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                5
                              </span>
                            </div>
                            <div className="flex-align gap-8 mb-0">
                              <span className="text-gray-900 flex-shrink-0">
                                1
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={5}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "5%" }}
                                />
                              </div>
                              <div className="flex-align gap-4">
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                2
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsTwo;
