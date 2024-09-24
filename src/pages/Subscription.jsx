import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { SubscriptionApi, SubscriptionBaseInfoApi } from "../Data/api";

const Subscription = () => {
  const [selectedPack, setSelectedPack] = useState("Daily");
  const [mode, setMode] = useState("webv2");
  const [file, setFile] = useState(null);
  const [baseData, setBaseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePackChange = (event) => {
    setSelectedPack(event.target.value);
  };

  const handleSelect = (event) => {
    setMode(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("File has not been selected");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("selectedPack", selectedPack);
      formData.append("mode", mode);

      const response = await axios.post(`${SubscriptionApi}`, formData);
      alert("Upload successful");
      fetchData();
      setFile(null);
      document.getElementById('file').value = null;
   
    } catch (error) {
      setError(error.response?.data?.message || "Network Error");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${SubscriptionBaseInfoApi}`);
      setBaseData(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Network Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [file]);

  return (
    <Layout>
      <div className="md:w-full w-[350px] mx-auto flex flex-col items-center border-2 bg-white border-gray-200">
        <div className="w-full max-w-[1640px] mx-auto p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Upload Base</h1>
          <form onSubmit={handleForm} className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg">
              <label htmlFor="mode" className="font-semibold text-gray-600 mb-2 md:mb-0">Mode:</label>
              <select id="mode" className="p-2 rounded border-none outline-none" onChange={handleSelect} value={mode}>
                <option value="webv2">Webv2</option>
                <option value="ussdv2">Ussdv2</option>
              </select>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg">
              <label htmlFor="selectedPack" className="font-semibold text-gray-600 mb-2 md:mb-0">Select Pack:</label>
              <select id="selectedPack" className="p-2 rounded border-none outline-none" value={selectedPack} onChange={handlePackChange}>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg">
              <label htmlFor="file" className="font-semibold text-gray-600 mb-2 md:mb-0">Select File:</label>
              <input id="file" type="file" className="p-2 rounded border-none outline-none" onChange={handleFileChange} />
            </div>
            <div className="mt-6 text-center">
              <button type="submit" className="w-full bg-violet-500 text-white py-2 px-6 rounded-lg hover:bg-violet-600 transition duration-300">
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
          {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
          <div className="mt-8 overflow-y-auto max-h-80">
            <h2 className="text-xl text-center font-semibold mb-4 dark:text-white">Subscription Data</h2>
            <div className="flex justify-between bg-gray-200 p-2 rounded-lg">
              <span className="font-semibold text-gray-600">Process Date</span>
              <span className="font-semibold text-gray-600">Count</span>
              <span className="font-semibold text-gray-600">Success</span>
            </div>
            {loading ? (
              <div className="text-center mt-4">Loading...</div>
            ) : (
              baseData.map((item, index) => (
                <div key={index} className="flex justify-between bg-gray-50 p-2 mt-2 rounded-lg text-center dark:text-white">
                  <span>{item.processDate}</span>
                  <span>{item.base_count ?? 0}</span>
                  <span>{item.success ?? 0}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;
