import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ReactSlider from "react-slider";
import { useGetCategoryProductsQuery } from "../slices/apiSlice";

const ShopSection = ({ products: allProducts, categories }) => {
  const { id: categoryId } = useParams();
  const { data: categoryData } = useGetCategoryProductsQuery(categoryId, {
    skip: !categoryId,
  });

  // Move useState hooks before any conditional returns
  let [grid, setGrid] = useState(false);
  let [active, setActive] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [activeFilters, setActiveFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popular");

  // Get base products
  const baseProducts = categoryData?.category?.products || allProducts;

  // Filter products by price range and sort
  const products = useMemo(() => {
    let result = baseProducts;

    if (!result) return result;

    // Apply price filter
    if (activeFilters) {
      result = result.filter((product) => {
        const price = parseFloat(product.price);
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "a-z":
          return a.name.localeCompare(b.name);
        case "z-a":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return result;
  }, [baseProducts, priceRange, activeFilters, sortBy]);

  const sidebarController = () => {
    setActive(!active);
  };

  if (!products || products.length === 0) {
    return (
      <section className="py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <img
                src="/assets/images/404.png"
                alt="Not Found"
                className="img-fluid mb-4 w-50"
              />
              <h2 className="mb-4 text-heading">No Products Found</h2>
              <p className="mb-4 text-gray-500">
                We couldn't find any products matching your criteria.
              </p>
              <a href="/shop" className="btn btn-main">
                View All Products
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="shop py-80">
      <div className={`side-overlay ${active && "show"}`}></div>
      <div className="container container-lg">
        <div className="row">
          {/* Sidebar Start */}
          <div className="col-lg-3">
            <div className={`shop-sidebar ${active && "active"}`}>
              <button
                onClick={sidebarController}
                type="button"
                className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
              >
                <i className="ph ph-x" />
              </button>
              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  Product Categories
                </h6>
                <ul className="max-h-540 overflow-y-auto scroll-sm">
                  {categories?.map((category) => (
                    <li key={category.id} className="mb-24">
                      <a
                        href={`/shop/category/${category.id}`}
                        className="text-gray-900 hover-text-main-600"
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  Filter by Price
                </h6>
                <div className="custom--range">
                  <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    defaultValue={[0, 1000]}
                    value={priceRange}
                    onChange={setPriceRange}
                    min={0}
                    max={1000}
                    ariaLabel={["Lower thumb", "Upper thumb"]}
                    ariaValuetext={(state) => `€${state.valueNow}`}
                    renderThumb={(props, state) => (
                      <div {...props} key={state.index}>
                        €{state.valueNow}
                      </div>
                    )}
                    pearling
                    minDistance={10}
                  />

                  <div className="flex-between mt-24">
                    <span className="text-gray-500">
                      Range: €{priceRange[0]} - €{priceRange[1]}
                    </span>
                  </div>

                  <div className="flex-between flex-wrap-reverse gap-8 mt-16">
                    <button
                      type="button"
                      className="btn btn-main h-40 flex-align"
                      onClick={() => setActiveFilters(true)}
                    >
                      Filter
                    </button>
                    {activeFilters && (
                      <button
                        type="button"
                        className="btn btn-outline h-40 flex-align"
                        onClick={() => {
                          setPriceRange([0, 1000]);
                          setActiveFilters(false);
                        }}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                                    Filter by Rating
                                </h6>
                                <div className="flex-align gap-8 position-relative mb-20">
                                    <label
                                        className="position-absolute w-100 h-100 cursor-pointer"
                                        htmlFor="rating5"
                                    >
                                        {" "}
                                    </label>
                                    <div className="common-check common-radio mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="rating5"
                                        />
                                    </div>
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
                                    <span className="text-gray-900 flex-shrink-0">124</span>
                                </div>
                                <div className="flex-align gap-8 position-relative mb-20">
                                    <label
                                        className="position-absolute w-100 h-100 cursor-pointer"
                                        htmlFor="rating4"
                                    >
                                        {" "}
                                    </label>
                                    <div className="common-check common-radio mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="rating4"
                                        />
                                    </div>
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
                                    <span className="text-gray-900 flex-shrink-0">52</span>
                                </div>
                                <div className="flex-align gap-8 position-relative mb-20">
                                    <label
                                        className="position-absolute w-100 h-100 cursor-pointer"
                                        htmlFor="rating3"
                                    >
                                        {" "}
                                    </label>
                                    <div className="common-check common-radio mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="rating3"
                                        />
                                    </div>
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
                                    <span className="text-gray-900 flex-shrink-0">12</span>
                                </div>
                                <div className="flex-align gap-8 position-relative mb-20">
                                    <label
                                        className="position-absolute w-100 h-100 cursor-pointer"
                                        htmlFor="rating2"
                                    >
                                        {" "}
                                    </label>
                                    <div className="common-check common-radio mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="rating2"
                                        />
                                    </div>
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
                                    <span className="text-gray-900 flex-shrink-0">5</span>
                                </div>
                                <div className="flex-align gap-8 position-relative mb-0">
                                    <label
                                        className="position-absolute w-100 h-100 cursor-pointer"
                                        htmlFor="rating1"
                                    >
                                        {" "}
                                    </label>
                                    <div className="common-check common-radio mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="rating1"
                                        />
                                    </div>
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
                                    <span className="text-gray-900 flex-shrink-0">2</span>
                                </div>
                            </div> */}

              <div className="shop-sidebar__box rounded-8">
                <img src="/assets/images/thumbs/advertise-img1.png" al t="" />
              </div>
            </div>
          </div>
          {/* Sidebar End */}
          {/* Content Start */}
          <div className="col-lg-9">
            {/* Top Start */}
            <div className="flex-between gap-16 flex-wrap mb-40 ">
              <span className="text-gray-900">
                Showing {products?.length}{" "}
                {products?.length === 1 ? "result" : "results"}
              </span>
              <div className="position-relative flex-align gap-16 flex-wrap">
                <div className="list-grid-btns flex-align gap-16">
                  <button
                    onClick={() => setGrid(true)}
                    type="button"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${
                      grid === true && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className="ph-bold ph-list-dashes" />
                  </button>
                  <button
                    onClick={() => setGrid(false)}
                    type="button"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${
                      grid === false && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className="ph ph-squares-four" />
                  </button>
                </div>
                <div className="position-relative text-gray-500 flex-align gap-4 text-14">
                  <label
                    htmlFor="sorting"
                    className="text-inherit flex-shrink-0"
                  >
                    Sort by:{" "}
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto"
                    id="sorting"
                  >
                    <option value="popular">Popular</option>
                    <option value="latest">Latest</option>
                    <option value="a-z">Name (A-Z)</option>
                    <option value="z-a">Name (Z-A)</option>
                  </select>
                </div>
                <button
                  onClick={sidebarController}
                  type="button"
                  className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                >
                  <i className="ph-bold ph-funnel" />
                </button>
              </div>
            </div>
            {/* Top End */}
            <div className={`list-grid-wrapper ${grid && "list-view"}`}>
              {products?.map((product) => (
                <div
                  key={product.id}
                  className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
                >
                  <Link
                    to={`/product-details/${product.id}`}
                    className="product-card__thumb flex-center rounded-8 position-relative"
                  >
                    <img
                      src="assets/images/thumbs/product-two-img1.png"
                      alt=""
                      className="w-auto max-w-unset"
                    />
                  </Link>
                  <div className="product-card__content mt-16">
                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                      <Link
                        to={`/product-details/${product.id}`}
                        className="link text-line-2"
                        tabIndex={0}
                      >
                        {product.name}
                      </Link>
                    </h6>
                    <div className="flex-align mb-20 mt-16 gap-6">
                      <span className="text-xs fw-medium text-gray-500">
                        4.8
                      </span>
                      <span className="text-15 fw-medium text-warning-600 d-flex">
                        <i className="ph-fill ph-star" />
                      </span>
                      <span className="text-xs fw-medium text-gray-500">
                        (17k)
                      </span>
                    </div>

                    <div className="product-card__price my-20">
                      <span className="text-heading text-md fw-semibold ">
                        {product.price} &euro;
                      </span>
                    </div>
                  </div>
                  <button className="product-card__cart w-100 btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium">
                    Add To Cart <i className="ph ph-shopping-cart" />
                  </button>
                </div>
              ))}
            </div>
            {/* Pagination Start */}
            {/* <ul className="pagination flex-center flex-wrap gap-16">
                            <li className="page-item">
                                <Link
                                    className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                    to="#"
                                >
                                    <i className="ph-bold ph-arrow-left" />
                                </Link>
                            </li>
                            <li className="page-item active">
                                <Link
                                    className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                    to="#"
                                >
                                    01
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                    to="#"
                                >
                                    02
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                    to="#"
                                >
                                    03
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                    to="#"
                                >
                                    04
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                    to="#"
                                >
                                    05
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                    to="#"
                                >
                                    06
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                    to="#"
                                >
                                    07
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                    to="#"
                                >
                                    <i className="ph-bold ph-arrow-right" />
                                </Link>
                            </li>
                        </ul> */}
            {/* Pagination End */}
          </div>
          {/* Content End */}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
