import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
import PrivacyPolicy from "../components/PrivacyPolicy";
import Breadcrumb from "../components/Breadcrumb";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Preloader />
      <ScrollToTop smooth color="#299E60" />
      <ColorInit color={false} />
      <HeaderOne />
      <Breadcrumb title={"Privacy Policy"} />
      <PrivacyPolicy />
      <FooterOne />
      <BottomFooter />
    </>
  );
};

export default PrivacyPolicyPage;
