import React from "react";
import Link from "next/link";

import imgL1Logo from "../../assets/image/logo-main-black.png";
import imgL1LogoWhite from "../../assets/image/logo-main-white.png";

const Logo = ({ white, height, className = "", ...rest }) => {
  return (
    <Link href="/">
      <a className={`d-block ${className}`} {...rest}>
        {white ? (
          <img src={imgL1LogoWhite.src} alt="" />
        ) : (
          <img src={imgL1Logo.src} alt="" />
        )}
      </a>
    </Link>
  );
};

export default Logo;
