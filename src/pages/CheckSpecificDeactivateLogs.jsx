import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import Lottie from 'react-lottie';
import axios from 'axios';
import noDatafound from '../assets/images/Animation - 1721025848612.json';
import { SingleDNDSpecificLogs } from "../Data/api";

const CheckSpecificDeactivateLogs = () => {
  const [msisdn, setMsisdn] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await axios.get(`${SingleDNDSpecificLogs}?aliasNumber=${msisdn}`);
      console.log("resss", response.data);
      if (response.data && response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage('No data found');
      }
    } catch (err) {
      setError('Failed to fetch logs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white justify-center items-center">
      <h1 className="text-center font-bold text-2xl text-violet-500 p-4">
        Check Specific <span className='text-red-500'>DND</span> Logs
      </h1>
      <div className="bg-white mx-auto items-center border-gray-300 shadow-lg rounded-lg">
        <div className="rounded gap-7 p-4">
          <div className="flex justify-center items-center text-center flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mt-2">
            <InputText
              id="msisdn"
              value={msisdn}
              onChange={(e) => setMsisdn(e.target.value)}
              placeholder="Enter Alias/msisdn"
              type="text"
              className="w-full md:w-auto border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Mobile Number"
            />
            <button
              onClick={handleSubmit}
              className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
            >
              Submit
            </button>
          </div>
        </div>
        <hr />
        <div className="md:w-[1000px] w-[350px] mx-auto items-center">
          {loading && <div className="text-center font-semibold">Loading...</div>}
          {error && <div className="text-center text-red-500 font-semibold">{error}</div>}
          {!loading && message && (
        <div className='p-4'>
                 <div className="text-center text-red-500 font-bold text-lg bg-red-100 p-4 rounded-lg shadow-md border border-red-300 ">
               {message}
             </div>
          </div>
          )}
          {!loading && !message && (
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
        </div>
      </div>
    </div>
  );
}

export default CheckSpecificDeactivateLogs;
