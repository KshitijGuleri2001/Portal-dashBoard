import React, { useState } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Layout from "../components/Layout";
import Lottie from "react-lottie";
import noDatafound from "../assets/images/Animation - 1721025848612.json";
import { specificApi } from "../Data/api";
import CheckSpecificDeactivateLogs from "./CheckSpecificDeactivateLogs";
const CheckSpecificLogs = () => {
  const [aliasNumber, setAliasNumber] = useState("");
  const [subscribeData, setSubscribeData] = useState([]);
  const [unsubscribeData, setUnsubscribeData] = useState([]);
  const [message, setMessage] = useState("");
  const [charginglogs, setCharginglogs] = useState([]);
  const [showChargingLogs, setShowChargingLogs] = useState(false);
  const [loading, setLoading] = useState(false);
   console.log("charging-logs",showChargingLogs)
  const fetchData = async (e) => {
    e.preventDefault();
    if (aliasNumber.length > 0) {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `${specificApi}?aliasNumber=${aliasNumber}`
        );
        const reportData = response.data.report || [];
        setMessage(response.data.message);
        setCharginglogs(response.data.chargedLogsData);
         
        const formatTime = (dateString) => {
          return dateString.replace("T", " ").split(".")[0];
        };

        if (response.data.message === "Unsubscribe") {
          setUnsubscribeData(
            reportData.map((item) => ({
              ...item,
              displayDate: formatTime(item.unsub_date_time),
              action: response.data.message,
            }))
          );
        } else {
          setSubscribeData(
            reportData.map((item) => ({
              ...item,
              displayDate: formatTime(item.sub_date_time),
              action: response.data.message,
            }))
          );
        }
        setCharginglogs(
          response.data.chargedLogsData.map((log) => ({
            ...log,
            DATETIME: formatTime(log.DATETIME),
          }))
        );
      } catch (error) {
        alert("Network Error");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  const handleShowChargingLogs = () => {
    setShowChargingLogs((prevState) => !prevState);
  };

  return (
    <Layout>
      <div className="bg-white justify-center items-center">
        <h1 className="text-center font-bold text-2xl text-violet-500 p-4">
          Check Specific Logs
        </h1>
        <div className="bg-white mx-auto items-center border-gray-300 shadow-lg rounded-lg">
          <div className="rounded gap-7 p-4">
            <div className="flex justify-center items-center text-center flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mt-2">
              <InputText
                id="msisdn"
                placeholder="Enter Alias/msisdn"
                type="varchar"
                value={aliasNumber}
                onChange={(e) => setAliasNumber(e.target.value)}
                className="w-full md:w-auto border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Mobile Number"
              />
              <button
                onClick={fetchData}
                className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
              >
                Submit
              </button>
            </div>
          </div>
          <hr />

          <div className="md:w-[1000px] w-[350px] mx-auto items-center">
            {loading && (
              <div className="flex flex-col items-center justify-center mt-4">
                <div className="spinner"></div> 
                <div className="text-center font-semibold mt-2">
                  <p className="text-lg">Please wait...</p>
                </div>
              </div>
            )}
            {!loading && subscribeData.length > 0 && (
              <div>
                <h1 className="text-xl text-center font-bold text-green-600 leading-tight mb-2 border-t-2 border-b-4 border-purple-300 py-4">
                  SUBSCRIPTION LOGS
                </h1>
                {charginglogs.length > 0 && (
                  <div className="flex justify-end p-2 mt-2">
                    <button
                      onClick={handleShowChargingLogs}
                      className="bg-blue-500 text-white font-bold py-1 text-sm mr-2 p-2 px-2 rounded"
                    >
                      {showChargingLogs
                        ? "Hide Charging Logs"
                        : "Show Charging Logs"}
                    </button>
                  </div>
                )}
                <DataTable
                  value={subscribeData}
                  className="p-datatable-gridlines"
                >
                  <Column field="ani" header="ANI" />
                  <Column field="displayDate" header="Subscription Date" />
                  <Column field="m_act" header="Mode" />
                  <Column field="pack_type" header="Pack Type" />
                  <Column field="amount" header="Amount" />
                  <Column field="action" header="Action" className="text-green-500" />
                </DataTable>
              </div>
            )}

            {!loading && unsubscribeData.length > 0 && (
              <div>
                <h1 className="text-xl text-center font-bold text-red-600 leading-tight mb-2 border-t-2 border-b-4 border-purple-300 py-4">
                  UNSUBSCRIPTION LOGS
                </h1>
                {charginglogs.length > 0 && (
                  <div className="flex justify-end p-2 mt-2">
                    <button
                      onClick={handleShowChargingLogs}
                      className="bg-blue-500 text-white font-bold py-1 text-sm mr-2 p-2 px-2 rounded"
                    >
                      {showChargingLogs
                        ? "Hide Charging Logs"
                        : "Show Charging Logs"}
                    </button>
                  </div>
                )}
                <DataTable
                  value={unsubscribeData}
                  className="p-datatable-gridlines"
                >
                  <Column field="ani" header="ANI" />
                  <Column field="displayDate" header="Unsubscription Date" />
                  <Column field="m_act" header="Mode" />
                  <Column field="pack_type" header="Pack Type" />
                  <Column field="amount" header="Amount" />
                  <Column field="action" header="Action" className="text-red-500" />
                </DataTable>
              </div>
            )}
            {!loading && subscribeData.length === 0 && unsubscribeData.length === 0 && (
              <div className="flex flex-col items-center justify-center">
                <Lottie
                  options={{
                    autoplay: true,
                    animationData: noDatafound,
                  }}
                  style={{ width: "20%", height: "auto" }}
                />
                <div className="text-center font-semibold">No data Found</div>
              </div>
            )}
            {!loading && showChargingLogs && (
              <div className="mt-4">
                <h2 className="text-center font-bold text-xl text-blue-500 p-4">
                  Charging Logs
                </h2>
                <DataTable
                  value={charginglogs}
                  className="p-datatable-gridlines"
                >
                  <Column field="ani" header="ANI" />
                  <Column field="alias" header="Alias" />
                  <Column field="DATETIME" header="DATETIME" />
                  <Column field="packType" header="Pack Type" />
                  <Column field="type_event" header="Type Event" />
                </DataTable>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-7">
<CheckSpecificDeactivateLogs/>
      </div>
    </Layout>
  );
};

export default CheckSpecificLogs;
