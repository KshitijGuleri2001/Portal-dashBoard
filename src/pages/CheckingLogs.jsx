import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import Layout from "../components/Layout";
import Lottie from "react-lottie";
import noDatafound from "../assets/images/Animation - 1721025848612.json";
import { checkingLogs } from "../Data/api";

const Profile = () => {
  const [date, setDate] = useState(null);
  const [mAct, setMact] = useState(null);
  const [packType, setPackType] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setDate(new Date());
  }, []);

  const fetchData = () => {
    if (!date || !mAct || !packType) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError(null);
    const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    const url = `${checkingLogs}`;
    axios
      .post(url, {
        date: formattedDate,
        m_act: mAct.code,
        packType: packType.code,
      })
      .then((response) => {
        setData(response.data);
        console.log("===data", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setError("Error fetching data");
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      <div className="bg-white border-gray-200">
        <h1 className="text-center font-bold text-2xl text-violet-500 p-4">
          Check Logs
        </h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg mx-4">
          <div className="flex flex-col lg:flex-row justify-center items-center space-y-5 lg:space-y-0 lg:space-x-5 mt-4">
            <div className="flex justify-center w-full lg:w-auto">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                className="p-3 w-full max-w-xs border border-gray-300 rounded-lg shadow-md"
                showIcon
              />
            </div>
            <Dropdown
              value={mAct}
              onChange={(e) => setMact(e.value)}
              options={[
                { name: "USSD", code: "USSD" },
                { name: "WEB", code: "WEB" },
                { name: "webv2", code: "webv2" },
              ]}
              optionLabel="name"
              placeholder="Select Mode"
              className="w-full lg:w-1/3 border border-gray-300 rounded-lg shadow-md"
            />
            <Dropdown
              value={packType}
              onChange={(e) => setPackType(e.value)}
              options={[
                { name: "DAILY", code: "DAILY" },
                { name: "WEEKLY", code: "WEEKLY" },
              ]}
              optionLabel="name"
              placeholder="Select Pack"
              className="w-full lg:w-1/3 border border-gray-300 rounded-lg shadow-md"
            />
            <button
              onClick={fetchData}
              className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : data.length <= 0 ? (
            <div className="flex flex-col items-center">
              <Lottie
                options={{
                  autoplay: true,
                  animationData: noDatafound,
                }}
                style={{ width: "20%", height: "auto" }}
              />
              <div className="text-center font-semi-bold">No data Found</div>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Mode</th>
                    <th className="py-2 px-4 border-b">Pack</th>
                    <th className="py-2 px-4 border-b">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {data.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 px-4 border-b">{item.id}</td>
                      <td className="py-2 px-4 border-b">{item.name}</td>
                      <td className="py-2 px-4 border-b">{item.mode}</td>
                      <td className="py-2 px-4 border-b">{item.pack}</td>
                      <td className="py-2 px-4 border-b">{item.date}</td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
