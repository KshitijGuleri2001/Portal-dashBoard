import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import axios from "axios";
import Lottie from "react-lottie";
import noDatafound from "../assets/images/Animation - 1721025848612.json";
import { CheckDailyBillingLogsApi } from "../Data/api";

const CheckDailyBillingLogs = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [data, setData] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchData = async () => {
    if (startDate && endDate) {
      const formatDate = (date) => {
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return localDate.toISOString().split("T")[0];
      };

      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      setLoading(true); // Set loading to true before request
      try {
        const response = await axios.post(`${CheckDailyBillingLogsApi}`, {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
        setData(response.data);
        setError("");
      } catch (e) {
        setError("Failed to fetch data. Please try again.");
        console.error(e);
      } finally {
        setLoading(false); // Set loading to false after request
      }
    }
  };

  useEffect(() => {
    if (triggerFetch) {
      fetchData();
      setTriggerFetch(false);
    }
  }, [triggerFetch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays > 7) {
      alert("Date range should not be more than 7 days.");
      return;
    }

    setTriggerFetch(true);
  };

  return (
    <Layout>
      <div className="bg-white justify-center items-center">
        <h1 className="text-center font-bold text-2xl text-violet-500 p-4">
          Check Billing Logs
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-5 mt-5">
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            className="p-3 rounded-lg shadow-md w-full md:w-[220px]"
            isClearable={true}
            popperModifiers={{
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
                boundariesElement: "viewport"
              },
            }}
          />
          <button
            onClick={handleSubmit}
            className="mt-3 md:mt-0 px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
          >
            Submit
          </button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="m-2 p-2">
          {loading ? ( // Render loading indicator if loading
            <div className="flex justify-center items-center">
              <div className="loader"></div> {/* Add your loading spinner here */}
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <Lottie
                options={{
                  autoplay: true,
                  animationData: noDatafound,
                }}
                style={{ width: "20%", height: "auto" }} // Adjust for better responsiveness
              />
              <div className="text-center font-semibold">No data Found</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Billing Date</th>
                    <th className="border px-4 py-2">Type Event</th>
                    <th className="border px-4 py-2">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{item.billingDate}</td>
                      <td className="border px-4 py-2">{item.type_event}</td>
                      <td className="border px-4 py-2">{item.cnt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CheckDailyBillingLogs;
