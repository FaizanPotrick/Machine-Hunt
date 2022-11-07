import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import logo from "./assets/logo.png";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="flex flex-col min-h-screen p-5">
      <header className="w-full flex justify-around items-center font-semibold">
        <div className="flex justify-center items-center text-ld sm:text-xl md:text-2xl gap-2 sm:gap-4 text-[#00553a]">
          <img src={logo} className="h-8 sm:h-10 md:h-12" />
          <div>Machine Hunt</div>
        </div>
        <div className="flex justify-center items-center gap-2 sm:gap-4 text-white">
          <button class="px-4 sm:px-5 py-1.5 sm:py-2 bg-[#0e8f66]/80 mb-2 rounded-xl text-sm sm:text-base duration-300 hover:scale-110 shadow-md">
            Register
          </button>
          <button class="px-4 sm:px-5 py-1.5 sm:py-2 bg-[#0e8f66]/80 mb-2 rounded-xl text-sm sm:text-base duration-300 hover:scale-110 shadow-md">
            Login
          </button>
        </div>
      </header>
      <RouterProvider router={router} />
      <footer class="text-center text-sm sm:text-base font-semibold text-[#00553a]">
        &copy; 2022 Machine Hunt | All Rights Reserved
      </footer>
    </div>
  </React.StrictMode>
);
