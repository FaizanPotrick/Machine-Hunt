import React, { useState, useEffect } from "react";
import StateProvider from "../context/StateContext";
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import Head from "next/head";
import Router from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setPageLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      setPageLoading(false);
    });
  }, [Router]);
  return (
    <div className="flex flex-col items-center min-h-screen px-5 py-2 h-full">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Machine Hunt is a website to build machine learning based models with steps that are easy to understand and implement."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <StateProvider>
        <Navbar />
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
          <Component {...pageProps} />
        </GoogleOAuthProvider>
        <Alert />
        <Loading pageLoading={pageLoading} />
      </StateProvider>
      <footer className="text-center text-sm sm:text-base font-semibold text-[#00553a]">
        <div>&copy; 2022 Machine Hunt | All Rights Reserved</div>
        {/* <div className="text-[#00553a]/70 text-sm">
          Created by Faizan Potrick | Aarti Pawar
        </div> */}
      </footer>
    </div>
  );
};

export default MyApp;
