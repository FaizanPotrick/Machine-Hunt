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

  const [Machine_Name, setMachine_Name] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const fetchDashboard = async () => {
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
    setButtonLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchDashboard();
  }, []);

  const GenerateApiKey = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    try {
      await axios.post("/api/api-key", {
        machine_name: Machine_Name,
      });
      setMachine_Name("");
      fetchDashboard();
    } catch (err) {
      setButtonLoading(false)
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
        <meta charSet="UTF-8" />
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
        className="mt-3 flex flex-wrap gap-4 justify-center sm:justify-between items-center w-full border-2 border-[#0e8f66]/10 rounded-xl shadow-inner bg-[#0e8f66]/[0.15] p-2"
        onSubmit={GenerateApiKey}
      >
        <select
          className="bg-transparent px-2.5 sm:px-5 max-w-[8rem] text-[#00553a]/90 font-medium outline-none cursor-pointer"
          onChange={(e) => {
            setMachine_Name(e.target.value);
          }}
          value={Machine_Name}
          required
        >
          <option value="">Machine</option>
          <option value="ChatBot">ChatBot</option>
          <option value="Recommendation System">Recommendation System</option>
          <option value="Sentiment Analysis">Sentiment Analysis</option>
        </select>
        <button
          className="flex justify-center items-center px-4 sm:px-5 py-1.5 sm:py-2 bg-[#0e8f66]/80 rounded-xl text-sm sm:text-base duration-300 hover:scale-105 text-white font-medium"
          type="submit"
        >
          {!buttonLoading ? (
            <span>Generate</span>
          ) : (
            <svg
              class="w-6 h-6 text-transparent animate-spin fill-white stroke-current mx-5"
              viewBox="0 0 100 101"
              fill="none"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
        </button>
      </form>
      {Dashboard.history.length !== 0 && (
        <>
          <div className="text-lg lg:text-xl font-semibold text-[#00553a]/90 mt-12">
            History
          </div>
          {Dashboard.history.map(({ _id, machine, api_key }, index) => {
            return (
              <div
                className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center content-center w-full border-2 border-[#0e8f66]/10 rounded-xl shadow-inner bg-[#0e8f66]/[0.15] py-4 px-10 sm:py-2 text-[#00553a] text-sm sm:text-base"
                key={index}
              >
                <div className="w-full text-center md:text-start font-medium">
                  {machine}
                </div>
                <div className="w-full text-center">{api_key}</div>
                <div className="w-full flex justify-center md:justify-end">
                  <svg
                    className="w-6 h-6 text-[#0e8f66]/80 duration-300 hover:scale-105 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    onClick={async () => {
                      try {
                        await axios.delete(`/api/api-key?api_id=${_id}`);
                        setDashboard({
                          ...Dashboard,
                          history: Dashboard.history.filter(
                            (item) => item._id !== _id
                          ),
                        });
                      } catch (err) {
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
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Dashboard;
