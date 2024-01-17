import { useEffect, useState } from "react";
import config from "config";
function Values(selectedDevice) {
  console.log(selectedDevice);
  console.log("hi");
function Values(selectedDevice) {
  console.log(selectedDevice);
  console.log("hi");
  const [data, setData] = useState({
    columns: [
      { Header: "device Id", accessor: "mac", width: "45%", align: "left" },
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "Time", accessor: "timestamp", align: "center" },
      { Header: "Count", accessor: "count", align: "center" },
    ],
    rows: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
          // Perform a null check before accessing the value property
         // if (!selectedDevice || !selectedDevice.value) {
           // return;
         // }
  
        const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.getDevReport}`, {
          headers: {
            device_id: selectedDevice,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setData({
          ...data,
          rows: jsonData,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedDevice]);
  
  return data;
}}
export default Values;
