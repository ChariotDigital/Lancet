import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Container, Dropdown } from "react-bootstrap";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import Link from "next/link";
import ConnectButton from "../WalletConnect/ConnectButton";
import { useMoralis } from "react-moralis";
import { useWindowSize } from "../../hooks/useWindowSize";
import GlobalContext from "../../context/GlobalContext";
import Offcanvas from "../Offcanvas";
import NestedMenu from "../NestedMenu";
import { device } from "../../utils";
import Logo from "../Logo";
import { menuItems } from "./menuItems";


import imgP from "../../assets/image/header-profile.png";
import ProfileBadge from "../ProfileBadge/ProfileBadge";

const SiteHeader = styled.header`
  .dropdown-toggle::after {
    opacity: 0;
  }

  padding: 10px 0 10px 0;
  position: absolute !important;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 999;
  @media ${device.lg} {
    position: fixed !important;
    transition: 0.6s;
    &.scrolling {
      transform: translateY(-100%);
      transition: 0.6s;
    }
    &.reveal-header {
      transform: translateY(0%);
      box-shadow: 0 12px 34px -11px rgba(65, 62, 101, 0.1);
      z-index: 9999;
      background: ${({ dark, theme }) => (dark ? theme.colors.dark : "#fff")};
    }
  }
`;

const ToggleButton = styled.button`
  color: ${({ dark, theme }) => (dark ? theme.colors.lightShade : theme.colors.heading)}!important;
  border-color: ${({ dark, theme }) => (dark ? theme.colors.lightShade : theme.colors.heading)}!important;
`;

const Header = () => {
  const gContext = useContext(GlobalContext);
  const [showScrolling, setShowScrolling] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const {isAuthenticated, user} = useMoralis();




  const size = useWindowSize();

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < 0) {
      setShowScrolling(true);
    } else {
      setShowScrolling(false);
    }
    if (currPos.y < -300) {
      setShowReveal(true);
    } else {
      setShowReveal(false);
    }
  });



  return (
    <>
      <SiteHeader
        className={`site-header site-header--sticky  site-header--absolute py-7 py-xs-0 sticky-header ${gContext.header.bgClass} ${
          gContext.header.align === "left" ? "site-header--menu-left " : gContext.header.align === "right" ? "site-header--menu-right " : "site-header--menu-center "
        }
        ${gContext.header.theme === "dark" ? "dark-mode-texts" : " "} ${showScrolling ? "scrolling" : ""} ${
          gContext.header.reveal && showReveal && gContext.header.theme === "dark" ? "reveal-header bg-blackish-blue" : gContext.header.reveal && showReveal ? "reveal-header" : ""
        }`}
      >
        <Container fluid={gContext.header.isFluid} className={gContext.header.isFluid ? "pr-lg-9 pl-lg-9" : ""}>
          <nav className="navbar site-navbar offcanvas-active navbar-expand-lg px-0 py-0">
            {/* <!-- Brand Logo--> */}
            <div className="brand-logo">
              <Logo white={gContext.header.theme === "dark"} />
            </div>
            <div className="collapse navbar-collapse">
              <div className="navbar-nav-wrapper">
                <ul className="navbar-nav main-menu d-none d-lg-flex">
                  <li>
                    <a className="nav-link dropdown-toggle gr-toggle-arrow" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="nav-link dropdown-toggle gr-toggle-arrow" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/search-grid">
                      Search
                    </a>
                  </li>
                  <li>
                    <a className="nav-link dropdown-toggle gr-toggle-arrow" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/faq">
                      FAQ
                    </a>
                  </li>
                  
                </ul>
              </div>
            </div>

            {gContext.header.button === "cta" && (
              <div className="header-btn ml-auto ml-lg-0 mr-6 mr-lg-0 d-none d-xs-block">
                <Link href="/#">
                  <a className={`btn btn-${gContext.header.variant}`}>{gContext.header.buttonText}</a>
                </Link>
              </div>
            )}
            <span>{isAuthenticated} </span>
            {
              isAuthenticated ? 
                  (
    
                  <ProfileBadge/>
                ) : 


                gContext.header.button === "account" && (
                  <div className="header-btns header-btn-devider ml-auto pr-2 ml-lg-6 d-none d-xs-flex">
                    <a
                      className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset"
                      href="/dashboard-main"
                      onClick={(e) => {
                        e.preventDefault();
                        gContext.toggleSignInModal();
                      }}
                    >
                      Log In
                    </a>
                    <a
                      className="btn btn-success text-uppercase font-size-3 heading-default-color focus-reset"
                      href="/dashboard-main"
                      onClick={(e) => {
                        e.preventDefault();
                        gContext.toggleSignUpModal();
                      }}
                    >
                      Sign Up
                    </a>
                   
                    
                    
                  </div>
                )
                 
          }

          

            <ToggleButton
              className={`navbar-toggler btn-close-off-canvas ml-3 ${gContext.visibleOffCanvas ? "collapsed" : ""}`}
              type="button"
              data-toggle="collapse"
              data-target="#mobile-menu"
              aria-controls="mobile-menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={gContext.toggleOffCanvas}
              dark={gContext.header.theme === "dark" ? 1 : 0}
            >
              {/* <i className="icon icon-simple-remove icon-close"></i> */}
              <i className="icon icon-menu-34 icon-burger d-block"></i>
            </ToggleButton>
          </nav>
        </Container>
      </SiteHeader>
      <Offcanvas show={gContext.visibleOffCanvas} onHideOffcanvas={gContext.toggleOffCanvas}>
        <NestedMenu menuItems={menuItems} />
      </Offcanvas>
    </>
  );
};
export default Header;
