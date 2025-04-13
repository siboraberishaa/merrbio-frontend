import React from "react";

const date = new Date();
const year = date.getFullYear();

const BottomFooter = () => {
  return (
    <div className="bottom-footer bg-color-one py-8">
      <div className="container container-lg">
        <div className="bottom-footer__inner flex-between flex-wrap gap-16 py-16">
          <p className="bottom-footer__text ">
            MerrBio eCommerce © {year}. All Rights Reserved BY NOENTRY TEAM!{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;
