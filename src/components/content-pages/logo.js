import React from "react";

import c13nLogo from "../../media/arc-logo.png";
import programizeLogo from "../../media/programize_logo.png";
import "./logo.css";
import theme from "../../style/theme";
import { DoubleRightOutlined } from "@ant-design/icons";

/**
 * This component represents the static C13N logo page.
 * It is the default page when application starts up, or the default page in case of erroneous page selection.
 */
const Logo = (props) => {
  return (
    <>
      <div className="welcomePage">
        <div
          className="welcomePage-header"
          style={{
            backgroundColor: theme.menuDarkLite,
          }}
        >
          <DoubleRightOutlined
            className="chatHistoryExpandForMobile"
            style={{
              display: props.sideSquashed
                ? props.sideActivated
                  ? "none"
                  : "inherit"
                : "none",
            }}
            onClick={() => {
              props.setSideActivated(true);
            }}
          />
          <div className="welcomePage-header-text">
            Messages and payments combined!
          </div>
        </div>
        <div className="welcomePage-logo">
          <img src={c13nLogo} className="interactiveLogoC13n" />
          <img src={programizeLogo} className="interactiveLogoProgramize" />
        </div>
      </div>
    </>
  );
};

export default Logo;
