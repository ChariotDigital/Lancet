import React, {useState} from "react";
import { Tab, Nav } from "react-bootstrap";
import Link from "next/link";
import ServiceDetails from "./ServiceDetails.js";

import imgF1 from "../../assets/image/l2/png/featured-job-logo-1.png";
import imgF2 from "../../assets/image/l2/png/featured-job-logo-2.png";
import imgF3 from "../../assets/image/l2/png/featured-job-logo-3.png";
import imgF4 from "../../assets/image/l2/png/featured-job-logo-4.png";
import imgF5 from "../../assets/image/l2/png/featured-job-logo-5.png";

import imgF from "../../assets/image/svg/icon-fire-rounded.svg";
import iconL from "../../assets/image/svg/icon-loaction-pin-black.svg";
import iconS from "../../assets/image/svg/icon-suitecase.svg";
import iconC from "../../assets/image/svg/icon-clock.svg";
import iconL2 from "../../assets/image/svg/icon-location.svg";
import iconD from "../../assets/image/svg/icon-dolor.svg";
import iconB from "../../assets/image/svg/icon-briefcase.svg";
import ServiceCard from "../../components/ServiceCard/ServiceCard";

const SearchTab = (props) => {

const [selectedService, setSelectedService] = useState(null);

  return (
    <>
      <div className="row justify-content-left position-static">
        <Tab.Container defaultActiveKey="first">
          <div className="col-12 col-xxl-7 col-xl-7 col-lg-9">
            {/* <!-- Left Section --> */}
            <div className="Left">
              <Nav
                className="justify-content-center  nav nav-tabs border-bottom-0"
                id="search-nav-tab"
              >
                
                  {/* <!-- Single Featured Job --> */}
                  {props.services.map(service => {
                    return (
                      <Nav.Link key={service.id} onClick={() => setSelectedService(service)} className="mb-8 p-0 w-100" eventKey="first">
                        <ServiceCard key={service.id} service={service.attributes} isList={true} />
                      </Nav.Link>
                    )
                  })}
                  {/* <!-- End Single Featured Job --> */}
                
              </Nav>
              <div className="text-center pt-5 pt-lg-13">
                <Link href="/#">
                  <a className="text-green font-weight-bold text-uppercase font-size-3 d-flex align-items-center justify-content-center">
                    Load More{" "}
                    <i className="fas fa-sort-down ml-3 mt-n2 font-size-4"></i>
                  </a>
                </Link>
              </div>
            </div>
            {/* <!-- form end --> */}
          </div>
          {/* <!-- Right Section --> */}
          <div className="col-12 col-xxl-5 col-xl-5 col-lg-10 ">
          
          <ServiceDetails service={selectedService?.attributes} /> 
          </div>
        </Tab.Container>
      </div>
    </>
  );
};
export default SearchTab;
