import GlobalContext from "../../context/GlobalContext";
import imgF1 from "../../assets/image/l2/png/featured-job-logo-1.png";
import { Tab } from "react-bootstrap";
import React, {useContext}from "react";
import {Button} from 'react-bootstrap'
import Link from "next/link";

import iconL from "../../assets/image/svg/icon-loaction-pin-black.svg";
import iconS from "../../assets/image/svg/icon-suitecase.svg";
import iconC from "../../assets/image/svg/icon-clock.svg";
import iconL2 from "../../assets/image/svg/icon-location.svg";
import iconD from "../../assets/image/svg/icon-dolor.svg";
import iconB from "../../assets/image/svg/icon-briefcase.svg";

const ServiceDetails = (props) => {

    const gContext = useContext(GlobalContext);


    return (
            props.service?
                <div className=" bg-white rounded-4 border border-mercury shadow-9 pos-abs-xl w-100 mr-3 ml-xl-8 mh-1413 overflow-y-scroll mt-9 mt-xl-0">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
                    <div className="row">
                      <div className="col-12">
                        {/* <!-- media start --> */}
                        <div className="media align-items-center">
                          {/* <!-- media logo start --> */}
                          <div className="square-72 d-block mr-8">
                            <img src={imgF1.src} alt="" />
                          </div>
                          {/* <!-- media logo end --> */}
                          {/* <!-- media texts start --> */}
                          <div>
                            <h3 className="font-size-6 mb-0">{props.service?.title}</h3>
                            <span className="font-size-3 text-gray line-height-2">
                            {props.service?.category}
                            </span>
                          </div>
                          {/* <!-- media texts end --> */}
                        </div>
                        {/* <!-- media end --> */}
                      </div>
                    </div>
                    <div className="row pt-9">
                      <div className="col-12">
                        {/* <!-- card-btn-group start --> */}
                        <div className="card-btn-group row align-content-center ">
                        <Button
                              className="btn btn-green text-uppercase btn-medium rounded-3 mr-lg-4 ml-lg-6"
                              href="/#"
                              onClick={(e) => {
                                e.preventDefault();
                                gContext.toggleApplicationModal();
                              }}
                            >
                              Hire
                            </Button>
                          <Link href="/#">
                            <a className="btn btn-outline-mercury text-black-2 text-uppercase h-px-48 rounded-3 mb-5 px-5">
                              <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>{" "}
                              Save job
                            </a>
                          </Link>
                        </div>
                        {/* <!-- card-btn-group end --> */}
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Single Featured Job --> */}
                  <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts">
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <div className="media justify-content-md-start mb-6">
                          <div className="image mr-5">
                            <img src={iconD.src} alt="" />
                          </div>
                          <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                          {props.service?.price}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="media justify-content-md-start mb-md-0 mb-6">
                          <div className="image mr-5">
                            <img src={iconB.src} alt="" />
                          </div>
                          <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                          {props.service?.scope}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-lg-0 mb-10">
                        <p className="font-size-4 text-gray mb-3">
                            Technical Skills
                          </p>
                        <ul className="list-unstyled d-flex align-items-center flex-wrap">
                            {
                              props.service?.skills.map(skill => {
                                return (
                                  
                                  <li key={skill}>
                                    <a
                                      href="/#"
                                      className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                    >
                                      {skill}
                                    </a>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </div>
                        <div className="tags">
                          
                        </div>
                      </div>
                      <div className="col-md-6 mb-lg-0 mb-8">
                        <div className="">
                          <span className="font-size-4 d-block mb-4 text-gray">
                            Review Score
                          </span>
                          <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                            5/5
                          </h6>
                        </div>
                        <div className="tags">
                          
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  <div className="pt-8 pl-sm-9 pl-6 pb-10 light-mode-texts">
                    <div className="row">
                      <div className="col-xxl-12 col-xl-9 pr-xxl-18 pr-xl-0 pr-11">
                        <div className="">
                          <p className="mb-4 font-size-4 text-gray font-weight-bold">
                            Job Description
                          </p>
                          <p className="font-size-4 text-black-2 mb-7">
                            {props.service?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> : null 
    )
}

export default  ServiceDetails; 