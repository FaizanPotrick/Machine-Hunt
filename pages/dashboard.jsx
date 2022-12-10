import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../context/StateContext";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import { deleteCookie } from "cookies-next";

const Dashboard = () => {
  const { setLoading, isLogin, setIsLogin, setAlert } =
    useContext(StateContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      deleteCookie("token");
      router.push("/login");
    }
  }, [isLogin]);

  const [Dashboard, setDashboard] = useState({
    name: "",
    history: [],
  });

  const [isFetch, setIsFetch] = useState(false);
  const [Machine_Name, setMachine_Name] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/dashboard");
        setDashboard({
          name: data.user_name,
          history: data.history,
        });
      } catch (err) {
        setIsLogin(false);
      }
      setLoading(false);
    };
    fetchDashboard();
  }, [isFetch]);

  const GenerateApiKey = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/api-key", {
        machine_name: Machine_Name,
      });
      setMachine_Name("");
      setIsFetch(!isFetch);
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
    <div className="my-5 sm:mb-auto p-8 flex flex-col justify-center items-start w-full max-w-7xl border-2 border-gray-200/60 shadow-inner rounded-xl">
      <Head>
        <title>Dashboard</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Machine Hunt provides different programming languages to build your model. Build your model with your preferred language."
        />
      </Head>
      <div className="sm:text-lg lg:text-xl font-semibold text-[#00553a] text-right w-full capitalize">
        {Dashboard.name}
      </div>
      <div className="mt-2 text-lg md:text-xl font-semibold text-[#00553a]/90">
        Generate API-KEY
      </div>
      <form
        className="mt-3 flex flex-wrap gap-4 justify-between items-center w-full border-2 border-[#0e8f66]/10 rounded-xl shadow-inner bg-[#0e8f66]/[0.15] p-2"
        onSubmit={GenerateApiKey}
      >
        <select
          className="bg-transparent px-2.5 sm:px-5 text-[#00553a]/90 font-medium outline-none cursor-pointer"
          onChange={(e) => {
            setMachine_Name(e.target.value);
          }}
          value={Machine_Name}
          required
        >
          <option value="">Machine</option>
          <option value="ChatBot">ChatBot</option>
        </select>
        <button
          className="px-4 sm:px-5 py-1.5 sm:py-2 bg-[#0e8f66]/80 rounded-xl text-sm sm:text-base duration-300 hover:scale-105 text-white font-medium"
          type="submit"
        >
          Generate
        </button>
      </form>
      {Dashboard.history.length !== 0 && (
        <>
          <div className="text-lg lg:text-xl font-semibold text-[#00553a]/90 mt-12">
            History
          </div>
          <div className="mt-3 flex flex-col sm:flex-row gap-4 justify-center sm:justify-between items-center w-full px-10 text-[#00553a] font-medium text-sm sm:text-base">
            <div>Machine</div>
            <div>API-KEY</div>
            <div>Delete</div>
          </div>
          {Dashboard.history.map(({ _id, machine, api_key }, index) => {
            return (
              <div
                className="mt-3 flex flex-col sm:flex-row gap-4 justify-center sm:justify-between items-center w-full border-2 border-[#0e8f66]/10 rounded-xl shadow-inner bg-[#0e8f66]/[0.15] py-4 px-10 sm:py-2 text-[#00553a] font-medium text-sm sm:text-base"
                key={index}
              >
                <div>{machine}</div>
                <div>{api_key}</div>
                <svg
                  className="w-6 h-6 text-[#0e8f66]/80 duration-300 hover:scale-105 cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await axios.delete(`/api/api-key?api_id=${_id}`);
                      setIsFetch(!isFetch);
                    } catch (err) {
                      setLoading(false);
                      setAlert({
                        isAlert: true,
                        type: err.response.data.type,
                        message: err.response.data.message,
                      });
                    }
                  }}
                >
                  <path
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Dashboard;
