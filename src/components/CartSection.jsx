import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { useTranslation } from "react-i18next";

const CartSection = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { cartItems } = useSelector((state) => state.cart);

  const updateCartHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shipping = subtotal < 20 ? 2 : 0;
  const total = subtotal + shipping;

  return (
    <section className="cart py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xl-9 col-lg-8">
            <div className="cart-table border border-gray-100 rounded-8 px-40 py-48">
              {cartItems.length === 0 ? (
                <div className="text-center py-4">
                  <h4>Your cart is empty</h4>
                  <Link to="/shop" className="btn btn-main mt-3">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">
                  <table className="table style-three">
                    <thead>
                      <tr>
                        <th className="h6 mb-0 text-lg fw-bold">Delete</th>
                        <th className="h6 mb-0 text-lg fw-bold">
                          Product Name
                        </th>
                        <th className="h6 mb-0 text-lg fw-bold">Price</th>
                        <th className="h6 mb-0 text-lg fw-bold">Quantity</th>
                        <th className="h6 mb-0 text-lg fw-bold">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <button
                              type="button"
                              onClick={() => removeFromCartHandler(item._id)}
                              className="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                            >
                              <i className="ph ph-x-circle text-2xl d-flex" />
                              Remove
                            </button>
                          </td>
                          <td>
                            <div className="table-product d-flex align-items-center gap-24">
                              <Link
                                to={`/product-details/${item._id}`}
                                className="table-product__thumb border border-gray-100 rounded-8 flex-center"
                              >
                                <img
                                  src={
                                    item.image ||
                                    "/assets/images/thumbs/product-two-img1.png"
                                  }
                                  alt={item.name}
                                />
                              </Link>
                              <div className="table-product__content text-start">
                                <h6 className="title text-lg fw-semibold mb-8">
                                  <Link
                                    to={`/product-details/${item._id}`}
                                    className="link text-line-2"
                                  >
                                    {item.name}
                                  </Link>
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="text-lg h6 mb-0 fw-semibold">
                              {item.price} €
                            </span>
                          </td>
                          <td>
                            <div className="d-flex rounded-4 overflow-hidden">
                              <button
                                onClick={() =>
                                  updateCartHandler(item, item.qty - 1)
                                }
                                disabled={item.qty <= 1}
                                className="quantity__minus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white"
                              >
                                <i className="ph ph-minus" />
                              </button>
                              <input
                                type="number"
                                className="quantity__input flex-grow-1 border border-gray-100 border-start-0 border-end-0 text-center w-32 px-16"
                                value={item.qty}
                                readOnly
                              />
                              <button
                                onClick={() =>
                                  updateCartHandler(item, item.qty + 1)
                                }
                                disabled={item.qty >= item.stock}
                                className="quantity__plus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white"
                              >
                                <i className="ph ph-plus" />
                              </button>
                            </div>
                          </td>
                          <td>
                            <span className="text-lg h6 mb-0 fw-semibold">
                              {(item.price * item.qty).toFixed(2)} €
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-3 col-lg-4">
            <div className="cart-sidebar border border-gray-100 rounded-8 px-24 py-40">
              <h6 className="text-xl mb-32">Cart Totals</h6>
              <div className="bg-color-three rounded-8 p-24">
                <div className="mb-32 flex-between gap-8">
                  <span className="text-gray-900 font-heading-two">
                    Subtotal
                  </span>
                  <span className="text-gray-900 fw-semibold">
                    {subtotal.toFixed(2)} €
                  </span>
                </div>
                <div className="mb-32 flex-between gap-8">
                  <span className="text-gray-900 font-heading-two">
                    Shipping
                  </span>
                  <span className="text-gray-900 fw-semibold">
                    {shipping > 0 ? `${shipping.toFixed(2)} €` : "Free"}
                  </span>
                </div>
              </div>
              <div className="bg-color-three rounded-8 p-24 mt-24">
                <div className="flex-between gap-8">
                  <span className="text-gray-900 text-xl fw-semibold">
                    Total
                  </span>
                  <span className="text-gray-900 text-xl fw-semibold">
                    {total.toFixed(2)} €
                  </span>
                </div>
              </div>
              <Link
                to={cartItems.length > 0 ? "/checkout" : "#"}
                className={`btn btn-main mt-40 py-18 w-100 rounded-8 ${
                  cartItems.length === 0 ? "disabled" : ""
                }`}
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSection;
