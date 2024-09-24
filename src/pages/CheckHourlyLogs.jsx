import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose your theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {CheckHourlyLogsApi} from "../Data/api"
const CheckHourlyLogs = () => {
  const [dateTime, setDateTime] = useState(new Date().toISOString().split('T')[0]);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(dateTime);
  }, [dateTime]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const getData = async (date) => {
    try {
      const res = await axios.get(`${CheckHourlyLogsApi}?date=${date}`);
      console.log("data", res.data);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Layout>
      <div className='flex  bg-white flex-col items-center'>
        <div className="text-2xl md:text-2xl text-purple-500 font-bold p-4">
          Check Hourly Logs
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <form onSubmit={(e) => e.preventDefault()} className="w-full sm:w-auto">
            <input
              type="date"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="border p-2 rounded w-full sm:w-auto"
            />
          </form>
        </div>

        {isVisible && (
  <div className='w-full max-w-[350px] md:max-w-[1000px] py-10 overflow-x-auto'>
  <DataTable value={data} className="min-w-full" paginator rows={10}>
    <Column field="HOUR" header="Date/Time" className="text-left" />
    <Column field="REN" header="REN Count" className="text-left" />
    <Column field="SUB" header="SUB Count" className="text-left" />
  </DataTable>
</div>

        )}
      </div>
    </Layout>
  );
};

export default CheckHourlyLogs;
