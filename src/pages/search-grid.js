import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import Sidebar from "../components/Sidebar";
import { Select } from "../components/Core";
import HireButton from "../components/hireButton";
import GlobalContext from "../context/GlobalContext";
import Moralis from "moralis";
import { useMoralis } from 'react-moralis';
import ServiceCard from "../components/ServiceCard/ServiceCard"
import {defaultSkills } from "../api/sampleData";


import imgB3 from "../assets/image/l1/png/feature-brand-3.png";
import imgB4 from "../assets/image/l1/png/feature-brand-4.png";
import imgB5 from "../assets/image/l1/png/feature-brand-5.png";
import imgB6 from "../assets/image/l1/png/feature-brand-6.png";
import { Button } from "react-bootstrap";

export default function SearchGrid() {
  const gContext = useContext(GlobalContext);
  const {user, isInitialized} = useMoralis();
  const[ services, setServices] = useState([])
  const [searchText, setSearchText] = useState('');
  const [lastSearch, setLastSearch] = useState('');

  const query = new Moralis.Query("Services")
  

  useEffect( async () => {
    if(user === null) return; 
    
    const results = await query.find();
    
    await loadServices(results)
      
  }
  , [ isInitialized])

  const loadServices = async (data) => {
    if(data === null) return;
    setServices(data)
  };

  const runSearch = (title = '') => {
    query.fullText("title", searchText);
    query.ascending("$score");
    query.select("$score");
    query
      .find()
      .then(function (results) {
        setLastSearch(searchText)
        setServices(results)
      })
      .catch(function (error) {
        alert(`Error has occurred with search: ${error}`)
      });
  }

  return (
    <>
      <PageWrapper>
        <div className="bg-default-1 pt-26 pt-lg-28 pb-13 pb-lg-25">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4 col-xs-8">
                <Sidebar />
              </div>
              <div className="col-12 col-md-8 col-xs-12 ">
                {/* <!-- form --> */}
                <div action={"/"} className="search-form search-2-adjustment ml-lg-0 ml-md-15">
                  <div className="filter-search-form-2 bg-white rounded-sm shadow-7 pr-6 py-6 pl-6">
                    <div className="filter-inputs">
                      <div className="form-group position-relative w-lg-45 w-xl-40 w-xxl-45">
                        <input className="form-control focus-reset pl-13" value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" id="keyword" placeholder="Build A DEX..." />
                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <i className="icon icon-zoom-2 text-primary font-weight-bold"></i>
                        </span>
                      </div>
                      {/* <!-- .select-city starts --> */}
                      <div className="form-group position-relative w-lg-55 w-xl-60 w-xxl-55">
                        <Select options={defaultSkills} defaultValue={null} placeholder={"React, Photoshop..."}className="pl-8 h-100 arrow-3 font-size-4 d-flex align-items-center w-100" border={false} />

                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <i className="fa fa-briefcase text-primary font-weight-bold"></i>
                        </span>
                      </div>
                      {/* <!-- ./select-city ends --> */}
                    </div>
                    <div className="button-block">
                      <button onClick={() => runSearch(searchText)} className="btn btn-primary line-height-reset h-100 btn-submit w-100 text-uppercase">Search</button>
                    </div>
                  </div>
                </div>
                <div className="pt-12 ml-lg-0 ml-md-15">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="font-size-4 font-weight-normal text-default-color">
                      <span className="heading-default-color mx-3">{services.length}</span>
                      results for <span className="heading-default-color">"{lastSearch}"</span>
                    </h5>
                    <div className="d-flex align-items-center result-view-type">
                      <Link href="/search-list">
                        <a className="heading-default-color pl-5 font-size-6 hover-text-hitgray">
                          <i className="fa fa-list-ul"></i>
                        </a>
                      </Link>
                      <Link href="/search-grid">
                        <a className="heading-default-color pl-5 font-size-6 hover-text-hitgray active">
                          <i className="fa fa-th-large"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="row justify-content-center">
                        {/* <!-- Start Feature One --> */}
                        {services.map(service => {
                          return(
                            <div className="col-12 col-lg-6">

                            <ServiceCard key={service.id} service={service.attributes}/> 
                            </div>
                          )

                        })
                        
                      
                        }
                        {/* <!-- End Feature One --> */}
                      
                      <div className="col-12 col-lg-6">
                        {/* <!-- Start Feature One --> */}
                        
                        {/* <!-- End Feature One --> */}
                      </div>
                      
                    </div>
                  </div>
                  <div className="text-center pt-5 pt-lg-13">
                    <Link href="/#">
                      <a className="text-green font-weight-bold text-uppercase font-size-3 d-flex align-items-center justify-content-center">
                        Load More <i className="fas fa-sort-down ml-3 mt-n2 font-size-4"></i>
                      </a>
                    </Link>
                  </div>
                </div>
                {/* <!-- form end --> */}
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
