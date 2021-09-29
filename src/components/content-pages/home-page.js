import react from "react";
import "./home-page.css";

import c13nLogo from "../../media/C13N_Logo.png";
import programizeLogo from "../../media/programize_logo.png";
import theme from "../../style/theme";
import { DoubleRightOutlined } from "@ant-design/icons";

const HomePage = (props) => {
  return (
    <>
      <div className="home-page">
        <div className="home-page-header">
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
          <div className="home-page-header-text">Welcome to c13n!</div>
        </div>
        <div className="home-page-logo">
          <img src={c13nLogo} className="interactiveLogoC13n" />
          <img src={programizeLogo} className="interactiveLogoProgramize" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
