import { useEffect, useState } from 'react';

export default function Data() {
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
        const response = await fetch('http://192.46.211.177:4001/api/device-report', {
          headers: {
            device_id: 'B0:B2:1C:42:BC:9C'
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();
        setData({
          ...data,
          rows: jsonData,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  return data;
}