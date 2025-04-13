import React from "react";
import { useTranslation } from "react-i18next";

const d = new Date();
let year = d.getFullYear();

const BottomFooter = () => {
  const { t } = useTranslation();

  return (
    <div className="bottom-footer bg-color-one py-8">
      <div className="container container-lg">
        <div className="bottom-footer__inner flex-between flex-wrap gap-16 py-16">
          <p className="bottom-footer__text">
            {t("footer.bottom.copyright", { year })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;
