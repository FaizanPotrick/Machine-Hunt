import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { StateContext } from "../context/StateContext";
import Logo from "../assets/logo.png";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

const Navbar = () => {
  const { isLogin, setIsLogin, Machines } = useContext(StateContext);
  const router = useRouter();
  const { machine, language } = router.query;

  const [Links, setLinks] = useState([]);
  useEffect(() => {
    setLinks(
      !isLogin
        ? [
            <Link
              href="/register"
              key="register"
              className="px-4 sm:px-5 py-1.5 sm:py-2 bg-[#0e8f66]/80 rounded-lg text-sm sm:text-base duration-300 hover:scale-110 shadow-md"
            >
              Register
            </Link>,
            <Link
              href="/login"
              key="login"
              className="px-4 sm:px-5 py-1.5 sm:py-2 bg-[#0e8f66]/80 rounded-lg text-sm sm:text-base duration-300 hover:scale-110 shadow-md"
            >
              Login
            </Link>,
          ]
        : [
            <Link
              href="/dashboard"
              key="dashboard"
              className="px-4 sm:px-5 py-1.5 sm:py-2 bg-[#0e8f66]/80 rounded-lg text-sm sm:text-base duration-300 hover:scale-110 shadow-md"
            >
              Dashboard
            </Link>,
            <button
              onClick={() => {
                deleteCookie("token");
                setIsLogin(false);
              }}
              key="logout"
              className="px-4 sm:px-5 py-1 sm:py-1.5 bg-[#0e8f66]/80 rounded-lg text-sm sm:text-base duration-300 hover:scale-110 shadow-md"
            >
              Logout
            </button>,
          ]
    );
  }, [isLogin]);

  return (
    <div
      className={`relative w-full flex justify-around items-center font-semibold ${
        Machines.find((e) => e.tag === machine) &&
        machine &&
        language &&
        "pb-10"
      } lg:p-0`}
    >
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <Link
          href="/"
          className="flex justify-center items-center mr-2 lg:mr-4 text-ld sm:text-xl md:text-2xl gap-1 sm:gap-4 text-[#00553a]"
        >
          <Image src={Logo} alt="logo" className="w-fit h-8 sm:h-10 md:h-12" />
          <div className="shrink-0">Machine Hunt</div>
        </Link>
        {Machines.find(
          (e) => e.tag === machine && e.language.includes(language)
        ) &&
          machine &&
          language && (
            <div className="flex items-center justify-center gap-4 lg:border-l pl-2 lg:pl-3 text-sm sm:text-base md:text-lg text-[#00553a]/70 absolute left-10 lg:left-0 right-10 lg:right-0 bottom-0 lg:relative">
              <Link
                href={`/${machine}/${language}/docs`}
                className={`${
                  router.asPath.split("/").pop() === "docs" && "text-[#00553a]"
                } hover:text-[#00553a] duration-300`}
              >
                Docs
              </Link>
              <Link
                href={`/${machine}/${language}/demo`}
                className={`${
                  router.asPath.split("/").pop() === "demo" && "text-[#00553a]"
                } hover:text-[#00553a] duration-300`}
              >
                Demo
              </Link>
              <Link
                href={`/${machine}/${language}/api`}
                className={`${
                  router.asPath.split("/").pop() === "api" && "text-[#00553a]"
                } hover:text-[#00553a] duration-300`}
              >
                API
              </Link>
              <Link
                href={`/${machine}/${language}/train model`}
                className={`${
                  router.asPath.split("/").pop() === "train%20model" &&
                  "text-[#00553a]"
                } hover:text-[#00553a] duration-300`}
              >
                Train Model
              </Link>
            </div>
          )}
      </div>
      <div className="flex justify-center items-center gap-2 sm:gap-4 text-white">
        {Links.map((link, index) => {
          return <div key={index}>{link}</div>;
        })}
      </div>
    </div>
  );
};

export default Navbar;
