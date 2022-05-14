// import App from 'next/app'
import Layout from "../components/Layout";
import { GlobalProvider } from "../context/GlobalContext";
import  {MoralisProvider}  from "react-moralis";
// import "../assets/fonts/fontawesome-5/webfonts/fa-brands-400.ttf";
// import "../assets/fonts/fontawesome-5/webfonts/fa-regular-400.ttf";
import "../assets/fonts/fontawesome-5/css/all.min.css";

// import "../assets/fonts/icon-font/css/style.css";

import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../node_modules/aos/dist/aos.css";

import "../assets/fonts/icon-font/css/style.css";
import "../assets/fonts/fontawesome-5/css/all.css";

import "../scss/bootstrap.scss";
import "../scss/main.scss";

const MyApp = ({ Component, pageProps, router }) => {
  if (router.pathname.match(/404/)) {
    return (
      <GlobalProvider>
        <MoralisProvider 
                serverUrl={'https://r0us9wvsjpcz.usemoralis.com:2053/server'} 
                appId={'3JsMeS2qY0F2rFmhlby9OMMAuO6RHrlImWd0rK2R'}
            > 
        <Layout pageContext={{ layout: "bare" }}>
          <Component {...pageProps} />
        </Layout>
        </MoralisProvider>
      </GlobalProvider>
    );
  }
  if (router.pathname.match(/dashboard/)) {
    return (
      <GlobalProvider>
         <MoralisProvider 
                serverUrl={'https://r0us9wvsjpcz.usemoralis.com:2053/server'} 
                appId={'3JsMeS2qY0F2rFmhlby9OMMAuO6RHrlImWd0rK2R'}
            > 
          <Layout pageContext={{ layout: "dashboard" }}>
            <Component {...pageProps} />
          </Layout>

        </MoralisProvider>
      </GlobalProvider>
    );
  }

  return (
    <GlobalProvider>
      <MoralisProvider 
                serverUrl={'https://r0us9wvsjpcz.usemoralis.com:2053/server'} 
                appId={'3JsMeS2qY0F2rFmhlby9OMMAuO6RHrlImWd0rK2R'}
            > 
          <Layout pageContext={{}}>
            <Component {...pageProps} />
          </Layout>
      </MoralisProvider>
    </GlobalProvider>
  );
};

export default MyApp;
