import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PromotionalOne = () => {
  const { t } = useTranslation();

  return (
    <section className="promotional-banner pt-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xl-3 col-sm-6 col-xs-6">
            <div className="promotional-banner-item position-relative rounded-24 overflow-hidden z-1">
              <img
                src="/assets/images/thumbs/promotional-banner-img1.png"
                alt={t("promotional.meat")}
                className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1"
              />
              <div className="promotional-banner-item__content">
                <h6 className="promotional-banner-item__title text-32">
                  {t("promotional.meat")}
                </h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-xs-6">
            <div className="promotional-banner-item position-relative rounded-24 overflow-hidden z-1">
              <img
                src="assets/images/thumbs/promotional-banner-img2.png"
                alt={t("promotional.vegetables")}
                className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1"
              />
              <div className="promotional-banner-item__content">
                <h6 className="promotional-banner-item__title text-32">
                  {t("promotional.vegetables")}
                </h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-xs-6">
            <div className="promotional-banner-item position-relative rounded-24 overflow-hidden z-1">
              <img
                src="/assets/images/thumbs/promotional-banner-img3.png"
                alt={t("promotional.milk")}
                className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1"
              />
              <div className="promotional-banner-item__content">
                <h6 className="promotional-banner-item__title text-32">
                  {t("promotional.milk")}
                </h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-xs-6">
            <div className="promotional-banner-item position-relative rounded-24 overflow-hidden z-1">
              <img
                src="/assets/images/thumbs/promotional-banner-img4.png"
                alt={t("promotional.fruits")}
                className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1"
              />
              <div className="promotional-banner-item__content">
                <h6 className="promotional-banner-item__title text-32">
                  {t("promotional.fruits")}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalOne;
