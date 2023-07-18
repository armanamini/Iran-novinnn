import { ToastContainer } from "react-toastify";
import "antd/lib/";
import "../styles/assets/styles/main.css";
import "../styles/assets/styles/responsive.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <ChakraProvider>
          <Component {...pageProps} />
          <ToastContainer className="my-toast" />
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
