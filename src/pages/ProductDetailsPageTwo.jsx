import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import Breadcrumb from "../components/Breadcrumb";
import ProductDetailsTwo from "../components/ProductDetailsTwo";
import ShippingOne from "../components/ShippingOne";
import BottomFooter from "../components/BottomFooter";
import ScrollToTop from "react-scroll-to-top";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";


const ProductDetailsPageTwo = () => {

  return (
    <>
      {/* ColorInit */}
      <ColorInit color={false} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#FA6400" />

      {/* Preloader */}
      <Preloader />

      {/* HeaderTwo */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title={"Product Details"} />

      {/* ProductDetailsTwo */}
      <ProductDetailsTwo />

      {/* ShippingOne */}
      <ShippingOne />

      <FooterOne />

      {/* BottomFooter */}
      <BottomFooter />


    </>
  );
};

export default ProductDetailsPageTwo;
