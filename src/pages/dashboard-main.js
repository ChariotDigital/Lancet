import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import CountUp from "react-countup";
import LazyLoad from "react-lazyload";
import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";
import GlobalContext from "../context/GlobalContext";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import imgP1 from "../assets/image/table-one-profile-image-1.png";
import imgP2 from "../assets/image/table-one-profile-image-2.png";
import imgP3 from "../assets/image/table-one-profile-image-3.png";
import imgP4 from "../assets/image/table-one-profile-image-4.png";
import imgP5 from "../assets/image/table-one-profile-image-5.png";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { get } from "lodash";
import { Blockie } from "web3uikit";

const defaultJobs = [
  { value: "pd", label: "Product Designer" },
  { value: "gd", label: "Graphics Designer" },
  { value: "fd", label: "Frontend Developer" },
  { value: "bd", label: "Backend Developer" },
  { value: "cw", label: "Content Writer" },
];

/**
 * A Dashbaord that has both a users bought services and provided services in a table view
 * The rows of this table has 3 icon buttons to view the service of the job, view the chat, cancel job
 * name of service provider, name of service, when the job is supposed to be done / createdAt
 * Running Jobs, total requests, service views, service click through rate?
 * @returns
 */

export default function DashboardMain() {
  const gContext = useContext(GlobalContext);

  const [buyerJobs, setBuyerJobs] = useState([]);
  const [providerJobs, setProviderJobs] = useState([]);
  const [viewMode, setViewMode] = useState(true);

  const { user, isInitialized } = useMoralis();

  const buyerQuery = new Moralis.Query("JobCreated");
  const providerQuery = new Moralis.Query("JobCreated");
  const userQuery = new Moralis.Query(Moralis.User);

  useEffect(async () => {
    if (user === null) return;
    // console.log("user addr:", user.get('ethAddress'))
    buyerQuery.equalTo("buyer_addr", user.get("ethAddress").toLowerCase());
    buyerQuery.equalTo("isComplete", false);
    // buyerQuery.withCount()
    if(user.get("isProvider")) {

      providerQuery.equalTo("provider_addr", user.get("ethAddress").toLowerCase());
      providerQuery.equalTo("isComplete", false);
    }

    const buyerResults = await buyerQuery.find();
    const providerResults = await providerQuery.find();

    await loadJobs(buyerResults, true);
    await loadJobs(providerResults, false)

    const subscription = await buyerQuery.subscribe();

    subscription.on("create", async (object) => {
      // const updatedBUesults = await buyerQuery.find();
      await loadJobs(await buyerQuery.find());
    });
  }, [isInitialized]);

  const loadJobs = async (data, buyer = true) => {
    console.log(data);
    if (data === null) return;
    if(buyer) {userQuery.matchesKeyInQuery("provider_addr", "ethAddress", buyerQuery);}
    else if(!buyer) {userQuery.matchesKeyInQuery("buyer_addr", "ethAddress", providerQuery);}
    const providers = await userQuery.find();
    // console.log("providers found: ", providers);

    const parsedJobs = [];
    data?.map((job) => {
      const provider_user = providers.find(
        (i) => i.get("ethAddress") === job.attributes[ buyer? "buyer_addr" : 'provider_addr']
      );
      if(provider_user) {

        parsedJobs.push({
          service_name: "Service",
          provider_profile: {
            username: provider_user.get("username"),
            addr: provider_user.get("ethAddress"),
          },
          actions: { provider_user },
          ...job.attributes,
        });
      }
    });
    if(buyer) {setBuyerJobs(parsedJobs);}
    if(!buyer) {setProviderJobs(parsedJobs);}
    
  };

  const providerCellFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      // Add linking to specific provider profile page
      <Link href={`/candidate-profile`}>
        <a className="media align-items-center">
          <div className="circle-36 mr-6">
            <Blockie seed={cell.addr}> </Blockie>
          </div>
          <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
            {cell.username}
          </h4>
        </a>
      </Link>
    );
  };

  const amountCellFormatter = (cell) => {
    return (
      <h3 className="font-size-4 font-weight-semibold text-black-2 mb-0">
        {`${cell / 1e18} ETH`}
      </h3>
    );
  };

  const actionsCellFormatter = (cell) => {
    const circleStyle = {
      width: "80px",
      height: "100px,",
      padding: "13px 18px",
      borderRadius: "60px",
      fontSize: "15px",
      textAlign: "center",
    };

    return (
      <>
        <div className="d-flex justify-content-between row mx-4">
          <button
            type="button"
            class="btn btn-info btn-sm"
            style={circleStyle}
            data-toggle="tooltip"
            data-placement="top"
            title="View Service Details"
            onClick={(e) => {
              e.preventDefault();
              gContext.toggleApplicationModal();
            }}
          >
            <i class="fas fa-info-circle"></i>
          </button>
          <button
            type="button"
            class="btn btn-primary  btn-sm"
            style={circleStyle}
            data-toggle="tooltip"
            data-placement="top"
            title="Open Chat"
            onClick={(e) => {
              e.preventDefault();
              gContext.toggleApplicationModal();
            }}
          >
            <i class="fa fa-comments"></i>
          </button>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            style={circleStyle}
            data-toggle="tooltip"
            data-placement="top"
            title="Cancel Job"
            onClick={(e) => {
              e.preventDefault();
              gContext.toggleApplicationModal();
            }}
          >
            <i class="fas fa-ban"></i>
          </button>
        </div>
      </>
    );
  };

  const buyerTableColumns = [
    {
      dataField: "provider_profile",
      text: "Name",
      formatter: providerCellFormatter,
    },
    {
      dataField: "service_name",
      text: "Service",
    },
    {
      dataField: "amount",
      text: "Amount",
      formatter: amountCellFormatter,
    },
    {
      dataField: "actions",
      formatter: actionsCellFormatter,
    },
  ];

  return (
    <>
      <PageWrapper
        headerConfig={{
          button: "profile",
          isFluid: true,
          bgClass: "bg-default",
          reveal: false,
        }}
      >
        <div className="dashboard-main-container mt-20 mt-lg-20">
          <div className="d-flex flex-row-reverse">
            <button 
              className=" btn btn-primary btn-lg mx-6 my-6 flex-start-end"
              onClick={() => setViewMode(!viewMode)}
            >
              
              Switch to {viewMode? "Provider": "Buyer"} View
            </button>
          </div>
          <div className="container">
            
            {viewMode ? (
              <div className="row mb-7">
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                {/* <!-- Single Category --> */}
                <a
                  href="/#"
                  className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                >
                  <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                      <LazyLoad>
                        <span className="counter">
                          <CountUp duration={6} end={5} />
                        </span>
                      </LazyLoad>
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                      Running Jobs
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                {/* <!-- Single Category --> */}
                <a
                  href="/#"
                  className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                >
                  <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                    <i class="fas fa-file-contract"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                      <LazyLoad>
                        <span className="counter">
                          <CountUp duration={4} end={256} />
                        </span>
                      </LazyLoad>
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                      Pending Requests
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                {/* <!-- Single Category --> */}
                <a
                  href="/#"
                  className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                >
                  <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                    <i className="fas fa-eye"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                      <LazyLoad>
                        <span className="counter">
                          <CountUp
                            duration={4}
                            decimal="."
                            decimals={1}
                            end={16.5}
                          />
                        </span>
                        K
                      </LazyLoad>
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                      Request Views
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                {/* <!-- Single Category --> */}
                <a
                  href="/#"
                  className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                >
                  <div className="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                    <i className="fas fa-mouse-pointer"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                      <LazyLoad>
                        <span className="counter">
                          <CountUp
                            duration={4}
                            decimal="."
                            decimals={1}
                            end={18.6}
                          />
                        </span>
                        %
                      </LazyLoad>
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                      Proposal Rate
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
            
              <div className="col-xxl-12 mb-14">
                <div className="row mb-11 align-items-center">
                  <div className="col-lg-6 mb-lg-0 mb-4">
                    <h3 className="font-size-6 mb-0">Bought Services</h3>
                  </div>
                  <div className="col-lg-6">
                    <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                      <p className="font-size-4 mb-0 mr-6 py-2">
                        Filter by Job:
                      </p>
                      <div className="h-px-48">
                        <Select
                          options={defaultJobs}
                          className="pl-0 h-100 arrow-3 arrow-3-black min-width-px-273  text-black-2 d-flex align-items-center w-100"
                          border={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-8 pt-7 rounded pb-8 px-11">
                  {/* <div className="table-responsive"> */}
                  {buyerJobs.length? 
                  
                  <BootstrapTable
                    // headerClasses="text-center"
                    striped={true}
                    hover={true}
                    keyField="Name"
                    data={buyerJobs}
                    columns={buyerTableColumns}
                    rowClasses={"border border-color-2"}
                    pagination={paginationFactory()}
                  >
                    {" "}
                  </BootstrapTable> :
                  <h3> Sorry! Looks like you have bought any services yet. </h3>
                  }
                </div>
              </div>
            </div>
            ) : (

              <div className="row mb-7">
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                {/* <!-- Single Category --> */}
                <a
                  href="/#"
                  className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                >
                  <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                      <LazyLoad>
                        <span className="counter">
                          <CountUp duration={6} end={5} />
                        </span>
                      </LazyLoad>
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                      Running Jobs
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                {/* <!-- Single Category --> */}
                <a
                  href="/#"
                  className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                >
                  <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                    <i class="fas fa-file-contract"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                      <LazyLoad>
                        <span className="counter">
                          <CountUp duration={4} end={23} />
                        </span>
                      </LazyLoad>
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                      Pending Proposals
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                {/* <!-- Single Category --> */}
                <a
                  href="/#"
                  className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                >
                  <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                    <i className="fas fa-eye"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                      <LazyLoad>
                        <span className="counter">
                          <CountUp
                            duration={4}
                            decimal="."
                            decimals={1}
                            end={16.5}
                          />
                        </span>
                        K
                      </LazyLoad>
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                      Service Views
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                {/* <!-- Single Category --> */}
                <a
                  href="/#"
                  className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
                >
                  <div className="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                    <i className="fas fa-mouse-pointer"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                      <LazyLoad>
                        <span className="counter">
                          <CountUp
                            duration={4}
                            decimal="."
                            decimals={1}
                            end={11.6}
                          />
                        </span>
                        %
                      </LazyLoad>
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                      Hire-through Rate
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
            
              <div className="col-xxl-12 mb-14">
                <div className="row mb-11 align-items-center">
                  <div className="col-lg-6 mb-lg-0 mb-4">
                    <h3 className="font-size-6 mb-0"> Provided Services</h3>
                  </div>
                  <div className="col-lg-6">
                    <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                      <p className="font-size-4 mb-0 mr-6 py-2">
                        Filter by Job:
                      </p>
                      <div className="h-px-48">
                        <Select
                          options={defaultJobs}
                          className="pl-0 h-100 arrow-3 arrow-3-black min-width-px-273  text-black-2 d-flex align-items-center w-100"
                          border={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-8 pt-7 rounded pb-8 px-11">
                  {/* <div className="table-responsive"> */}
                  {providerJobs.length? 
                  
                  <BootstrapTable
                    // headerClasses="text-center"
                    striped={true}
                    hover={true}
                    keyField="Name"
                    data={providerJobs}
                    columns={buyerTableColumns}
                    rowClasses={"border border-color-2"}
                    pagination={paginationFactory()}
                  >
                    {" "}
                  </BootstrapTable> :
                  <h3> Sorry! Looks like you have been hired for any jobs yet. </h3>
                  }
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
