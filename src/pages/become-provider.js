import React, {useState, useContext, useEffect, useMemo} from "react";
import GlobalContext from "../context/GlobalContext";
import { Nav, Tab } from "react-bootstrap";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import {Blockie} from 'web3uikit'
import ServiceCard from "../components/ServiceCard/ServiceCard"
import  Select  from "../components/Core/Select";

import { useRouter } from 'next/router';

import { useMoralis  } from 'react-moralis';
import { Moralis } from 'moralis';

import { defaultProfessions, defaultSkills } from "../api/sampleData";


export default function BecomeProvider ({}) {

  const gContext = useContext(GlobalContext);

  const {user, isInitialized, setUserData, isAuthenticated} = useMoralis();
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [services, setServices] = useState([])
  const [professions, setProfessions] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [timeZone, setTimeZone] = useState('');
  const [email, setEmail] = useState('');
  const [personalSite, setPersonalSite] = useState('');

  const userState = useMemo(() => {
    return {bio, skills, professions, timeZone, email, personalSite}
  }, [bio, skills, professions, timeZone, email, personalSite])

  const router = useRouter();

  const query = new Moralis.Query("Services")
  

  useEffect( async () => {
    if(user === null) return; 

    setBio(user.get('bio'))
    setProfessions(user.get('professions'))
    setTimeZone(user.get('timeZone'))
    setEmail(user?.get('email'))
    setPersonalSite(user.get('personalSite'))
    setSkills(user.get('skills'))
    
    query.equalTo("user_id", user.id)
    const results = await query.find();
    
    await loadServices(results)
    
    const subscription = await query.subscribe();
    subscription.on('create', async (object) => {
      const results = await query.find()
      await loadServices(results)
    });
      
    
  }
  , [ isInitialized])

  const loadServices = async (data) => {
    if(data === null) return;
    const parsedServices = []
    data.map(service => { parsedServices.push(service.attributes)})
    setServices(parsedServices)
  };

  const saveUserData = async () => {
    if(isAuthenticated) {
      await setUserData(userState)
      router.push('/candidate-profile')
    }
    
  }

    const addSkill = (e) => {
        const updatedSkills = [...skills]
        updatedSkills.push(e.label)
        setSkills(updatedSkills)
    }

    const addProfession = (newProf) => {
      const updatedProfessions = [...professions]
      updatedProfessions.push(newProf.value)
      setProfessions(updatedProfessions)
    }

  return (
    <>
      <PageWrapper headerConfig={{ button: "profile" }}>
        <div className="bg-default-2 pt-22 pt-lg-25 pb-13 pb-xxl-32">
          <div className="container">
            {/* <!-- back Button --> */}
            <div className="row justify-content-center">
              <div className="col-12 dark-mode-texts">
                <div className="mb-9 d-flex flex-row justify-content-evenly align-items-end">
                  <Link href="/#">
                    <a className="d-flex align-items-center ml-4">
                      <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                      <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                        Cancel Registration
                      </span>
                    </a>
                  </Link>
                  <h3 className="text-gray ml-25"> Please complete your talent profile </h3>
                    {/* TODO: Completion score bar */}
                    <button 
                        className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 w-100 ml-14 mt-6"
                        onClick={() => saveUserData()}
                    >
                      <i className="fa fa-check px-1" aria-hidden="true"></i>
                            Finish registration
                    </button>  
                </div>
              </div>
            </div>
            {/* <!-- back Button End --> */}
            <div className="row">
              {/* <!-- Left Sidebar Start --> */}
              <div className="col-12 col-xxl-3 col-lg-4 col-md-5 mb-11 mb-lg-0">
                {isAuthenticated? 
                  <>
                  {/* <!-- Sidebar Start --> */}
            
                  
                    <div className="pl-lg-5">
                      {/* <!-- Top Start --> */}
                      <div className="bg-white shadow-9 rounded-4">
                        <div className="px-5 pt-11 pb-5 text-center border-bottom border-mercury">
                          
                            <a className="mb-4">
                              <Blockie seed={user.get('ethAddress')} size={19}/>
                            </a>
                        
                          <h4 className="mb-0">
                            <Link href="/#">
                              <a className="text-black-2 font-size-6 font-weight-semibold">
                                {user?.get('username')}
                              </a>
                            </Link>
                          </h4>
                          <div className="mb-8">
                          <Select 
                            value={null}
                            options={defaultProfessions} 
                            defaultValue={null} 
                            onChange={(e) => addProfession(e)} 
                            placeholder="Add Profession" 
                            className="mt-4  pl-1 h-100 arrow-3 font-size-4 d-flex align-items-center w-80" 
                            
                          />
                          </div>
                          <div className="icon-link d-flex flex-column align-items-center justify-content-center flex-wrap">
                            
                            {/* { socialLinks?.map(obj => {
                              return (
                            //     <Link href={obj.link}>
                            //   <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                            //     <i className={"fab fa-" + obj.name}></i>
                            //   </a>
                            // </Link>
                            
                            <div id={obj.label} className="d-flex border border-4 ">
                              <Select 
                                options={defaultSocials}
                                onChange={(e) => {obj.label = e.label}} 
                                placeholder="eg. Twitter..." 
                                className="pl-5 h-100 arrow-3 font-size-4 d-flex align-items-center w-100" 
                                border={false} 
                              />
                              <input value={obj.value} onChange={(e) => console.log(e.target.value)} placeholder={'Link'} className='form-control' style={{width: '126px'}}></input>
                            </div>
                              )
                            })}
                            </div>
                            <button 
                            onClick={(e) => {addSocialLink(e)}} 
                            placeholder="Add Social Links" 
                            className="pl-5 h-50 btn-success mx-7 arrow-3 font-size-4 d-flex align-self-center w-60" 
                            border={false} 
                            >
                              Add Social Link
                            </button>
                             */}
                              
                            
                            {/* <Link href="/#">
                              <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                                <i className="fab fa-facebook-f"></i>
                              </a>
                            </Link>
                            <Link href="/#">
                              <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                                <i className="fab fa-twitter"></i>
                              </a>
                            </Link>
                            <Link href="/#">
                              <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                                <i className="fab fa-dribbble"></i>
                              </a>
                            </Link>
                            <Link href="/#">
                              <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                                <i className="fab fa-behance"></i>
                              </a>
                            </Link> */}
                          </div>
                          <ul className="list-unstyled d-flex align-items-center flex-wrap">
                            {professions?.map(prof => {
                                return (
                                  <li key={prof}>
                                      <Link href="/#">
                                          <a className="bg-polar text-black-2  mr-6 px-3 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                          {prof}
                                          </a>
                                      </Link>
                                  </li>
                                )
                              })
                            }
                          </ul>       
                        </div>
                        {/* <!-- Top End --> */}
                        {/* <!-- Bottom Start --> */}
                        <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-5">
                          <h5 className="text-black-2 mb-8 font-size-5">Contact Info</h5>
                          {/* <!-- Single List --> */}
                          <div className="mb-7">
                            <p className="font-size-4 mb-0">Time Zone</p>
                            <input value={timeZone} onChange={(e) => setTimeZone(e.target.value)} placeholder={'ex. EST, PST'} className='mt-4 form-control' style={{width: '200px'}}></input>
                          </div>
                          {/* <!-- Single List --> */}
                          {/* <!-- Single List --> */}
                          <div className="mb-7">
                            <p className="font-size-4 mb-0">E-mail</p>
                            <h5 className="font-size-4 font-weight-semibold mb-0">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'example@email.com'} className='mt-4 form-control' style={{width: '200px'}}></input>
                            </h5>
                          </div>
                          {/* <!-- Single List --> */}
                          {/* <!-- Single List --> */}
                          {/* <div className="mb-7">
                            <p className="font-size-4 mb-0">Phone</p>
                            <h5 className="font-size-4 font-weight-semibold mb-0">
                              <a className="text-black-2 text-break" href="tel:+999565562">
                                +999 565 562
                              </a>
                            </h5>
                          </div> */}
                          {/* <!-- Single List --> */}
                          {/* <!-- Single List --> */}
                          <div className="mb-7">
                            <p className="font-size-4 mb-0">Personal Website</p>
                            <input value={personalSite} onChange={(e) => setPersonalSite(e.target.value)} placeholder={'ex. richfreelancer.eth'} className='mt-4 form-control' style={{width: '200px'}}></input>
                          </div>
                          {/* <!-- Single List --> */}
                        </div>
                        {/* <!-- Bottom End --> */}
                      </div>
                    </div>
                  
            
                  {/* <!-- Sidebar End --> */}
                </>
                    : null 
                }
                
              </div>
              {/* <!-- Left Sidebar End --> */}
              {/* <!-- Middle Content --> */}
              <div className="col-12 col-xxl-6 col-lg-8 col-md-7 order-2 order-xl-1">
                <Tab.Container id="left-tabs-example" defaultActiveKey="one">
                  <div className="bg-white rounded-4 shadow-9">
                    {/* <!-- Tab Section Start --> */}
                    <Nav
                      className="nav border-bottom border-mercury pl-12"
                      role="tablist"
                    >
                      <li className="tab-menu-items nav-item pr-12">
                        <Nav.Link
                          eventKey="one"
                          className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                        >
                          Overview
                        </Nav.Link>
                      </li>
                    
                    </Nav>
                    {/* <!-- Tab Content --> */}
                    <Tab.Content>
                      <Tab.Pane eventKey="one">
                        {/* <!-- Excerpt Start --> */}
                        <div className="pr-xl-0 pr-xxl-14 p-5 px-xs-12 pt-7 pb-5">
                          <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                            About
                          </h4>
                          <textarea
                                  name="message"
                                  id="message3"
                                  placeholder="Tell potential clients why they should hire you!"
                                  className="form-control h-px-144"
                                  value={bio}
                                  onChange={(e) => setBio(e.target.value)}
                                >

                            </textarea>
                        </div>
                        {/* <!-- Excerpt End --> */}
                        {/* <!-- Skills --> */}
                        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
                            <div className="d-flex justify-content-between">
                                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                                    Skills
                                </h4>
                                <Select
                                    value={null}
                                    className="mt-5 w-40"
                                    placeholder="Add Skills"
                                    options={defaultSkills}
                                    onChange={addSkill}
                                    createOptionPosition
                                />
                            </div>
                          <ul className="list-unstyled d-flex align-items-center flex-wrap">
                              {skills?.map(skill => {
                                  return (
                                    <li key={skill}>
                                        <Link href="/#">
                                            <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                            {skill}
                                            </a>
                                        </Link>
                                    </li>
                                  )
                                })
                              }
                          </ul>
                        </div>
                        {/* <!-- Skills End --> */}
                        {/* <!-- Card Section Start --> */}
                        <div className="border-top p-5 pl-xs-12 pt-7 pb-5">
                            <div className='d-flex flex-row justify-content-between'>

                                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                                    Your Services
                                </h4>
                                <a
                                    className="btn btn-success text-uppercase mt-5 mr-13 font-size-3 text-white focus-reset"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        gContext.toggleNewServiceModal()
                                    }}
                                    >
                                    <i className="fa fa-plus mx-3"></i>
                                    Add Service
                                </a>
                            </div>
                          
                          {services?.map( service => {
                            return (

                              <ServiceCard key={service.title} service={service}/>
                            )
                            
                          })}
                          
                        
                        </div>
                        {/* <!-- Card Section End --> */}
                        {/* <!-- Card Section Start --> */}
                        
                        {/* <!-- Card Section End --> */}
                      </Tab.Pane>
                      <Tab.Pane eventKey="two">
                        {/* <!-- Excerpt Start --> */}
                        {/* <div className="pr-xl-11 p-5 pl-xs-12 pt-9 pb-11">
                          <form action="/">
                            <div className="row">
                              <div className="col-12 mb-7">
                                <label
                                  htmlFor="name3"
                                  className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                >
                                  Your Name
                                </label>
                                <input
                                  id="name3"
                                  type="text"
                                  className="form-control"
                                  placeholder="Jhon Doe"
                                />
                              </div>
                              <div className="col-lg-6 mb-7">
                                <label
                                  htmlFor="email3"
                                  className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                >
                                  E-mail
                                </label>
                                <input
                                  id="email3"
                                  type="email"
                                  className="form-control"
                                  placeholder="example@gmail.com"
                                />
                              </div>
                              <div className="col-lg-6 mb-7">
                                <label
                                  htmlFor="subject3"
                                  className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                >
                                  Subject
                                </label>
                                <input
                                  id="subject3"
                                  type="text"
                                  className="form-control"
                                  placeholder="Special contract"
                                />
                              </div>
                              <div className="col-lg-12 mb-7">
                                <label
                                  htmlFor="message3"
                                  className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                >
                                  Message
                                </label>
                                <textarea
                                  name="message"
                                  id="message3"
                                  placeholder="Type your message"
                                  className="form-control h-px-144"
                                ></textarea>
                              </div>
                              <div className="col-lg-12 pt-4">
                                <button className="btn btn-primary text-uppercase w-100 h-px-48">
                                  Send Now
                                </button>
                              </div>
                            </div>
                          </form>
                        </div> */}
                        {/* <!-- Excerpt End --> */}
                      </Tab.Pane>
                    </Tab.Content>
                    {/* <!-- Tab Content End --> */}
                    {/* <!-- Tab Section End --> */}
                  </div>
                </Tab.Container>
              </div>
              {/* <!-- Middle Content --> */}
              {/* <!-- Right Sidebar Start --> */}
              <div className="col-12 col-xxl-3 col-md-4 offset-xxl-0 offset-lg-4 offset-md-5 order-3 order-xl-2 mt-xxl-0 mt-md-12">
              <div className="pl-lg-5 bg-light-gray">
                  <h4 className="font-size-6 font-weight-semibold mb-0">
                    Profile Completion
                  </h4>
                  <div className="progress mt-5">
                    <div className="progress-bar" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                  </div>
                                    
                </div>
              </div>
              {/* <!-- Right Sidebar End --> */}
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
