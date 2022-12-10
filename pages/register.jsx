import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../context/StateContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Head from "next/head";

const Register = () => {
  const { setLoading, setAlert, isLogin, setIsLogin } =
    useContext(StateContext);
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.back();
    }
  }, []);

  const [register, setRegister] = useState({
    name: "",
    email_address: "",
    password: "",
  });

  const onChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const Google_fn = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
            },
          }
        );
        setLoading(true);
        await axios.post("/api/credentials/sign-in", {
          name: data.name,
          email_address: data.email,
        });
        setIsLogin(true);
        router.push("/dashboard");
      } catch (err) {
        setLoading(false);
        setAlert({
          isAlert: true,
          type: err.response ? err.response.data.type : "error",
          message: err.response
            ? err.response.data.message
            : "Internal Server Error",
        });
      }
    },
    onError: (err) => {
      console.log(err);
      setAlert({
        isAlert: true,
        type: "error",
        message: "Internal Server Error",
      });
    },
  });

  const Register_fn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/credentials/register", register);
      setRegister({
        name: "",
        email_address: "",
        password: "",
      });
      setIsLogin(true);
      router.push("/dashboard");
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
        <title>Register</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Register on Machine Hunt, a website that helps you build your machine learning based models.You can register easily with google or create new account on the website."
        />
      </Head>
      <div className="max-w-md w-full flex flex-col justify-center items-center p-5 sm:px-10 shadow-inner drop-shadow-lg rounded-xl bg-white border">
        <div className="text-2xl sm:text-3xl text-center text-[#00553a]">
          Create Account
        </div>
        <div className="mt-2 text-gray-600 mb-2 sm:mb-4">
          Register if you are new here
        </div>
        <button
          onClick={Google_fn}
          className="bg-white border border-[#00553a]/50 w-full flex justify-center items-center text-[#00553a] ease-in-out mt-4 px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl text-sm sm:text-base duration-300 hover:scale-105 shadow-md"
        >
          <svg className="mr-3 w-8 h-8" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Sign in with Google
        </button>
        <div className="my-5 grid grid-cols-3 items-center w-full text-gray-600">
          <hr className="border-gray-400" />
          <div className="text-sm sm:text-base text-center">OR</div>
          <hr className="border-gray-400" />
        </div>
        <form className="w-full" onSubmit={Register_fn}>
          <div className="w-full relative mb-5 text-[#00553a]/70">
            <input
              type="text"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm sm:text-base shadow-inner drop-shadow-md rounded-lg border border-[#00553a]/50 cursor-pointer focus:outline-none peer"
              id="register_name"
              placeholder=" "
              minLength="3"
              maxLength="100"
              value={register.name}
              name="name"
              onChange={onChange}
              required
            />
            <label
              htmlFor="register_name"
              className="text-sm sm:text-base absolute duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-[#fff] cursor-pointer ml-2 peer-focus:px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Name*
            </label>
          </div>
          <div className="w-full relative mb-5 text-[#00553a]/70">
            <input
              type="email"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm sm:text-base shadow-inner drop-shadow-md rounded-lg border border-[#00553a]/50 cursor-pointer focus:outline-none peer"
              id="register_email_address"
              placeholder=" "
              maxLength="320"
              value={register.email_address}
              name="email_address"
              onChange={onChange}
              required
            />
            <label
              htmlFor="register_email_address"
              className="text-sm sm:text-base absolute duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-[#fff] cursor-pointer ml-2 peer-focus:px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email Address*
            </label>
          </div>
          <div className="w-full relative mb-5 text-[#00553a]/70">
            <input
              type="password"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm sm:text-base shadow-inner drop-shadow-md rounded-lg border border-[#00553a]/50 cursor-pointer focus:outline-none peer"
              id="register_password"
              placeholder=" "
              minLength="8"
              maxLength="12"
              autoComplete="off"
              value={register.password}
              name="password"
              onChange={onChange}
              required
            />
            <label
              htmlFor="register_password"
              className="text-sm sm:text-base absolute duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-[#fff] cursor-pointer ml-2 peer-focus:px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password*
            </label>
          </div>
          <button
            className="text-[#fff] w-full ease-in-out mt-4 px-4 sm:px-5 py-1.5 sm:py-2 bg-[#0e8f66]/80 mb-2 rounded-xl text-lg duration-300 hover:scale-105 shadow-md"
            type="submit"
          >
            Register
          </button>
        </form>
        <div className="text-sm sm:text-base flex justify-center items-center">
          <div className="text-gray-600">Already have an account?</div>
          <Link href="/login" className="ml-1 hover:underline text-[#00553a]">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
