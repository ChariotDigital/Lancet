import imgB1 from "../../assets/image/l2/png/featured-job-logo-1.png";
import imgL from "../../assets/image/svg/icon-loaction-pin-black.svg";
import React, {useContext} from 'react'
import Link from "next/link";
import GlobalContext from "../../context/GlobalContext";
import { Button } from "react-bootstrap";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

import imgF from "../../assets/image/svg/icon-fire-rounded.svg";
import iconL from "../../assets/image/svg/icon-loaction-pin-black.svg";
import iconS from "../../assets/image/svg/icon-suitecase.svg";
import iconC from "../../assets/image/svg/icon-clock.svg";
import iconL2 from "../../assets/image/svg/icon-location.svg";
import iconD from "../../assets/image/svg/icon-dolor.svg";
import iconB from "../../assets/image/svg/icon-briefcase.svg";

const ServiceCard = (props) => {

  const gContext = useContext(GlobalContext);
  const {user} = useMoralis();
  const router = useRouter();

    return (
        props.isList ?
        <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
                    <div className="row">
                      <div className="col-md-9">
                        <div className="media align-items-center">
                          <div className="square-72 d-block mr-8">
                            <img src={imgB1.src} alt="" />
                          </div>
                          <div>
                            <h3 className="mb-0 font-size-6 heading-default-color">
                            {props.service?.title}
                            </h3>
                            <span className="font-size-3 text-default-color line-height-2 d-block">
                            {props.service?.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 text-right pt-7 pt-md-5">
                        <div className="media justify-content-md-end">
                          <div className="image mr-5 mt-2">
                            <img src={iconD.src} alt="" />
                          </div>
                          <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                            <span className="text-black-2">{props.service?.price}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row pt-8">
                      <div className="col-md-7">
                        <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                        {props.service.skills?.map(skill => {
                          return (

                            <li key={skill}>
                              <span className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2 d-inline-block">
                                {skill}
                              </span>
                            </li>
                          )
                          })}
                        </ul>
                      </div>
                      <div className="col-md-5">
                        <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                          {/* <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                            <span
                              className="mr-4"
                              css={`
                                margin-top: -2px;
                              `}
                            >
                              <img src={iconL.src} alt="" />
                            </span>
                            <span className="font-weight-semibold">
                              {props.service?.timeZone}
                            </span>
                          </li> */}
                          <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                            <span
                              className="mr-4"
                              css={`
                                margin-top: -2px;
                              `}
                            >
                              <img src={iconS.src} alt="" />
                            </span>
                            <span className="font-weight-semibold">
                            {props.service?.scope}
                            </span>
                          </li>
                          {/* <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                            <span
                              className="mr-4"
                              css={`
                                margin-top: -2px;
                              `}
                            >
                              <img src={iconC.src} alt="" />
                            </span>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div> : 
                      
                        <div className="bg-white px-8 pt-9 pb-7 rounded-4 mb-9 feature-cardOne-adjustments">
                          <div className="d-block mb-7">
                            <Link href="/#">
                              <a>
                                <img src={imgB1.src} alt="" />
                              </a>
                            </Link>
                          </div>
                          <Link href="/#">
                            <a className="font-size-3 d-block mb-0 text-gray">{props.service?.category}</a>
                          </Link>
                          <h2 className="mt-n4">
                            <Link href="/#">
                              <a className="font-size-7 text-black-2 font-weight-bold mb-4">{props.service?.title}</a>
                            </Link>
                          </h2>
                          <ul className="list-unstyled mb-1 card-tag-list">
                            <li>
                              <Link href="/#">
                                <a className="bg-regent-opacity-15 text-orange font-size-3 rounded-3">
                                  <i className="fa fa-briefcase mr-2 font-weight-bold"></i> {props.service?.scope}
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/#">
                                <a className="bg-regent-opacity-15 text-eastern font-size-3 rounded-3">
                                  <i className="fa fa-dollar-sign mr-2 font-weight-bold"></i>{props.service?.price}
                                </a>
                              </Link>
                            </li>
                          </ul>
                          <p className="mb-7 font-size-4 text-gray">
                          {props.service?.description}
                          </p>
                          <div className="card-btn-group">
                          <Button
                              className="btn btn-green text-uppercase btn-medium rounded-3"
                              href="/#"
                              onClick={(e) => {
                                e.preventDefault();
                                router.push(`/service-details/${props.service.id}`)
                              }}
                            >
                              View
                            </Button>
                            <Link href="/#">
                              <a className="btn btn-outline-mercury text-black-2 text-uppercase btn-medium rounded-3">
                                <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i> Save it
                              </a>
                            </Link>
                          </div>
                        </div>
    )
}

export default ServiceCard