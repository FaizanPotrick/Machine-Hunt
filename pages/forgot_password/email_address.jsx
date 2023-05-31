import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../../context/StateContext";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

const Email_Address = () => {
  const { setLoading, setAlert, isLogin } = useContext(StateContext);
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.back();
    }
  }, []);

  const [email, setEmail] = useState("");

  const send_verification_code_fn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/credentials/email_address", {
        email_address: email,
      });
      setEmail("");
      router.push("/forgot_password/verification_code");
    } catch (err) {
      setLoading(false);
      setAlert({
        isAlert: true,
        type: err.response.data.type,
        message: err.response.data.message,
      });
    }
  };

  return (
    <div className="py-5 flex flex-col justify-center items-center my-auto w-full">
      <Head>
        <title>Forgot Password</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Machine Hunt provides different programming languages to build your model. Build your model with your preferred language."
        />
      </Head>
      <div className="max-w-md w-full flex flex-col justify-center items-center p-5 sm:px-10 shadow-inner drop-shadow-lg rounded-lg bg-white border">
        <div className="text-lg sm:text-xl mr-auto text-[#00553a] mb-5">
          Forgot Password?
        </div>
        <form className="w-full" onSubmit={send_verification_code_fn}>
          <div className="w-full relative mb-5 text-[#00553a]/70">
            <input
              type="email"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm sm:text-base shadow-inner drop-shadow-md rounded-lg border border-[#00553a]/50 cursor-pointer focus:outline-none peer"
              id="forgot_password_email_address"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="forgot_password_email_address"
              className="text-sm sm:text-base absolute duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-[#fff] cursor-pointer ml-2 peer-focus:px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email Address
            </label>
          </div>
          <button
            className="text-[#fff] w-full ease-in-out px-4 sm:px-5 py-1.5 sm:py-2 bg-[#0e8f66]/80 mb-2 rounded-lg text-lg duration-300 hover:scale-105 shadow-md"
            type="submit"
          >
            Send Verification Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default Email_Address;
