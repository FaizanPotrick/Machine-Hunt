import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../../context/StateContext";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import { deleteCookie } from "cookies-next";

const Verification_Code = () => {
  const { setLoading, setAlert, isLogin } = useContext(StateContext);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get("/api/verify");
        setLoading(false);
      } catch (err) {
        deleteCookie("temp_session");
        setLoading(false);
        router.push("/forgot_password/email_address");
      }
    };
    verify();
  }, []);

  useEffect(() => {
    if (isLogin) {
      router.back();
    }
  }, []);

  const [code, setCode] = useState("");

  const resend_verification_code_fn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.get("/api/credentials/email_address");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setAlert({
        isAlert: true,
        type: err.response.data.type,
        message: err.response.data.message,
      });
    }
  };

  const verification_code_fn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/credentials/verification_code", {
        verification_code: code,
      });
      setCode("");
      router.push("/forgot_password/reset_password");
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
          Enter Verification Code
        </div>
        <form className="w-full" onSubmit={verification_code_fn}>
          <div className="w-full relative mb-3 text-[#00553a]/70">
            <input
              type="text"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm sm:text-base shadow-inner drop-shadow-md rounded-lg border border-[#00553a]/50 cursor-pointer focus:outline-none peer"
              id="forgot_password_verification_code"
              placeholder=" "
              minLength="6"
              maxLength="6"
              value={code}
              name="verification_code"
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <label
              htmlFor="forgot_password_verification_code"
              className="text-sm sm:text-base absolute duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-[#fff] cursor-pointer ml-2 peer-focus:px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Verification Code
            </label>
          </div>
          <div className="text-end">
            <button
              className="text-[#00553a] hover:underline"
              onClick={resend_verification_code_fn}
            >
              Resend Code
            </button>
          </div>
          <button
            className="text-[#fff] w-full ease-in-out mt-2 px-4 sm:px-5 py-1.5 sm:py-2 bg-[#0e8f66]/80 mb-2 rounded-lg text-lg duration-300 hover:scale-105 shadow-md"
            type="submit"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification_Code;
