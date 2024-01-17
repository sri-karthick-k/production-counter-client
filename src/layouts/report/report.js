import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Select from "react-select";
import config from "config";
import { Line } from "react-chartjs-2";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import Values from "layouts/report/data/Values";

// Additional libraries
import jsPDF from "jspdf";
import "jspdf-autotable";

function Report() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const {columns,rows} = Values(selectedDevice);
  const [loading, setLoading] = useState(false);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [chartData, setChartData] = useState(null);
  // Function to fetch devices
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
      return devices.map((device) => ({ value: device.device_id, label: device.name }));
    } catch (error) {
      console.error("Error fetching devices:", error);
      return [];
    }
  };

  // Fetch devices on component mount
  useEffect(() => {
    const loadDevices = async () => {
      const devices = await fetchDevices();
      setDeviceOptions(devices);
    };

    loadDevices();
  }, []);

  // Styles for the dropdown menu
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
  
      const timestamps = jsonData.map((data) => data.timestamp);
      const counts = jsonData.map((data) => data.count);
  
      setChartData({
        labels: timestamps,
        datasets: [
          {
            label: "Count vs Timestamp",
            data: counts,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
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
            <Card style={{innerWidth:"min-content"  }}>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                style={{innerWidth:100  }}
              >
                <MDTypography variant="h6" color="white" style = {{innerWidth: 100}}>
                  Device Values
                </MDTypography>
              </MDBox>
              <MDBox pt={3} style={{innerWidth: "min-content"}}>
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
                  <Line data={chartData} />
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