import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FooterOne = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer py-120">
      <img
        src="/assets/images/bg/body-bottom-bg.png"
        alt="BG"
        className="body-bottom-bg"
      />
      <div className="container container-lg">
        <div className="footer-item-wrapper d-flex align-items-start flex-wrap">
          <div className="footer-item">
            <div className="footer-item__logo">
              <Link to="/">
                <img src="/assets/images/logo/logo.png" alt="MerrBio Logo" />
              </Link>
            </div>
            <p className="mb-24">{t("footer.description")}</p>
            <div className="flex-align gap-16 mb-16">
              <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0">
                <i className="ph-fill ph-map-pin" />
              </span>
              <span className="text-md text-gray-900">
                {t("footer.address")}
              </span>
            </div>
            <div className="flex-align gap-16 mb-16">
              <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0">
                <i className="ph-fill ph-phone-call" />
              </span>
              <div className="flex-align gap-16 flex-wrap">
                <Link
                  to="/tel:+00123456789"
                  className="text-md text-gray-900 hover-text-main-600"
                >
                  +00 123 456 789
                </Link>
                <span className="text-md text-main-600">{t("footer.or")}</span>
                <Link
                  to="/tel:+00987654012"
                  className="text-md text-gray-900 hover-text-main-600"
                >
                  +00 987 654 012
                </Link>
              </div>
            </div>
            <div className="flex-align gap-16 mb-16">
              <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0">
                <i className="ph-fill ph-envelope" />
              </span>
              <Link
                to="/mailto:support24@merrbio.com"
                className="text-md text-gray-900 hover-text-main-600"
              >
                support24@merrbio.com
              </Link>
            </div>
          </div>
          <div className="footer-item">
            <h6 className="footer-item__title">
              {t("footer.sections.information")}
            </h6>
            <ul className="footer-menu">
              <li className="mb-16">
                <Link to="/about" className="text-gray-600 hover-text-main-600">
                  {t("footer.sections.about")}
                </Link>
              </li>
              <li className="mb-16">
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover-text-main-600"
                >
                  {t("footer.sections.privacyPolicy")}
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/shop" className="text-gray-600 hover-text-main-600">
                  {t("footer.sections.shop")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h6 className="footer-item__title">
              {t("footer.sections.customerSupport")}
            </h6>
            <ul className="footer-menu">
              <li className="mb-16">
                <Link
                  to="/contact"
                  className="text-gray-600 hover-text-main-600"
                >
                  {t("footer.sections.contact")}
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/blog" className="text-gray-600 hover-text-main-600">
                  {t("footer.sections.blog")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h6 className="footer-item__title">
              {t("footer.sections.myAccount")}
            </h6>
            <ul className="footer-menu">
              <li className="mb-16">
                <Link
                  to="/account"
                  className="text-gray-600 hover-text-main-600"
                >
                  {t("footer.sections.myAccount")}
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/cart" className="text-gray-600 hover-text-main-600">
                  {t("footer.sections.shoppingCart")}
                </Link>
              </li>
              <li className="mb-16">
                <Link
                  to="/checkout"
                  className="text-gray-600 hover-text-main-600"
                >
                  {t("footer.sections.checkout")}
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/login" className="text-gray-600 hover-text-main-600">
                  {t("footer.sections.login")}
                </Link>
              </li>
              <li className="mb-16">
                <Link
                  to="/register"
                  className="text-gray-600 hover-text-main-600"
                >
                  {t("footer.sections.register")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h6 className="footer-item__title">{t("footer.sections.shop")}</h6>
            <ul className="footer-menu">
              <li className="mb-16">
                <Link to="/shop" className="text-gray-600 hover-text-main-600">
                  {t("footer.sections.allProducts")}
                </Link>
              </li>
              <li className="mb-16">
                <Link
                  to="/product-details"
                  className="text-gray-600 hover-text-main-600"
                >
                  {t("footer.sections.productDetails")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h6 className="">{t("footer.mobile.title")}</h6>
            <p className="mb-16">{t("footer.mobile.description")}</p>
            <div className="flex-align gap-8 my-32">
              <Link to="/https://www.apple.com/store" className="">
                <img
                  className="rounded"
                  src="/assets/images/thumbs/store-img1.png"
                  alt=""
                />
              </Link>
              <Link to="/https://play.google.com/store/apps?hl=en" className="">
                <img
                  className="rounded"
                  src="/assets/images/thumbs/store-img2.png"
                  alt=""
                />
              </Link>
            </div>
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
    </footer>
  );
};

export default FooterOne;
