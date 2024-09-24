import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import {UnsubSingleUSer} from "../Data/api"
const UnsubscribeSingleUser = () => {
  const [aliasNumber,setSliasNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      const response = await axios.get(`${UnsubSingleUSer}?aliasNumber=${aliasNumber}`
      );
      if (response.status === 200) {
        setSuccess(true);
        // Handle success (e.g., show a success message)
      } else {
        throw new Error('Failed to unsubscribe');
      }
    } catch (err) {
      setError(err.message);
      // Handle error (e.g., show an error message)
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-[360px] md:w-full  mx-auto mb-7">
      <div className="bg-white shadow-md py-8">
        <h1 className="text-center text-s md:text-xl sm:text-2xl font-bold mb-6 text-gray-800 p-4">
          Enter single MSISDN/Alias to Deactivate
        </h1>
        <div className="flex justify-center items-center text-center flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mt-2 mb-6">
          <InputText
            id="msisdn"
            placeholder="Enter Alias/msisdn"
            type="text"
            value={aliasNumber}
            onChange={(e) => setSliasNumber(e.target.value)}
            className="w-full md:w-auto border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Mobile Number"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 min-w-[120px] text-center text-white bg-red-500 border border-red-700 rounded active:text-violet-500 hover:bg-transparent hover:text-red-500 focus:outline-none focus:ring"
          >
            {loading ? 'Processing...' : 'Deactivate'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-2 text-center">Successfully unsubscribed!</p>}
      </div>
    </div>
  ); 
};

export default UnsubscribeSingleUser;
