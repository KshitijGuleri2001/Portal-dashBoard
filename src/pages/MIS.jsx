import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Layout from "../components/Layout";
import axios from "axios";
import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr styles
import flatpickr from "flatpickr";
import Lottie from "react-lottie";
import noDatafound from "../assets/images/Animation - 1721025848612.json";
import { msiApi } from "../Data/api";

const Mis = () => {
  const flatpickrRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });
  const [staticData, setStaticData] = useState([]);
 console.log("mis== data===",staticData)
  useEffect(() => {
    flatpickr(flatpickrRef.current, {
      mode: "range",
      dateFormat: "Y-m-d",
      defaultDate: [selectedDates.startDate, selectedDates.endDate],
      onChange: (selectedDates) => {
        if (Array.isArray(selectedDates) && selectedDates.length === 2) {
          setSelectedDates({
            startDate: selectedDates[0],
            endDate: selectedDates[1],
          });
        }
      },
    });
  }, []);

  useEffect(() => {
    if (selectedDates.startDate && selectedDates.endDate) {
      fetchData(selectedDates.startDate, selectedDates.endDate);
    }
  }, [selectedDates]);

  const fetchData = async (startDate, endDate) => {
  try {
    const response = await axios.get(
      `${msiApi}?from=${startDate.toISOString().split("T")[0]}&to=${endDate.toISOString().split("T")[0]}`
    );
    console.log("API response:", response.data);

    if (Array.isArray(response.data.mis)) {
      const sanitizedData = response.data.mis.map(item => {
        return Object.fromEntries(
          Object.entries(item).map(([key, value]) => [key, value === null ? 0 : value])
        );
      });
      setStaticData(sanitizedData);
    } else if (typeof response.data === "object" && response.data !== null) {
      const sanitizedData = Object.fromEntries(
        Object.entries(response.data).map(([key, value]) => [key, value === null ? 0 : value])
      );
      setStaticData([sanitizedData]);
    } else {
      console.error("Error: Expected an array or object from API");
      setStaticData([]);
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

// const fetchData = async (startDate, endDate) => {
//   try {
//     const response = await axios.get(
//       `${msiApi}?from=${startDate.toISOString().split("T")[0]}&to=${endDate.toISOString().split("T")[0]}`
//     );
//     console.log("API response:", response.data);

//     if (Array.isArray(response.data.mis)) {
//       setStaticData(response.data.mis);
//     } else if (typeof response.data === "object" && response.data !== null) {
//       setStaticData([response.data]);
//     } else {
//       console.error("Error: Expected an array or object from API");
//       setStaticData([]);
//     }
//   } catch (error) {
//     console.error("Error fetching data", error);
//   }
// };

  return (
    <Layout>
      <div className="max-w-full mx-auto m-1 py-2 border-2 border-gray-200 bg-white">
        <div className="max-w-[1640px] mx-auto">
          <div className="rounded">
            <h1 className="text-2xl text-violet-500 font-bold text-center p-4">
              MIS REPORT
            </h1>
            <div className="flex justify-center items-center text-center space-x-5 mt-5">
              <input
                className="w-72 px-4 py-3 text-lg text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                ref={flatpickrRef}
                placeholder="Click to Select Date"
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            {staticData.length <= 0 ? (
              <div className="flex flex-col items-center justify-center">
                <Lottie
                  options={{
                    autoplay: true,
                    animationData: noDatafound,
                  }}
                  style={{ width: "20%", height: "auto" }}
                />
                <div className="text-center font-semibold">
                  No data Found
                </div>
              </div>
            ) : (
              <div className="p-4 flex justify-center w-full overflow-x-auto">
                <div className="w-[300px] md:w-[1000px]">
                  <DataTable value={staticData} paginator rows={5} className="mt-3 w-full">
                    <Column field="MIS_DATE" header="MIS Date" />
                    <Column field="subHits" header="Sub Hits" />
                    <Column field="success_sub_hit" header="Success Sub Hit" />
                    <Column field="fail_sub_hit" header="Fail Sub Hit" />
                    <Column field="sub_revenue" header="Sub Revenue" />
                    <Column field="renHits" header="Ren Hits" />
                    <Column field="success_ren_hit" header="Success Ren Hit" />
                    <Column field="fail_ren_hit" header="Fail Ren Hit" />
                    <Column field="ren_revenue" header="Ren Revenue" />
                    <Column field="active_base" header="Active Base" />
                    <Column field="unsub" header="Unsub" />
                    <Column field="total_revenue" header="Total Revenue" />
                    <Column field="total_base" header="Total Base" />
                    <Column field="new_sub" header="New Sub" />
                    <Column field="daily_pack" header="Daily Pack" />
                    <Column field="weekly_pack" header="Weekly Pack" />
                  </DataTable>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Mis;
