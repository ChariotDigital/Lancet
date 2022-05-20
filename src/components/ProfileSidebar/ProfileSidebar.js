import React from "react";
import Link from "next/link";

import imgP from "../../assets/image/l3/png/pro-img.png";

import {Blockie} from 'web3uikit'

const Sidebar = (props) => {
  return (
    <>
      <div {...props}>
        <div className="pl-lg-5">
        
          <div className="bg-white shadow-9 rounded-4">
            <div className="px-5 py-6 text-center border-bottom border-mercury">
              <Link href="/#">
                <a className="mb-4">
                <Blockie seed={props.user?.get('ethAddress')} size={19}/>
                </a>
              </Link>
              <h4 className="mb-0">
                <Link href="/#">
                  <a className="text-black-2 font-size-6 font-weight-semibold">
                    {props.user?.get('username')}
                  </a>
                </Link>
              </h4>
              <p className="mb-3">
              <ul className="list-unstyled d-flex align-items-center mb-0 flex-wrap">
                  {props.user?.get('professions')?.map(prof => {
                      return (
                        <li key={prof}>
                            <Link href="/#">
                                <a className="bg-polar text-black-2  mr-2 px-1 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                {prof}
                                </a>
                            </Link>
                        </li>
                      )
                    })
                  }
                </ul>
              </p>
              
            </div>

            <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-5">
              <h5 className="text-black-2 mb-8 font-size-5">Contact Info</h5>

              <div className="mb-7">
                <p className="font-size-4 mb-0">Time Zone</p>
                <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                 {props.user?.get('timeZone')}
                </h5>
              </div>

              <div className="mb-7">
                <p className="font-size-4 mb-0">E-mail</p>
                <h5 className="font-size-4 font-weight-semibold mb-0">
                  <a
                    className="text-black-2 text-break"
                    href="mailto:name_ac@gmail.com"
                  >
                    {props.user?.get('email')}
                  </a>
                </h5>
              </div>

              <div className="mb-7">
                <p className="font-size-4 mb-0">Website Linked</p>
                <h5 className="font-size-4 font-weight-semibold mb-0">
                  <Link href={props.user?.get('personalSite') ? props.user?.get('personalSite')  : '/#' }>
                    <a className="text-break">{props.user?.get('personalSite')}</a>
                  </Link>
                </h5>
              </div>

            </div>
      
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
