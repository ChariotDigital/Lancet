import React, { useState } from "react";

import imgP1 from "../assets/image/logo-main-black.png";
import imgP2 from "../assets/image/logo-main-black.png";
import { useMoralis } from "react-moralis";

const ServiceContext = React.createContext();

const ServiceProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState(null);



  return (
    <ServiceContext.Provider
      value={{
        selectedService,
        setSelectedService
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceContext;
export { ServiceProvider };
