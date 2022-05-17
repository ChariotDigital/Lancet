import React, {useState, useContext, useEffect} from "react";
import GlobalContext from "../context/GlobalContext";
import { Nav, Tab } from "react-bootstrap";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import Creatable, { useCreatable } from 'react-select/creatable';
import ProfileSidebar from "../components/ProfileSidebar";
import ExperienceCard from "../components/ExperienceCard/ExperienceCard"
import  Select  from "../components/Core/Select";



import imgB2 from "../assets/image/l1/png/feature-brand-1.png";
import imgB3 from "../assets/image/svg/harvard.svg";
import imgB4 from "../assets/image/svg/mit.svg";

import imgT1 from "../assets/image/l3/png/team-member-1.png";
import imgT2 from "../assets/image/l3/png/team-member-2.png";
import imgT3 from "../assets/image/l3/png/team-member-3.png";
import imgT4 from "../assets/image/l3/png/team-member-4.png";
import imgT5 from "../assets/image/l3/png/team-member-5.png";

import imgL from "../assets/image/svg/icon-loaction-pin-black.svg";
import { useMoralis, useMoralisQuery  } from 'react-moralis';
import EditProfileSidebar from "../components/EditProfileSidebar";
import { Moralis } from 'moralis';


export default function BecomeProvider ({}) {

  const gContext = useContext(GlobalContext);

  const {user} = useMoralis();
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('')
  const [filteredSkills, setFilteredSkills] = useState(null)
  const [experience, setExperience] = useState([]);
  const [services, setServices] = useState(null)


  const { fetch } = useMoralisQuery(
    "Services",
    (query) => query.equalTo("user_id", user?.id),
    [],
    { autoFetch: false }
  );

  useEffect(() => {
    if(user) {

      loadServices()
    }
  }, [services, user])

  const loadServices = async () => {
    const results = await fetch();
    // Do something with the returned Moralis.Object values
    console.log(results)
    setServices(results)
    console.log("Services: ", services)
  };

  const addSerivice  = (service) => {
    newServices = [...services]
    newServices.push(service)
    setServices(newServices)
  }




  const defaultSkills = [
      {value: "react", label: "React"},
      {value: "node.js", label: "Node.js"},
      {value: "nft art", label: "NFT Art"},
      {value: "Product Management", label: "Product Mangement"},
      {value: "Digital Marketing", label: "Digital Marketing"},
  ]

  const searchSkills = (event) => {
    console.log(event)
    setTimeout(() => {
        let _filteredSkills;
        if (!event.query.trim().length) {
            _filteredSkills = [...defaultSkills];
        }
        else {
            _filteredSkills = defaultSkills.filter((skill) => {
                return skill.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }

        setFilteredSkills(_filteredSkills);
        console.log(filteredSkills);
    }, 250);
}

    const addSkill = (e) => {
        const updatedSkills = [...skills]
        updatedSkills.push(e.label)
        setSkills(updatedSkills)
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
                  <h3 className="text-success ml-25"> Please complete your talent profile </h3>
                    {/* TODO: Completion score bar */}
                    <button 
                        className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 w-100 ml-14 mt-6"
                    >
                      <i class="fa fa-check px-1" aria-hidden="true"></i>
                            Finish registration
                    </button>  
                </div>
              </div>
            </div>
            {/* <!-- back Button End --> */}
            <div className="row">
              {/* <!-- Left Sidebar Start --> */}
              <div className="col-12 col-xxl-3 col-lg-4 col-md-5 mb-11 mb-lg-0">
                <EditProfileSidebar user={user}/>
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
                      <li className="tab-menu-items nav-item pr-12">
                        <Nav.Link
                          eventKey="two"
                          className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                        >
                          Contact
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
                                    className="mt-5 w-40"
                                    placeholder="Select Skills"
                                    options={defaultSkills}
                                    onChange={addSkill}
                                    createOptionPosition
                                />
                            </div>
                          <ul className="list-unstyled d-flex align-items-center flex-wrap">
                              {skills?.map(skill => {
                                  return (
                                    <li>
                                        <Link href="/#">
                                            <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                            {skill}
                                            </a>
                                        </Link>
                                    </li>
                                  )
                                })
                              }
                            
                            {/* <li>
                              <Link href="/#">
                                <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                  Wireframing
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/#">
                                <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                  Prototyping
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/#">
                                <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                  Information
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/#">
                                <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                  Waterfall Model
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/#">
                                <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                  New Layout
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/#">
                                <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                  Browsing
                                </a>
                              </Link>
                            </li> */}
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

                              <ExperienceCard service={service}/>
                            )
                            
                          })}
                          
                        
                        </div>
                        {/* <!-- Card Section End --> */}
                        {/* <!-- Card Section Start --> */}
                        
                        {/* <!-- Card Section End --> */}
                      </Tab.Pane>
                      <Tab.Pane eventKey="two">
                        {/* <!-- Excerpt Start --> */}
                        <div className="pr-xl-11 p-5 pl-xs-12 pt-9 pb-11">
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
                        </div>
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
              <div className="pl-lg-5">
                  <h4 className="font-size-6 font-weight-semibold mb-0">
                    Profile Completion
                  </h4>

                  
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
