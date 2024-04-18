import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import config from "config";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import "jspdf-autotable";
import ReactApexChart from "react-apexcharts";
import Loader from "components/Loading/Loading";

function Report() {
  const [loading, setLoading] = useState(false);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const userId = localStorage.getItem('uid')

  const fetchDevices = async () => {
    try {
      const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.getDevices}`, {
        headers: {
          user_id: userId,
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
              chart: {
                type: 'line',
                toolbar: {
                  show: true
                },
                zoom: {
                  enabled: false // Disabling zoom for a simpler interface
                }
              },
              stroke: {
                curve: 'straight', // Keeping the line straight for simplicity
                width: 1 // Narrower lines for a cleaner look
              },
              markers: {
                size: 3, // Smaller markers for a minimalistic design
                strokeWidth: 0, // No border for markers to keep the design clean
              },
              tooltip: {
                enabled: true,
                theme: 'light', // A lighter theme for tooltips to match the minimalistic design
                x: {
                  format: 'dd MMM, HH:mm'
                },
                y: {
                  formatter: (val) => `${val} counts` // Custom formatter for tooltip content
                }
              },
              xaxis: {
                categories: timestamps,
                tickAmount: 10, // Defines the approximate number of ticks on the X-axis
                labels: {
                  rotate: -45, // Optionally rotate labels to better fit if they are overlapping
                  trim: true,
                  minHeight: 100, // Adjust as needed to control spacing
                }
              },
              yaxis: {
                labels: {
                  formatter: (val) => `${val}` // Simplifying y-axis labels
                }
              },
              colors: ['#007bff'], // A single color for a more unified look
              grid: {
                show: false // Removing the grid to simplify the background
              },
            },
            series: [
              {
                name: "Count",
                data: counts
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
          {
            loading ? 
            (<Loader/> ) :
              chartData.length === 0 ? 
                (
                  <h1>No device reports found</h1>
                ) :

              chartData.map((chart, index) => (
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
              ))
          }
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}


export default Report;
