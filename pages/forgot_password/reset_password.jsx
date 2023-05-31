import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../../context/StateContext";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import { deleteCookie } from "cookies-next";

const Reset_Password = () => {
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

  const [reset_password, setReset_Password] = useState({
    password: "",
    confirm_password: "",
  });

  const onChange = (e) => {
    setReset_Password({ ...reset_password, [e.target.name]: e.target.value });
  };

  const reset_password_fn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/credentials/reset_password", reset_password);
      setReset_Password({
        password: "",
        confirm_password: "",
      });
      setLoading(false);
      deleteCookie("temp_session");
      router.push("/login");
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
          Reset Password
        </div>
        <form className="w-full" onSubmit={reset_password_fn}>
          <div className="w-full relative mb-5 text-[#00553a]/70">
            <input
              type="password"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm sm:text-base shadow-inner drop-shadow-md rounded-lg border border-[#00553a]/50 cursor-pointer focus:outline-none peer"
              id="forgot_password_password"
              placeholder=" "
              minLength="8"
              maxLength="12"
              autoComplete="off"
              value={reset_password.password}
              name="password"
              onChange={onChange}
              required
            />
            <label
              htmlFor="forgot_password_password"
              className="text-sm sm:text-base absolute duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-[#fff] cursor-pointer ml-2 peer-focus:px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              New Password
            </label>
          </div>
          <div className="w-full relative mb-5 text-[#00553a]/70">
            <input
              type="password"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm sm:text-base shadow-inner drop-shadow-md rounded-lg border border-[#00553a]/50 cursor-pointer focus:outline-none peer"
              id="forgot_password_confirm_password"
              placeholder=" "
              minLength="8"
              maxLength="12"
              autoComplete="off"
              value={reset_password.confirm_password}
              name="confirm_password"
              onChange={onChange}
              required
            />
            <label
              htmlFor="forgot_password_confirm_password"
              className="text-sm sm:text-base absolute duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-[#fff] cursor-pointer ml-2 peer-focus:px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Confirm Password
            </label>
          </div>
          <button
            className="text-[#fff] w-full ease-in-out px-4 sm:px-5 py-1.5 sm:py-2 bg-[#0e8f66]/80 mb-2 rounded-lg text-lg duration-300 hover:scale-105 shadow-md"
            type="submit"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset_Password;
