import { ToastContainer } from "react-toastify";
import "antd/lib/";
import "../styles/assets/styles/main.css";
import "../styles/assets/styles/responsive.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
        <ChakraProvider>
          
      <Component {...pageProps} />
      <ToastContainer className="my-toast" />
        </ChakraProvider>
    </>
  );
}

export default MyApp;
