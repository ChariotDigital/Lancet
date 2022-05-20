import React, {useState} from "react";
import Link from "next/link";
import  Select  from "../Core/Select";

import imgP from "../../assets/image/l3/png/pro-img.png";
import { defaultProfessions } from "../../api/sampleData";
import { InputGroup } from "react-bootstrap";

const Sidebar = (props) => {
  const [professions, setProfessions] = useState(props.professions);
  const [timeZone, setTimeZone] = useState(props.timeZone);
  const [email, setEmail] = useState(props.email);
  const [personalSite, setPersonalSite] = useState(props.personalSite);


  const addProfession = (newProf) => {
    const updatedProfessions = [...props.professions]
    updatedProfessions.push(newProf.value)
    props.setProfessions(updatedProfessions)
  }


  return (
    <>

      <div {...props}>
        <div className="pl-lg-5">
          <div className="bg-white shadow-9 rounded-4">
            <div className="px-5 pt-11 pb-5 text-center border-bottom border-mercury">
              <Link href="/#">
                <a className="mb-4">
                  <img className="circle-54" src={imgP.src} alt="" />
                </a>
              </Link>
              <h4 className="mb-0">
                <Link href="/#">
                  <a className="text-black-2 font-size-6 font-weight-semibold">
                    {props.user?.get('username')}
                  </a>
                </Link>
              </h4>
              <p className="mb-8">
              <Select 
                value={null}
                options={defaultProfessions} 
                defaultValue={null} 
                onChange={(e) => addProfession(e)} 
                placeholder="Add Profession" 
                className="mt-4  pl-1 h-100 arrow-3 font-size-4 d-flex align-items-center w-80" 
                
              />
              </p>
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
            <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-5">
              <h5 className="text-black-2 mb-8 font-size-5">Contact Info</h5>
              
              <div className="mb-7">
                <p className="font-size-4 mb-0">Time Zone</p>
                <input value={timeZone} onChange={(e) => setTimeZone(e.target.value)} placeholder={'ex. EST, PST'} className='mt-4 form-control' style={{width: '200px'}}></input>
              </div>
              
              
              <div className="mb-7">
                <p className="font-size-4 mb-0">E-mail</p>
                <h5 className="font-size-4 font-weight-semibold mb-0">
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'example@email.com'} className='mt-4 form-control' style={{width: '200px'}}></input>
                </h5>
              </div>
              <div className="mb-7">
                <p className="font-size-4 mb-0">Personal Website</p>
                <input value={personalSite} onChange={(e) => setPersonalSite(e.target.value)} placeholder={'ex. richfreelancer.eth'} className='mt-4 form-control' style={{width: '200px'}}></input>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
