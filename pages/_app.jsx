import StateProvider from "../context/StateContext";
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="flex flex-col items-center min-h-screen p-5 pb-2 h-full">
      <Head>
        <meta
          name="description"
          content="Machine Hunt is a website to build machine learning based models with steps that are easy to understand and implement."
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <StateProvider>
        <Navbar />
        <GoogleOAuthProvider clientId="603448246114-q54gmt27amedb6i9svagarv8iuf3l527.apps.googleusercontent.com">
          <Component {...pageProps} />
        </GoogleOAuthProvider>
        <Alert />
        <Loading />
      </StateProvider>
      <footer className="text-center text-sm sm:text-base font-semibold text-[#00553a]">
        <div>&copy; 2022 Machine Hunt | All Rights Reserved</div>
        <div className="opacity-70 text-sm">
          Created by Faizan Potrick | Aarti Pawar
        </div>
      </footer>
    </div>
  );
};

export default MyApp;
