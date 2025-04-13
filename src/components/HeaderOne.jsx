import React, { useEffect, useState, useCallback } from "react";
import query from "jquery";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery, useGetProductsQuery } from "../slices/apiSlice";
import debounce from "lodash/debounce";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const HeaderOne = () => {
  const { t, i18n } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [scroll, setScroll] = useState(false);

  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset < 150) {
        setScroll(false);
      } else if (window.pageYOffset > 150) {
        setScroll(true);
      }
      return () => (window.onscroll = null);
    };
    const selectElement = query(".js-example-basic-single");
    selectElement.select2();

    return () => {
      if (selectElement.data("select2")) {
        selectElement.select2("destroy");
      }
    };
  }, []);

  // Set the default language
  const [selectedLanguage, setSelectedLanguage] = useState("Eng");
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang === "en" ? "Eng" : "Alb");
  };

  // Set the default currency
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  // Mobile menu support
  const [menuActive, setMenuActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleMenuClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  // Search control support
  const [activeSearch, setActiveSearch] = useState(false);
  const handleSearchToggle = () => {
    setActiveSearch(!activeSearch);
  };

  // category control support
  const [activeCategory, setActiveCategory] = useState(false);
  const handleCategoryToggle = () => {
    setActiveCategory(!activeCategory);
  };
  const [activeIndexCat, setActiveIndexCat] = useState(null);
  const handleCatClick = (index) => {
    setActiveIndexCat(activeIndexCat === index ? null : index);
  };

  // Add these new state variables
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Create debounced search
  const debouncedSearch = useCallback(
    debounce((searchText) => {
      setDebouncedTerm(searchText);
    }, 500),
    []
  );

  // Only fetch when we have a debounced term
  const { data: searchResults, isFetching } = useGetProductsQuery(
    debouncedTerm ? { keyword: debouncedTerm } : undefined,
    { skip: !debouncedTerm }
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(true);
    debouncedSearch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?keyword=${searchTerm}`);
      setShowResults(false);
      setSearchTerm("");
      setDebouncedTerm("");
    }
  };

  // Update the cartQuantity calculation to sum all item quantities
  const cartQuantity = cartItems.reduce(
    (acc, item) => acc + (item.qty || 0),
    0
  );

  return (
    <>
      <div className="overlay" />
      <div
        className={`side-overlay ${(menuActive || activeCategory) && "show"}`}
      />
      {/* ==================== Search Box Start Here ==================== */}
      <form
        onSubmit={handleSearchSubmit}
        className={`search-box ${activeSearch && "active"}`}
      >
        <button
          onClick={handleSearchToggle}
          type="button"
          className="search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1"
        >
          <i className="ph ph-x" />
        </button>
        <div className="container">
          <div className="position-relative">
            <input
              type="text"
              className="form-control py-16 px-24 text-xl pe-64"
              placeholder="Search for a product"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowResults(true)}
            />

            {/* Search results dropdown */}
            {showResults && searchTerm && (
              <div
                className="position-absolute start-0 end-0 top-100 border border-gray-200 rounded-bottom shadow-lg"
                style={{ zIndex: 1000, backgroundColor: "#f3faf2" }}
              >
                {isFetching ? (
                  <div className="p-3 text-center">Searching...</div>
                ) : searchResults?.products?.length > 0 ? (
                  <ul className="list-unstyled m-0 p-0">
                    {searchResults.products.map((product) => (
                      <li key={product.id} className="border-bottom">
                        <Link
                          to={`/product-details/${product.id}`}
                          className="d-flex p-3 text-decoration-none text-dark hover-bg-light"
                          onClick={() => {
                            setShowResults(false);
                            setSearchTerm("");
                            setDebouncedTerm("");
                            setActiveSearch(false); // Close mobile search
                          }}
                        >
                          <div>
                            <div className="fw-bold">{product.name}</div>
                            <div className="small text-muted">
                              {product.categorie?.name}
                            </div>
                            <div className="text-main">
                              {product.price}&euro;
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  searchTerm &&
                  !isFetching && (
                    <div className="p-3 text-center text-muted">
                      No products found
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </form>
      {/* ==================== Search Box End Here ==================== */}
      {/* ==================== Mobile Menu Start Here ==================== */}
      <div
        className={`mobile-menu scroll-sm d-lg-none d-block ${
          menuActive && "active"
        }`}
      >
        <button
          onClick={() => {
            handleMenuToggle();
            setActiveIndex(null);
          }}
          type="button"
          className="close-button"
        >
          <i className="ph ph-x" />{" "}
        </button>
        <div className="mobile-menu__inner">
          <Link to="/" className="mobile-menu__logo">
            <img src="/assets/images/logo/logo.png" alt="Logo" />
          </Link>
          <div className="mobile-menu__menu">
            {/* Nav Menu Start */}
            <ul className="nav-menu flex-align nav-menu--mobile">
              {/* Home Menu */}
              <li
                onClick={() => handleMenuClick(0)}
                className={`on-hover-item nav-menu__item ${
                  activeIndex === 0 ? "d-block" : ""
                }`}
              >
                <Link to="/" className="nav-menu__link">
                  Home
                </Link>
              </li>
              <li
                onClick={() => handleMenuClick(0)}
                className={`on-hover-item nav-menu__item ${
                  activeIndex === 0 ? "d-block" : ""
                }`}
              >
                <Link to="/shop" className="nav-menu__link">
                  All
                </Link>
              </li>
              <li
                onClick={() => handleMenuClick(0)}
                className={`on-hover-item nav-menu__item ${
                  activeIndex === 0 ? "d-block" : ""
                }`}
              >
                <Link
                  to={`${userInfo ? "/account" : "/login"}`}
                  className="nav-menu__link"
                >
                  {userInfo ? "My Account" : "Login"}
                </Link>
              </li>

              {/* Contact Us Menu */}
              <li className="nav-menu__item">
                <Link
                  to="/contact"
                  className="nav-menu__link"
                  onClick={() => setActiveIndex(null)}
                >
                  Contact Us
                </Link>
              </li>
              <li className="nav-menu__item">
                <Link
                  to="/privacy-policy"
                  className="nav-menu__link"
                  onClick={() => setActiveIndex(null)}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
            {/* Nav Menu End */}
          </div>
        </div>
      </div>
      {/* ==================== Mobile Menu End Here ==================== */}
      {/* ======================= Middle Top Start ========================= */}
      <div className="header-top bg-main-600 flex-between">
        <div className="container container-lg">
          <div className="flex-between flex-wrap gap-8">
            <ul className="flex-align flex-wrap d-none d-md-flex">
              <li className="border-right-item">
                <Link
                  to="/about"
                  className="text-white text-sm hover-text-decoration-underline"
                >
                  {t("header.about")}
                </Link>
              </li>

              <li className="border-right-item">
                <Link
                  to="/privacy-policy"
                  className="text-white text-sm hover-text-decoration-underline"
                >
                  {t("header.privacy")}
                </Link>
              </li>
            </ul>
            <ul className="header-top__right flex-align flex-wrap">
              <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                {/* Display the selected language here */}
                <Link to="#" className="selected-text text-white text-sm py-8">
                  {selectedLanguage}
                </Link>
                <ul className="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8">
                  <li>
                    <Link
                      to="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleLanguageChange("en")}
                    >
                      <img
                        src="/assets/images/thumbs/flag1.png"
                        alt="English"
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      En
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                      onClick={() => handleLanguageChange("sq")}
                    >
                      <img
                        src="/assets/images/thumbs/flag2.png"
                        alt="Albanian"
                        className="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      Alb
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="border-right-item">
                <Link
                  to={userInfo ? "/account" : "/login"}
                  className="text-white text-sm py-8 flex-align gap-6"
                >
                  <span className="icon text-md d-flex">
                    <i className="ph ph-user-circle" />
                  </span>
                  <span className="hover-text-decoration-underline">
                    {userInfo ? t("header.myAccount") : t("header.login")}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ======================= Middle Top End ========================= */}
      {/* ======================= Middle Header Start ========================= */}
      <header className="header-middle bg-color-one border-bottom border-gray-100">
        <div className="container container-lg">
          <nav className="header-inner flex-between">
            {/* Logo Start */}
            <div className="logo">
              <Link to="/" className="link">
                <img src="/assets/images/logo/logo.png" alt="Logo" />
              </Link>
            </div>
            {/* Logo End  */}
            {/* form location Start */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex-align flex-wrap form-location-wrapper"
            >
              <div className="search-category d-flex h-48 radius-end-0 search-form d-sm-flex d-none">
                <div className="search-form__wrapper position-relative">
                  <input
                    type="text"
                    className="search-form__input common-input py-13 ps-16 pe-18 pe-44"
                    placeholder="Search for a product or brand"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setShowResults(true)}
                  />
                  <button
                    type="submit"
                    className="w-32 h-32 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
                  >
                    <i className="ph ph-magnifying-glass" />
                  </button>

                  {/* Search results dropdown */}
                  {showResults && searchTerm && (
                    <div
                      className="position-absolute start-0 end-0 top-100 border border-gray-200 rounded-bottom shadow-lg"
                      style={{ zIndex: 1000, backgroundColor: "#f3faf2" }}
                    >
                      {isFetching ? (
                        <div className="p-3 text-center">Searching...</div>
                      ) : searchResults?.products?.length > 0 ? (
                        <ul className="list-unstyled m-0 p-0">
                          {searchResults.products.map((product) => (
                            <li key={product.id} className="border-bottom">
                              <Link
                                to={`/product-details/${product.id}`}
                                className="d-flex p-3 text-decoration-none text-dark hover-bg-light"
                                onClick={() => {
                                  setShowResults(false);
                                  setSearchTerm("");
                                  setDebouncedTerm("");
                                }}
                              >
                                <div>
                                  <div className="fw-bold">{product.name}</div>
                                  <div className="small text-muted">
                                    {product.categorie?.name}
                                  </div>
                                  <div className="text-main">
                                    {product.price}&euro;
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        searchTerm &&
                        !isFetching && (
                          <div className="p-3 text-center text-muted">
                            No products found
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </form>
            {/* form location start */}
            {/* Header Middle Right start */}
            <div className="header-right flex-align d-lg-block d-none">
              <div className="flex-align flex-wrap gap-12">
                <button
                  type="button"
                  className="search-icon flex-align d-lg-none d-flex gap-4 item-hover"
                >
                  <span className="text-2xl text-gray-700 d-flex position-relative item-hover__text">
                    <i className="ph ph-magnifying-glass" />
                  </span>
                </button>

                <Link to="/cart" className="flex-align gap-4 item-hover">
                  <span className="text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text">
                    <i className="ph ph-shopping-cart-simple" />
                    <span className="w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4">
                      {cartQuantity}
                    </span>
                  </span>
                  <span className="text-md text-gray-500 item-hover__text d-none d-lg-flex">
                    {t("header.cart")}
                  </span>
                </Link>
              </div>
            </div>
            {/* Header Middle Right End  */}
          </nav>
        </div>
      </header>
      {/* ======================= Middle Header End ========================= */}
      {/* ==================== Header Start Here ==================== */}
      <header
        className={`header bg-white border-bottom border-gray-100 ${
          scroll && "fixed-header"
        }`}
      >
        <div className="container container-lg">
          <nav className="header-inner d-flex justify-content-between gap-8">
            <div className="flex-align menu-category-wrapper">
              {/* Category Dropdown Start */}
              {/* Hide the original category dropdown on both mobile and desktop */}
              <div className="category on-hover-item d-lg-none">
                <button
                  onClick={handleCategoryToggle}
                  type="button"
                  className="category__button flex-align gap-8 fw-medium p-16 border-end border-start border-gray-100 text-heading"
                >
                  <span className="icon text-2xl d-xs-flex d-none">
                    <i className="ph ph-dots-nine" />
                  </span>
                  <span className="d-sm-flex d-none">All</span> Categories
                  <span className="arrow-icon text-xl d-flex">
                    <i className="ph ph-caret-down" />
                  </span>
                </button>
                <div
                  className={`responsive-dropdown cat on-hover-dropdown common-dropdown nav-submenu p-0 submenus-submenu-wrapper ${
                    activeCategory && "active"
                  }`}
                >
                  <button
                    onClick={() => {
                      handleCategoryToggle();
                      setActiveIndexCat(null);
                    }}
                    type="button"
                    className="close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex"
                  >
                    {" "}
                    <i className="ph ph-x" />{" "}
                  </button>
                  {/* Logo Start */}
                  <div className="logo px-16 d-lg-none d-block">
                    <Link to="/" className="link">
                      <img src="/assets/images/logo/logo.png" alt="Logo" />
                    </Link>
                  </div>
                  {/* Logo End */}
                  <ul className="scroll-sm p-0 py-8 w-300 max-h-400 overflow-y-auto">
                    {categories?.categories?.map((category) => (
                      <li key={category.id} className="border-bottom">
                        <Link
                          to={`/shop/category/${category.id}`}
                          className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                        >
                          <span>{category.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Category Dropdown End  */}
              {/* Menu Start  */}
              <div className="header-menu d-lg-block d-none">
                {/* Nav Menu Start */}
                <ul className="nav-menu flex-align">
                  <li className="on-hover-item nav-menu__item">
                    <Link to="/" className="nav-menu__link">
                      Home
                    </Link>
                  </li>
                  <li className="on-hover-item nav-menu__item">
                    <Link to="/shop" className="nav-menu__link">
                      All
                    </Link>
                  </li>
                  {categories?.categories?.slice(0, 15).map((category) => (
                    <li
                      key={category.id}
                      className="on-hover-item nav-menu__item d-lg-block d-none"
                    >
                      <a
                        href={`/shop/category/${category.id}`}
                        className="nav-menu__link"
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
                {/* Nav Menu End */}
              </div>
              {/* Menu End  */}
            </div>
            {/* Header Right start */}
            <div className="header-right flex-align">
              <Link
                to="/tel:01234567890"
                className="bg-main-600 text-white p-12 h-100 hover-bg-main-800 flex-align gap-8 text-lg d-lg-flex d-none"
              >
                <div className="d-flex text-32">
                  <i className="ph ph-phone-call" />
                </div>
                01- 234 567 890
              </Link>
              <div className="me-16 d-lg-none d-block">
                <div className="flex-align flex-wrap gap-12">
                  <button
                    onClick={handleSearchToggle}
                    type="button"
                    className="search-icon flex-align d-lg-none d-flex gap-4 item-hover"
                  >
                    <span className="text-2xl text-gray-700 d-flex position-relative item-hover__text">
                      <i className="ph ph-magnifying-glass" />
                    </span>
                  </button>

                  <Link to="/cart" className="flex-align gap-4 item-hover">
                    <span className="text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className="ph ph-shopping-cart-simple" />
                      <span className="w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4">
                        {cartQuantity}
                      </span>
                    </span>
                    <span className="text-md text-gray-500 item-hover__text d-none d-lg-flex">
                      {t("header.cart")}
                    </span>
                  </Link>
                </div>
              </div>
              <button
                onClick={handleMenuToggle}
                type="button"
                className="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
              >
                {" "}
                <i className="ph ph-list" />{" "}
              </button>
            </div>
            {/* Header Right End  */}
          </nav>
        </div>
      </header>
      {/* ==================== Header End Here ==================== */}
    </>
  );
};

export default HeaderOne;
