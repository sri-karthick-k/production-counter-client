import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Select from "react-select";
import config from "config";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Values from "layouts/report/data/Values";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactApexChart from "react-apexcharts";

function Report() {
  const [loading, setLoading] = useState(false);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [chartData, setChartData] = useState([]);

  const fetchDevices = async () => {
    try {
      const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.getDevices}`, {
        headers: {
          user_id: 1,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch devices");
      }

      const devices = await response.json();
      const deviceOptions = devices.map((device) => ({ value: device.device_id, label: device.name.toUpperCase() }));
      setDeviceOptions(deviceOptions);
      return deviceOptions;
    } catch (error) {
      console.error("Error fetching devices:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadDevices = async () => {
      const devices = await fetchDevices();
      generateLineGraphs(devices);
    };

    loadDevices();
  }, []);

  const generateLineGraphs = async (devices) => {
    try {
      setLoading(true);
  
      const promises = devices.map(async (device) => {
        const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.getDevReport}`, {
          headers: {
            device_id: device.value,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch data for device ${device.label}`);
        }
  
        const jsonData = await response.json();
  
        const timestamps = jsonData.map((data) => {
          const originalDate = new Date(data.timestamp);
          const formattedDate = originalDate.toISOString().split('T')[0];
          const formattedTime = originalDate.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
          return `${formattedDate} ${formattedTime}`;
        });        
        const counts = jsonData.map((data) => data.count);
  
        return {
          deviceId: device.value,
          deviceName: device.label,
          data: {
            options: {
              xaxis: {
                categories: timestamps,
              },
            },
            series: [
              {
                name: "Count",
                data: counts,
              },
            ],
          },
        };

      });
  
      const chartData = await Promise.all(promises);
      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching data for line graphs:", error);
    } finally {
      setLoading(false);
    }
  };
    
  

  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6} justifyContent="center">
          {chartData.map((chart, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    {chart.deviceName}
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <ReactApexChart
                    options={chart.data.options}
                    series={chart.data.series}
                  />
                </MDBox>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}


export default Report;
