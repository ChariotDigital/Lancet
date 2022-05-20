import React, { useContext, useState, useMemo } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';
import {Icon} from 'web3uikit'


const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const IS_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi

const ModalSignUp = (props) => {
  const [showPassFirst, setShowPassFirst] = useState(true);
  const [showPassSecond, setShowPassSecond] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  
  const {signup, isAuthenticated, user, authenticate, setUserData, userError, isUserUpdating} = useMoralis()

  const userState = useMemo(() => {
    return {username, password, email}
  }, [username, password, email])

  const router = useRouter();
  const gContext = useContext(GlobalContext);

  const handleClose = () => {
    gContext.toggleSignUpModal();
  };

  const togglePasswordFirst = () => {
    setShowPassFirst( currShowPassFirst => !currShowPassFirst);
  };

  const togglePasswordSecond = () => {
    setShowPassSecond(currShowPassSecond => !currShowPassSecond);
  };

  const finishUserSignUp = async () => {
    if(validSignUpData()) {
      setUserData(
       userState,
      ).then(function (user) {
        console.log("logged in user:", user);
        console.log(user?.get("ethAddress"));
        gContext.toggleSignUpModal();
        router.push('/dashboard-main')
      })
      .catch(function (error) {
        handleMoralisError(error)
      });
    
    }
      

  }
  

  const signUpWithWallet = async () => {
    if (!isAuthenticated) {
        
      await authenticate({signingMessage: "Sign up to become a buyer on Lancet"  })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user?.get("email"));
          if(user?.get("email") === undefined ) {
            setIsNewUser(true)
          } else {
            gContext.toggleSignUpModal();
            router.push('/dashboard-main')
          }
          
        })
        .catch(function (error) {
          handleMoralisError(error)
        });
    }
  }

  const validSignUpData = () => {
    return IS_EMAIL_REGEX.test(email) && password === passwordConfirm && username !== ''
  }


  return (
    <ModalStyled
      {...props}
      size="lg"
      centered
      show={gContext.signUpModalVisible}
      onHide={gContext.toggleSignUpModal}
    >
      <Modal.Body className="p-0">
        {isNewUser ? <div>
          <div className="d-felx flex-row ">
             <h2 className="m-5"> Congratulations! You've signed up</h2>
              <strong className="ml-5 mt-2"> Please complete the rest of you profile information below</strong>
          </div>
            
            <form className="m-10">
                    <div className="form-group">
                        <label
                        htmlFor="email2"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                        Name
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="John Doe"
                        id="full_name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label
                        htmlFor="email2"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                        E-mail
                        </label>
                        <input
                        type="email"
                        className="form-control"
                        placeholder="example@gmail.com"
                        id="email2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label
                        htmlFor="password"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        >
                        Password
                        </label>
                        <div className="position-relative">
                        <input
                            type={showPassFirst ? "password" : "text"}
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                        />
                        <a
                            href="/#"
                            className="show-password pos-abs-cr fas mr-6 text-black-2"
                            onClick={(e) => {
                            e.preventDefault();
                            togglePasswordFirst();
                            }}
                        >
                            <span className="d-none">none</span>
                        </a>
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                        htmlFor="password2"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        >
                        Confirm Password
                        </label>
                        <div className="position-relative">
                        <input
                            type={showPassSecond ? "password" : "text"}
                            className="form-control"
                            id="password2"
                            placeholder="Enter password"
                        />
                        <a
                            href="/#"
                            className="show-password pos-abs-cr fas mr-6 text-black-2"
                            onClick={(e) => {
                            e.preventDefault();
                            togglePasswordSecond();
                            }}
                        >
                            <span className="d-none">none</span>
                        </a>
                        </div>
                    </div>
                    <div className="form-group d-flex flex-wrap justify-content-between mb-1">
                        <label
                        htmlFor="terms-check2"
                        className="gr-check-input d-flex  mr-3"
                        >
                        <input
                            className="d-none"
                            type="checkbox"
                            id="terms-check2"
                        />
                        <span className="checkbox mr-5"></span>
                        <span className="font-size-3 mb-0 line-height-reset d-block">
                            Agree to the{" "}
                            <a href="/#" className="text-primary">
                            Terms &amp; Conditions
                            </a>
                        </span>
                        </label>
                        <a
                        href="/#"
                        className="font-size-3 text-dodger line-height-reset"
                        >
                        Forget Password
                        </a>
                    </div>
                    <div className="form-group mb-8">
                        <button onClick ={(e) => {e.preventDefault(); finishUserSignUp()}} className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase">
                        Finish Sign Up{" "}
                        </button>
                    </div>
                    
                    </form>

        </div> : 
        
        <>
          <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="login-modal-main bg-white rounded-8 overflow-hidden">
          <div className="row no-gutters">
            <div className="col-lg-5 col-md-6">
              <div className="pt-10 pb-6 pl-11 pr-12 bg-black-2 h-100 d-flex flex-column dark-mode-texts">
                <div className="pb-9">
                  <h3 className="font-size-8 text-white line-height-reset pb-4 line-height-1p4">
                    Create a free account today
                  </h3>
                  <p className="mb-0 font-size-4 text-white">
                    Create your account to continue and explore new jobs.
                  </p>
                </div>
                <div className="border-top border-default-color-2 mt-auto">
                  <div className="d-flex mx-n9 pt-6 flex-xs-row flex-column">
                    <div className="pt-5 px-9">
                      <h3 className="font-size-7 text-white">295</h3>
                      <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                        New jobs posted today
                      </p>
                    </div>
                    <div className="pt-5 px-9">
                      <h3 className="font-size-7 text-white">14</h3>
                      <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                        New companies registered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
                <div className="row">
                  <div className="col-4 col-xs-12">
                    <a
                      
                      className="font-size-4 font-weight-semibold position-relative text-white bg-allports h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                    >
                      <i className="fab fa-linkedin pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                      <span className="d-none d-xs-block">
                        Sign up with LinkedIn
                      </span>
                    </a>
                  </div>
                  <div className="col-4 col-xs-12">
                    <a
                      
                      className="font-size-4 font-weight-semibold position-relative text-white bg-poppy h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                    >
                      <i className="fab fa-google pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                      <span className="d-none d-xs-block">
                      Sign up with Google
                      </span>
                    </a>
                  </div>
                  <div className="col-4 col-xs-12">
                    <a
                      onClick={(e) => {e.preventDefault(); signUpWithWallet()}}
                      className="font-size-4 font-weight-semibold position-relative text-white bg-success h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                    >
                      <Icon
                        
                        fill="#000000"
                        size={24}
                        svg="metamask"
                        className={'pos-xs-abs-cl ml-4'}
                      />
                        <span className="d-none d-xs-block">
                      Sign up with Wallet
                      </span>
                      
                    </a>
                  </div>
                </div>
                <div className="or-devider">
                  <span className="font-size-3 line-height-reset">Or</span>
                </div>
                <form>
                  <div className="form-group">
                    <label
                      htmlFor="email2"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      id="full_name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="email2"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="example@gmail.com"
                      id="email2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    >
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassFirst ? "password" : "text"}
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                      />
                      <a
                        href="/#"
                        className="show-password pos-abs-cr fas mr-6 text-black-2"
                        onClick={(e) => {
                          e.preventDefault();
                          togglePasswordFirst();
                        }}
                      >
                        <span className="d-none">none</span>
                      </a>
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="password2"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    >
                      Confirm Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassSecond ? "password" : "text"}
                        className="form-control"
                        id="password2"
                        placeholder="Enter password"
                      />
                      <a
                        href="/#"
                        className="show-password pos-abs-cr fas mr-6 text-black-2"
                        onClick={(e) => {
                          e.preventDefault();
                          togglePasswordSecond();
                        }}
                      >
                        <span className="d-none">none</span>
                      </a>
                    </div>
                  </div>
                  <div className="form-group d-flex flex-wrap justify-content-between mb-1">
                    <label
                      htmlFor="terms-check2"
                      className="gr-check-input d-flex  mr-3"
                    >
                      <input
                        className="d-none"
                        type="checkbox"
                        id="terms-check2"
                      />
                      <span className="checkbox mr-5"></span>
                      <span className="font-size-3 mb-0 line-height-reset d-block">
                        Agree to the{" "}
                        <a href="/#" className="text-primary">
                          Terms &amp; Conditions
                        </a>
                      </span>
                    </label>
                    <a
                      href="/#"
                      className="font-size-3 text-dodger line-height-reset"
                    >
                      Forget Password
                    </a>
                  </div>
                  <div className="form-group mb-8">
                    <button onClick ={(e) => {e.preventDefault(); signUpNewUser()}} className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase">
                      Sign Up{" "}
                    </button>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
        </>
        
        }
        
      </Modal.Body>
    </ModalStyled>
  );
}

export default ModalSignUp;

