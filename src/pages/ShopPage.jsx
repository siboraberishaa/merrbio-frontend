import React from "react";
import Preloader from "../helper/Preloader";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import ShopSection from "../components/ShopSection";
import ShippingTwo from "../components/ShippingTwo";
import FooterTwo from "../components/FooterTwo";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import { useGetCategoriesQuery, useGetProductsQuery } from "../slices/apiSlice";

const ShopPage = () => {

  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const { data: products, isLoading: productsLoading, isError: productsError } = useGetProductsQuery();



  return (
    <>
      {/* ColorInit */}
      <ColorInit color={false} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#FA6400" />

      {/* Preloader */}
      <Preloader />

      {/* HeaderOne */}
      <HeaderOne />

      {/* Breadcrumb */}
      {/* <Breadcrumb title={"Shop"} /> */}

      {/* ShopSection */}
      <ShopSection products={products?.products} categories={categories?.categories} />

      {/* ShippingTwo */}
      <ShippingTwo />

      {/* FooterTwo */}
      <FooterOne />


    </>
  );
};

export default ShopPage;
