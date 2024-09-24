import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Lottie from "react-lottie";
import noDatafound from "../assets/images/Animation - 1721025848612.json";
import { DrawWinnerlogs, SendDrawData } from "../Data/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckHourlyLogs = () => {
  const [dateTime, setDateTime] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowStatuses, setRowStatuses] = useState({});

  useEffect(() => {
    getData(dateTime);
  }, [dateTime]);

  const getData = async (date) => {
    setLoading(true);
    try {
      const res = await axios.post(DrawWinnerlogs, { date });
      setData(res.data);
      setRowStatuses(res.data.reduce((acc, row) => {
        acc[row.ani] = { sending: false, status: row.status };
        return acc;
      }, {}));
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async (rowData) => {
    setRowStatuses(prevStatuses => ({
      ...prevStatuses,
      [rowData.ani]: { ...prevStatuses[rowData.ani], sending: true }
    }));

    try {
      // Send data to API
      await axios.post(SendDrawData, {
        ani: rowData.ani,
        date: rowData.datetime,
        points: rowData.points
      });

      // Show success toast
      toast.success('Data sent successfully!');
      
      // Update the status to 'sent' after successful submission
      setRowStatuses(prevStatuses => ({
        ...prevStatuses,
        [rowData.ani]: { sending: false, status: 'sent' }
      }));

      // Re-fetch the data to update the table
      getData(dateTime);
      
    } catch (error) {
      console.error("Error sending data:", error);
      setRowStatuses(prevStatuses => ({
        ...prevStatuses,
        [rowData.ani]: { sending: false, status: 'failed' }
      }));
    }
  };

  const actionBodyTemplate = (rowData) => {
    const { sending, status } = rowStatuses[rowData.ani] || {};

    if (status === 'sent' || rowData.status.toLowerCase() === 'sent') {
      return <button className="p-1 bg-green-500 text-sm text-white rounded" disabled>Done</button>;
    }

    if (rowData.status.toLowerCase() === 'pending') {
      return (
        <button
          onClick={() => handleButtonClick(rowData)}
          className={`p-1 ${sending ? 'bg-gray-500' : 'bg-red-500'} text-sm text-white rounded`}
          disabled={sending}
        >
          {sending ? "Sending..." : "Send Data"}
        </button>
      );
    }

    return null;
  };

  return (
    <Layout>
      <ToastContainer />
      <div className='flex bg-white flex-col items-center'>
        <div className="text-2xl md:text-2xl text-purple-500 font-bold p-4">
          Draw Winners
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <form onSubmit={(e) => e.preventDefault()} className="w-full sm:w-auto">
            <input
              type="date"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="border p-2 rounded w-full sm:w-auto"
              disabled={loading}
            />
          </form>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <span>Loading...</span>
          </div>
        ) : (
          <div className='w-full max-w-[350px] md:max-w-[1000px] py-10 overflow-x-auto'>
            {data && data.length > 0 ? (
              <DataTable value={data} className="min-w-full" paginator rows={10}>
                <Column field="id" header="SUB Count" className="text-left" />
                <Column field="ani" header="Msisdn" className="text-left" />
                <Column field="datetime" header="Datetime" className="text-left" />    
                <Column field="points" header="Points" className="text-left" />
                <Column field="price" header="Price" className="text-left" />
                <Column field="status" header="Status" className="text-left" />
                <Column body={actionBodyTemplate} header="Action" className="text-left" />
              </DataTable>
            ) : (
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
        )}
      </div>
    </Layout>
  );
};

export default CheckHourlyLogs;
