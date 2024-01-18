import { useEffect, useState } from "react";
import config from "config";

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


  const dateFormatter = (dtData)=>{
    const originalDate = new Date(dtData);
            
      // Format the date as "YYYY-MM-DD"
      const formattedDate = originalDate.toISOString().split('T')[0];
      console.log(originalDate)
      // Format the time as "HH:mm:ss"
      const formattedTime = originalDate.toLocaleTimeString([], { hour12: false });
    
      // Combine date and time
      console.log(formattedDate,"formattedDate")
      console.log(formattedTime,"formattedTime")
      
      return `${formattedDate} ${formattedTime}`;
  }

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
        const decodedData = jsonData.map((data) => ({
          mac: decodeURIComponent(data.mac),
          name: decodeURIComponent(data.name),
          timestamp : dateFormatter(data.timestamp), // Assuming timestamp doesn't need decoding
          count: data.count, // Assuming count doesn't need decoding
        }));
         
        setData({
          ...data,
          rows: decodedData,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedDevice]);
  
  return data;
}
export default Values;
