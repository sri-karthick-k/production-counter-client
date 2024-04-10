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
  const [selectedDevice, setSelectedDevice] = useState(null);
  const { columns, rows } = Values(selectedDevice);
  const [loading, setLoading] = useState(false);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [chartData, setChartData] = useState(null);

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
      return devices.map((device) => ({ value: device.device_id, label: device.name.toUpperCase() }));
    } catch (error) {
      console.error("Error fetching devices:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadDevices = async () => {
      const devices = await fetchDevices();
      setDeviceOptions(devices);
    };

    loadDevices();
  }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: state.isFocused ? "0 0 0 1px #1976D2" : null,
      borderColor: state.isFocused ? "#1976D2" : provided.borderColor,
      "&:hover": {
        borderColor: state.isFocused ? "#1976D2" : provided.borderColor,
      },
    }),
  };

  const generatePdf = () => {
    setLoading(true);

    const pdfDoc = new jsPDF();
    pdfDoc.autoTable({
      head: [columns.map((col) => col.Header)],
      body: rows.map((row) => Object.values(row)),
    });
    pdfDoc.save("report.pdf");

    setLoading(false);
  };

  const generateLineGraph = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${config.server.hostname}:${config.server.port}${config.apiKeys.getDevReport}`,
        {
          headers: {
            device_id: selectedDevice,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data for line graph");
      }

      const jsonData = await response.json();

      const timestamps = jsonData.map((data) => {
        const originalDate = new Date(data.timestamp);
        
        // Format the date as "YYYY-MM-DD"
        const formattedDate = originalDate.toISOString().split('T')[0];
      
        // Format the time as "HH:mm:ss"
        const formattedTime = originalDate.toLocaleTimeString([], { hour12: false });
      
        // Combine date and time
        return `${formattedDate} ${formattedTime}`;
      });
      
      const counts = jsonData.map((data) => data.count);

      setChartData({
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
      
      });
    } catch (error) {
      console.error("Error fetching data for line graph:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Select
              options={deviceOptions}
              onChange={(selectedOption) => setSelectedDevice(selectedOption?.value)}
              placeholder="Select a device"
              isSearchable
              styles={customStyles}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={generatePdf}
              disabled={loading || !selectedDevice}
              style={{ color: "white", marginTop: 16, marginRight: 16 }}
            >
              {loading ? "Generating PDF..." : "Generate PDF"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={generateLineGraph}
              disabled={!selectedDevice}
              style={{ color: "white", marginTop: 16 }}
            >
              Generate Line Graph
            </Button>
          </Grid>
          <Grid item xs={12} md={8} style={{ marginTop: 16 }}>
            <Card style={{ innerWidth: "min-content" }}>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                style={{ innerWidth: 100 }}
              >
                <MDTypography variant="h6" color="white" style={{ innerWidth: 100 }}>
                  Device Values
                </MDTypography>
              </MDBox>
              <MDBox pt={3} style={{ innerWidth: "min-content" }}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          {chartData && (
            <Grid item xs={12} md={8} style={{ marginTop: 16 }}>
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
                    Line Graph
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    height={350}
                  />
                </MDBox>
              </Card>
            </Grid>
          )}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Report;
