import imgB1 from "../../assets/image/l2/png/featured-job-logo-1.png";
import imgL from "../../assets/image/svg/icon-loaction-pin-black.svg";
import Link from "next/link";
const ExpereinceCard = (props) => {

    return (
      
        <div className="w-100">
          <div className="d-flex align-items-center pr-11 mb-3 flex-wrap flex-sm-nowrap">
            <div className="square-72 align-self-baseline mt-5 d-block mr-8 mb-7 mb-sm-0">
              <img src={imgB1.src} alt="" />
            </div>
            <div className="w-100 mt-n2">
              <h3 className="mb-0">
                  <span className="font-size-6 text-black-2 font-weight-semibold">
                    {props.service.title}
                  </span>
                
              </h3>
              
                <a className="font-size-4 text-default-color mr-7 line-height-2">
                {props.service.category}
                </a>
                 -
                <a className="font-size-4 text-default-color ml-7 line-height-2">
                {props.service.scope}
                </a>
              
              <div className="d-flex align-items-center justify-content-md-between flex-wrap">
              <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {props.service.skills?.map(skill => {
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
              </ul>
              </div>
            </div>
          </div>
          <p>
          {props.service.description}
            </p>
        </div>
    )
}

export default ExpereinceCard