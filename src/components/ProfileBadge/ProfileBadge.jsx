import { Container, Dropdown } from "react-bootstrap";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import { Blockie } from "web3uikit";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useRouter } from "next/router";

const ProfileBadge = (props) => {
  const { isAuthenticated, user, logout } = useMoralis();
  const size = useWindowSize();
  const router = useRouter();

  const logOutUser = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="header-btn-devider ml-auto ml-lg-5 pl-2 d-none d-xs-flex align-items-center">
      <div>
        <Link href="/#">
          <a className="px-3 ml-7 font-size-7 notification-block flex-y-center position-relative">
            <i className="fas fa-bell heading-default-color"></i>
            <span className="font-size-3 count font-weight-semibold text-white bg-primary circle-24 border border-width-3 border border-white">3</span>
          </a>
        </Link>
      </div>
      <div>
        <Dropdown className="show-gr-dropdown py-5">
          <Dropdown.Toggle as="a" className="proile media ml-7 flex-y-center">
            <div className="circle-40">
              <Blockie seed={user?.get("ethAddress")} />
            </div>
            <i className="fas fa-chevron-down heading-default-color ml-6"></i>
          </Dropdown.Toggle>
          {size.width <= 991 ? (
            <Dropdown.Menu className="gr-menu-dropdown border-0 border-width-2 py-2 w-auto bg-default" key="1">
              <Link href="/dashboard-main">
                <a className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase">Dashboard</a>
              </Link>
              {user.get("isProvider") === true ? null : (
                <Link href="/become-provider">
                  <a className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase">Become a Provider</a>
                </Link>
              )}
              <Link href="/dashboard-settings">
                <a className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase">Settings</a>
              </Link>
              <Link href={user.get("isProvider") === true ? "/edit-profile" : "/company-profile"}>
                <a className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase">Edit Profile</a>
              </Link>
              <button onClick={() => logOutUser()} className=" dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase">
                Log Out
              </button>
            </Dropdown.Menu>
          ) : (
            <div className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default" key="2">
              {/* <Link href="/dashboard-main">
                <a className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase">Dashboard</a>
              </Link> */}
              {user.get("isProvider") === true ? null : (
                <Link href="/become-provider">
                  <a className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase">Become a Provider</a>
                </Link>
              )}
              <Link href="/dashboard-settings">
                <a className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase">Settings</a>
              </Link>
              <Link href={user.get("isProvider") === true ? "/edit-profile" : "/company-profile"}>
                <a className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase">Edit Profile</a>
              </Link>

              <button onClick={() => logOutUser()} className=" dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase">
                Log Out
              </button>
            </div>
          )}
        </Dropdown>
      </div>
    </div>
  );
};
export default ProfileBadge;
